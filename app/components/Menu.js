import React from 'react';
import styles from '../Styles/Menu_styles'

import { FlatList, TouchableOpacity, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Image, Icon, Avatar } from 'react-native-elements'
import { map } from 'lodash'

import { SearchBar } from 'react-native-elements'

import { getAllProducts } from '../Utilities/products_consults'

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.object.user,
            navigation: props.object.navigation,
            search: '',
            products: [],

            isLoading: true
        }
    }

    componentDidMount() {
        // To update list of products in the view
        const getProducts = async _ => {
            const products = await getAllProducts(this.state.user);
            this.setState({ products });
            this.setState({ isLoading: false });
        }
        getProducts();
    }

    updateSearch = (search) => {
        this.setState({ search });
        this.filter(search)
    };

    filter = (word) => {
        this.state.products.map((product) => {

            let description = product.product_name.toLowerCase() + ' ' + product.description.toLowerCase();
            var splited = word.toLowerCase().split(' ');
            var match = true;

            for (var i in splited) {
                // validates if description matches with the word searched.
                if (!description.includes(splited[i])) {
                    match = false;
                    break;
                }
            }
            product.display = match;
        });
    }

    goToBuyView() {
        console.log("sd")
        this.state.navigation.navigate('BuyProduct', { "user": this.state.user })
    }

    _renderItem = ({ item, index }) => {
        /* Don't display products that not make match with the search */
        if (!item.display)
            return;

        let { product_name, product_description, product_card, product_image, product_price } = styles;
        return (

            <View key={item.id} style={product_card}>

                {/* Scroll view products */}
                <ScrollView
                    horizontal
                    pagingEnabled={true}
                >
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

                <Text style={product_name}>{item.product_name} </Text>
                <Text style={product_description}>{item.description} </Text>
                <Text style={product_price}>{"₡" + item.price}</Text>

                {/* Username and little photo */}
                <TouchableOpacity
                    style={{ flexDirection: 'row', marginLeft: '1%' }}
                    onPress={() => { console.log("user: " + item.user) }}
                >
                    <Avatar
                        rounded
                        source={require('../assets/user.png')}
                        style={{ width: '7%', height: 24, marginLeft: '1%' }}
                    />
                    <Text style={{ fontSize: 19, color: '#517fa4', marginTop: '-0.5%' }}>{"\t" + item.user}</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => { this.goToBuyView() }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: '-15%' }}>
                        <Icon
                            raised
                            size={20}
                            name='information'
                            type='ionicon'
                            color='gray'
                        />
                        <Text style={{ fontSize: 30 }}></Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ marginTop: '50%', flex: 1, alignContent: 'center' }}>
                    <ActivityIndicator size="large" color="deeppink" />

                    {/* <TouchableOpacity onPress={() => {this.goToBuyView()}}>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <Icon
                            raised
                            size={20}
                            name='information'
                            type='ionicon'
                            color='gray'
                        />
                        <Text style={{ fontSize: 30 }}>asdfas</Text>
                    </View>
                </TouchableOpacity> */}
                </View>
            )
        } else {
            let items = this.state.products;
            let { container } = styles;
            return (
                <>
                    <Text style={{ marginTop: '2%' }}></Text>
                    <SearchBar
                        placeholder="Busca un producto"
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                    />

                    <FlatList
                        style={container}
                        data={items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderItem}
                    />
                </>
            );
        }
    }
};