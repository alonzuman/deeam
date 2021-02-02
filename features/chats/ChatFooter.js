import React from 'react'
import { View } from 'react-native'
import { useProfile } from '../profile/profileSlice'
import { useDispatch } from 'react-redux'
import { sendMessageAsync } from './chatsSlice'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useTheme } from '@react-navigation/native'
import DefaultButton from '../../components/DefaultButton'

export default function ChatFooter({ chatId }) {
  const { profile } = useProfile()
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (!!content) {
      dispatch(sendMessageAsync(chatId, {
        content: content,
        createdAt: Date.now(),
        uid: profile?.uid
      }))
      setContent('')
    }
  }

  return (
    <View style={{ paddingTop: 8, flexDirection: 'row', paddingHorizontal: 8, alignItems: 'center',borderTopColor: colors.border, borderTopWidth: 1, backgroundColor: colors.card }}>
      <TextInput
        style={{ flex: 1, paddingHorizontal: 12, fontSize: 18, height: 40, borderRadius: 16, backgroundColor: colors.background, marginRight: 8 }}
        value={content}
        onChangeText={text => setContent(text)}
      />
      <DefaultButton title='Send' onPress={handleSubmit} />
    </View>
  )
}
