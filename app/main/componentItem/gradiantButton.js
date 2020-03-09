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

const indexItembutton = ({ textIndo, onPress,style }) => {

    return (
        <TouchableOpacity onPress={() => onPress()}
            style={styles.linearGradient}
        >
            <LinearGradient colors={['#00ff00', '#00ff00']} style={[styles.buttonStyle,style]}>

                <Text style={styles.buttonText}>{textIndo}</Text>
            </LinearGradient>
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
        width: '45%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        marginHorizontal: 15,
        marginTop: 30,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'

    }
})

export default indexItembutton