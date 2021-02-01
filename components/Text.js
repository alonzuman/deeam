import React from 'react'
import { StyleSheet, Text as NativeText, View } from 'react-native'

export default function Text({ children, color, numberOfLines, ...rest }) {
  return (
    <NativeText
      style={{ ...styles.root, ...styles[color] }}
      numberOfLines={numberOfLines}
      ellipsizeMode='tail'
      {...rest}
      >
      {children}
    </NativeText>
  )
}

const styles = StyleSheet.create({
  root: {
    fontSize: 18,
    fontWeight: "200"
  },

  secondary: {
    color: '#323232'
  }
})
