import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'

export default function Container({ style, children }) {
  return (
    <>
      <StatusBar translucent barStyle='default' backgroundColor='transparent' />
      <SafeAreaView style={{ ...styles.root, ...style }}>
        {children}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
