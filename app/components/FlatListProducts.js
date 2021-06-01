import React from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Image, Icon } from 'react-native-elements'
import styles from '../Styles/profile_style'

function _renderItem({ item, index }) {
    let { card, cardImage, cardDescription, textPrice } = styles;
    return (
        <TouchableOpacity key={item.id} style={card} onPress={() => console.log(item.description)}>
            {/* <ScrollView horizontal>
                {
                    item.images.map((link, index) =>
                        <Image key={index.toString()} style={cardImage} source={{ uri: link }} />
                    )
                }
            </ScrollView> */}
            <Image key={index.toString()} style={cardImage} source={{ uri: item.images[0] }} />
            <Text style={cardDescription}>{item.description} </Text>
            <Text style={textPrice}>{"₡" + item.price}</Text>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                <Icon
                    reverse
                    size={18}
                    name='trash'
                    type='ionicon'
                    color='#517fa4'
                    onPress={() => { console.log("eliminando " + item.description) }}
                />
            </View>
        </TouchableOpacity>
    );
}

export default function showFlatListProducts(items) {
    let { container } = styles;
    return (
        <FlatList
            style={container}
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
        />
    );
}