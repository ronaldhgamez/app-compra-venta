import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import 'react-native-gesture-handler';
import style from '../Styles/Login_styles';
import style_app from '../Styles/app_styles';
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';

import {
    validarUsuario
} from '../Utilities/consultas'

export default function Login({ navigation }) {

    const [user, setName] = useState("");
    const [pas, setPas] = useState("");
    const [spinner, setSpi] = useState(false);
    const [showAlert, setAlert] = useState(false);
    const [msj, setMsj] = useState('');

    const checkTextInput = async () => {
        //Check the TextInput
        if (!user.trim()) {
            setMsj('Debe ingresar un usuario y una contraseña')
            setAlert(true)
            return;
        }
        if (!pas.trim()) {
            setMsj('Por favor cree su contraseña');
            setAlert(true)
            return;
        }
        setSpi(true)
        const valido = await validarUsuario(user, pas);
        setSpi(false)
        if (valido) {
            navigation.navigate('RegistroProducto', { "usuario": user }) // envía el usuario
        } else {
            setMsj("El usuario o la contraseña es incorrecta")
            setAlert(true)
        }
    };

    return (
        <View style={style.mainContainer}>
            <Image
                style={style.imageCar}
                //source={require('../assets/carrito.png')}
                source={require('../assets/bag.jpg')}

            />
            <Text style={style.textoPrincipal}>Tienda Online de Productos</Text>

            <TextInput
                placeholder="usuario"
                style={style_app.textInput}
                onChangeText={(val) => setName(val)}
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
                <Text style={style_app.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={style_app.button}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={style_app.buttonText}>Registrarme</Text>
            </TouchableOpacity>

            <Spinner
                visible={spinner}
                textContent={'Validando usuario...'}
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
                confirmText="OK"
                confirmButtonColor="deepskyblue"
                onConfirmPressed={() => {setAlert(false)}}
            />
        </View>
    )
}