import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function Card({ children, onPress, style }) {
  return (
    <TouchableOpacity activeOpacity={.9} onPress={onPress}>
      <View style={{...styles.container, ...style}}>
        {children}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 16,
  }
})
