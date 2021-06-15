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
        backgroundColor: 'snow',
        elevation: 3,
    },
    product_image: {
        width: 324,
        height: 340,
        resizeMode: 'cover'
    },
    product_name: {
        fontSize: 14,
        marginLeft: 7,
        fontWeight: 'bold',
    },
    product_description: {
        fontSize: 14,
        marginLeft: 7,
        margin: 2,
    },
    product_price: {
        fontSize: 12,
        marginLeft: 7,
        marginBottom: 5,
        color: 'deeppink',
        fontWeight: 'bold',
    }
})