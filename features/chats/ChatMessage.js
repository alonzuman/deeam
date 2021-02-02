import { useNavigation, useTheme } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import Avatar from '../../components/Avatar'
import Text from '../../components/Text'
import { useProfile } from '../profile/profileSlice'

export default function ChatMessage({ content, photoURL, userId, displayName, createdAt, isSent }) {
  const { colors } = useTheme()
  const { profile } = useProfile()

  return (
    <View style={{
      flexDirection: isSent ? 'row' : 'row-reverse',
      marginVertical: 8,
      alignItems: 'flex-start',
    }}>
      <Avatar style={{ marginTop: 2 }} size='sm' uri={isSent ? profile?.photoURL : photoURL} />
      <View
        style={{
          borderRadius: 12,
          padding: 12,
          marginHorizontal: 8,
          backgroundColor: isSent ? colors.primaryLight : colors.card,
          flexShrink: 1
        }}
      >
        <Text>{content}</Text>
      </View>
    </View>
  )
}
