import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AppNavContainer from './src/navigation';
import { store } from './src/redux/store';
import {NativeBaseProvider} from 'native-base'
export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
     <AppNavContainer></AppNavContainer>
      </NativeBaseProvider>
    </Provider>
  )
}
