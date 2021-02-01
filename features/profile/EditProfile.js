import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, Text } from 'react-native'
import schemas from '../../utils/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import PrimaryButton from '../../components/PrimaryButton'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '../../components/TextField'
import { updateProfileAsync } from './profileSlice'

export default function EditProfile({ navigation }) {
  const { profile } = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const { handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schemas.updateProfile)
  })

  const onSubmit = (data) => {
    dispatch(updateProfileAsync({
      ...profile,
      ...data
    }))

    navigation.goBack()
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <Controller
        name='email'
        control={control}
        defaultValue={profile?.email}
        render={({ value, onChange, onBlur }) => (
          <TextField
            disabled
            label='Email'
            error={errors?.email?.message}
            value={value}
            onChangeText={text => onChange(text)}
            onBlur={onBlur}
            placeholder='john@doe.com'
          />
        )}
      />
      <Controller
        name='displayName'
        control={control}
        defaultValue={profile?.displayName}
        render={({ value, onChange, onBlur }) => (
          <TextField
            label='Display Name'
            error={errors?.displayName?.message}
            value={value}
            onChangeText={text => onChange(text)}
            onBlur={onBlur}
            placeholder='John Dor'
          />
        )}
      />
      <Controller
        name='phoneNumber'
        control={control}
        defaultValue={profile?.phoneNumber}
        render={({ value, onChange, onBlur }) => (
          <TextField
            error={errors?.phoneNumber?.message}
            label='Display Name'
            value={value}
            onChangeText={text => onChange(text)}
            onBlur={onBlur}
            placeholder='+972-52-333-3333'
          />
        )}
      />
      <PrimaryButton style={{ marginTop: 16 }} title='Update' onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  )
}
