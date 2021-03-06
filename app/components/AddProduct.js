import React from 'react';
import {
    Text, TextInput, View, TouchableOpacity,
    ScrollView, TouchableHighlight
} from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { map, size } from 'lodash' // imagenes
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from '../Styles/RegistroStyle'
import style_app from '../Styles/app_styles'

/* generates random ids for photos */
import uuid from 'random-uuid-v4'

import {
    addProduct
} from '../Utilities/products_consults'

import {
    uploadImages
} from '../Utilities/images_upload'

export default class RegistroProducto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.route.params.user, // obtiene el usuario desde props
            product_name: '',
            descripcion: '',
            precio: '',
            imagesSelected: [],
            spinner: false,
            // alertas msjs
            showAlert: false,
            msj: '',
            // alerta con opciones
            showAlert2: false,
        };
    }

    updateName = (event) => {
        const product_name = event.nativeEvent.text;
        this.setState({ product_name });
    };

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
            this.setState({ showAlert: true, msj: 'Ingrese una descripción para el producto' });
            return;
        }
        if (!this.state.precio.trim()) {
            this.setState({ showAlert: true, msj: 'Ingrese un precio para su producto' });
            return;
        }
        if (this.state.imagesSelected.length < 1) {
            this.setState({ showAlert: true, msj: 'Ingrese una imagen para su producto' });
            return;
        }

        this.setState({ spinner: true })
        /* Upload images to Clodinary */
        let img_urls = await uploadImages(this.state.imagesSelected);

        /* add product to Firebase */
        const inserted = await addProduct(this.state.user, this.state.product_name, this.state.descripcion, this.state.precio, img_urls);
        this.setState({ spinner: false })

        if (inserted) {
            this.setState({ showAlert2: true })
        } else {
            this.setState({ showAlert: true, msj: "Ocurrió un problema, no se ha podido insertar el producto." })
        }
    };

    limpiarTextInputs = () => {
        this.setState({ product_name: '', descripcion: '', precio: '', imagesSelected: [] })
    }

    // https://mixkit.co/free-stock-video/skyline-of-a-desert-with-the-moon-at-night-40047/
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.cancelled) {
            if (result.type !== "image") {
                this.setState({ showAlert: true, msj: 'El archivo seleccionado no es una imagen' });
                return;
            }

            let extention = (result.uri.endsWith('.jpg')) ? 'jpg' : 'png';

            const photo = {
                uri: result.uri,
                type: result.type + '/' + extention,
                name: uuid() + '.' + extention
            }

            const tempArray = this.state.imagesSelected;
            tempArray.push(photo);
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

                <Text style={styles.texto}>Detalles del producto</Text>

                <TextInput
                    style={styles.inputPrecio}
                    placeholder='nombre de producto'
                    maxLength={45}  //setting limit of input
                    underlineColorAndroid={'transparent'}
                    onChange={this.updateName}
                    value={this.state.product_name}
                />

                <TextInput
                    multiline
                    style={styles.inputDescrip}
                    placeholder='añade una descripción'
                    underlineColorAndroid={'transparent'}
                    onChange={this.updateDescription}
                    value={this.state.descripcion}
                />
                <TextInput
                    style={styles.inputPrecio}
                    placeholder='precio'
                    keyboardType='numeric'
                    maxLength={15}  //setting limit of input
                    underlineColorAndroid={'transparent'}
                    onChange={this.updatePrecio}
                    value={this.state.precio}
                />

                <Text style={styles.texto}>Toque el icono para agregar imágenes</Text>
                <ScrollView
                    horizontal
                    style={styles.viewImages}
                >
                    {
                        size(this.state.imagesSelected) < 5 && (
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
                        map(this.state.imagesSelected, (photo, index) => (
                            <Avatar
                                key={index}
                                style={styles.miniatura}
                                source={{ uri: photo.uri }}
                                onPress={() => { this.borrarImagen(index) }}
                            />
                        ))
                    }
                </ScrollView>
                <Text style={styles.textStyle}>* presione una imagen para borrar *</Text>

                <TouchableOpacity
                    style={style_app.button}
                    onPress={this.checkTextInput}
                >
                    <Text style={style_app.buttonText}>Añadir producto</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={style_app.button}
                    onPress={() => this.props.navigation.navigate('Principal')}
                >
                    <Text style={style_app.buttonText}>Volver</Text>
                </TouchableOpacity>

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Guardando producto, espere...'}
                    textStyle={{ color: '#FFF' }}
                />

                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Aviso"
                    message={this.state.msj}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showConfirmButton={true}
                    confirmText="Ok"
                    confirmButtonColor="deepskyblue"
                    onConfirmPressed={() => {
                        this.setState({ showAlert: false })
                        if (this.state.back) {
                            this.props.navigation.navigate('Principal')
                        }
                    }}
                    onDismiss={() => { // click fuera de la alerta
                        this.setState({ showAlert: false })
                        if (this.state.back) {
                            this.props.navigation.navigate('Principal')
                        }
                    }}
                />

                <AwesomeAlert
                    show={this.state.showAlert2}
                    showProgress={false}
                    title="Producto registrado"
                    message="¿Desea registrar otro producto?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Sí"
                    confirmButtonColor="deepskyblue"
                    onCancelPressed={() => {
                        this.props.navigation.navigate('Principal')
                    }}
                    onConfirmPressed={() => {
                        this.setState({ showAlert2: false })
                        this.limpiarTextInputs()
                    }}
                    onDismiss={() => { // click fuera de la alerta
                        this.setState({ showAlert2: false })
                        this.limpiarTextInputs()
                    }}
                />
            </View>
        );
    }
};