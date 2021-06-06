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
        width: '38%',
        margin: '2%',
        alignSelf: 'center',
        resizeMode: 'stretch'
    },
    textUserName: {
        fontSize: 24,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 16,
        marginLeft: '1%',
        marginTop: '1%',
        alignSelf: 'center'
    },
    
   
    /* Users' products */
    products_container: {
        backgroundColor: 'azure',
        borderRadius: 15,
        margin: 5,
    },
    product_card: {
        alignSelf: 'center',
        marginVertical: '1.5%',
        width: '90%',
        backgroundColor: 'white',
        elevation: 3,
    },
    product_image: {
        width: '100%',
        height: 240,
        resizeMode: 'cover'
    },
    product_description: {
        fontSize: 18,
        marginLeft: 5,
        fontWeight: 'bold',
        margin: 2
    },
    product_price: {
        fontSize: 14,
        marginLeft: 5,
        marginBottom: 5,
        color: 'deeppink',
        fontWeight: 'bold',
    }
})