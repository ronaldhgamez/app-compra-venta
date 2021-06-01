import React from 'react';
import { Text, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements'
import _renderItem from './FlatListProducts'
import styles from '../Styles/profile_style'
import showFlatListProducts from './FlatListProducts';

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            user: props.object.user,
            products: [
                {
                    "price": "300",
                    "user": "ronaldhg",
                    "description": "Maruchan ",
                    "images": [
                        "https://res.cloudinary.com/ap-proyecto/image/upload/v1622428566/jetihuenunoor5uk7sop.jpg"
                    ],
                    "id": "1dIYm0uKQ4aCvEMU40MS"
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
                },
                {
                    "price": "2000.63",
                    "images": [
                        "https://res.cloudinary.com/ap-proyecto/image/upload/v1622428522/nwxokl5za2misov0oyd5.jpg",
                        "https://res.cloudinary.com/ap-proyecto/image/upload/v1622428523/su0asryktugav4kak5kx.jpg"
                    ],
                    "description": "Panqueques",
                    "user": "ronaldhg",
                    "id": "ya44u9o3WmGVLVy57xnJ"
                }
            ]
        }
    }

    updateSearch = (search) => {
        this.setState({ search });
        console.log(search)
    };

    render() {
        let items = this.state.products;
        return (
            <>
                <Text style={{ marginTop: '2%' }}></Text>
                <SearchBar
                    placeholder="Busca un producto"
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />

                {showFlatListProducts(items)}
            </>
        );
    }
};