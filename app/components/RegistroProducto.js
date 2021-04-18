import React from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, ImageStore, Alert } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import styles from '../Styles/RegistroStyle'
import { map, size } from 'lodash' // imagenes
import * as ImagePicker from 'expo-image-picker';

export default class RegistroProducto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: 'ronaldhg',
            descripcion: '',
            precio: '',
            imagesSelected: []
        };
    }

    updateDescription = (event) => {
        const desc = event.nativeEvent.text;
        this.setState({ descripcion: desc });
    };

    updatePrecio = (event) => {
        const prec = event.nativeEvent.text;
        this.setState({ precio: prec });
    };

    insertarProducto = async () => {
        var respuesta = await fetch('/getUsers', {
            method: 'post',
            body: JSON.stringify({
                "usuario": this.state.usuario,
                "descripcion": this.state.descripcion,
                "precio": this.state.precio
            }),
            headers: { 'Content-type': 'application/json' }
        })

        var data = await respuesta.json()
        return data.id
    }

    /* loadImageFromGallery = async (array) => {
        const response = { status: false, image=null }
        const resultPermissions = await 
    }

    imageSelect = async (imagesSelected) => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status) {
            Alert.alert("No has seleccionado una imagen");
        } else {
            setImageSelected([...imagesSelected, response.image]);

        }
    } */

    pickImage = async () => {
        /* let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        } */
        Alert.alert("hola")
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Registrar un producto</Text>

                <TextInput
                    multiline
                    style={styles.textinput}
                    placeholder='Añade una descripción'
                    underlineColorAndroid={'transparent'}

                    onChange={this.updateDescription}
                    value={this.state.descripcion}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder='Precio'
                    keyboardType='numeric'
                    maxLength={15}  //setting limit of input
                    underlineColorAndroid={'transparent'}

                    onChange={this.updatePrecio}
                    value={this.state.precio}
                />

                <ScrollView
                    horizontal
                    style={styles.viewImages}
                >
                    {
                        size(this.state.imagesSelected) < 10 && (
                            <Icon
                                type='material-community'
                                name='camera'
                                color='#7a7a7a'
                                containerStyle={styles.containerIcon}
                                
                            />
                        )
                    }
                    {
                        map(this.state.imagesSelected, (imageProduct, index) => (
                            <Avatar
                                key={index}
                                style={style.miniatura}
                                source={{ uri: imageProduct }}
                            />
                        ))
                    }
                </ScrollView>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.insertarProducto}
                >
                    <Text>Añadir producto</Text>
                </TouchableOpacity>
            </View>
        );
    }
};