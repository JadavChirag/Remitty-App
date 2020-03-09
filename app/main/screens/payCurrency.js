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
                            textNumber="Pay"
                            icon={remittyIcon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"RHT"})}
                        />
                        <TextIconButton
                            textTitle="BTC"
                            textSub="Bitcoin"
                            textNumber="Pay"
                            icon={bitcoinIcon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"BTC"})}
                        />
                        <TextIconButton
                            textTitle="LTC"
                            textSub="Lite coin"
                            textNumber="Pay"
                            icon={litecoinIcon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"LTC"})}
                        />
                        <TextIconButton
                            textTitle="ETH"
                            textSub="Ethereum"
                            textNumber="Pay"
                            icon={ethIcon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"ETH"})}
                        />

                        <TextIconButton
                            textTitle="USD"
                            textSub="USD"
                            textNumber="Pay"
                            icon={usdicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"USD"})}
                        />

                        <TextIconButton
                            textTitle="EUR"
                            textSub="EUR"
                            textNumber="Pay"
                            icon={euricon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"EUR"})}
                        />

                        <TextIconButton
                            textTitle="XAF"
                            textSub="XAF"
                            textNumber="Pay"
                            icon={xaficon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"XAF"})}
                        />


                        <TextIconButton
                            textTitle="BCH"
                            textSub="Bitcoin cash"
                            textNumber="Pay"
                            icon={bchicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"BCH"})}
                        />

                        <TextIconButton
                            textTitle="XLM"
                            textSub="Stellar"
                            textNumber="Pay"
                            icon={xlmicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"XLM"})}
                        />

                         <TextIconButton
                            textTitle="EOS"
                            textSub="EOS"
                            textNumber="Pay"
                            icon={eosicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"EOS"})}
                        />

                        <TextIconButton
                            textTitle="ADA"
                            textSub="Cardano"
                            textNumber="Pay"
                            icon={adaicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"ADA"})}
                        />

                        <TextIconButton
                            textTitle="ATOM"
                            textSub="Atomiccoin"
                            textNumber="Pay"
                            icon={atomicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"ATOM"})}
                        />

                        <TextIconButton
                            textTitle="QTUM"
                            textSub="Cardano"
                            textNumber="Pay"
                            icon={qtumicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"QTUM"})}
                        />

                        <TextIconButton
                            textTitle="XRP"
                            textSub="Ripple"
                            textNumber="Pay"
                            icon={rippleIcon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"XRP"})}
                        />

                        <TextIconButton
                            textTitle="ZEC"
                            textSub="ZEC"
                            textNumber="Pay"
                            icon={zecicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"ZEC"})}
                        />

                        <TextIconButton
                            textTitle="DASH"
                            textSub="Dash coin"
                            textNumber="Pay"
                            icon={dashicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"DASH"})}
                        />


                        <TextIconButton
                            textTitle="DAI"
                            textSub="Dai"
                            textNumber="Pay"
                            icon={daiicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"DAI"})}
                        />
                        <TextIconButton
                            textTitle="USDC"
                            textSub="USD coin"
                            textNumber="Pay"
                            icon={usdcicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"USDC"})}
                        />


                        <TextIconButton
                            textTitle="ETC"
                            textSub="Ethereum classic"
                            textNumber="Pay"
                            icon={etcicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"ETC"})}
                        />

                        <TextIconButton
                            textTitle="LINK"
                            textSub="Chainlink"
                            textNumber="Pay"
                            icon={linkicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"LINK"})}
                        />
                        <TextIconButton
                            textTitle="BAT"
                            textSub="Basic Attention Token"
                            textNumber="Pay"
                            icon={baticon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"BAT"})}
                        />
                        <TextIconButton
                            textTitle="REP"
                            textSub="Augur"
                            textNumber="Pay"
                            icon={repicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"REP"})}
                        />
                        <TextIconButton
                            textTitle="ZRX"
                            textSub="0x"
                            textNumber="Pay"
                            icon={zrxicon}
                            onPress={() => this.props.navigation.navigate('payDirect',{currency:"ZRX"})}
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
