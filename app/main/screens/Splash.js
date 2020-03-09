import React from 'react';
import { StyleSheet, Text, View, Image, ProgressBarAndroid } from 'react-native';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class Splash extends React.Component {

  render() {
    return (
      <View style={styles.container}>

        <Image style={styles.logoStyle} source={require('../assets/logo.png')} ></Image>
        <Text style={styles.textStyle}>Welcome to Remitty</Text>

        <ProgressBarAndroid
          styleAttr="Horizontal"
          color="#21CE99"
          style={styles.barStyle}
        />
        <Header navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: LW,
    height: LH,
    paddingTop: MH,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: '#040d14'
  },
  logoStyle: {
    width: 150,
    height: 150,
    marginTop: 170,
  },
  textStyle: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: 20
  },
  barStyle: {
    width: 100,
    marginTop: 250,
  }
});
