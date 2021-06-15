import React from 'react';

import { Text, FlatList, TouchableOpacity, View, ScrollView, TextInput, Button } from 'react-native';
import { Image, Icon, Avatar } from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from '../Styles/Menu_styles'
import { map } from 'lodash'

import { getUserCollections } from '../Utilities/users_consults'
import { sendNotificationToUser } from '../Utilities/notifications_consults'


export default class BuyProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.route.params.user,
            product_data: {
                id: '9R3XgHXYziB95dBfdPMz',
                images: [
                    "https://res.cloudinary.com/ap-proyecto/image/upload/v1623572715/g5lezrsiamvyu1rfxfrs.jpg",
                    "https://res.cloudinary.com/ap-proyecto/image/upload/v1623572617/f6qsygaaeqoepxrbduts.jpg",
                ],
                product_name: 'Mascarillas del Barcelona',
                description: 'Mascarillas de tela cómodas',
                user: 'webb',
                price: '4500',
            },
            amount: '',
            /* owner data */
            tel: '',
            exactAddress: '',
            img: '',
            fullname: '',
            /* */
            placeholder: 'cantidad',
            placeh_color: 'gray',
            showAlert: false
        }
    }

    updateAmount = (event) => {
        this.setState({ placeh_color: 'gray', placeholder: 'cantidad' });
        const amount = event.nativeEvent.text;
        this.setState({ amount: amount });
    };

    async componentDidMount() {
        const data = await getUserCollections(this.state.product_data.user);
        this.setState({ img: data.img, tel: data.tel, exactAddress: data.exactAddress, fullname: data.name + ' ' + data.lastname });
    }

    async buy() {
        this.setState({ showAlert: false })
        const amount = this.state.amount;
        if (amount.trim() === '') {
            this.setState({ placeh_color: 'firebrick', placeholder: '*cantidad*' });
            return;
        }
        const p = this.state;
        const sended = await sendNotificationToUser(p.product_data.user, p.user, p.product_data.id, p.amount);
    }

    showImage() {
        if (this.state.img == '') {
            return (
                <Avatar style={{ width: '35%', height: 110, resizeMode: 'cover' }} source={require('../assets/user.png')} />
            )
        }
        else {
            return (
                <Avatar style={{ width: '35%', height: 110, resizeMode: 'cover' }} source={{ uri: this.state.img }} />
            )
        }
    }

    render() {
        let { product_card, product_image } = styles;
        let item = this.state.product_data;
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ marginTop: '2%' }}></Text>
                <View style={product_card}>

                    {/* Scroll view products */}
                    <ScrollView horizontal pagingEnabled={true}>
                        {
                            map(item.images, (photo, index) => (
                                <Image
                                    key={index.toString()}
                                    style={product_image}
                                    source={{ uri: photo }}
                                />
                            ))
                        }
                    </ScrollView>

                    <Text style={style.title}>{item.product_name} </Text>
                    <Text style={style.direccion_text}>{item.description} </Text>
                    <Text style={style.price}>{"₡" + item.price}</Text>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <TextInput
                            style={{ margin: '5%', borderColor: 'gray', borderWidth: 1, height: '50%', width: '35%', textAlign: 'center' }}
                            placeholder={this.state.placeholder}
                            keyboardType='numeric'
                            maxLength={4}  //setting limit of input
                            underlineColorAndroid={'transparent'}
                            onChange={this.updateAmount}
                            value={this.state.amount}
                            placeholderTextColor={this.state.placeh_color}
                        />
                        <Icon name='shopping-cart' type='foundation' raised color='limegreen' onPress={() => { this.setState({ showAlert: true }) }}> </Icon>
                    </View>
                </View>

                <View style={product_card}>
                    <View style={{ flexDirection: 'row' }}>
                        {this.showImage()}
                        <View style={{ flexDirection: 'column', marginLeft: '1%', marginTop: '3%' }}>
                            <Text style={style.vendedor_title}>Detalles del vendedor:</Text>
                            <Text style={style.title}>{this.state.fullname} </Text>
                            <Text style={style.direccion_text}>{this.state.exactAddress} </Text>
                            <Text style={style.price}>{"tel: " + this.state.tel}</Text>
                        </View>
                    </View>
                </View>

                {/* buying alert */}
                <AwesomeAlert
                    show={this.state.showAlert}
                    title="¿Desea enviar una notificación de compra al vendedor?"
                    message="El usuario se pondrá en contacto con usted para finalizar la compra."
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Cancelar"
                    confirmText="Envíar"
                    confirmButtonColor="deepskyblue"
                    onConfirmPressed={() => {
                        this.buy();
                    }}
                    onCancelPressed={() => {
                        this.setState({ showAlert: false })
                    }}
                />

            </ScrollView>
        );
    }
}

import { StyleSheet } from 'react-native'
const style = StyleSheet.create({
    title: {
        fontSize: 14,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    vendedor_title: {
        fontSize: 12,
        textAlign: 'center',
        color: 'deeppink',
        fontWeight: 'bold'
    },
    direccion_text: {
        fontSize: 10,
        textAlign: 'auto',
        marginLeft: 5,
    },
    price: {
        fontSize: 10,
        marginLeft: 5,
        marginBottom: 5,
        color: 'dodgerblue',
        fontWeight: 'bold',
    }
});