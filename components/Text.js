import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text as NativeText, View } from 'react-native'

export default function Text({ children, color, numberOfLines, style, ellipsizeMode = 'tail', ...rest }) {
  const { colors } = useTheme()

  return (
    <NativeText
      style={{ ...styles.root, color: colors.text, ...styles[color], ...style }}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...rest}
    >
      {children}
    </NativeText>
  )
}

const styles = StyleSheet.create({
  root: {
    fontSize: 16,
    fontWeight: "400"
  },

  secondary: {
    color: '#323232'
  }
})
