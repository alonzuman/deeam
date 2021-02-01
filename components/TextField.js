import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Text from './Text'

export default function TextField({ label, placeholder, error, helperText, disabled, value, onChangeText, onBlur }) {
  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={{ ...styles.input, opacity: disabled ? .5 : 1 }}
        placeholder={placeholder}
        value={value}
        onChangeText={disabled ? () => null : onChangeText}
        onBlur={onBlur}
      />
      {!!error && <Text>{error}</Text>}
      {!!helperText && <Text>{helperText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },

  label: {
    marginBottom: 8
  },

  input: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8
  }
})
