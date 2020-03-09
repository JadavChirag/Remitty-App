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
import stringsoflanguages from './stringsoflanguages';
import bitcoinIcon from '../../assets/images/bitcoin.png';
import ethIcon from '../../assets/images/eth.png';
import litecoinIcon from '../../assets/images/litecoin.png';
import remittyIcon from '../../assets/images/R.png';
import rippleIcon from '../../assets/images/ripple.png';
import usdicon from '../../assets/images/usdicon.png';
import euricon from '../../assets/images/euricon.png';
import cadicon from '../../assets/images/cadicon.png';

import atomicon from '../../assets/images/atomicon.png';

import daiicon from '../../assets/images/daiicon.png';
import usdcicon from '../../assets/images/usdcicon.png';
import etcicon from '../../assets/images/etcicon.png';

import linkicon from '../../assets/images/linkicon.png';
import baticon from '../../assets/images/baticon.png';
import repicon from '../../assets/images/repicon.png';
import zrxicon from '../../assets/images/zrxicon.png';

import bchicon from '../../assets/images/bchicon.png';
import xlmicon from '../../assets/images/xlmicon.png';
import eosicon from '../../assets/images/eosicon.png';
import adaicon from '../../assets/images/adaicon.png';
import qtumicon from '../../assets/images/qtumicon.png';
import zecicon from '../../assets/images/zecicon.png';
import dashicon from '../../assets/images/dashicon.png';
import xaficon from '../../assets/images/xaficon.png';
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
                            textNumber={stringsoflanguages.Request}
                            icon={remittyIcon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"RHT"})}
                        />
                        <TextIconButton
                            textTitle="BTC"
                            textSub="Bitcoin"
                            textNumber={stringsoflanguages.Request}
                            icon={bitcoinIcon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"BTC"})}
                        />
                        <TextIconButton
                            textTitle="LTC"
                            textSub="Lite coin"
                            textNumber={stringsoflanguages.Request}
                            icon={litecoinIcon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"LTC"})}
                        />
                        <TextIconButton
                            textTitle="ETH"
                            textSub="Ethereum"
                            textNumber={stringsoflanguages.Request}
                            icon={ethIcon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"ETH"})}
                        />


                        <TextIconButton
                            textTitle="BCH"
                            textSub="Bitcoin cash"
                            textNumber={stringsoflanguages.Request}
                            icon={bchicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"BCH"})}
                        />

                        <TextIconButton
                            textTitle="XLM"
                            textSub="Stellar"
                            textNumber={stringsoflanguages.Request}
                            icon={xlmicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"XLM"})}
                        />

                         <TextIconButton
                            textTitle="EOS"
                            textSub="EOS"
                            textNumber={stringsoflanguages.Request}
                            icon={eosicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"EOS"})}
                        />

                        <TextIconButton
                            textTitle="ADA"
                            textSub="Cardano"
                            textNumber={stringsoflanguages.Request}
                            icon={adaicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"ADA"})}
                        />

                        <TextIconButton
                            textTitle="ATOM"
                            textSub="Atomiccoin"
                            textNumber={stringsoflanguages.Request}
                            icon={atomicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"ATOM"})}
                        />

                        <TextIconButton
                            textTitle="QTUM"
                            textSub="Cardano"
                            textNumber={stringsoflanguages.Request}
                            icon={qtumicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"QTUM"})}
                        />

                        <TextIconButton
                            textTitle="XRP"
                            textSub="Ripple"
                            textNumber={stringsoflanguages.Request}
                            icon={rippleIcon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"XRP"})}
                        />

                        <TextIconButton
                            textTitle="ZEC"
                            textSub="ZEC"
                            textNumber={stringsoflanguages.Request}
                            icon={zecicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"ZEC"})}
                        />

                         <TextIconButton
                            textTitle="DASH"
                            textSub="Dash coin"
                            textNumber={stringsoflanguages.Request}
                            icon={dashicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"DASH"})}
                        />


                        <TextIconButton
                            textTitle="USD"
                            textSub="USD"
                            textNumber={stringsoflanguages.Request}
                            icon={usdicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"USD"})}
                        />

                        <TextIconButton
                            textTitle="EUR"
                            textSub="EUR"
                            textNumber={stringsoflanguages.Request}
                            icon={euricon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"EUR"})}
                        />

                         <TextIconButton
                            textTitle="XAF"
                            textSub="XAF"
                            textNumber={stringsoflanguages.Request}
                            icon={xaficon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"XAF"})}
                        />


                        <TextIconButton
                            textTitle="DAI"
                            textSub="Dai"
                            textNumber={stringsoflanguages.Request}
                            icon={daiicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"DAI"})}
                        />
                        <TextIconButton
                            textTitle="USDC"
                            textSub="USD coin"
                            textNumber={stringsoflanguages.Request}
                            icon={usdcicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"USDC"})}
                        />
                        <TextIconButton
                            textTitle="ETC"
                            textSub="Ethereum classic"
                            textNumber={stringsoflanguages.Request}
                            icon={etcicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"ETC"})}
                        />

                        <TextIconButton
                            textTitle="LINK"
                            textSub="Chainlink"
                            textNumber={stringsoflanguages.Request}
                            icon={linkicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"LINK"})}
                        />
                        <TextIconButton
                            textTitle="BAT"
                            textSub="Basic Attention Token"
                            textNumber={stringsoflanguages.Request}
                            icon={baticon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"BAT"})}
                        />
                        <TextIconButton
                            textTitle="REP"
                            textSub="Augur"
                            textNumber={stringsoflanguages.Request}
                            icon={repicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"REP"})}
                        />
                        <TextIconButton
                            textTitle="ZRX"
                            textSub="0x"
                            textNumber={stringsoflanguages.Request}
                            icon={zrxicon}
                            onPress={() => this.props.navigation.navigate('currencyWithdraw',{currency:"ZRX"})}
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
