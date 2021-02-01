import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import Avatar from '../../components/Avatar'
import Text from '../../components/Text'

export default function ChatMessage({ content, photoURL, received = false, createdAt }) {
  const theme = useTheme()

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
      <Avatar style={{ marginRight: received ? 8 : 0, marginLeft: received ? 0 : 8 }} uri={photoURL} size='sm' />
      <View style={{ backgroundColor: theme.colors.card, padding: 8, borderRadius: 12 }}>
        <Text>{content}</Text>
      </View>
    </View>
  )
}
