import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import Chats from '../screens/Chats';
import Feed from '../screens/Feed';
import MyProfile from '../screens/MyProfile';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import { useTheme } from '@react-navigation/native';
import DefaultButton from '../components/DefaultButton';
import { useProfile } from '../features/profile/profileSlice';
import FormField from '../screens/FormField';
import Chat from '../features/chats/Chat';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      safeAreaInsets: {
        bottom: 0,
      },
      style: {
        borderRadius: 16,
        marginBottom: 32,
        marginHorizontal: 16,
        alignItems: 'center',
        borderTopColor: 'transparent',
        padding: 0
      },
      tabStyle: {
        marginBottom: 0,
        paddingBottom: 0,
      },
    }}>
    <Tab.Screen
      name='Feed'
      component={Feed}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={24} color={color} />
      }}
    />
    <Tab.Screen
      name='Chats'
      component={Chats}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="chatbubble-outline" size={24} color={color} />
      }} />
    <Tab.Screen
      name='My Profile'
      component={MyProfile}
      options={{
        tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />
      }}
    />
  </Tab.Navigator>
)

export function BottomTabNavigator() {
  const {profile} = useProfile()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={Tabs} />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: route.params.displayName,
          headerBackTitle: 'Back',
        })}
      />
      <Stack.Screen
        name='Edit Profile'
        component={EditProfile}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: profile?.displayName,
          headerLeft: () => <DefaultButton onPress={navigation.goBack} title='Cancel' />,
        })}
      />
      <Stack.Screen
        name='Form Field'
        component={FormField}
        options={({ navigation, route }) => ({
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  )
}
