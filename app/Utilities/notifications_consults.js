import fetch from 'node-fetch'

const baseURL = "https://compra-venta-backend-nodejs.herokuapp.com";

const sendNotificationToUser = async (user, client, id_product, amount) => {

    const url = `${baseURL}/api/sendNotificationToUser`;
    const body = { "user": user, "client": client, "id_product": id_product, "amount": amount };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let json = await response.json();
    return json.sended;
}

const getUserNotifications = async (user) => {

    const url = `${baseURL}/api/getUserNotifications`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "user": user })
    });
    return await response.json();
}
const deleteNotification = async (id) => {

    const url = `${baseURL}/api/deleteNotification`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": id })
    });
    const json = await response.json();
    return json.deleted;
}

export {
    sendNotificationToUser,
    getUserNotifications,
    deleteNotification
}