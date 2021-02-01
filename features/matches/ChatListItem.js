import React from 'react'
import { StyleSheet, View } from 'react-native'
import Avatar from '../../components/Avatar'
import Heading from '../../components/Heading'
import Text from '../../components/Text'
import { useNavigation, useTheme } from '@react-navigation/native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

export default function ChatListItem({ id, displayName, lastMessage, photoURL }) {
  const theme = useTheme();
  const { navigate } = useNavigation()

  const handlePress = () => {
    navigate('Chat', {
      chatId: id,
      title: displayName,
      photoURL
    })
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={{...styles.container, borderBottomColor: theme.colors.border, borderBottomWidth: 1}}>
        <View style={styles.avatar}>
          <Avatar uri={photoURL} size='md' />
        </View>
        <View style={styles.main}>
          <Heading variant='h4'>{displayName}</Heading>
          <Text numberOfLines={1} color='secondary'>{lastMessage}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16
  },

  avatar: {
    paddingRight: 8
  },

  main: {
    flex: 1,
    paddingLeft: 8,
  }
})
