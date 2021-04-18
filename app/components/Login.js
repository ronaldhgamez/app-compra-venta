import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Text, View, Button, TextInput, Alert } from 'react-native';
import style from '../Styles/Login_styles';

import fetch from 'node-fetch'

export default function Login({ navigation }) {

    const [user, setName] = useState("");
    const [pas, setPas] = useState("");

    const checkTextInput = async () => {
        //Check the TextInput
        if (!user.trim()) {
            Alert.alert('Porfavor Ingresar Usuario');
            return;
        }
        //Check the TextInput
        if (!pas.trim()) {
            Alert.alert('Porfavor Ingresar Contraseña');
            return;
        }
        //Checked Successfully
        //Do whatever you want
        const valido = await validarUsuario();
        if (valido) {
            navigation.navigate('RegistroProducto')
        } else {
            Alert.alert("El usuario o contraseña es incorrecto")
        }
    };

    const validarUsuario = async () => {
        const url = 'http://10.0.2.2:4000/validarUsuario';
        const body = { usuario: user, contrasena: pas };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            let json = await response.json(); // json={ valido: <true|false> }
            return json.valido;
        } catch (error) {
            Alert.alert("A ocurrido un error inesperado");
        }
    }

    return (
        <View style={style.mainContainer}>

            <Text>Usuario:</Text>

            <TextInput
                placeholder="usuario"
                style={style.textInput}
                onChangeText={(val) => setName(val)}
            />

            <Text></Text>

            <Text>Contraseña:</Text>

            <TextInput
                placeholder="contraseña"
                secureTextEntry={true}
                password={true}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, minHeight: '5%', minWidth: '50%' }}
                onChangeText={(val) => setPas(val)}
            />

            <Text></Text>

            <Button
                title="Iniciar Sesion"
                onPress={checkTextInput}
            />
            <Text></Text>

            <Button
                title="Registrarse"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    )
}