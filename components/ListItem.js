import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Heading from './Heading'
import Text from './Text'
import { Ionicons } from '@expo/vector-icons';

export default function ListItem({ onPress, title, subtitle, isSelected, isLast, avatar, secondary }) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity activeOpacity={.8} onPress={onPress}>
      <View style={{ flexDirection: 'row', paddingLeft: 16, backgroundColor: colors.card, minHeight: 56, alignItems: 'center', borderBottomColor: isLast ? 'transparent' : colors.border, borderBottomWidth: 1 }}>
        {avatar}
        <View style={{ flex: 1, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 12, alignItems: 'center' }}>
          <View style={{ justifyContent: 'center' }}>
            {!!title && <Heading variant='h4'>{title}</Heading>}
            {!!subtitle && <Text style={{ marginTop: 4 }} color='secondary'>{subtitle}</Text>}
          </View>
          {!!isSelected && <Ionicons name="checkmark" size={24} color={colors.primary} />}
          {!isSelected && secondary}
        </View>
      </View>
    </TouchableOpacity>
  )
}
