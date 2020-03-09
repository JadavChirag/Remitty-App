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
    View
} from 'react-native';
import TextIconButton from '../componentItem/balance/TextIconButton'
import GradiantButton from '../componentItem/CryptoCashloans/button'
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler';

import bitcoinIcon from '../../assets/images/bitcoin.png';
import ethIcon from '../../assets/images/eth.png';
import litecoinIcon from '../../assets/images/litecoin.png';
import remittyIcon from '../../assets/images/R.png';
import rippleIcon from '../../assets/images/ripple.png';
import tradeExchangeIcon from '../../assets/images/tradeExchange.png';
import cashInIcon from '../../assets/images/cashIn.png';

import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
type Props = {};
export default class BalanceScreen extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.containerSub}>

                    <View style={{ marginRight: 0, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                        <GradiantButton
                            textIndo="Offer a Loan"
                            onPress={() => this.props.navigation.navigate('Offeraloan')}
                        />
                        <GradiantButton
                            textIndo="Request Loan"
                            onPress={() => this.props.navigation.navigate('Payloan')}
                        />
                    </View>
                </View>

                <ScrollView >
                    <View style={[styles.container, { flexDirection: 'row' }]}>

                        <View style={{
                            alignItems: 'center',
                            borderRadius: 3,
                            backgroundColor: 'white',
                            width: 110, height: 48,
                            paddingHorizontal: 15,
                            elevation: 5,
                            shadowOffset: { height: 2 },
                            shadowOpacity: 0.3,
                            marginTop: 10,
                            marginBottom: 20,
                            borderWidth: 1,
                            borderColor: 'rgba(240,240,240,0.8)',
                        }}>
                            <Text style={{ fontWeight: "200", fontSize: 16, color: '#1A1F84', marginTop: 1 }}>Loan</Text>
                            <Text style={{ fontWeight: "300", fontSize: 14, color: 'black', marginTop: 0 }}>Amount</Text>

                        </View>
                        <View style={{
                            alignItems: 'center',
                            borderRadius: 3,
                            backgroundColor: 'white',
                            width: 110, height: 48,
                            paddingHorizontal: 15,
                            elevation: 5,
                            shadowOffset: { height: 2 },
                            shadowOpacity: 0.3,
                            marginTop: 10,
                            marginBottom: 20,
                            borderWidth: 1,
                            borderColor: 'rgba(240,240,240,0.8)',
                        }}>
                           <Text style={{ fontWeight: "200", fontSize: 16, color: '#1A1F84', marginTop: 1 }}>% Rate</Text>
                            <Text style={{ fontWeight: "300", fontSize: 14, color: 'black', marginTop: 0 }}>Per Month</Text>

                        </View>
                        <View style={{
                            alignItems: 'center',
                            borderRadius: 3,
                            backgroundColor: 'white',
                            width: 110, height: 48,
                            paddingHorizontal: 15,
                            elevation: 5,
                            shadowOffset: { height: 2 },
                            shadowOpacity: 0.3,
                            marginTop: 10,
                            marginBottom: 20,
                            borderWidth: 1,
                            borderColor: 'rgba(240,240,240,0.8)',
                        }}>
                            <Text style={{ fontWeight: "200", fontSize: 16, color: '#1A1F84', marginTop: 10 }}>Get A loan</Text>
                            {/* <Text style={{ fontWeight: "300", fontSize: 18, color: 'black', marginTop: 0 }}>Month</Text> */}

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
    containerSub: {
        width: '100%',
        paddingHorizontal: 0,
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginBottom: 5
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
