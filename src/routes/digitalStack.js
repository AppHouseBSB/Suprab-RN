import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DigitalMain from './../pages/Digital/Main';

const Stack = createStackNavigator();
export default function Login() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="DigitalMain" component={DigitalMain} />
    </Stack.Navigator>
  );
}
