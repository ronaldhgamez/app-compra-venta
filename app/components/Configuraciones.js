import React from 'react';
import { View } from 'react-native';
import {
    Text, TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Image } from 'react-native-elements'
import styles from '../Styles/profile_style'

export default class Configuraciones extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: props.object.user,
            navigation: props.object.navigation,
        }
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {

        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    signOff () {
        this.state.navigation.navigate('Login');
    }

    render() {
        let { card, cardImage, cardDescription, textPrice } = styles;
        return (
            <>
                <Text style={{ marginTop: '4%' }}></Text>
                <TouchableOpacity style={card} onPress={() => this.state.navigation.navigate('AddProduct', { "user": this.state.user })}>
                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', margin: '0%' }}>
                        <Icon
                            reverse
                            size={15}
                            name='add'
                            type='ionicon'
                            color='#517fa4'
                        />
                        <Text style={{ fontSize: 30 }}>Registrar producto</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={card} onPress={() => this.signOff()}>
                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', margin: '0%' }}>
                        <Icon
                            reverse
                            size={15}
                            name='sign-out'
                            type='font-awesome'
                            color='pink'
                        />
                        <Text style={{ fontSize: 30 }}>Cerrar Sesión</Text>
                    </View>
                </TouchableOpacity>

            </>
        );
    }
};