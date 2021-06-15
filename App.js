import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/components/Login';
import AddUser from './app/components/AddUser';
import AddProduct from './app/components/AddProduct';
import Principal from './app/components/Principal';
import BuyProduct  from './app/components/BuyProduct';

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
          name="AddUser"
          component={AddUser}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
        />
        <Stack.Screen
          name="BuyProduct"
          component={BuyProduct}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
