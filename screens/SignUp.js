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
import { extractUserDetails } from '../utils/functions'

export default function SignUp({ navigation }) {
  const dispatch = useDispatch()
  const { handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schemas.signUp)
  })

  const onSubmit = data => {
    auth.createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        const user = res.user;
        dispatch(setProfileAsync(extractUserDetails(user)))
      })
      .catch(err => console.log(err.message))
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
              label='Email'
              keyboardType='email-address'
              error={errors?.email?.message}
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
              secureTextEntry
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              placeholder='Password'
            />
          )}
        />
        <Controller
          control={control}
          name='confirmPassword'
          defaultValue=''
          render={({ value, onChange, onBlur }) => (
            <TextField
              secureTextEntry
              error={errors?.confirmPassword?.message}
              label='Confirm Password'
              value={value}
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              placeholder='Password'
            />
          )}
        />
        <PrimaryButton style={{ marginTop: 16 }} onPress={handleSubmit(onSubmit)} title='Sign Up' />
        <SecondaryButton style={{ marginTop: 16 }} onPress={() => navigation.navigate('Sign In')} title='Sign In' />
      </View>
    </SafeAreaView>
  )
}
