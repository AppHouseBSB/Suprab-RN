import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PerfilMain from './../pages/Perfil/Main';

const Stack = createStackNavigator();
export default function Login() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="PerfilMain" component={PerfilMain} />
    </Stack.Navigator>
  );
}
