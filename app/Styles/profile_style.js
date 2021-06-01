import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        marginTop: 40
    },
    avatarImg: {
        marginTop: '10%',
        height: '15%',
        width: '23%',
        marginLeft: '6%',
    },
    titleName: {
        marginTop: '3%',
        fontSize: 15,
        marginLeft: '6%'
    },
    card: {
        marginBottom: 10,
        marginLeft: '3%',
        width: '93%',
        backgroundColor: 'white',
        elevation: 3,
    },
    cardImage: {
        //margin: 10,
        width: '100%',
        height: 150,
        resizeMode: 'cover'
    },
    cardDescription: {
        fontSize: 16,
        marginLeft: 5,
        marginTop: 10,
    },
    textPrice: {
        fontSize: 13,
        //padding: 10,
        marginLeft: 5,
        marginBottom: 5,
        color: 'darkcyan'
    }
})