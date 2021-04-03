import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginPage from './../pages/Login/Main';

const Stack = createStackNavigator();
export default function Login() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LoginPage" component={LoginPage} />
    </Stack.Navigator>
  );
}
