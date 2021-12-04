import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AppNavContainer from './src/navigation';
import { store } from './src/redux/store';
import {NativeBaseProvider} from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

AsyncStorage.removeItem("@chala");

  return (
    <Provider store={store}>
      <NativeBaseProvider>
     <AppNavContainer></AppNavContainer>
      </NativeBaseProvider>
    </Provider>
  )
}
