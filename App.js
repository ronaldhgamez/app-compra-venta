import React from 'react';
import { View } from 'react-native';
import RegistroProducto from './app/components/RegistroProducto';
import Registro from './app/components/RegistroProducto';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: '#fffafa', flex: 1, marginTop:25 }}>
        <RegistroProducto />
      </View>
    );
  }
};