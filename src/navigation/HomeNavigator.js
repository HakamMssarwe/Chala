import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ACCOUNT, ADD_EVENT, ADD_ROUTINE, ADD_TASK, EDIT_PROFILE, EVENTS, HOME, ROUTINES, SCHEDULE, TASKS, UPDATE_EVENT, UPDATE_PASSWORD_SETTINGS_SCREEN, UPDATE_ROUTINE, UPDATE_TASK } from '../constants/routeNames';
import Home from '../screens/Home';
import { View,Text } from 'native-base';
import Routines from '../screens/Routines';
import Events from '../screens/Events';
import Tasks from '../screens/Tasks';
import AddTask from '../screens/Tasks/AddTask';
import UpdateTask from '../screens/Tasks/UpdateTask';
import AddEvent from '../screens/Events/AddEvent';
import UpdateEvent from '../screens/Events/UpdateEvent';
import AddRoutine from '../screens/Routines/AddRoutine';
import UpdateRoutine from '../screens/Routines/UpdateRoutine';
import Account from '../screens/Account';
import UpdatePasswordSettingsScreen from '../screens/Account/UpdatePassword';
import EditProfile from '../screens/Account/EditProfile';
import Schedule from '../screens/Schedule';





const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={HOME}>
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen name={SCHEDULE} component={Schedule} />
      <Stack.Screen name={ROUTINES} component={Routines} />
      <Stack.Screen name={EVENTS} component={Events} />
      <Stack.Screen name={TASKS} component={Tasks} />
      <Stack.Screen name={ACCOUNT} component={Account} />
      <Stack.Screen name={ADD_TASK} component={AddTask} />
      <Stack.Screen name={UPDATE_TASK} component={UpdateTask} />
      <Stack.Screen name={ADD_EVENT} component={AddEvent} />
      <Stack.Screen name={UPDATE_EVENT} component={UpdateEvent} />
      <Stack.Screen name={ADD_ROUTINE} component={AddRoutine} />
      <Stack.Screen name={UPDATE_ROUTINE} component={UpdateRoutine} />
      <Stack.Screen name={UPDATE_PASSWORD_SETTINGS_SCREEN} component={UpdatePasswordSettingsScreen} />
      <Stack.Screen name={EDIT_PROFILE} component={EditProfile} />

    </Stack.Navigator>
  );
}


