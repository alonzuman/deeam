import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { auth } from '../firebase';
import { clearProfile, setProfile } from '../features/profile/profileSlice';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import { BottomTabNavigator } from './BottomTabNavigator';
import { extractUserDetails } from '../utils/functions';

const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();

const Splash = () => <SafeAreaView><Text>Splash</Text></SafeAreaView>

export default function Navigation() {
  const { isFetching, profile } = useSelector(state => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setProfile(extractUserDetails(user)))
      } else {
        dispatch(clearProfile())
      }
    })

    return () => subscriber;
  }, [])

  if (isFetching) return <Splash />
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
