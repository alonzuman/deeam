import React from 'react'
import { View, StyleSheet } from 'react-native'
import Heading from './Heading'

export default function Header({ title, subtitle, secondary, notSafe = false, style }) {
  return (
    <View style={{ ...styles.container, marginTop: notSafe ? 64 : 0, ...style }}>
      {!!title && <Heading>{title}</Heading>}
      {!!subtitle && <Heading variant='h4'>{subtitle}</Heading>}
      {secondary}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16
  }
})
