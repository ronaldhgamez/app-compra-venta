import { styleSheets } from 'min-document';
import React from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon, Avatar } from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts';

import { getUserNotifications, deleteNotification } from '../Utilities/notifications_consults'
import { getProductCollection } from '../Utilities/products_consults'
import { getUserCollections } from '../Utilities/users_consults'

export default class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.object.user,
            notifications: [],
            indexToDelete: null,
            alert: false,
            isLoading: true,
        }
    }

    async componentDidMount() {
        const notifications = await getUserNotifications(this.state.user);


        for await (let object of notifications) {
            const produc_data = await getProductCollection(object.id_product);
            const client_data = await getUserCollections(object.client);

            object.produc_data = produc_data; // "description", "price", "product_name"
            object.client_data = client_data; // "exactAddress", "img", "lastname", "name", "tel"
        }

        this.setState({ notifications, isLoading: false });
    }

    _renderItem = ({ item, index }) => {
        let { product_card, product_image, tel } = styles;
        let client = item.client_data;
        let product = item.produc_data;
        return (
            <TouchableOpacity key={item.id} style={product_card}>

                <View style={{ flexDirection: 'row' }}>
                    <Avatar rounded key={index.toString()} style={product_image} source={{ uri: item.produc_data.images[0] }} />
                    <View style={{ flexDirection: 'column', marginLeft: '4%', marginTop: '8%' }}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{client.name + ' ' + client.lastname + " quiere este producto!"}</Text>
                        <Text style={{ fontSize: 11, fontStyle: 'italic' }}>{'\"' + product.product_name + '\"'}</Text>
                        <Text style={{ fontSize: 11, color: 'limegreen' }}>{'cantidad: ' + item.amount}</Text>

                        <Text style={{ fontSize: 11, textDecorationLine: 'underline', marginTop: '4%' }}>{"Contáctate con él(ella):"}</Text>
                        <Text style={tel}>
                            <Icon size={16} name='telephone' type='foundation' color='rgba(45, 107, 224, 0.9)' />
                            {'\t' + client.tel}
                        </Text>

                        <View style={{ marginLeft: '55%', marginTop: '-15%' }}>
                            <Icon raised size={22} name='trash' type='font-awesome' onPress={() => { this.setState({ indexToDelete: index, alert: true }) }} />
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }

    deleteNotificationAux = async () => {
        var id = this.state.notifications[this.state.indexToDelete].id;
        const deleted = await deleteNotification(id); /* delete from firebase */
        console.log(deleted);
        if (deleted) {
            const tempArray = this.state.notifications;
            tempArray.splice(this.state.indexToDelete, 1);
            this.setState({ notifications: tempArray, alert: false })
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ marginTop: '50%', flex: 1, alignContent: 'center' }}>
                    <ActivityIndicator size="large" color="deeppink" />
                </View>
            )
        } else {
            if (this.state.notifications.length == 0) {
                return (
                    <View style={{ marginTop: '50%', flex: 1, alignSelf: 'center' }}>
                        <Text style={{ fontSize: 24, color: 'dodgerblue', fontWeight: 'bold', margin: '2%' }}>Nada por acá!</Text>
                        <Icon name='md-notifications-off-circle-outline' type='ionicon' size={100}></Icon>
                    </View>
                )
            }
            let items = this.state.notifications;
            return (
                <>
                    <Text style={{ marginTop: '2%' }}></Text>

                    <FlatList
                        style={styles.products_container}
                        data={items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderItem}
                    />

                    <AwesomeAlert
                        show={this.state.alert}
                        title='¿Eliminar notificación?'
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={true}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="Cancelar"
                        confirmText="Eliminar"
                        confirmButtonColor="deeppink"
                        onCancelPressed={() => {
                            this.setState({ alert: false })
                        }}
                        onConfirmPressed={() => {
                            /* delete from firebase and locally */
                            this.deleteNotificationAux();
                        }}
                    />
                </>
            );
        }
    }
};

import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    products_container: {
        backgroundColor: 'white'
    },
    product_card: {
        alignSelf: 'center',
        marginVertical: '1%',
        width: '100%',
        backgroundColor: 'snow',
        borderColor: 'azure',
        elevation: 2,
    },
    product_image: {
        margin: '2%',
        width: '35%',
        height: 125,
        resizeMode: 'cover',
        elevation: 1,
        borderBottomWidth: 2
    },
    tel: {
        fontSize: 14,
        marginBottom: 5,
        color: 'deeppink',
        fontWeight: 'bold',
    }
});