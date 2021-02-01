import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import Chats from '../screens/Chats';
import Feed from '../screens/Feed';
import Chat from '../features/matches/Chat';
import MyProfile from '../screens/MyProfile';
import ChatHeader from '../features/matches/ChatHeader';
import { AntDesign, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import Profile from '../screens/Profile';
import AddProfileSection from '../features/profile/AddProfileSection';
import EditProfile from '../features/profile/EditProfile';

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
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={Tabs} />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: <ChatHeader photoURL={route?.params?.photoURL} title={route?.params?.title} />,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            marginLeft: 8
          },
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: route.params.displayName,
          // headerTitle: 'route?.params?.displayName',
          headerBackTitle: 'Back',
        })}
      />
      <Stack.Screen
        name="Add Profile Section"
        component={AddProfileSection}
        options={({navigation, route}) => ({
          headerShown: true,
          headerBackTitle: 'Cancel'
        })}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={({navigation, route}) => ({
          headerShown: true,
          headerBackTitle: 'Cancel'
        })}
      />
    </Stack.Navigator>
  )
}
