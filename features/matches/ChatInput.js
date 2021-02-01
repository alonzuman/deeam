import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector } from 'react-redux';
import TextField from '../../components/TextField'
import { db } from '../../firebase';

export default function ChatInput({ chatId, receiver }) {
  const { profile } = useSelector(state => state.profile)
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    db.collection('matches').doc(chatId).collection('messages').add({
      content: message,
      from: profile.uid,
      to: receiver,
      createdAt: Date.now()
    })
  }

  return (
    <View>
      <Text>{JSON.stringify(message, null, 2)}</Text>
      <TextField
        value={message}
        onChangeText={text => setMessage(text)}
      />
      <Button title='Send' onPress={handleSubmit} />
    </View>
  )
}
