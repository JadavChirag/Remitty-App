import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Constant from "@common/Constant";
const LW = Constant.window.width;
const LH = Constant.window.height;
const RateWH = LH / LW;

export default class Tabviewer extends React.Component {

  render() {
    var { state, c1, c2, c3 } = this.props;
    return (
      <View style={{ width: '90%', 
      justifyContent: 'center',
       flexDirection: 'row', 
       alignSelf: 'center',
       marginTop:10,
       }}>
        <TouchableOpacity onPress={c1} style={{
          flex: 1,
          borderBottomWidth:2,
          borderBottomColor:state==1?'white':'gray'

        }}>
          <Text style={{
            color: state == 1 ?'white':'gray',
            textAlign: 'center',
            fontSize: 15,
            paddingVertical: 5,
            fontWeight: state == 1 ? 'bold' : 'normal'
          }}>
            TRADE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={c2} style={{
          flex: 1,
          borderBottomWidth:2,
          borderBottomColor:state==2?'white':'gray'

        }}>
          <Text style={{
            color: state == 2 ?'white':'gray',
            textAlign: 'center',
            fontSize: 15,
            paddingVertical: 5,
            fontWeight: state == 2 ? 'bold' : 'normal'
          }}>
            MY ORDERS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={c3} style={{
          flex: 1,
          borderBottomWidth:2,
          borderBottomColor:state==3?'white':'gray'

        }}>
          <Text style={{
            color: state == 3 ?'white':'gray',
            textAlign: 'center',
            fontSize: 15,
            paddingVertical: 5,
            fontWeight: state == 3 ? 'bold' : 'normal'
          }}>
            BALANCE
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

