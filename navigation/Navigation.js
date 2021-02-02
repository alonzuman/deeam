import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { auth } from '../firebase';
import { clearProfile, setProfileAsync } from '../features/profile/profileSlice';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import { BottomTabNavigator } from './BottomTabNavigator';
import { extractUserDetails } from '../utils/functions';
import Splash from '../screens/Splash';
import OnBoarding from '../screens/OnBoarding';
import { clearChats } from '../features/chats/chatsSlice'
import { clearProfiles } from '../features/profiles/profilesSlice'

const AuthStack = createStackNavigator();

export default function Navigation() {
  const { isFetching, profile } = useSelector(state => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setProfileAsync(extractUserDetails(user)))
      } else {
        dispatch(clearChats())
        dispatch(clearProfiles())
        dispatch(clearProfile())
      }
    })

    return () => subscriber;
  }, [])

  if (isFetching) return <Splash />
  if (profile && (!profile?.displayName || !profile?.phoneNumber)) return <OnBoarding />
  if (profile) {
    return <BottomTabNavigator />
  } else {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen options={{ headerShown: false }} name='Sign In' component={SignIn} />
        <AuthStack.Screen options={{ headerShown: false }} name='Sign Up' component={SignUp} />
      </AuthStack.Navigator>
    )
  }
}
