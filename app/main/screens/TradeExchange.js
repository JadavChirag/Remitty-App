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
    ScrollView
} from 'react-native';
import TextIconButton from '../componentItem/TradeExchange/TextIconButton'
import GradiantButton from '../componentItem/gradiantButton'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import bitcoinIcon from '../../assets/images/bitcoin.png';
import ethIcon from '../../assets/images/eth.png';
import litecoinIcon from '../../assets/images/litecoin.png';
import remittyIcon from '../../assets/images/R.png';
import rippleIcon from '../../assets/images/ripple.png';
import tradeExchangeIcon from '../../assets/images/tradeExchange.png';
import cashInIcon from '../../assets/images/cashIn.png';


type Props = {};
export default class BalanceScreen extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.containerSub}>
                      
                        <GradiantButton
                            textIndo="Exchange crypto"
                            onPress={() => this.props.navigation.navigate('Select')}
                        />
                  
                </View>

                <ScrollView >
                    <View style={styles.container}>
                        <TextIconButton
                            textTitle="RHT"
                            textSub="Remitty"
                            textNumber="0.0"
                            icon={remittyIcon}
                            onPress={() => this.props.navigation.navigate('BuySell')}
                        />
                        <TextIconButton
                            textTitle="BTC"
                            textSub="Bitcoin"
                            textNumber="0.0"
                            icon={bitcoinIcon}
                            onPress={() => this.props.navigation.navigate('BuySell')}
                        />
                        <TextIconButton
                            textTitle="ETH"
                            textSub="Ethereum"
                            textNumber="0.0"
                            icon={ethIcon}
                            onPress={() => this.props.navigation.navigate('BuySell')}
                        />
                        <TextIconButton
                            textTitle="LTE"
                            textSub="Lite coin"
                            textNumber="0.0"
                            icon={litecoinIcon}
                            onPress={() => this.props.navigation.navigate('BuySell')}
                        />
                        <TextIconButton
                            textTitle="XRP"
                            textSub="Ripple"
                            textNumber="0.0"
                            icon={rippleIcon}
                            onPress={() => this.props.navigation.navigate('BuySell')}
                        />
                        <TextIconButton
                            textTitle="ETH"
                            textSub="Ethereum"
                            textNumber="0.0"
                            icon={ethIcon}
                            onPress={() => this.props.navigation.navigate('BuySell')}
                        />
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
        paddingBottom:10

    },
    containerSub: {
        width: '100%',
        paddingHorizontal: 0,
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 20,
     //   justifyContent: 'space-between',
        marginBottom: 5,
        justifyContent:'flex-end'
    },
    title: {
        fontWeight: "600",
        fontSize: 24,
        color: '#8D006D',

    },
    txtSub: {
        fontWeight: "400",
        fontSize: 18,
        color: 'black',

    },

});
