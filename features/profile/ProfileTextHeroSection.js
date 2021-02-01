import React from 'react'
import { Text } from 'react-native'
import Card from '../../components/Card'
import Heading from '../../components/Heading'

export default function ProfileTextHeroSection({title, body}) {
  return (
    <Card style={{ marginTop: 16 }}>
      <Heading variant='h5'>{title}</Heading>
      <Heading variant='h2'>{body}</Heading>
    </Card>
  )
}
