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
        <TouchableOpacity onPress={() => onPress()}
        style={styles.linearGradient}
    >
        <LinearGradient  colors={['#3145C2', '#3145C2']} style={styles.buttonStyle}>
           
                <Text style={styles.buttonText}>{textIndo}</Text>
                  </LinearGradient>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    buttonStyle: {

        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        marginTop : -10

    },
    linearGradient: {
        width: '50%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',

        marginTop:30,
        marginLeft:20

    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign:'center'

    }
})

export default indexItembutton