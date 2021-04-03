import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import NotificationMain from './../pages/Notification/Main';

const Stack = createStackNavigator();
export default function Login() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="NotificationMain" component={NotificationMain} />
    </Stack.Navigator>
  );
}
