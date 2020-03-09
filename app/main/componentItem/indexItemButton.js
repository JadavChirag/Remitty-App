import React from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Image
} from 'react-native'

const indexItembutton = ({ icon, textIndo, onPress, iconstyle, textstyle, style }) => {

    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={{ marginBottom: 20 }}>
                <View style={[styles.textcontainer, style]}>
                    <Text style={[styles.txtcontent, textstyle]}>{textIndo}</Text>
                    <Image source={icon}
                        style={[{ width: 36, height: 36, marginTop: 4 }, iconstyle]} />
                </View>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    textcontainer: {
        flexDirection: 'column',
        marginTop: 0,
        width: 100,
        height: 70,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        marginHorizontal: 10,
        elevation: 15,
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
    },
    txtcontent: {
        marginTop: 5,
        fontSize: 14,
        color: '#1A1F84',
        fontWeight: 'bold'
    },

})

export default indexItembutton