import React from 'react'
import { View } from 'react-native'
import Icons from '../../components/Icons'
import Text from '../../components/Text'

export default function PersonalInfoItem({ field, value }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icons icon={field} />
      <Text style={{ marginLeft: 4 }}>{value}</Text>
    </View>
  )
}
