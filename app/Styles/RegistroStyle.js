import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        marginTop: 40,
        justifyContent: 'center'
    },
    texto: {
        marginLeft: wp('6'),
        marginBottom: wp('2%'),
        marginTop: wp('10%'),
        fontSize: wp('5'),
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
    },
    inputDescrip: {
        marginTop: wp('3'),
        marginLeft: wp('6'),
        height: hp('10%'),
        width: wp('85%'),
        borderColor: 'gray',
        borderWidth: 0.4
    },
    inputPrecio: {
        marginTop: wp('3'),
        marginLeft: wp('6'),
        height: hp('5%'),
        width: wp('85%'),
        borderColor: 'gray',
        borderWidth: 0.4
    },
    viewImages: {
        flexDirection: 'row',
        marginHorizontal: hp('3'),
        marginTop: 20,
        marginBottom: 10
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('11'),
        width: wp('21'),
        backgroundColor: '#e3e3e3'
    },
    miniatura: {
        width: hp('11'),
        height: wp('21'),
        marginRight: 5,
        marginLeft: 5
    },
    textStyle: {
        marginLeft: wp('7'),
        marginBottom: wp('10%'),
        marginTop: wp('2'),
        color: 'olivedrab'
    }
});