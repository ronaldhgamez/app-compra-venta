import fetch from 'node-fetch'
import Constants from "expo-constants";

const { manifest } = Constants;
const baseURL = `http://${manifest.debuggerHost.split(':').shift()}:4000`


const addUser = async (name, lastname, tel, exactAddress, biography, user, pass) => {
    const url = baseURL + '/api/addUser';
    const body = {
        "name": name,
        "lastname": lastname,
        "tel": tel,
        "exactAddress": exactAddress, 
        "biography": biography,
        "user": user,
        "pass": pass
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
        console.log(error);
        return false;
    }
}

const validateUser = async (user, pass) => {
    const url = baseURL + '/api/validateUser';
    const body = { user: user, pass: pass };
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
        return json.valid;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getUserCollections = async (user) => {
    const url = baseURL + '/api/getUserCollections';
    const body = { user: user };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
        return {};
    }
}

export {
    addUser,
    validateUser,
    getUserCollections
}