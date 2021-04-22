import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        marginTop: 50,
        alignSelf: 'stretch'
    },
    text: {
        fontSize: 22,
        color: 'black',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 10,
        paddingBottom: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.2
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
        marginLeft: 70,
        marginRight: 70,
        borderRadius: 50
    },
    buttonText: {
        color: 'black',
        fontSize: 18
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 6,
        marginRight: 6,
        borderBottomColor: 'gray',
    },
    viewImages: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 85,
        width: 85,
        backgroundColor: '#e3e3e3'
    },
    miniatura: {
        width: 85,
        height: 85,
        marginRight: 5,
        marginLeft: 5
    },
    textStyle: {
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 50,
        color: 'green'
    }
});