import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {colors} from './../styles';

import PerfilStack from './perfilStack';
import DigitalStack from './digitalStack';
import ConfiguracaoStack from './configuracaoStack';
import NotificacaoStack from './notificacaoStack';

// function Page() {
//   return <View />;
// }

const Tab = createBottomTabNavigator();
function App() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.AZUL_SUPRAB,
        style: {
          backgroundColor: '#FFF',
          borderTopWidth: 0,
          shadowColor: colors.BLACK,
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        },
      }}>
      <Tab.Screen
        name="Estimate"
        options={{
          title: 'SUPRAB Card',
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home-outline"
              color={focused ? colors.AZUL_SUPRAB : colors.GREY}
              size={25}
            />
          ),
        }}
        component={DigitalStack}
      />
      <Tab.Screen
        name="Offers"
        options={{
          title: 'Perfil',
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="profile"
              color={focused ? colors.AZUL_SUPRAB : colors.GREY}
              size={25}
            />
          ),
        }}
        component={PerfilStack}
      />
      <Tab.Screen
        name="Messages"
        options={{
          title: 'Notificaçãoas',
          tabBarIcon: ({focused}) => (
            <Entypo
              name="info-with-circle"
              color={focused ? colors.AZUL_SUPRAB : colors.GREY}
              size={25}
            />
          ),
        }}
        component={NotificacaoStack}
      />
      <Tab.Screen
        name="Settings"
        options={{
          title: 'Soliicitação',
          tabBarIcon: ({focused}) => (
            <Entypo
              name="laptop"
              color={focused ? colors.AZUL_SUPRAB : colors.GREY}
              size={25}
            />
          ),
        }}
        component={ConfiguracaoStack}
      />
    </Tab.Navigator>
  );
}

export default App;
