import React from 'react'
import Card from '../../components/Card'
import Heading from '../../components/Heading';

export default function ProfileBio({ bio }) {
  if (!bio) return null;

  return (
    <Card style={{ marginTop: 16 }}>
      <Heading style={{ marginBottom: 8 }} variant='h5'>About me</Heading>
      <Heading variant='h3'>{bio}</Heading>
    </Card>
  )
}
