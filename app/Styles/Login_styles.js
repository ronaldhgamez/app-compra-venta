import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCar:{
        width: wp('50%'),
        height: hp('30%'),
        marginBottom: wp('5%'),
        marginTop: hp('-5%')
    },
    textoPrincipal: {
        fontSize: 28,
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
        marginBottom: wp('8%'),
        alignSelf: 'center'
    }
})



