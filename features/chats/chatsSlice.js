import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";
import { mapDocs } from "../../utils/functions";

const INITIAL_STATE = {
  chats: {},
  chatMessages: {},
  isFetching: false,
  isFetched: false,
  isUpdating: false,
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState: INITIAL_STATE,
  reducers: {
    isFetching: (state) => {
      state.isFetching = true
    },
    isUpdating: (state) => {
      state.isUpdating = true
    },
    clearUpdating: (state) => {
      state.isUpdating = false
    },
    setChats: (state, action) => {
      state.chats = { ...state.chats, ...action.payload }
      state.isFetching = false
      state.isFetched = true
      state.isUpdating = false
    },
    setChatMessages: (state, action) => {
      const { messages, chatId } = action.payload;
      state.chatMessages[chatId] = messages
      state.isFetching = false
      state.isFetched = true
      state.isUpdating = false
    },
    clearChats: (state) => INITIAL_STATE
  }
})

export const { isFetching, isUpdating, clearUpdating, setChats, setChatMessages, clearChats } = chatsSlice.actions

export const setChatsAsync = () => dispatch => {
  dispatch(isFetching())

  db
    .collection('chats')
    .where(`memberIds.${auth.currentUser.uid}`, '==', true)
    .onSnapshot(snapshot => {
      let data = {}
      snapshot.docs.map(doc => {
        return data[doc.id] = {
          ...doc.data()
        }
      })
      Promise.all(Object.keys(data)?.map(chatId => {
        const memberIds = data[chatId]?.memberIds;
        const userId = Object.keys(memberIds)?.find(id => id !== auth.currentUser.uid);

        return db
          .collection('profiles')
          .doc(userId)
          .get()
          .then(userSnapshot => {
            const userData = {
              uid: userSnapshot.id,
              ...userSnapshot.data()
            }
            return data[chatId].userData = userData;
          })
      }))
        .then(() => {
          dispatch(setChats(data))
        })
        .catch(err => alert(err.message))
    })
}

export const setChatMessagesAsync = (userId) => dispatch => {
  dispatch(isFetching())

  db.collection('chats')
  .where(`memberIds.${userId}`, '==', true)
  .where(`memberIds.${auth.currentUser.uid}`, '==', true)
  .limit(1)
  .onSnapshot(snapshot => {
    if (snapshot.empty) {
        // No chat, create a new one
        db.collection('chats').add({
          createdAt: Date.now(),
          memberIds: {
            [userId]: true,
            [auth.currentUser.uid]: true
          }
        })
        .then(res => {
          dispatch(setChatMessages({
            chatId: res.id,
            messages: []
          }))
        })
      } else {
        const chatId = snapshot.docs.map(doc => doc.id)[0]
        db.collection('chats')
          .doc(chatId)
          .collection('messages')
          .orderBy('createdAt', 'asc')
          .onSnapshot(chatSnapshot => {
            const messages = mapDocs(chatSnapshot);
            dispatch(setChatMessages({
              chatId,
              messages
            }))
          })
      }
    })
}

export const sendMessageAsync = (chatId, message) => dispatch => {
  dispatch(isUpdating())

  db
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)
    .then(() => {
      db.collection('chats').doc(chatId).set({
        lastMessage: message
      }, { merge: true })
    })
    .catch(err => alert(err))
}

export default chatsSlice.reducer
