import React from 'react'
import { 
    Text, 
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Image
} from 'react-native'

const indexItembutton2 = ({ textTitle, textSub, onPress, icon }) => {

    return (
        <TouchableOpacity onPress={() => onPress() }>
            <View style={{ marginBottom: 5 }}>
                <View style={styles.textcontainer}>
                <Image source={icon}
                        style={{ width: 48,height:48,marginTop:-24}} />
                    <Text style={styles.txtcontent}>{textTitle}</Text>
                    <Text style={styles.txtsuitcontent}>{textSub}</Text>
                    
                </View>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    textcontainer: {
        flexDirection: 'column',
        marginTop: 0,
        width: 105,
        height: 85,
        borderRadius:15,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        marginHorizontal:6,
        elevation: 5,
        borderWidth:1,
        borderColor:'rgba(240,240,240,0.8)',
      },
      txtcontent: {
        marginTop: 5,
        fontSize: 18,
        color: 'black',
        fontWeight:'500'
      },
      txtsuitcontent: {
        padding: 3,
        fontSize: 14,
        color: 'black',
        fontWeight:'100'
      }
})

export default indexItembutton2