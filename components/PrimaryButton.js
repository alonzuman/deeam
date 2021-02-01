import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function PrimaryButton({ title, onPress, style }) {
  const theme = useTheme()

  return (
    <TouchableOpacity
      activeOpacity={.8}
      onPress={onPress}
      style={{ ...styles.root, backgroundColor: theme.colors.primary, ...style }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderRadius: 12
  },

  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff'
  }
})
