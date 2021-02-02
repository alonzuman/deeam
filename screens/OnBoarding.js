import { yupResolver } from '@hookform/resolvers/yup'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PrimaryButton from '../components/PrimaryButton'
import TextField from '../components/TextField'
import { updateProfileAsync } from '../features/profile/profileSlice'
import schemas from '../utils/schemas'

export default function OnBoarding() {
  const theme = useTheme()
  const { profile } = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schemas.onBoarding)
  })

  const onSubmit = values => {
    const updatedProfile = {
      ...profile,
      ...values
    }

    dispatch(updateProfileAsync(updatedProfile))
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Controller
          name='displayName'
          defaultValue=''
          control={control}
          render={({ value, onChange, onBlur }) => (
            <TextField
              error={errors?.displayName?.message}
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              value={value}
              label='Full Name'
              placeholder='John Doe'
            />
          )}
        />
        <Controller
          name='phoneNumber'
          defaultValue=''
          control={control}
          render={({ value, onChange, onBlur }) => (
            <TextField
              error={errors?.phoneNumber?.message}
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              value={value}
              label='Phone Number'
              placeholder='+972526636363'
            />
          )}
        />
        <PrimaryButton style={{ marginTop: 16 }} onPress={handleSubmit(onSubmit)} title='Finish' />
      </View>
    </SafeAreaView>
  )
}
