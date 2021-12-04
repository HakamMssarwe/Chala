import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ACCOUNT, EVENTS, HOME, ROUTINES, SCHEDULE, TASKS } from '../constants/routeNames';
import Home from '../screens/Home';
import { View,Text } from 'native-base';
import Routines from '../screens/Routines';
import Events from '../screens/Events';
import Tasks from '../screens/Tasks';




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
    </Stack.Navigator>
  );
}



const Schedule = () => {
  return <View>
    <Text>Schedule</Text>
  </View>
}


const Account = () => {
  return <View>
    <Text>Account</Text>
  </View>
}
