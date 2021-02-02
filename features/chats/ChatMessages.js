import { useTheme } from '@react-navigation/native'
import React, { useRef } from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase'
import { useProfile } from '../profile/profileSlice'
import ChatMessage from './ChatMessage'

export default function ChatMessages({ chatId }) {
  const { chatMessages, chats } = useSelector(state => state.chats)
  const viewRef = useRef(null)
  const { colors } = useTheme()
  const { profile } = useProfile()
  const messages = chatMessages[chatId]
  const chat = chats[chatId]

  return (
    <ScrollView
      style={{ flex: 1, paddingHorizontal: 8, backgroundColor: colors.background }}
      ref={viewRef}
      onContentSizeChange={() => viewRef.current.scrollToEnd({ animated: true })}
    >
      {messages?.map(({ id, content, createdAt, uid }) => {
        const isSent = uid === auth.currentUser.uid
        const photoURL = isSent ? profile?.photoURL : chat?.userData?.photoURL
        return (
          <ChatMessage
            key={id}
            id={id}
            photoURL={photoURL}
            content={content}
            createdAt={createdAt}
            uid={uid}
            isSent={isSent}
          />
        )
      })}
    </ScrollView>
  )
}
