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

const indexItembutton = ({  textIndo, onPress }) => {

    return (
        <LinearGradient  colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
            <TouchableOpacity onPress={() => onPress()}
                style={styles.buttonStyle}
            >
                <Text style={styles.buttonText}>{textIndo}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )

}

const styles = StyleSheet.create({
    buttonStyle: {
        width: '100%',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        width: 100,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 25,
        justifyContent: 'center',
        marginHorizontal:3,
        marginTop:0

    },
    buttonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',

    }
})

export default indexItembutton