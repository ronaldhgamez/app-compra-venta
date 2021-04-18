import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        marginTop: 50,
        alignSelf: 'stretch'
    },
    text: {
        fontSize: 25,
        color: 'black',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        paddingBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 100
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f08080',
        marginTop: 30,
        marginLeft: 40,
        marginRight: 40
    },
    buttonText: {
        color: 'black',
        fontSize: 20
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 6,
        marginRight: 6,
    },
    viewImages: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 30
        /*  justifyContent: 'center',
         marginTop: 30 */
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: '#e3e3e3'
    },
    miniatura: {
        width: 70,
        height: 70,
        marginRight: 10
    }
});