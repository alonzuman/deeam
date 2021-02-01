import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Avatar({ uri, size = 'md', style, onPress }) {
  return (
    <TouchableOpacity activeOpacity={.8} onPress={onPress}>
      <Image
        source={{ uri }}
        style={{ ...styles.root, ...styles[size], ...style }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
  },

  sm: {
    height: 32,
    width: 32,
    borderRadius: 12
  },

  md: {
    height: 48,
    width: 48,
    borderRadius: 16
  },

  lg: {
    height: 64,
    width: 64
  },

  xl: {
    height: 96,
    width: 96
  },

  xxl: {
    height: 112,
    width: 112,
    borderRadius: 48
  }
})
