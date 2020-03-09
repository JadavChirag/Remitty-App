import React from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Image
} from 'react-native'

const indexItembutton2 = ({ textTitle, textSub,textNumber, onPress, icon }) => {

    return (
        <TouchableOpacity onPress={() => onPress()}>


            <View style={styles.textcontainer}>
                <View style={{ flexDirection: 'row' }}>
                    
                    <View style={{alignItems: 'center',justifyContent:'center'}}>
                        <Text style={styles.txtcontent}>{textTitle}</Text>
                        
                    </View>
                </View>
               
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    textcontainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: 60,
        height: 30,
        backgroundColor: '#EC46A2',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,

    },
    txtcontent: {
        marginTop: 0,
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        alignItems: 'center',
    },
    txtsuitcontent: {
        padding: 0,
        fontSize: 12,
        color: 'gray',
        backgroundColor:'#EC45A0'
    },
    txtNumber: {
        padding: 0,
        fontSize: 16,
        color: 'black',
        marginRight:10,
    }
})

export default indexItembutton2