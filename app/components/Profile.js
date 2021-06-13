import React from 'react';
import styles from '../Styles/profile_style'

import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts';

import { getUserProducts, deleteProduct } from '../Utilities/products_consults'
import { getUserCollections } from '../Utilities/users_consults'

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.object.user,
            name: '',
            lastname: '',
            biography: '',
            tel: '',
            exactAddress: '',
            img: '',
            products: [], // List of user's products
            alert: false,
            indexToDelete: null
        }
    }

    componentDidMount() {
        const getUserInfo = async _ => {
            const data = await getUserCollections(this.state.user);
            this.setState(data);
        }
        // To update list of products in the view
        const getProducs = async _ => {
            const products = await getUserProducts(this.state.user);
            this.setState({ products });
        }
        getUserInfo();
        getProducs();
    }

    deleteProductAux = async () => {
        var id = this.state.products[this.state.indexToDelete].id;
        const deleted = await deleteProduct(id); /* delete from firebase */
        console.log(deleted);
        if (deleted) {
            const tempArray = this.state.products;
            tempArray.splice(this.state.indexToDelete, 1);
            this.setState({ imagesSelected: tempArray, alert: false })
        }
    }

    render_info(iconName, iconType, description, text_style) {
        return (
            <Text style={text_style}>
                <Icon size={13} name={iconName} type={iconType} color='rgba(45, 107, 224, 0.9)' />
                {'\t' + description}
            </Text>
        );
    }

    showImage = () => {
        if (this.state.img == '') {
            return (
                <Avatar
                    rounded
                    source={require('../assets/user.png')}
                    style={styles.user_image}
                />
            )
        }
        else {
            return (
                <Avatar
                    rounded
                    source={{ uri: this.state.img }}
                    style={styles.user_image}
                />
            )
        }
    }

    _renderItem = ({ item, index }) => {
        let { product_card, product_image, product_price } = styles;
        return (
            <TouchableOpacity key={item.id} style={product_card}>

                <View style={{ flexDirection: 'row' }}>

                    <Avatar rounded key={index.toString()} style={product_image} source={{ uri: item.images[0] }} />
                    <View style={{ flexDirection: 'column', marginLeft: '4%', marginTop: '8%' }}>
                        <Text style={{ fontSize: 15 }}>{item.description} </Text>
                        <Text style={product_price}>{"₡" + item.price}</Text>
                        <View style={{ marginLeft: 135 }}>
                            <Icon raised size={20} name='trash' type='font-awesome' onPress={() => { this.setState({ indexToDelete: index, alert: true }) }} />
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }

    render() {
        let items = this.state.products;
        let { profile_card, cardDescription, textUserName } = styles;
        let { products_container } = styles;
        return (
            <>
                <Text style={{ marginTop: '2%' }}></Text>

                <View style={{backgroundColor: 'dimgrey', width: '100%', height: '100%', marginBottom: '-118%'}}>
                    {this.showImage()}
                </View>
                {/* Biography */}
                <View style={profile_card}>

                    <Text style={textUserName}>{this.state.name + " " + this.state.lastname}</Text>
                    <Text style={cardDescription}>{this.state.biography}</Text>
                    {
                        /* display soda's exact address */
                        this.render_info('google-maps', 'material-community', this.state.exactAddress, cardDescription)
                    }
                    {
                        /* display soda's telephone number */
                        this.render_info('telephone', 'foundation', this.state.tel, cardDescription)
                    }
                </View>

                <FlatList
                    style={products_container}
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />

                <AwesomeAlert
                    show={this.state.alert}
                    title='¿Seguro que desea eliminar el producto?'
                    message="El producto ya no estará a la venta para ningún usuario"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Sí"
                    confirmButtonColor="deeppink"
                    onCancelPressed={() => {
                        this.setState({ alert: false })
                    }}
                    onConfirmPressed={() => {
                        /* delete from firebase and locally */
                        this.deleteProductAux();
                    }}
                />
            </>
        );
    }
};