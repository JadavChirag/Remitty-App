/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import TextIconButton from '../componentItem/indexItemButton'
import TextIconButtonSnd from '../componentItem/indexItemButton2'
import GradiantButton from '../componentItem/gradiantButton'
import LinearGradient from 'react-native-linear-gradient'
import LineChart from "react-native-responsive-linechart";


import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import walletsIcon from '../../assets/images/wallet.png';
import historyIcon from '../../assets/images/History.png';
import settingIcon from '../../assets/images/setting.png';
import sendMoneyIcon from '../../assets/images/sendMoney.png';
import cryptoIcon from '../../assets/images/cashloan.png';
import tradeExchangeIcon from '../../assets/images/tradeExchange.png';
import cashInIcon from '../../assets/images/cashIn.png';
import modeIcon from '../../assets/images/mode.png';
import { ScrollView } from 'react-native-gesture-handler';

const data = [-10, -15, 13, 21, 11, 12, 15,-10, -15, 13, 21, 11, 12, 15];
const labels = ["jan", "feb", "mar", "apr", "may", "jun", "jul","jan", "feb", "mar", "apr", "may", "jun", "jul"];
const config = {
  line: {
    visible: true,
    strokeWidth: 2,
    strokeColor: "#341f97"
  },
  area: {
    visible: false
  },
  yAxis: {
    visible: true,
    labelFormatter: v => String(v) + " °C"
  },
  xAxis: {
    visible: true
  },
  grid: {
    stepSize: 15
  },
  insetY: 10,
  insetX: 10
};

type Props = {};
export default class Index extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      
        <ScrollView >
          <View style={styles.container}>
           
            <View style={styles.containerChart}>
             
            
              <LineChart style={{ flex: 1, marginBottom: 50 }} config={config} data={data} xLabels={labels} />
            </View>
           
            <View style={{ marginTop: 20, flexDirection: 'row' }} >
              <TextIconButtonSnd
                textTitle="Trade"
                textSub="Change Cryptos"
                icon={tradeExchangeIcon}
                onPress={() => this.props.navigation.navigate('PostList', { filter: 'Buy' })}
              />
              <TextIconButtonSnd
                textTitle="Cash In"
                textSub="Cash Out"
                icon={cashInIcon}
                onPress={() => this.props.navigation.navigate('PostList', { filter: 'Buy' })}
              />
            </View>
            <View style={{ marginTop: -10, flexDirection: 'row', marginBottom: 10 }} >
              <GradiantButton
                textIndo="Pay"
                onPress={() => this.props.navigation.navigate('PostList', { filter: 'Buy' })}
              />
              <GradiantButton
                textIndo="Request"
                onPress={() => this.props.navigation.navigate('PostList', { filter: 'Buy' })}
              />
            </View>
          </View>
        </ScrollView>
        <Header navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: LW,
    height: LH,
    paddingTop: MH,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  containersub: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  containerChart: {
    alignItems: 'center', 
    borderRadius: 10, 
    backgroundColor: 'white', 
    width: '90%', 
    height: 400, 
    paddingHorizontal: 15, 
    elevation: 5, 
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3, marginTop: 10,
    borderWidth:1,
    borderColor:'rgba(240,240,240,0.8)',
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
  linearGradient: {
    width: '100%',

    height: 40,
    justifyContent: 'center',

  },
  title:{ 
    fontWeight: "600", 
    fontSize: 18, 
    color: '#8D006D' 
  },
  periodType:{ 
    fontWeight: "400", 
    fontSize: 14, 
    color: 'black', 
    marginTop: 20,
     marginHorizontal: 10, 
    }
});
