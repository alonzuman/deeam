import React from 'react'
import { View } from 'react-native'
import Avatar from '../../components/Avatar'
import Heading from '../../components/Heading'

export default function ChatHeader({ title, photoURL }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Avatar style={{ marginRight: 8 }} uri={photoURL} size='sm' />
      <Heading variant='h4'>{title}</Heading>
    </View>
  )
}
