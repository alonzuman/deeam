import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Button, StyleSheet, TouchableOpacity } from 'react-native'
import Text from './Text'

export default function DefaultButton({ title, onPress, style, size = 'md' }) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity style={styles.root} onPress={onPress} >
      {!!title && <Text style={{ color: colors.primary, fontWeight: '500' }}>{title}</Text>}
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  root: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
})
