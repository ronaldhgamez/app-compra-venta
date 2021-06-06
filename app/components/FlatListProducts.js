import React from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Image, Icon } from 'react-native-elements'
import styles from '../Styles/profile_style'

function _renderItem({ item, index }) {
    let { product_description, product_card, product_image, product_price } = styles;
    return (
        <TouchableOpacity key={item.id} style={product_card} /* onPress={() => console.log(item.description)} */>
            <Image key={index.toString()} style={product_image} source={{ uri: item.images[0] }} />
            <Text style={product_description}>{item.description} </Text>
            <Text style={product_price}>{"₡" + item.price}</Text>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: '-15%' }}>
                <Icon
                    reverse
                    size={22}
                    name='information-outline'
                    type='material-community'
                    color='#517fa4'
                    onPress={() => { console.log("eliminando " + item.description) }}
                />
            </View>
        </TouchableOpacity>
    );
}

export {
    _renderItem
}