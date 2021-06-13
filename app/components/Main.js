import React from 'react';
import { View, Text } from 'react-native';

import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation'

import { Icon } from 'react-native-elements'
import MenuScreen from './Menu'
import ProfileScreen from './Perfil'
import SettingsScreen from './Configuraciones'

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.route.params.user,
        }
    }

    render() {
        return (
            <>
                <Text style={{margin: '5%'}}></Text>
                <Text>Hello {this.state.user}</Text>
            </>
        )
    }
}