import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import AuthNavigator from './AuthNavigator';

export default function AppNavContainer() {
 
   const isLoggedIn = false;
 
    return <NavigationContainer>{isLoggedIn? null : <AuthNavigator/>}</NavigationContainer>
}
