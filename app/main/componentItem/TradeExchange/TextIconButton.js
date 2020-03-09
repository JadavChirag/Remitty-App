import React from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Image
} from 'react-native'

const indexItembutton2 = ({ textTitle, textSub, textNumber, onPress, icon }) => {

    return (
        <View style={styles.textcontainer}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={icon}
                    style={{ width: 46, height: 46, marginTop: 0, marginRight: 10 }} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.txtcontent}>{textTitle}</Text>
                    <Text style={styles.txtsuitcontent}>{textSub}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => onPress()}>
                <Text style={styles.txtNumber}>Buy/Sell</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textcontainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: Dimensions.get('window').width - 40,
        height: 60,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        paddingLeft: 10,
        elevation: 2,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
    },
    txtcontent: {
        marginTop: 0,
        fontSize: 16,
        color: 'black',
        fontWeight: '600'
    },
    txtsuitcontent: {
        padding: 0,
        fontSize: 12,
        color: 'gray',
    },
    txtNumber: {
        padding: 0,
        fontSize: 16,
        color: 'black',
        marginRight: 10,
    }
})

export default indexItembutton2