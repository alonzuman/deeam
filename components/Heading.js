import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Heading({ variant = 'h1', children, style }) {

  return (
    <Text style={{ ...styles[variant], ...style }}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: 'bold'
  },

  h2: {
    fontSize: 32,
    fontWeight: 'bold'
  },

  h3: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  h4: {
    fontSize: 18,
    fontWeight: '500'
  },

  h5: {
    fontSize: 16,
    fontWeight: '300'
  }
})
