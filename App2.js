import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/components/Login';
import Register from './app/components/Register';
import RegistroProducto from './app/components/RegistroProducto';
import Principal from './app/components/Principal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Principal"
          component={Principal}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />
        <Stack.Screen
          name="RegistroProducto"
          component={RegistroProducto}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
