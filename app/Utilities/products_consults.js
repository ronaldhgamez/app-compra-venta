import fetch from 'node-fetch'

const baseURL = "https://compra-venta-backend-nodejs.herokuapp.com";

const addProduct = async (user, product_name, description, price, img_urls) => {

    const url = `${baseURL}/api/addProduct`;
    const body = { "user": user, "product_name": product_name, "description": description, "price": price, "images": img_urls };

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
        return json;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const getAllProducts = async (user) => {

    const url = `${baseURL}/api/getAllProducts`;
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
        let json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const getProductCollection = async (id) => {

    const url = `${baseURL}/api/getProductCollection`;
    const body = { "id": id };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return await response.json();
}

const deleteProduct = async (id) => {

    const url = `${baseURL}/api/deleteProduct`;
    const body = { "id": id };

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let json = await response.json();
        return json.deleted;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export {
    addProduct,
    getUserProducts,
    getAllProducts,
    deleteProduct,
    getProductCollection
}