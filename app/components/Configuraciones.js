import React from 'react';
import {
    Text
} from 'react-native'

export default class Configuraciones extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: props.object.user,
        }
    }

    render() {
        return (
            <Text style={{ textAlign: 'center', marginTop: '50%', fontSize: 25 }}>Configuraciones</Text>
        );
    }
};