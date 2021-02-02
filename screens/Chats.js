import React, { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import ChatListItem from '../features/chats/ChatListItem'
import { setChatsAsync } from '../features/chats/chatsSlice'
import { useProfile } from '../features/profile/profileSlice'
import moment from 'moment'
import { ActivityIndicator, StatusBar } from 'react-native'

export default function Chats() {
  const dispatch = useDispatch()
  const { profile } = useProfile()
  const { chats, isFetching } = useSelector(state => state.chats)

  useEffect(() => {
    dispatch(setChatsAsync(profile?.uid))
  }, [])

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <ScrollView>
        <Header style={{ paddingHorizontal: 16 }} notSafe title='Chats' />
        {isFetching && <ActivityIndicator style={{ marginBottom: 16 }} />}
        {Object.keys(chats)?.map((chatId, index) => {
          const chat = chats[chatId]
          return (
            <ChatListItem
              key={chatId}
              chatId={chatId}
              photoURL={chat?.userData?.photoURL}
              displayName={chat?.userData?.displayName}
              lastMessage={chat?.lastMessage?.content}
              userId={chat?.userData?.uid}
              timeAgo={moment(chat?.lastMessage?.createdAt).fromNow()}
              isLast={Object.keys(chats)?.length - 1 === index}
            />
          )
        })}
      </ScrollView>
    </>
  )
}
