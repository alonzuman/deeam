import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Navigation from './navigation/Navigation'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={{
        dark: false,
        colors: {
          primary: '#5039cd',
          background: '#f7f7f7',
          notification: '',
          card: '#fff',
          border: '#ebebeb',
          text: '#414048'
        }
      }}>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}
