import React from 'react'
import { 
    Text, 
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Image
} from 'react-native'

const indexItembutton2 = ({ textTitle, textSub, onPress, icon,imagestyle }) => {

    return (
        <TouchableOpacity onPress={() => onPress() }>
            <View style={{ marginBottom: 5 }}>
                <View style={styles.textcontainer}>
                    <Text style={styles.txtcontent}>{textTitle}</Text>
                    <Text style={styles.txtsuitcontent}>{textSub}</Text>
                    <Image source={icon}
                        style={[imagestyle,{ width: 48,height:48,marginTop:4}]} />
                </View>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    textcontainer: {
        flexDirection: 'column',
        marginTop: 0,
        width: 160,
        height: 80,
        // borderRadius:15,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        marginHorizontal:15,
        elevation: 5,
        borderWidth:1,
        borderColor:'rgba(240,240,240,0.8)',
      },
      txtcontent: {
        marginTop: 5,
        fontSize: 20,
        color: '#fe02a2',
        
      },
      txtsuitcontent: {
        padding: 3,
        fontSize: 20,
        color: '#fe02a2',
        fontWeight:'800'
      }
})

export default indexItembutton2