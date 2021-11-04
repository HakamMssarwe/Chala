import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AUTH, LOGIN, SEND_CODE, SIGNUP, VERIFY_CODE } from '../constants/routeNames';
import Auth from '../screens/Auth';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import SendCode from '../screens/ForgotPassword/SendCode';
import VerifyCode from '../screens/ForgotPassword/VerifyCode';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={AUTH}>
      <Stack.Screen name={AUTH} component={Auth} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={SIGNUP} component={Signup} />
      <Stack.Screen name={SEND_CODE} component={SendCode} />
      <Stack.Screen name={VERIFY_CODE} component={VerifyCode} />
    </Stack.Navigator>
  );
}