import React from 'react';
import styles from '../Styles/Menu_styles'

import { Text, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { _renderItem } from './FlatListMenuProducts';

import { getAllProducts } from '../Utilities/products_consults'

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            user: props.object.user,
            products: []
        }
    }

    componentDidMount() {
        // To update list of products in the view
        const getProducts = async _ => {
            const products = await getAllProducts(this.state.user);
            this.setState({ products });
        }
        getProducts();
    }

    updateSearch = (search) => {
        this.setState({ search });
        this.filter(search)
    };

    filter = (word) => {
        this.state.products.map((product) => {

            let description = product.product_name.toLowerCase() + ' ' +  product.description.toLowerCase();
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

    render() {
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
                    renderItem={_renderItem}
                />
            </>
        );
    }
};