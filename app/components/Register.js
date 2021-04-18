import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native'
import style from '../Styles/Register_styles'
import { TextInput } from 'react-native-gesture-handler';

import fetch from 'node-fetch'

export default function Register({ navigation }) {
    const [name, setName] = useState("");
    const [lasname, setLasname] = useState("");
    const [tele, setTele] = useState("");
    const [user, setUser] = useState("");
    const [pas, setPas] = useState("");

    const checkTextInput = async () => {
        //Check the TextInput
        if (!name.trim()) {
            alert('Porfavor Ingresar Nombre');
            return;
        }
        //Check the TextInput
        if (!lasname.trim()) {
            alert('Porfavor Ingresar Apellidos');
            return;
        }
        //Check the TextInput
        if (!tele.trim()) {
            alert('Porfavor Ingresar Telefono');
            return;
        }
        //Check the TextInput
        if (!user.trim()) {
            alert('Porfavor Ingresar Usuario');
            return;
        }
        //Check the TextInput
        if (!pas.trim()) {
            alert('Porfavor Ingresar Contraseña');
            return;
        }
        //Checked Successfully
        const inserted = await insertarUsuario();
        if (inserted) {
            Alert.alert('Usuario registrado');
            navigation.navigate('Login');
        } else {
            Alert.alert("El nombre de usuario ya está en uso")
        }
    };

    const insertarUsuario = async () => {
        const url = 'http://10.0.2.2:4000/insertarUsuario';
        const body = {
            "nombre": name,
            "apellidos": lasname,
            "numerotel": tele,
            "usuario": user,
            "contrasena": pas
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            let json = await response.json(); // json={ inserted: <true|false> }
            return json.inserted;
        } catch (error) {
            Alert.alert("A ocurrido un error inesperado");
        }
    }

    return (
        <View style={style.mainContainer}>
            <Text>Nombre</Text>
            <TextInput
                placeholder="ejm Maria"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, minHeight: '5%', minWidth: '50%' }}
                onChangeText={(val) => setName(val)}
            />

            <Text></Text>
            <Text>Apellido</Text>
            <TextInput
                placeholder="e.g. Díaz"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, minHeight: '5%', minWidth: '50%' }}
                onChangeText={(val) => setLasname(val)}
            />

            <Text></Text>
            <Text>Teléfono</Text>
            <TextInput placeholder="88550099" keyboardType='numeric'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, minHeight: '5%', minWidth: '50%' }}
                onChangeText={(val) => setTele(val)}
            />

            <Text></Text>
            <Text>Usuario</Text>
            <TextInput placeholder="dialicia"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, minHeight: '5%', minWidth: '50%' }}
                onChangeText={(val) => setUser(val)} />

            <Text></Text>
            <Text>Contraseña</Text>
            <TextInput
                placeholder="contraseña"
                secureTextEntry={true}
                password={true}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, minHeight: '5%', minWidth: '50%' }}
                onChangeText={(val) => setPas(val)} />

            <Text></Text>
            <Button
                title="Guardar"
                onPress={checkTextInput}
            />

        </View>
    )
}