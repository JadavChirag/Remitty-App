import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import TextIconButton from '../componentItem/balance/TextIconButton'
import GradiantButton from '../componentItem/balance/button'
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler';

import closeIcon from '../../assets/images/icons8-multiply-26.png';

import remittyIcon from '../../assets/images/R.png';

import bitcoinIcon from '../../assets/images/bitcoin.png';
import litecoinIcon from '../../assets/images/litecoin.png';
import ethIcon from '../../assets/images/eth.png';

import bchicon from '../../assets/images/bchicon.png';
import xlmicon from '../../assets/images/xlmicon.png';
import eosicon from '../../assets/images/eosicon.png';
import adaicon from '../../assets/images/adaicon.png';
import atomicon from '../../assets/images/atomicon.png';
import qtumicon from '../../assets/images/qtumicon.png';
import rippleIcon from '../../assets/images/ripple.png';
import zecicon from '../../assets/images/zecicon.png';
import dashicon from '../../assets/images/dashicon.png';

import usdicon from '../../assets/images/usdicon.png';
import euricon from '../../assets/images/euricon.png';
import cadicon from '../../assets/images/cadicon.png';


import daiicon from '../../assets/images/daiicon.png';
import usdcicon from '../../assets/images/usdcicon.png';
import etcicon from '../../assets/images/etcicon.png';

import linkicon from '../../assets/images/linkicon.png';
import baticon from '../../assets/images/baticon.png';
import repicon from '../../assets/images/repicon.png';
import zrxicon from '../../assets/images/zrxicon.png';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;



type Props = {};

export default class DipositeScreen extends Component<Props> {


    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.container}>

                        <TextIconButton
                            textTitle="RHT"
                            textSub="Remitty"
                            textNumber="Withdraw"
                            icon={remittyIcon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"RHT"})}
                        />


                        <TextIconButton
                            textTitle="BTC"
                            textSub="Bitcoin"
                            textNumber="Withdraw"
                            icon={bitcoinIcon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"BTC"})}
                        />
                        <TextIconButton
                            textTitle="LTE"
                            textSub="Lite coin"
                            textNumber="Withdraw"
                            icon={litecoinIcon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"LTC"})}
                        />
                        <TextIconButton
                            textTitle="ETH"
                            textSub="Ethereum"
                            textNumber="Withdraw"
                            icon={ethIcon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"ETH"})}
                        />




                        <TextIconButton
                            textTitle="BCH"
                            textSub="Bitcoin cash"
                            textNumber="Withdraw"
                            icon={bchicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"BCH"})}
                        />

                        <TextIconButton
                            textTitle="XLM"
                            textSub="Stellar"
                            textNumber="Withdraw"
                            icon={xlmicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"XLM"})}
                        />

                         <TextIconButton
                            textTitle="EOS"
                            textSub="EOS"
                            textNumber="Withdraw"
                            icon={eosicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"EOS"})}
                        />

                        <TextIconButton
                            textTitle="ADA"
                            textSub="Cardano"
                            textNumber="Withdraw"
                            icon={adaicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"ADA"})}
                        />

                        <TextIconButton
                            textTitle="ATOM"
                            textSub="Atomiccoin"
                            textNumber="Withdraw"
                            icon={atomicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"ATOM"})}
                        />

                        <TextIconButton
                            textTitle="QTUM"
                            textSub="Cardano"
                            textNumber="Withdraw"
                            icon={qtumicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"QTUM"})}
                        />

                        <TextIconButton
                            textTitle="XRP"
                            textSub="Ripple"
                            textNumber="Withdraw"
                            icon={rippleIcon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"XRP"})}
                        />

                        <TextIconButton
                            textTitle="ZEC"
                            textSub="ZEC"
                            textNumber="Withdraw"
                            icon={zecicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"ZEC"})}
                        />

                        <TextIconButton
                            textTitle="DASH"
                            textSub="Dash coin"
                            textNumber="Withdraw"
                            icon={dashicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"DASH"})}
                        />


                        <TextIconButton
                            textTitle="DAI"
                            textSub="Dai"
                            textNumber="Withdraw"
                            icon={daiicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"DAI"})}
                        />
                        <TextIconButton
                            textTitle="USDC"
                            textSub="USD coin"
                            textNumber="Withdraw"
                            icon={usdcicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"USDC"})}
                        />
                        <TextIconButton
                            textTitle="ETC"
                            textSub="Ethereum classic"
                            textNumber="Withdraw"
                            icon={etcicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"ETC"})}
                        />

                        <TextIconButton
                            textTitle="LINK"
                            textSub="Chainlink"
                            textNumber="Withdraw"
                            icon={linkicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"LINK"})}
                        />
                        <TextIconButton
                            textTitle="BAT"
                            textSub="Basic Attention Token"
                            textNumber="Withdraw"
                            icon={baticon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"BAT"})}
                        />
                        <TextIconButton
                            textTitle="REP"
                            textSub="Augur"
                            textNumber="Withdraw"
                            icon={repicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"REP"})}
                        />
                        <TextIconButton
                            textTitle="ZRX"
                            textSub="0x"
                            textNumber="Withdraw"
                            icon={zrxicon}
                            onPress={() => this.props.navigation.navigate('cryptocurrencyWithdraw',{currency:"ZRX"})}
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
        paddingTop: MH*0.6,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingBottom:30
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
