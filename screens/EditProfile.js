import React, { useLayoutEffect } from 'react'
import DefaultButton from '../components/DefaultButton'
import { ScrollView } from 'react-native-gesture-handler'
import ListLabel from '../components/ListLabel'
import { SafeAreaView, View } from 'react-native'
import { PROFILE_FIELDS } from '../utils/schemas'
import EditProfileListItem from '../features/profile/EditProfileListItem'

export default function EditProfile({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <DefaultButton title='Done' onPress={() => navigation.goBack()} />,
      headerLeft: () => <DefaultButton title='Cancel' onPress={() => navigation.goBack()} />
    })
  }, [navigation])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {Object.keys(PROFILE_FIELDS)?.map((category) => {
          if (category !== 'answers') {
            return (
            <View key={category}>
              <ListLabel title={category} />
              {Object.keys(PROFILE_FIELDS[category])?.map((field, fieldIndex) => (
                <EditProfileListItem
                  key={field}
                  category={category}
                  field={field}
                  isLast={fieldIndex === Object.keys(PROFILE_FIELDS[category])?.length - 1}
                />
              ))}
            </View>
          )}
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

