import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import Avatar from '../components/Avatar'
import Header from '../components/Header'
import Heading from '../components/Heading'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import { auth } from '../firebase'

export default function Profile({ navigation }) {
  const { profile } = useSelector(state => state.profile);

  const signOut = () => {
    auth.signOut()
  }

  const viewProfile = () => {
    navigation.navigate('Profile', {
      uid: profile.uid,
      displayName: profile.displayName
    })
  }

  const editProfile = () => {
    navigation.navigate('Edit Profile')
  }

  return (
    <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
      <Header
        notSafe
        title={`Hi ${profile?.displayName?.split(' ')[0]} 👋`}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Avatar uri={profile?.photoURL} size='xxl' onPress={viewProfile} />
        <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 16 }}>
          <SecondaryButton style={{ width: 136, marginRight: 4 }} title='Sign Out' onPress={signOut} />
          <PrimaryButton style={{ width: 136, marginLeft: 4 }} title='Edit Profile' onPress={editProfile} />
        </View>
      </View>
      <Heading style={{ marginTop: 24 }} variant='h2'>Settings ⚙️</Heading>

    </ScrollView>
  )
}
