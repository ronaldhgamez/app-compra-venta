import React from 'react';
import { Text } from 'react-native';
import { Avatar, Image, Icon } from 'react-native-elements'

import styles from '../Styles/profile_style'

import { getUserProducts } from '../Utilities/products_consults'
import { getUserCollections } from '../Utilities/users_consults'
import showFlatListProducts from './FlatListProducts';

export default class Configuraciones extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.object.user,
            name: '',
            lastname: '',
            biografia: '',
            tel: '',
            products: [] // List of user's products
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

    render() {
        let items = this.state.products;
        return (
            <>
                <Avatar
                    rounded
                    source={require('../assets/female.png')}
                    style={styles.avatarImg}
                />
                <Text style={styles.titleName}>{this.state.name + ' ' + this.state.lastname}</Text>
                {showFlatListProducts(items)}
            </>
        );
    }
};