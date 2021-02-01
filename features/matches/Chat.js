import React, { useEffect } from 'react'
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container'
import TextField from '../../components/TextField';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { setMatchMessagesAsync } from './matchesSlice';

export default function Chat({ navigation, route }) {
  const { chatId } = route?.params;
  const { profile } = useSelector(state => state.profile)
  const { matches } = useSelector(state => state.matches)
  const match = matches?.find(m => m.id === chatId)
  const sender = match?.membersData?.find(m => m.uid !== profile.uid);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMatchMessagesAsync(chatId))
  }, [])

  return (
    <Container>
      <ScrollView>
        {match?.messages?.map(({ id, content, createdAt }) => {
          return (
            <ChatMessage
              key={id}
              content={content}
              received={sender?.uid !== profile?.uid}
              photoURL={sender?.photoURL}
              createdAt={createdAt}
            />
          )
        })}
      </ScrollView>
      <ChatInput chatId={chatId} receiver={sender.uid} />
    </Container>
  )
}
