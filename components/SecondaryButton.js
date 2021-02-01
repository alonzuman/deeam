import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function SecondaryButton({ title, onPress, style }) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={.8}
      onPress={onPress}
      style={{ ...styles.root, borderColor: theme.colors.border, borderWidth: 1, ...style }}
    >
      <Text style={{ ...styles.text, color: theme.colors.primary }}>{title}</Text>
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
    color: 'lightblue'
  }
})
