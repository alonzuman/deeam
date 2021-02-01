import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";

const INITIAL_STATE = {
  matches: [],
  isFetching: false,
  isFetched: false,
}

const matchesSlice = createSlice({
  name: 'matches',
  initialState: INITIAL_STATE,
  reducers: {
    isFetching: (state) => {
      state.isFetched = false;
      state.isFetching = true;
    },
    setMatches: (state, action) => {
      state.matches = action.payload;
      state.isFetching = false;
      state.isFetched = true
    },
    setMessages: (state, action) => {
      state.matches.map(match => {
        if (match.id === action.payload.matchId) {
          match.messages = action.payload.messages
        }
      })
      state.isFetching = false;
      state.isFetched = true;
    }
  }
})

export const { isFetching, setMatches, setMessages } = matchesSlice.actions;

export const setMatchesAsync = (userId) => dispatch => {
  dispatch(isFetching())

  db.collection('matches').where('members', 'array-contains', userId).onSnapshot(snapshot => {
    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    dispatch(setMatches(data))
  })
}

export const setMatchMessagesAsync = (matchId) => dispatch => {
  dispatch(isFetching())

  db.collection('matches').doc(matchId).collection('messages').onSnapshot(snapshot => {
    const messages = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    dispatch(setMessages({
      matchId,
      messages
    }))
  })
}

export default matchesSlice.reducer;
