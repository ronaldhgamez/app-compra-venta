import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    
    /* Profile */
    profile_card: {
        marginBottom: 1,
        backgroundColor: 'white',
        elevation: 3,
    },
    user_image: {
        height: '20%',
        width: '30%',
        margin: '2%',
        alignSelf: 'center',
        resizeMode: 'stretch'
    },
    textUserName: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 12,
        marginLeft: '1%',
        marginTop: '1%',
        alignSelf: 'center'
    },
    
   
    /* Users' products */
    products_container: {
        backgroundColor: 'white'
    },
    product_card: {
        alignSelf: 'center',
        marginVertical: '1%',
        width: '100%',
        backgroundColor: 'snow',
        borderColor: 'azure',
        elevation: 2,
    },
    product_image: {
        margin: '2%',
        width: '35%',
        height: 120,
        resizeMode: 'cover',
    },
    product_price: {
        fontSize: 14,
        marginBottom: 5,
        color: 'deeppink',
        fontWeight: 'bold',
    }
})