import React from 'react'
import { SafeAreaView } from 'react-native'
import Heading from '../components/Heading'

export default function Splash() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Heading variant='h3'>Loading...</Heading>
    </SafeAreaView>
  )
}
