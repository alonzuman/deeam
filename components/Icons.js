import React from 'react'
import { View, Text } from 'react-native'
import { Fontisto, Entypo, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

export default function Icons({ icon }) {
  const { colors } = useTheme()

  const ICONS = {
    marijuana: <Text>Marijuana</Text>,
    drugs: <Text>Drugs</Text>,
    drink: <Entypo name="drink" size={24} color={colors.text} />,
    music: <Ionicons name="musical-note-sharp" size={24} color={colors.text} />,
    gender: <Fontisto name='genderless' size={24} color={colors.text} />
  }

  return ICONS[icon] || null
}
