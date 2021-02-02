import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import DefaultButton from '../components/DefaultButton'
import ListItem from '../components/ListItem'
import TextField from '../components/TextField'
import { updateProfileAsync } from '../features/profile/profileSlice'
import schemas from '../utils/schemas'

export default function FormField({ navigation, route }) {
  const dispatch = useDispatch()
  const { field = '', title = '', options = [], defaultValue = '', config = {} } = route.params
  const { handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schemas[field])
  })

  const onSubmit = (values) => {
    dispatch(updateProfileAsync(values))
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerLeft: () => <DefaultButton title='Back' onPress={navigation.goBack} />,
      headerRight: () => <DefaultButton title='Save' onPress={handleSubmit(onSubmit)} />
    })
  }, [navigation])

  const renderField = ({ value, onChange, onBlur }) => {
    if (options?.length > 0) {
      return options?.map(option => (
        <ListItem
          isSelected={value === option}
          title={option}
          onPress={() => onChange(option)}
          onBlur={onBlur}
          key={option}
        />
      ))
    } else {
      return (
        <TextField
          error={errors[field]?.message}
          value={value}
          onChangeText={text => onChange(text)}
          onBlur={onBlur}
          placeholder={title}
          style={{ marginTop: 0, marginHorizontal: 16 }}
          inputProps={{ minHeight: config?.multiline ? 96 : 0 }}
          {...config}
        />
      )
    }
  }

  return (
    <ScrollView style={{ paddingVertical: 16 }}>
      <Controller
        name={field}
        defaultValue={defaultValue}
        control={control}
        render={({ value, onChange, onBlur }) => renderField({ value, onChange, onBlur })}
      />
    </ScrollView>
  )
}
