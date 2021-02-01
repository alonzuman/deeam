import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Card from '../../components/Card';
import Heading from '../../components/Heading';

const URL = 'https://images.unsplash.com/photo-1611870922536-125679d19c69?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

export default function ProfileImageHeroSection({ title, uri }) {
  return (
    <Card style={styles.container} disableGutters>
      <View style={styles.header}>
        <Heading variant='h4'>{title}</Heading>
      </View>
      <Image style={styles.image} source={{ uri: URL }} />
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },

  header: {
    padding: 16
  },

  image: {
    height: 512,
    width: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  }
})
