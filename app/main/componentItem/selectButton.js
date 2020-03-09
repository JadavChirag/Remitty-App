import React from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Image
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const indexItembutton = ({ textIndo, onPress }) => {

    return (
        <TouchableOpacity onPress={() => onPress()}
            style={styles.linearGradient}
        >
            {/* <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.buttonStyle}> */}

                <Text style={styles.buttonText}>{textIndo}</Text>
            {/* </LinearGradient> */}
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'center',
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
    },
    linearGradient: {
        alignSelf: 'center',
        width: '80%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        marginHorizontal:6,
        elevation: 3,
        borderWidth:1,
        borderColor:'rgba(240,240,240,0.8)',
    },
    buttonText: {
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'

    }
})

export default indexItembutton