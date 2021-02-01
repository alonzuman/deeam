import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Container from '../components/Container'
import Header from '../components/Header'

export default function Feed() {
  return (
    <ScrollView style={{ paddingHorizontal: 16 }}>
      <Header notSafe title='Feed' />
    </ScrollView>
  )
}
