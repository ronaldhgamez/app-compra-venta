import fetch from 'node-fetch'
import Constants from "expo-constants";

const { manifest } = Constants;
const baseURL = `http://${manifest.debuggerHost.split(':').shift()}:4000`


const addProduct = async (user, description, price, img_urls) => {

    const url = `${baseURL}/api/addProduct`;
    const body = { "user": user, "description": description, "price": price, "images": img_urls };

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
        console.log(error);
        return false;
    }
}

const getUserProducts = async (user) => {

    const url = `${baseURL}/api/getUserProducts`;
    const body = { "user": user };

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
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export {
    addProduct,
    getUserProducts
}