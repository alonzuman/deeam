import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, Text } from 'react-native'
import Container from '../../components/Container'
import schemas from '../../utils/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import PrimaryButton from '../../components/PrimaryButton'
import TextField from '../../components/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { addProfileSectionAsync } from '../../features/profile/profileSlice'

export default function AddProfileSection({ navigation }) {
  const type = 'textHero'
  const { profile } = useSelector(state => state.profile)
  const dispatch = useDispatch()

  const { handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schemas.profileSections[type])
  })

  const onSubmit = data => {
    const sectionData = {
      type: data.type,
      before: null,
      data: {
        ...data
      }
    }

    dispatch(addProfileSectionAsync(profile.uid, sectionData))
    navigation.goBack()
  }

  console.log(errors)

  return (
    <Container>
      <View style={{ paddingHorizontal: 16 }}>
        <Controller
          name='type'
          defaultValue='textHero'
          control={control}
          render={({ onChange, value, onBlur }) => (
            <TextField
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <Controller
          name='title'
          defaultValue=''
          control={control}
          render={({ onChange, value, onBlur }) => (
            <TextField
              error={errors?.title?.message}
              label='Question'
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <Controller
          name='body'
          defaultValue=''
          control={control}
          render={({ onChange, value, onBlur }) => (
            <TextField
              error={errors?.body?.message}
              label='Your Answer...'
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <PrimaryButton style={{ marginTop: 16 }} onPress={handleSubmit(onSubmit)} title='Save' />
      </View>
    </Container>
  )
}
