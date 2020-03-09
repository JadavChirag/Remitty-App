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
        <TouchableOpacity onPress={() => onPress()}>
            <View style={styles.textcontainer}>
                <Text style={styles.txtcontent}>{textTitle}</Text>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    textcontainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: Dimensions.get('window').width - 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        paddingLeft: 10,
        elevation: 2,
        justifyContent: 'space-between',
        marginBottom:-10,
        borderWidth:1,
        borderColor:'rgba(240,240,240,0.8)',

    },
    txtcontent: {
        marginTop: 0,
        fontSize: 16,
        color: 'black',
        fontWeight: '100',
        marginHorizontal:10
    },
    txtsuitcontent: {
        padding: 0,
        fontSize: 12,
        color: 'gray',
    },
    txtNumber: {
        padding: 0,
        fontSize: 16,
        color: '#00E63A',
        marginRight: 10,
    }
})

export default indexItembutton2