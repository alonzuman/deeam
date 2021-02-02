import { useNavigation } from '@react-navigation/native'
import React from 'react'
import Avatar from '../../components/Avatar'
import ListItem from '../../components/ListItem'
import Text from '../../components/Text'

export default function ChatListItem({ userId, photoURL, displayName, lastMessage, timeAgo, isLast = false }) {
  const { navigate } = useNavigation()

  const handlePress = () => {
    navigate('Chat', {
      displayName,
      photoURL,
      userId
    })
  }

  return (
    <ListItem
      isLast={isLast}
      onPress={handlePress}
      avatar={<Avatar uri={photoURL} size='sm' style={{ marginRight: 16 }} />}
      title={displayName}
      subtitle={lastMessage}
      secondary={(
        <Text style={{ alignSelf: 'flex-start' }} color='secondary'>{timeAgo}</Text>
      )}
    />
  )
}
