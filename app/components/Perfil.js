import React from 'react';
import {
    Text
} from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import styles from '../Styles/perfil_styles'

import { getUserProducts } from '../Utilities/products_consults'
import { getUserCollections } from '../Utilities/users_consults'

export default class Configuraciones extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.object.user,
            name: '',
            lastname: '',
            biografia: '',
            tel: '',
        }
    }

    componentDidMount() {
        const getData = async _ => {
            const data = await getUserCollections(this.state.user);
            this.setState(data);
        }
        getData();
    }

    render() {
        return (
            <>
                <Avatar
                    rounded
                    source={require('../assets/female.png')}
                    style={styles.avatarImg}
                />
                <Text style={styles.titleName}>{this.state.name + ' ' + this.state.lastname}</Text>
            </>
        );
    }
};