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
                <View style={{ flexDirection: 'row' }}>
                   
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.txtcontent}>{textSub}</Text>
                       
                    </View>
                    <Image source={icon}
                        style={{ width: 14, height: 12, marginTop: 5, marginRight: 10,marginLeft:3 }} />
                </View>



            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    textcontainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: Dimensions.get('window').width - 45,
        height: 60,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2},
        shadowOpacity: 0.3,
        paddingLeft: 10,
        elevation: 2,
        justifyContent: 'space-between',
        borderWidth:1,
        borderColor:'rgba(240,240,240,0.8)',
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
        color: '#00E63A',
        marginRight: 10,
    }
})

export default indexItembutton2