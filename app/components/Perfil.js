import React, { useState } from 'react';
import { View } from 'react-native';
import {
    Text
} from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import styles from '../Styles/perfil_styles'
export default function Register() {

    const [nombre, setNombre] = useState('Alicia');
    const [apellidos, setApellidos] = useState('Diaz Rivas');
    const [biografia, setBiografia] = useState('Diaz Rivas');

    return (
        <>
            <Avatar
                rounded
                //source={{ uri: 'https://www.pngkit.com/png/full/115-1150342_user-avatar-icon-iconos-de-mujeres-a-color.png' }}
                source={require('../assets/female.png')}
                style={styles.avatarImg}
            />
            <Text style={styles.titleName}>{nombre + ' ' + apellidos}</Text>
        </>
    );

};