import React from 'react'
import { Text, SafeAreaView, Button, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import schemas from '../utils/schemas'
import TextField from '../components/TextField'
import PrimaryButton from '../components/PrimaryButton'
import { auth } from '../firebase'
import { setProfileAsync } from '../features/profile/profileSlice'
import { useDispatch } from 'react-redux'
import SecondaryButton from '../components/SecondaryButton'

export default function SignIn({ navigation }) {
  const dispatch = useDispatch()
  const { handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schemas.signIn)
  })

  const onSubmit = data => {
    auth.signInWithEmailAndPassword(data.email, data.password)
      .then(res => {
        const user = res.user;
        dispatch(setProfileAsync({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber
        }))
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Controller
          control={control}
          name='email'
          defaultValue=''
          render={({ value, onChange, onBlur }) => (
            <TextField
              error={errors?.email?.message}
              label='Email'
              value={value}
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              placeholder='Email'
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          defaultValue=''
          render={({ value, onChange, onBlur }) => (
            <TextField
              error={errors?.password?.message}
              label='Password'
              value={value}
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              placeholder='Password'
            />
          )}
        />
        <PrimaryButton style={{ marginTop: 16 }} onPress={handleSubmit(onSubmit)} title='Sign In' />
        <SecondaryButton style={{ marginTop: 16 }} onPress={() => navigation.navigate('Sign Up')} title='Sign Up' />
      </View>
    </SafeAreaView>
  )
}
