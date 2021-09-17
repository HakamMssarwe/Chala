import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AUTH } from '../constants/routeNames';
import Auth from '../screens/Auth';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={AUTH}>
      <Stack.Screen name={AUTH} component={Auth} />
    </Stack.Navigator>
  );
}