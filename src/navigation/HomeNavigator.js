import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HOME, UPDATE_PASSWORD } from '../constants/routeNames';
import Home from '../screens/Home';
import UpdatePassword from '../screens/ForgotPassword/UpdatePassword';



const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={HOME}>
      <Stack.Screen name={HOME} component={Home} />
    </Stack.Navigator>
  );
}
