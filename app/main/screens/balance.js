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
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    AsyncStorage
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
import tradeExchangeIcon from '../../assets/images/tradeExchange.png';
import cashInIcon from '../../assets/images/cashIn.png';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;

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

type Props = {};
export default class BalanceScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = { 
            curprice:0,
            isLoading: true, 
            btc_balance: 0, ltc_balance: 0, eth_balance: 0, rht_balance: 0, usd_balance: 0, eur_balance: 0, cad_balance: 0, dai_balance: 0, usdc_balance: 0, etc_balance: 0, link_balance: 0, bat_balance: 0, rep_balance: 0, zrx_balance: 0, xlm_balance: 0, eos_balance: 0, bch_balance: 0, ada_balance: 0, qtum_balance: 0, xrp_balance: 0, zec_balance: 0, dash_balance: 0, atom_balance: 0, xaf_balance: 0, showme: true, user_id: 0, est_balance: 0 };

    }


    balance = (token) => {
        try {
            fetch(Constant.req_url + "getbalance", {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    token: token
                }),
            }).then((response) => response.json())
                .then((res => {
                    // alert(JSON.stringify(res))
                    if (res.status) {
                        var btcindex = res.result.findIndex(x => x.currency === 'BTC');
                        var bchindex = res.result.findIndex(x => x.currency === 'BCH');
                        var ltcindex = res.result.findIndex(x => x.currency === 'LTC');
                        var ethindex = res.result.findIndex(x => x.currency === 'ETH');
                        var usdindex = res.result.findIndex(x => x.currency === 'USD');
                        var eurindex = res.result.findIndex(x => x.currency === 'EUR');
                        var cadindex = res.result.findIndex(x => x.currency === 'CAD');
                        var daiindex = res.result.findIndex(x => x.currency === 'DAI');
                        var usdcindex = res.result.findIndex(x => x.currency === 'USDC');
                        var etcindex = res.result.findIndex(x => x.currency === 'ETC');
                        var linkindex = res.result.findIndex(x => x.currency === 'LINK');
                        var batindex = res.result.findIndex(x => x.currency === 'BAT');
                        var repindex = res.result.findIndex(x => x.currency === 'REP');
                        var zrxindex = res.result.findIndex(x => x.currency === 'ZRX');
                        var xlmindex = res.result.findIndex(x => x.currency === 'XLM');
                        var rhtindex = res.result.findIndex(x => x.currency === 'RHT');
                        var eosindex = res.result.findIndex(x => x.currency === 'EOS');
                        var adaindex = res.result.findIndex(x => x.currency === 'ADA');
                        var qtumindex = res.result.findIndex(x => x.currency === 'QTUM');
                        var xrpindex = res.result.findIndex(x => x.currency === 'XRP');
                        var zecindex = res.result.findIndex(x => x.currency === 'ZEC');
                        var dashindex = res.result.findIndex(x => x.currency === 'DASH');
                        var atomindex = res.result.findIndex(x => x.currency === 'ATOM');
                        var xafindex = res.result.findIndex(x => x.currency === 'XAF');

                        this.setState({
                            btc_balance: parseFloat(res.result[btcindex].balance).toFixed(8),
                            ltc_balance: parseFloat(res.result[ltcindex].balance).toFixed(8),
                            usd_balance: parseFloat(res.result[usdindex].balance).toFixed(8),
                            eur_balance: parseFloat(res.result[eurindex].balance).toFixed(8),
                            cad_balance: parseFloat(res.result[cadindex].balance).toFixed(8),
                            dai_balance: parseFloat(res.result[daiindex].balance).toFixed(8),
                            usdc_balance: parseFloat(res.result[usdcindex].balance).toFixed(8),
                            etc_balance: parseFloat(res.result[etcindex].balance).toFixed(8),
                            link_balance: parseFloat(res.result[linkindex].balance).toFixed(8),
                            bat_balance: parseFloat(res.result[batindex].balance).toFixed(8),
                            rep_balance: parseFloat(res.result[repindex].balance).toFixed(8),
                            zrx_balance: parseFloat(res.result[zrxindex].balance).toFixed(8),
                            xlm_balance: parseFloat(res.result[xlmindex].balance).toFixed(8),
                            rht_balance: parseFloat(res.result[rhtindex].balance).toFixed(8),
                            eos_balance: parseFloat(res.result[eosindex].balance).toFixed(8),
                            bch_balance: parseFloat(res.result[bchindex].balance).toFixed(8),
                            ada_balance: parseFloat(res.result[adaindex].balance).toFixed(8),
                            qtum_balance: parseFloat(res.result[qtumindex].balance).toFixed(8),
                            xrp_balance: parseFloat(res.result[xrpindex].balance).toFixed(8),
                            zec_balance: parseFloat(res.result[zecindex].balance).toFixed(8),
                            dash_balance: parseFloat(res.result[dashindex].balance).toFixed(8),
                            atom_balance: parseFloat(res.result[atomindex].balance).toFixed(8),
                            xaf_balance: parseFloat(res.result[xafindex].balance).toFixed(8),
                            eth_balance: parseFloat(res.result[ethindex].balance).toFixed(8)

                        });

                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }

    }
    estbalance = (token) => {
        try {
            fetch(Constant.req_url + "getestimatedbalance", {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    token: token
                }),
            }).then((response) => response.json())
                .then((res => {

                    if (res.status) {

                        this.setState({
                            est_balance: parseFloat(res.result).toFixed(8),
                        });

                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }

    }
    componentDidMount() {
        this.initializefun();
        // try {
        //     fetch(Constant.token_url, {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             email: Constant.authemail,
        //             password: Constant.authpass,
        //         }),
        //     }).then((response) => response.json())
        //         .then((res => {
        //             if (res.status) {
        //                 this.getprice(res.token);
        //             }
        //             else {
        //                 // alert(JSON.stringify(res));
        //             }
        //         })
        //         )
        // }
        // catch (e) {
        //     alert(e)
        // }
    }
    getprice = (token) => {
        try {
            fetch(Constant.req_url+"getconversionprice", {
                method: 'POST',
                body: JSON.stringify({
                    user_id         :   this.state.user_id,
                    fromcurrency    :   'BTC',
                    tocurrency      :   'USD',
                    token           :   token
                }),
            }).then((response) => response.json())
                .then((res => {
                    // alert(JSON.stringify(res))
                    // return
                    this.setState({ curprice : parseFloat(res).toFixed(8) });
                })
            );
        }
        catch (e) {
            alert(e)
        }
    }  
    initializefun = async () => {
        var user_id = await AsyncStorage.getItem('user_id');
        var username = await AsyncStorage.getItem('username');

        this.setState({
            user_id: await AsyncStorage.getItem('user_id')
        })
        try {
            fetch(Constant.token_url, {
                method: 'POST',
                body: JSON.stringify({
                    email: Constant.authemail,
                    password: Constant.authpass,
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.balance(res.token);
                        this.estbalance(res.token);
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }
    }
    componentWillMount() {
        setTimeout(() => {
            this.setState({
                showme: false
            })
        }, 3000)
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.showme ? <ActivityIndicator style={{ flex: 1 }} size="large" /> :
                        <View style={styles.container}>
                            <View style={styles.containerSub}>
                                <View style={{ flex: 1, marginRight: 40, alignItems: 'center' }}>
                                    <Text style={styles.txtSub}>Balance</Text>
                                </View>
                                <View style={{ marginRight: 20, flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('Deposit')}
                                        style={{ backgroundColor: '#800080', height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 2, width: 90 }}>
                                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', paddingHorizontal: 10, }}>
                                            Deposit
                            </Text>
                                    </TouchableOpacity>
                                    <View style={{ width: 10 }}></View>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('WithDrawCrypto')}
                                        style={{ backgroundColor: '#00ff00', height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 2, width: 90 }}>
                                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', paddingHorizontal: 10, }}>
                                            Withdraw
                            </Text>
                                    </TouchableOpacity>
                                    {/* <GradiantButton
                            textIndo="Deposit"
                            onPress={() => this.props.navigation.navigate('Deposit')}
                        />
                        <GradiantButton
                            textIndo="Withdraw"
                            onPress={() => this.props.navigation.navigate('WithDrawCrypto')}
                        /> */}
                                </View>
                            </View>

                            <ScrollView >
                                <View style={styles.container}>

                                    <View style={{
                                        alignItems: 'center', borderRadius: 10, backgroundColor: 'white', width: '100%', height: 90, paddingHorizontal: 15, elevation: 5, shadowOffset: { height: 2 },
                                        shadowOpacity: 0.3, marginTop: 10, marginBottom: 20, borderWidth: 1,
                                        borderColor: 'rgba(240,240,240,0.8)',
                                    }}>
                                        <Text style={{ fontWeight: "200", fontSize: 18, color: '#1A1F84', marginTop: 3 }}>Estimate Balance</Text>
                                        <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 3 }}> {this.state.est_balance + " USD"} </Text>

                                    </View>
                                    <TextIconButton
                                        textTitle="RHT"
                                        textSub="Remitty"
                                        textNumber={this.state.rht_balance}
                                        icon={remittyIcon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />
                                    <TextIconButton
                                        textTitle="BTC"
                                        textSub="Bitcoin"
                                        textNumber={this.state.btc_balance}
                                        icon={bitcoinIcon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />
                                    <TextIconButton
                                        textTitle="ETH"
                                        textSub="Ethereum"
                                        textNumber={this.state.eth_balance}
                                        icon={ethIcon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />
                                    <TextIconButton
                                        textTitle="LTC"
                                        textSub="Lite coin"
                                        textNumber={this.state.ltc_balance}
                                        icon={litecoinIcon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />
                                    <TextIconButton
                                        textTitle="USD"
                                        textSub="US Doller"
                                        textNumber={this.state.usd_balance}
                                        icon={usdicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="EUR"
                                        textSub="Euro"
                                        textNumber={this.state.eur_balance}
                                        icon={euricon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />


                                    <TextIconButton
                                        textTitle="XAF"
                                        textSub="XAF"
                                        textNumber={this.state.xaf_balance}
                                        icon={xaficon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="BCH"
                                        textSub="BCH"
                                        textNumber={this.state.bch_balance}
                                        icon={bchicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="XLM"
                                        textSub="XLM"
                                        textNumber={this.state.xlm_balance}
                                        icon={xlmicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="ZEC"
                                        textSub="ZEC"
                                        textNumber={this.state.zec_balance}
                                        icon={zecicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="XRP"
                                        textSub="Ripple"
                                        textNumber={this.state.xrp_balance}
                                        icon={rippleIcon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="EOS"
                                        textSub="EOS"
                                        textNumber={this.state.eos_balance}
                                        icon={eosicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="ADA"
                                        textSub="Cardano"
                                        textNumber={this.state.ada_balance}
                                        icon={adaicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="QTUM"
                                        textSub="QTUM"
                                        textNumber={this.state.qtum_balance}
                                        icon={qtumicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />


                                    <TextIconButton
                                        textTitle="DASH"
                                        textSub="DASH"
                                        textNumber={this.state.dash_balance}
                                        icon={dashicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="DAI"
                                        textSub="DAI"
                                        textNumber={this.state.dai_balance}
                                        icon={daiicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="USDC"
                                        textSub="USD Coin"
                                        textNumber={this.state.dai_balance}
                                        icon={usdcicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="ATOM"
                                        textSub="Atomiccoin"
                                        textNumber={this.state.atom_balance}
                                        icon={atomicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="ETC"
                                        textSub="Ethereum Classic"
                                        textNumber={this.state.usdc_balance}
                                        icon={usdcicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="LINK"
                                        textSub="Chainlink"
                                        textNumber={this.state.link_balance}
                                        icon={linkicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="BAT"
                                        textSub="Basic Attention Token"
                                        textNumber={this.state.bat_balance}
                                        icon={baticon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />
                                    <TextIconButton
                                        textTitle="REP"
                                        textSub="Augur"
                                        textNumber={this.state.rep_balance}
                                        icon={repicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />

                                    <TextIconButton
                                        textTitle="ZRX"
                                        textSub="0x"
                                        textNumber={this.state.zrx_balance}
                                        icon={zrxicon}
                                        onPress={() => this.props.navigation.navigate('PostList')}
                                    />
                                    <View style={{ height: 15 }}></View>
                                </View>
                            </ScrollView>
                        </View>
                }
                 <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: MH*0.6,
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
