import React from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Image, Icon } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import styles from '../Styles/Menu_styles'

function _renderItem({ item, index }) {
    /* Don't display products that not make match with the search */
    if (!item.display)
        return;

    let { product_name, product_description, product_card, product_image, product_price } = styles;
    return (
        <View key={item.id} style={product_card}>
            <Image key={index.toString()} style={product_image} source={{ uri: item.images[0] }} />

            <Text style={product_name}>{item.product_name} </Text>
            <Text style={product_description}>{item.description} </Text>

            <Text style={product_price}>{"₡" + item.price}</Text>

            {/* Username and little photo */}
            <TouchableOpacity
                style={{ flexDirection: 'row', marginLeft: '1%' }}
                onPress={() => { console.log("user: " + item.user) }}
            >
                <Avatar
                    rounded
                    source={require('../assets/user.png')}
                    style={{ width: '10%', height: 26 }}
                />
                <Text style={{ fontSize: 19, color: '#517fa4' }}>{item.user}</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: '-15%' }}>
                <Icon
                    reverse
                    size={22}
                    name='information-outline'
                    type='material-community'
                    color='#517fa4'
                    onPress={() => { console.log(" " + item.description) }}
                />
            </View>


        </View>
    );
}

export {
    _renderItem
}