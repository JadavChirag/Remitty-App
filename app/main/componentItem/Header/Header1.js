import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import Constant from "@common/Constant";
const LW = Constant.window.width;
const LH = Constant.window.height;
const RateWH = LH / LW;
export default class Header1 extends React.Component {
  render() {
    var { title } = this.props;
    return (
      <View style={{ position: 'absolute', width: '100%', height: 80, left: 0, top: 0, backgroundColor: '#f00' }}>
        <View
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 0 : 20,
            left: 0,
          }}>
          <View
            style={{
              height: 60,
              width: 60,
              paddingLeft: 15,
              alignItem: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 18,
                height: 12,
              }}
            ></View>
          </View>
        </View>
        <View
          style={{
            alignItem: 'center',
            justifyContent: 'center',
            width: '100%',
            flexDirection: 'row',
            marginTop: Platform.OS === 'ios' ? 0 : 20,
            paddingTop: 10,
            backgroundColor: '#f00'
          }}>
          <Image
            source={require('../../../assets/images/titlelogo.png')}
            style={{
              marginTop: 5,
              width: 35,
              height: 35,
              resizeMode: 'contain'
            }}
          />
        </View>
      </View>
    );
  }
}

