import { current } from '@reduxjs/toolkit';
import React, { useEffect, useLayoutEffect } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../components/Avatar';
import DefaultButton from '../components/DefaultButton';
import Header from '../components/Header';
import Heading from '../components/Heading';
import ProfileImageHeroSection from '../features/profile/ProfileImageHeroSection';
import { useProfile } from '../features/profile/profileSlice';
import ProfileBio from '../features/profiles/ProfileBio';
import ProfilePersonalInfo from '../features/profiles/ProfilePersonalInfo';
import { setCurrentProfileAsync } from '../features/profiles/profilesSlice';

export default function Profile({ route, navigation }) {
  const { uid, displayName } = route?.params;
  const { profiles: { currentProfile }, isFetching, isFetched } = useSelector(state => state.profiles)
  const { profile: myProfile } = useProfile()
  const dispatch = useDispatch()
  const isMe = uid === myProfile.uid;

  useEffect(() => {
    dispatch(setCurrentProfileAsync(uid))
  }, [uid, displayName])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DefaultButton title='Back' onPress={navigation.goBack} />,
      headerTitle: () => <Heading variant='h4'>{displayName}</Heading>,
      headerRight: () => <DefaultButton title={isMe ? 'Edit' : ''} onPress={() => isMe ? navigation.navigate('Edit Profile') : null} />
    })
  }, [navigation])

  return (
    <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
      <Header title={currentProfile?.displayName} />
      <ProfileImageHeroSection uri={currentProfile?.photoURL} title='Me!' style={{ marginBottom: 16 }} />
      <ProfilePersonalInfo profile={currentProfile} />
      <ProfileBio bio={currentProfile?.bio} />
      <View style={{ height: 155 }} />
    </ScrollView>
  )
}
