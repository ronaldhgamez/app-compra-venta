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
        padding: wp(2),
        backgroundColor: 'deeppink', // deepskyblue
        marginTop: wp(3),
        marginLeft: wp('25%'),
        marginRight: wp('25%'),
        borderRadius: 30
    },
    buttonText: {
        color: 'white',
        fontSize: wp('4'),
        fontWeight: 'bold'
    },
    textInput: {
        marginBottom: 15,
        height: hp('5%'),
        width: wp('70%'),
        borderColor: 'gray',
        borderWidth: 0.4
    },
})