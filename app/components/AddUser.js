import 'react-native-gesture-handler';
import React, { useState } from 'react';

import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import style_app from '../Styles/app_styles';
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';

import { addUser } from '../Utilities/users_consults'

export default function Register({ navigation }) {
    const [name, setName] = useState("");
    const [lasname, setLasname] = useState("");
    const [tele, setTele] = useState("");
    const [exactAddress, setExactAddress] = useState("");
    const [biography, setBiography] = useState("");
    const [user, setUser] = useState("");
    const [pas, setPas] = useState("");
    const [spinner, setSpi] = useState(false);
    const [showAlert, setAlert] = useState(false);
    const [msj, setMsj] = useState('');
    const [back, setBack] = useState(false);

    const checkTextInput = async () => {
        if (!name.trim()) {
            setMsj('Por favor ingrese su nombre');
            setAlert(true)
            return;
        }
        if (!lasname.trim()) {
            setMsj('Por favor ingrese sus apellidos');
            setAlert(true)
            return;
        }
        if (!tele.trim()) {
            setMsj('Por favor ingrese su telefono');
            setAlert(true)
            return;
        }
        if (!exactAddress.trim()) {
            setMsj('Por favor ingrese su dirección exacta');
            setAlert(true)
            return;
        }
        if (!user.trim()) {
            setMsj('Por favor cree un nombre de usuario');
            setAlert(true)
            return;
        }
        if (!pas.trim()) {
            setMsj('Por favor cree una contraseña');
            setAlert(true);
            return;
        }

        setSpi(true)
        const inserted = await addUser(name, lasname, tele, exactAddress, biography, user, pas);
        setSpi(false)
        if (inserted) {
            setMsj('Usuario registrado');
            setBack(true)
        } else {
            setMsj("El nombre de usuario ya está en uso")
        }
        setAlert(true)
    };

    return (
        <View style={style.mainContainer}>
            <Text style={{ marginBottom: '10%' }}></Text>
            <Text style={style_app.texto}>Ingrese sus datos</Text>
            <TextInput
                placeholder="nombre"
                style={style_app.textInput}
                onChangeText={(val) => setName(val)}
            />

            <TextInput
                placeholder="apellidos"
                style={style_app.textInput}
                onChangeText={(val) => setLasname(val)}
            />

            <TextInput placeholder="teléfono" keyboardType='numeric'
                style={style_app.textInput}
                onChangeText={(val) => setTele(val)}
            />

            <TextInput placeholder="dirección exacta"
                style={style_app.textInput}
                onChangeText={(val) => setExactAddress(val)}
            />

            <TextInput placeholder='biografía'
                multiline
                style={style_app.biography}
                onChangeText={(val) => setBiography(val)}
            />

            <TextInput placeholder="nombre de usuario"
                style={style_app.textInput}
                onChangeText={(val) => setUser(val)}
            />

            <TextInput
                placeholder="contraseña"
                secureTextEntry={true}
                password={true}
                style={style_app.textInput}
                onChangeText={(val) => setPas(val)}
            />

            <TouchableOpacity
                style={style_app.button}
                onPress={checkTextInput}
            >
                <Text style={style_app.buttonText}>Registrarme</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={style_app.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={style_app.buttonText}>Volver</Text>
            </TouchableOpacity>

            <Spinner
                visible={spinner}
                textContent={'Validando datos de usuario...'}
                textStyle={{ color: '#FFF' }}
            />

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Aviso"
                message={msj}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor="deepskyblue"
                onConfirmPressed={() => {
                    setAlert(false)
                    if (back) {
                        navigation.navigate('Login');
                    }
                }}
                onDismiss={() => { // click fuera de la alerta
                    setAlert(false)
                    if (back) {
                        navigation.navigate('Login');
                    }
                }}
            />
        </View>
    )
}


import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})