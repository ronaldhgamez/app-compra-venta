import fetch from 'node-fetch'
import { Alert } from 'react-native'
import Constants from "expo-constants";

const { manifest } = Constants;
const baseURL = `http://${manifest.debuggerHost.split(':').shift()}:4000`

/* Consultas de login */
const validarUsuario = async (user, pas) => {
    const url = baseURL + '/validarUsuario';
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

/* Consultas registro */
const insertarUsuario = async (name, lasname, tele, user, pas) => {
    const url = baseURL + '/insertarUsuario';
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

/* Consultas registro Producto */
const insertarProducto = async (usuario, descripcion, precio) => {
    const url = baseURL + '/insertarProducto';
    const body = {
        "usuario": usuario,
        "descripcion": descripcion,
        "precio": precio
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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

export {
    validarUsuario,
    insertarUsuario,
    insertarProducto
};