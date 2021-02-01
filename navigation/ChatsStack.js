import React from 'react'
import Chats from '../screens/Chats';
import Chat from '../features/chats/Chat';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatHeader from '../features/chats/ChatHeader';

const ChatsStackNavigator = createBottomTabNavigator();

const ChatsStack = () => (
  <ChatsStackNavigator.Navigator screenOptions={{ headerShown: false }}>
    <ChatsStackNavigator.Screen name="Chats" component={Chats} />
    <ChatsStackNavigator.Screen
      options={({ route }) => ({
        headerShown: true,
        headerTitle: <ChatHeader photoURL={route?.params?.photoURL} title={route?.params?.title} />,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          marginLeft: 8
        },
      })}
      name="Chat"
      component={Chat}
    />
  </ChatsStackNavigator.Navigator>
)

export default ChatsStack
