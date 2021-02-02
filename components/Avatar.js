import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Avatar({ uri, size = 'md', style, onPress }) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity activeOpacity={.8} onPress={onPress}>
      <Image
        source={uri ? { uri } : require('../assets/avatar-placeholder.png')}
        style={{ ...styles.root, ...styles[size], borderColor: !uri ? colors.border : 'transparent', borderWidth: 1, ...style }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
  },

  xs: {
    height: 32,
    width: 32,
    borderRadius: 14
  },

  sm: {
    height: 40,
    width: 40,
    borderRadius: 18
  },

  md: {
    height: 48,
    width: 48,
    borderRadius: 16
  },

  lg: {
    height: 64,
    width: 64,
    borderRadius: 24
  },

  xl: {
    height: 96,
    width: 96,
    borderRadius: 40
  },

  xxl: {
    height: 112,
    width: 112,
    borderRadius: 48
  }
})
