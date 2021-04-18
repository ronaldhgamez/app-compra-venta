import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/components/Login';
import Register from './app/components/Register';
import RegistroProducto from './app/components/RegistroProducto';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Ventana login' }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: 'Ventana registro' }}
        />
        <Stack.Screen
          name="RegistroProducto"
          component={RegistroProducto}
          options={{ title: 'Ventana registro producto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
