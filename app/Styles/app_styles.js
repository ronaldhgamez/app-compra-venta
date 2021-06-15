import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    texto: {
        alignSelf: 'flex-start',
        marginLeft: hp('7'),
        fontSize: wp('6'),
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
        marginBottom: wp('4%'),
        textAlign: 'center'
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: wp(3),
        backgroundColor: 'deeppink', // deepskyblue
        marginTop: wp(3),
        marginLeft: wp('25%'),
        marginRight: wp('25%'),
        borderRadius: 19
    },
    buttonText: {
        color: 'white',
        fontSize: wp('4'),
        fontWeight: 'bold'
    },
    textInput: {
        marginBottom: '3%',
        height: '5%',
        width: '70%',
        borderColor: 'gray',
        borderWidth: 0.4
    },
    biography: {
        marginBottom: '3%',
        height: '12%',
        width: '70%',
        borderColor: 'gray',
        borderWidth: 0.4
    },
})