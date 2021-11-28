import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AUTH, FIRST_TIME_LOGIN, LOGIN, SEND_CODE, SIGNUP, SIGNUP_CODE_SENT, SIGNUP_CODE_VERIFY, UPDATE_PASSWORD, VERIFY_CODE } from '../constants/routeNames';
import Auth from '../screens/Auth';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import SendCode from '../screens/ForgotPassword/SendCode';
import VerifyCode from '../screens/ForgotPassword/VerifyCode';
import UpdatePassword from '../screens/ForgotPassword/UpdatePassword';
import SignupCodeSent from '../screens/Signup/SignupCodeSent';
import SignupCodeVerify from '../screens/FirstTimeLogin/SignupCodeVerify';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={AUTH}>
      <Stack.Screen name={AUTH} component={Auth} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={SIGNUP} component={Signup} />
      <Stack.Screen name={SEND_CODE} component={SendCode} />
      <Stack.Screen name={VERIFY_CODE} component={VerifyCode} />
      <Stack.Screen name={UPDATE_PASSWORD} component={UpdatePassword} />
      <Stack.Screen name={SIGNUP_CODE_SENT} component={SignupCodeSent} />
      <Stack.Screen name={SIGNUP_CODE_VERIFY} component={SignupCodeVerify} />
      
    </Stack.Navigator>
  );
}