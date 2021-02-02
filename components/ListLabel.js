import React from 'react'
import { capitalizeFirstLetter } from '../utils/functions'
import Text from './Text'

export default function ListLabel({ title }) {
  return (
    <Text style={{ marginBottom: 12, marginTop: 12, marginLeft: 16 }} color='secondary'>
      {capitalizeFirstLetter(title)}
    </Text>
  )
}
