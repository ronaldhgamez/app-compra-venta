import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Avatar, Image, Icon } from 'react-native-elements'

import styles from '../Styles/profile_style'

import { getUserProducts } from '../Utilities/products_consults'
import { getUserCollections } from '../Utilities/users_consults'
import { _renderItem } from './FlatListProducts';

export default class Configuraciones extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.object.user,
            name: 'Ronald',
            lastname: 'Herrera Gámez',
            biografia: 'Hello, im working on a new project! Call me',
            tel: '60102586',
            exactAddress: 'Santa Clara, en el Tecnológico de CR',
            img: 'https://avatars.githubusercontent.com/u/66141333?v=4',
            products: [
                {
                    "price": "2000.63",
                    "images": [
                        "https://res.cloudinary.com/ap-proyecto/image/upload/v1622428522/nwxokl5za2misov0oyd5.jpg",
                        "https://res.cloudinary.com/ap-proyecto/image/upload/v1622428523/su0asryktugav4kak5kx.jpg"
                    ],
                    "description": "Panqueques",
                    "user": "ronaldhg",
                    "id": "ya44u9o3WmGVLVy57xnJ"
                },
                {
                    "description": "Se venden jugos del monte bien ricos",
                    "images": [
                        "https://res.cloudinary.com/ap-proyecto/image/upload/v1622439805/h514fyhecz7cu40w5aha.jpg"
                    ],
                    "user": "ronaldhg",
                    "price": "1000.00",
                    "id": "UfahxXpO7YAf4NfL6DeV"
                },
                {
                    "price": "3500",
                    "description": "Sombrero usado",
                    "images": [
                        "https://res.cloudinary.com/ap-proyecto/image/upload/v1622439947/dgtzug6woe4mc8qo80dy.jpg"
                    ],
                    "user": "ronaldhg",
                    "id": "W5xKAphOSkqB7X90vIWa"
                }
            ] // List of user's products
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
        //getUserInfo();
        //getProducs();
    }

    render_info(iconName, iconType, description, text_style) {
        return (
            <Text style={text_style}>
                <Icon
                    size={11}
                    name={iconName}
                    type={iconType}
                    color='rgba(45, 107, 224, 0.9)'
                    onPress={() => { console.log("description: " + description) }}
                />
                {'\t' + description}
            </Text>
        );
    }

    render() {
        let items = this.state.products;
        let { profile_card, user_image, cardDescription, textUserName } = styles;
        let { products_container } = styles;
        return (
            <>
                <Text style={{ marginTop: '7%' }}></Text>
                
                
                <Avatar
                    rounded
                    source={{ uri: this.state.img }}
                    style={user_image}
                />
                
                {/* Biography */}
                <View style={profile_card}>

                    <Text style={textUserName}>{this.state.name + " " + this.state.lastname}</Text>
                    <Text style={cardDescription}>{this.state.biografia}</Text>
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
                    renderItem={_renderItem}
                />
            </>
        );
    }
};