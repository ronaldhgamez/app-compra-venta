import React from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, TouchableHighlight, ImageStore, Alert } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import styles from '../Styles/RegistroStyle'
import { map, size } from 'lodash' // imagenes
import * as ImagePicker from 'expo-image-picker';

export default class RegistroProducto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: this.props.route.params.usuario, // obtiene el usuario desde props
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

    checkTextInput = async () => {
        if (!this.state.descripcion.trim()) {
            this.showSimpleAlert('Ingrese una descripción para el producto');
            return;
        }
        if (!this.state.precio.trim()) {
            this.showSimpleAlert('Ingrese un precio para su producto');
            return;
        }
        if (this.state.imagesSelected.length < 1) {
            this.showSimpleAlert('Ingrese una imagen para su producto');
            return;
        }
        const inserted = await this.insertarProducto();
        if (inserted) {
            this.alertOption();
        } else {
            Alert.alert("Ocurrió un problema, no se ha podido insertar el producto.")
        }
    };

    alertOption = () => {
        Alert.alert(
            "Producto registrado",
            "¿Desea registrar otro producto?",
            [
                {
                    text: "No",
                    //onPress: () => , // navigation.navigate('Login');
                    style: "cancel",
                },
                {
                    text: "Si",
                    onPress: () => this.limpiarTextInputs(),
                    style: "default",
                },
            ],
            {
                cancelable: true,
                onDismiss: () => this.limpiarTextInputs()
            }
        );
    }

    showSimpleAlert = (msj) => {
        Alert.alert(
            msj, "",
            [
                {
                    text: 'OK',
                    style: 'Accept',
                },
            ],
            {
                cancelable: true
            }
        );
    }

    limpiarTextInputs = () => {
        this.setState({ descripcion: '', precio: '', imagesSelected: [] })
    }

    insertarProducto = async () => {
        const url = 'http://10.0.2.2:4000/insertarProducto';
        const body = {
            "usuario": this.state.usuario,
            "descripcion": this.state.descripcion,
            "precio": this.state.precio
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            let json = await response.json(); // json={ inserted: <true|false> }
            return json.inserted;
        } catch (error) {
            Alert.alert("A ocurrido un error inesperado");
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.cancelled) {
            if (result.type !== "image") {
                this.showSimpleAlert('El archivo seleccionado no es una imagen');
                return;
            }
            const tempArray = this.state.imagesSelected;
            tempArray.push(result.uri);
            this.setState({ imagesSelected: tempArray });
        }
    };

    borrarImagen = (index) => {
        const tempArray = this.state.imagesSelected;
        tempArray.splice(index, 1);
        this.setState({ imagesSelected: tempArray })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Descripción del producto</Text>

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

                <Text style={styles.text}>Toque el icono para agregar imágenes</Text>
                <ScrollView
                    horizontal
                    style={styles.viewImages}
                >
                    {
                        size(this.state.imagesSelected) < 10 && (
                            <TouchableHighlight
                                onPress={() => { this.pickImage() }}
                            >
                                <Icon
                                    type='material-community'
                                    name='camera'
                                    color='#7a7a7a'
                                    containerStyle={styles.containerIcon}
                                />
                            </TouchableHighlight>
                        )
                    }
                    {
                        map(this.state.imagesSelected, (imageProduct, index) => (
                            <Avatar
                                key={index}
                                style={styles.miniatura}
                                source={{ uri: imageProduct }}
                                onPress={() => { this.borrarImagen(index) }}
                            />
                        ))
                    }
                </ScrollView>
                <Text style={styles.textStyle}>* presione una imagen para borrar *</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.checkTextInput}
                >
                    <Text style={styles.buttonText}>Añadir producto</Text>
                </TouchableOpacity>

            </View>
        );
    }
};