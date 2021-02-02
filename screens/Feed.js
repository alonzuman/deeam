import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import ChatListItem from '../features/chats/ChatListItem'
import { setProfilesAsync } from '../features/profiles/profilesSlice'
import { auth } from '../firebase'

export default function Feed({ navigation }) {
  const dispatch = useDispatch()
  const { profiles: { all } } = useSelector(state => state.profiles)

  useEffect(() => {
    dispatch(setProfilesAsync())
  }, [])

  return (
    <ScrollView>
      <Header style={{ paddingHorizontal: 16 }}  notSafe title='Feed' />
      {all
        ?.filter(user => user.uid !== auth.currentUser.uid)
        ?.map(({ uid, photoURL, displayName }) => (
          <ChatListItem
            userId={uid}
            photoURL={photoURL}
            displayName={displayName}
          />
        ))}
    </ScrollView>
  )
}
