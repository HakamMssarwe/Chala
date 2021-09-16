import { createStackNavigator } from '@react-navigation/stack';
import { LOGIN } from '../constants/routeNames';
import Login from '../screens/Login';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={LOGIN}>
      <Stack.Screen name={LOGIN} component={Login} />
    </Stack.Navigator>
  );
}