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

import GradiantButton from '../componentItem/Select/gradiantButton'
import TextIconButtonSnd from '../componentItem/Select/IconTextbutton'
import TextButton from '../componentItem/Select/TextButton'

import bitcoinIcon from '../../assets/images/bitcoin.png';
import ethIcon from '../../assets/images/eth.png';
import RemityIcon from '../../assets/images/R.png';
import ArroryIcon from '../../assets/images/arrowdown.png';
import ExchangeIcon from '../../assets/images/exchange.png';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
type Props = {};
export default class SelectScreen extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                {/* <Text style={[styles.title, { marginTop: 30 }]}>Select Market</Text> */}
                {/* <View style={{ flexDirection: 'row', marginTop: 25 }}>
                    <TextIconButtonSnd
                        textTitle="Remitty (RHT)"
                        textSub="Market"
                        icon={RemityIcon}
                        onPress={() => this.props.navigation.navigate('PostList', { filter: 'Buy' })}
                    />
                    <TextIconButtonSnd
                        textTitle="Bitcoin (BTC)"
                        textSub="Market"
                        icon={bitcoinIcon}
                        onPress={() => this.props.navigation.navigate('PostList', { filter: 'Buy' })}
                    />
                    <TextIconButtonSnd
                        textTitle="Ethereum (ETH)"
                        textSub="Market"
                        icon={ethIcon}
                        onPress={() => this.props.navigation.navigate('PostList', { filter: 'Buy' })}
                    />
                </View> */}
                <Text style={[styles.title, { marginTop: 35,fontSize:26,fontWeight:'900' }]}>Exchange  Your  Cryptos</Text>
                <TextButton
                    textTitle="Send"
                    textSub="ETH"
                    icon={ArroryIcon}
                    onPress={() => this.props.navigation.navigate('PostList')}
                />
                <View style={[styles.containerSub, { flexDirection: 'row', marginTop: 10,marginRight:30 }]}>
                    <Text ></Text>
                    <Image source={ExchangeIcon}
                        style={{ width: 24, height: 24, marginVertical: 10 }} />
                </View>
                <TextButton
                 textTitle="Get"
                 textSub="BTC"
                 icon={ArroryIcon}
                 onPress={() => this.props.navigation.navigate('PostList')}
                />
                <GradiantButton
                    textIndo="Exchange NOW"
                    onPress={() => this.props.navigation.navigate('PostList', { filter: 'Buy' })}
                />
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
    containerSub: {
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        fontWeight: "bold",
        color: 'black'
    },
    txtsub: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        fontWeight: "600",
        color: 'black'
    },
});
