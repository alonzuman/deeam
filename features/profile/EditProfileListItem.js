import { useNavigation } from '@react-navigation/native'
import React from 'react'
import ListItem from '../../components/ListItem'
import { PROFILE_FIELDS } from '../../utils/schemas'
import { useProfile } from './profileSlice'

export default function EditProfileListItem({ field, isLast, category }) {
  const { profile } = useProfile()
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('Form Field', {
      title: PROFILE_FIELDS[category][field]?.title,
      defaultValue: profile[field],
      options: PROFILE_FIELDS[category][field]?.options,
      config: PROFILE_FIELDS[category][field]?.config,
      field
    })
  }

  return (
    <ListItem
      title={PROFILE_FIELDS[category][field]?.title}
      subtitle={profile[field]}
      onPress={handlePress}
      isLast={isLast}
    />
  )
}
