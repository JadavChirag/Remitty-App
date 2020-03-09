/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Rave from 'react-native-rave';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        const amount = this.props.navigation.getParam('amount');
        const currency = this.props.navigation.getParam('currency');
        const country = this.props.navigation.getParam('country');
        this.state={
          amount: amount,
          currency: currency,
          country: country
        }
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
      }
    
      onSuccess(data) {
        alert("sucess")
        console.log("success", data);
    
      }
    
      onFailure(data) {
        alert(data.message)
        console.log("error", data);
      }
      onClose(val){
        this.props.navigation.navigate('InputRave',{date: new Date()})
      }
  render() {
    return (
        <Rave 
        amount={this.state.amount} //c
        country={this.state.country} //c
        currency={this.state.currency} //c
        email="remittyinc@yahoo.com" 
        firstname="Oluwole" 
        lastname="Adebiyi" 
        publickey="FLWPUBK_TEST-fc1356183ca31a6b449d32d06aadf597-X" 
        secretkey="FLWSECK_TEST-540e40f66b92934b9764334f6f8cf626-X"
        encryptionkey="FLWSECK_TESTfde803baf423"//important
        paymenttype="both"
        meta={[{ metaname: "color", metavalue: "red" }, { metaname: "storelocation", metavalue: "ikeja" }]}
        production={false} 
        onSuccess={res => this.onSuccess(res)} 
        onFailure={e => this.onFailure(e)}
        onClose={(val)=> this.onClose(val)}
        primarycolor='#3244C2'
        secondarycolor='#ffffff'
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: LW,
        height: LH,
        paddingTop: MH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
