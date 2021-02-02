import { useTheme } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect } from 'react'
import { SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../../components/Avatar'
import DefaultButton from '../../components/DefaultButton'
import Heading from '../../components/Heading'
import { filterChat } from '../../utils/functions'
import ChatFooter from './ChatFooter'
import ChatMessages from './ChatMessages'
import { setChatMessagesAsync, setChatsAsync } from './chatsSlice'

export default function Chat({ navigation, route }) {
  const { colors } = useTheme()
  const { userId, displayName, photoURL } = route.params
  const { chats, isFetched } = useSelector(state => state.chats)
  const dispatch = useDispatch()
  const chatId = filterChat(userId, chats)
  const chat = chats[chatId]

  const handleAvatarPress = () => {
    navigation.navigate('Profile', {
      uid: chat?.userData?.uid,
      displayName
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DefaultButton title='Back' onPress={() => navigation.goBack()} />,
      headerTitle: () => <Heading variant='h4'>{displayName}</Heading>,
      headerRight: () => <Avatar onPress={handleAvatarPress} uri={photoURL} size='xs' style={{ marginRight: 16 }} />,
    })
  }, [navigation, chat])

  useEffect(() => {
    dispatch(setChatMessagesAsync(userId))
  }, [])

  useEffect(() => {
    if (!isFetched) {
      dispatch(setChatsAsync())
    }
  }, [isFetched])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
      >
        <ChatMessages chatId={chatId} />
        <ChatFooter chatId={chatId} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
