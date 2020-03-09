import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableHighlight,
    Alert,
    Image,
    TextInput,
    Button,
    Clipboard,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';

import QRCode from 'react-native-qrcode';

import { Dialog } from 'react-native-simple-dialogs';

import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import StellarSdk from '@pigzbe/react-native-stellar-sdk';

import TextIconButton from '../componentItem/balance/TextIconButton'
import GradiantButton from '../componentItem/balance/button'
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler';

import bitcoinIcon from '../../assets/images/bitcoin.png';
import ethIcon from '../../assets/images/eth.png';
import litecoinIcon from '../../assets/images/litecoin.png';
import remittyIcon from '../../assets/images/R.png';
import rippleIcon from '../../assets/images/ripple.png';
import closeIcon from '../../assets/images/icons8-multiply-26.png';
import bchicon from '../../assets/images/bchicon.png';
import xlmicon from '../../assets/images/xlmicon.png';
import eosicon from '../../assets/images/eosicon.png';
import adaicon from '../../assets/images/adaicon.png';
import qtumicon from '../../assets/images/qtumicon.png';
import zecicon from '../../assets/images/zecicon.png';
import dashicon from '../../assets/images/dashicon.png';
import daiicon from '../../assets/images/daiicon.png';
import usdcicon from '../../assets/images/usdcicon.png';
import etcicon from '../../assets/images/etcicon.png';
import atomicon from '../../assets/images/atomicon.png';
import linkicon from '../../assets/images/linkicon.png';
import baticon from '../../assets/images/baticon.png';
import repicon from '../../assets/images/repicon.png';
import zrxicon from '../../assets/images/zrxicon.png';



type Props = {};
export default class DipositeScreen extends Component<Props> {

    TOKEN_CODE = "RHT";
    TOKEN_ISSUER = "GCLNYYCC226567NWO7RYVB3DKJ5E7QEBY7R5RC3EYXWQBIRWM7ISWF24";
    TOKEN_LIMIT = "45000000";


    state = {
        modalVisible: false,
        text: 'http://facebook.github.io/react-native/',
        currency: '',
        showme: false,
        user_id: 0,
        publicKey: ''
    };

    constructor(props) {
        super(props)

        StellarSdk.Network.usePublicNetwork();
        this.server = new StellarSdk.Server("https://horizon.stellar.org");
        // this.initWallet();
    }

    async initWallet() {
        // let seed = this.loadSeed();
        let publicKey;

        if (!this.state.newseed || this.state.newseed == '') {
            // create a new pair
            this.keyPair = await StellarSdk.Keypair.randomAsync();
            seed = this.keyPair.secret();
            publicKey = this.keyPair.publicKey();
            this.saveSeed(seed);
        } else {
            this.keyPair = await StellarSdk.Keypair.fromSecret(seed);
            publicKey = this.keyPair.publicKey();
        }
        this.setState({
            publicKey: publicKey
        });
        // alert(publicKey);
        console.log("address=", this.state.address);

        //await this.addNewAsset(this.TOKEN_CODE, this.TOKEN_ISSUER, this.TOKEN_LIMIT, this.state.address);
    }
    async newinitWallet() {
        // let seed = this.loadSeed();
        let publicKey;

        this.keyPair = await StellarSdk.Keypair.randomAsync();
        seed = this.keyPair.secret();
        publicKey = this.keyPair.publicKey();
        this.saveSeed(seed);

        this.setState({
            publicKey: publicKey
        });
        // alert(publicKey);
        console.log("address=", this.state.address);

        //await this.addNewAsset(this.TOKEN_CODE, this.TOKEN_ISSUER, this.TOKEN_LIMIT, this.state.address);
    }

    saveSeed(seed) {
        // You have to save the seed to secure storage.
        this.setState({ newseed: seed });
        this.gettoken('saveSeed');
    }

    loadSeed() {
        // Please replace seed with code which load from secure storage.
        // var seed = "SAUR3QQWFUAYGCECQEXQVK36T6AAD6HJ3BJBSTV2W2QAS2E23HICPLQU";

        // return seed;
        this.gettoken('getSeed');
    }

    copyFunction() {
        alert('Address copied');
        Clipboard.setString(this.state.userAddress);
    }
    componentDidMount() {
        this.initialize();
        this.loadSeed();
    }
    initialize = async () => {
        var user_id = await AsyncStorage.getItem('user_id');
        var username = await AsyncStorage.getItem('username');

        this.setState({
            user_id: await AsyncStorage.getItem('user_id')
        })

        return fetch(Constant.token_url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: Constant.authemail,
                    password: Constant.authpass,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status) {
                    this.checkRHTaddress(responseJson.token);
                }


            })
            .catch((error) => {
                console.error(error);
            });

    }
    closeModalVisible(visible) {
        this.setState({ dialogVisible: visible });
    }
    checkRHTaddress(token) {

        return fetch(Constant.req_url + "checkRHTaddress",
            {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    user_id: this.state.user_id,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    showme: false
                })
                console.log(responseJson);
                if (responseJson.status) {
                    this.setState({
                        isLoading: false,
                        publicKey: responseJson.result,
                        //dialogVisible: true,
                    }, function () {

                    });
                }
                else {
                    this.initWallet();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getnewaddress(token, currency) {

        return fetch(Constant.req_url + "deposit/deposit_address",
            {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    user_id: this.state.user_id,
                    currency: currency,
                    rhtaddress: this.state.publicKey
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    showme: false
                })
                console.log(responseJson);
                if (responseJson.status) {
                    this.setState({
                        isLoading: false,
                        userAddress: responseJson.result,
                        dialogVisible: true,
                    }, function () {

                    });
                }
                else {
                    this.setState({
                        isLoading: false,
                        userAddress: responseJson.result,
                    }, function () {

                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    generatenewaddress(token, currency) {
        return fetch(Constant.req_url + "getnewaddress",
            {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    user_id: this.state.user_id,
                    currency: currency,
                    rhtaddress: this.state.publicKey
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    showme: false
                })
                if (responseJson.status) {
                    this.setState({
                        isLoading: false,
                        userAddress: responseJson.result,
                    }, function () {

                    });
                }
                else {
                    this.setState({
                        isLoading: false,
                        userAddress: responseJson.result,
                    }, function () {

                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    saveSeedcall(token) {
        return fetch(Constant.req_url + "saveSeed",
            {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    user_id: this.state.user_id,
                    seed: this.state.newseed,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    showme: false
                })
                if (responseJson.status) {
                    console.log('saved');
                }
                else {
                    console.log('not saved');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getSeed(token) {
        return fetch(Constant.req_url + "getSeed",
            {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    user_id: this.state.user_id,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    showme: false
                })
                if (responseJson.status) {
                    if (responseJson.seed != '') {
                        this.setState({ newseed: responseJson.seed });
                    }
                }
                else {
                    console.log('not saved');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getaddFunction(currency) {
        this.setState({
            showme: true
        })
        if (currency == 'RHT') {
            this.newinitWallet();
        }
        return fetch(Constant.token_url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: Constant.authemail,
                    password: Constant.authpass,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status) {

                    this.generatenewaddress(responseJson.token, currency);
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.token,
                    }, function () {

                    });
                }


            })
            .catch((error) => {
                console.error(error);
            });
    }
    gettoken(funname) {
        this.setState({
            showme: true
        })
        return fetch(Constant.token_url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: Constant.authemail,
                    password: Constant.authpass,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status) {
                    if (funname == 'saveSeed') {
                        this.saveSeedcall(responseJson.token);
                    }
                    if (funname == 'getSeed') {
                        this.getSeed(responseJson.token);
                    }
                }


            })
            .catch((error) => {
                console.error(error);
            });
    }
    setModalVisible(visible, currency) {
        this.setState({ dialogVisible: visible });
        this.setState({ currency: currency });
        this.setState({
            showme: true
        })

        return fetch(Constant.token_url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: Constant.authemail,
                    password: Constant.authpass,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status) {
                    this.getnewaddress(responseJson.token, currency);
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.token,
                    }, function () {

                    });
                }


            })
            .catch((error) => {
                console.error(error);
            });


    }

    render() {
        return (

            <View style={styles.container}>
                {
                    this.state.showme ? <ActivityIndicator style={{ flex: 1 }} size="large" /> :
                        <View>
                            <ScrollView >
                                <View style={styles.container}>

                                    <TextIconButton
                                        textTitle="RHT"
                                        textSub="Remitty"
                                        textNumber="Deposite"
                                        icon={remittyIcon}
                                        onPress={() => { this.setModalVisible(true, 'RHT'); }}
                                    />
                                    <TextIconButton
                                        textTitle="BTC"
                                        textSub="Bitcoin"
                                        textNumber="Deposite"
                                        icon={bitcoinIcon}
                                        onPress={() => {
                                            this.setModalVisible(true, 'BTC');
                                        }}
                                    />
                                    <TextIconButton
                                        textTitle="ETH"
                                        textSub="Ethereum"
                                        textNumber="Deposite"
                                        icon={ethIcon}
                                        onPress={() => { this.setModalVisible(true, 'ETH'); }}
                                    />
                                    <TextIconButton
                                        textTitle="LTC"
                                        textSub="Lite coin"
                                        textNumber="Deposite"
                                        icon={litecoinIcon}
                                        onPress={() => { this.setModalVisible(true, 'LTC'); }}
                                    />
                                    <TextIconButton
                                        textTitle="BCH"
                                        textSub="Bitcoin cash"
                                        textNumber="Deposite"
                                        icon={bchicon}
                                        onPress={() => { this.setModalVisible(true, 'BCH'); }}
                                    />

                                    <TextIconButton
                                        textTitle="XLM"
                                        textSub="Stellar"
                                        textNumber="Deposite"
                                        icon={xlmicon}
                                        onPress={() => { this.setModalVisible(true, 'XLM'); }}
                                    />

                                    <TextIconButton
                                        textTitle="EOS"
                                        textSub="EOS"
                                        textNumber="Deposite"
                                        icon={eosicon}
                                        onPress={() => { this.setModalVisible(true, 'EOS'); }}
                                    />

                                    <TextIconButton
                                        textTitle="ADA"
                                        textSub="Cardano"
                                        textNumber="Deposite"
                                        icon={adaicon}
                                        onPress={() => { this.setModalVisible(true, 'ADA'); }}
                                    />

                                    <TextIconButton
                                        textTitle="ATOM"
                                        textSub="Atomiccoin"
                                        textNumber="Deposite"
                                        icon={atomicon}
                                        onPress={() => { this.setModalVisible(true, 'ATOM'); }}
                                    />

                                    <TextIconButton
                                        textTitle="QTUM"
                                        textSub="Cardano"
                                        textNumber="Deposite"
                                        icon={qtumicon}
                                        onPress={() => { this.setModalVisible(true, 'QTUM'); }}
                                    />

                                    <TextIconButton
                                        textTitle="XRP"
                                        textSub="Ripple"
                                        textNumber="Deposite"
                                        icon={rippleIcon}
                                        onPress={() => { this.setModalVisible(true, 'XRP'); }}
                                    />

                                    <TextIconButton
                                        textTitle="ZEC"
                                        textSub="ZEC"
                                        textNumber="Deposite"
                                        icon={zecicon}
                                        onPress={() => { this.setModalVisible(true, 'ZEC'); }}
                                    />

                                    <TextIconButton
                                        textTitle="DASH"
                                        textSub="Dash"
                                        textNumber="Deposite"
                                        icon={dashicon}
                                        onPress={() => { this.setModalVisible(true, 'DASH'); }}
                                    />

                                    <TextIconButton
                                        textTitle="DAI"
                                        textSub="Dai"
                                        textNumber="Deposite"
                                        icon={daiicon}
                                        onPress={() => { this.setModalVisible(true, 'DAI'); }}
                                    />
                                    <TextIconButton
                                        textTitle="USDC"
                                        textSub="USD coin"
                                        textNumber="Deposite"
                                        icon={usdcicon}
                                        onPress={() => { this.setModalVisible(true, 'USDC'); }}
                                    />
                                    <TextIconButton
                                        textTitle="ETC"
                                        textSub="Ethereum classic"
                                        textNumber="Deposite"
                                        icon={etcicon}
                                        onPress={() => { this.setModalVisible(true, 'ETC'); }}
                                    />

                                    <TextIconButton
                                        textTitle="LINK"
                                        textSub="Chainlink"
                                        textNumber="Deposite"
                                        icon={linkicon}
                                        onPress={() => { this.setModalVisible(true, 'LINK'); }}
                                    />
                                    <TextIconButton
                                        textTitle="BAT"
                                        textSub="Basic Attention Token"
                                        textNumber="Deposite"
                                        icon={baticon}
                                        onPress={() => { this.setModalVisible(true, 'BAT'); }}
                                    />
                                    <TextIconButton
                                        textTitle="REP"
                                        textSub="Augur"
                                        textNumber="Deposite"
                                        icon={repicon}
                                        onPress={() => { this.setModalVisible(true, 'REP'); }}
                                    />
                                    <TextIconButton
                                        textTitle="ZRX"
                                        textSub="0x"
                                        textNumber="Deposite"
                                        icon={zrxicon}
                                        onPress={() => { this.setModalVisible(true, 'ZRX'); }}
                                    />


                                </View>
                            </ScrollView>

                            <View style={styles.container}>
                                <Dialog
                                    visible={this.state.dialogVisible}
                                    title={this.state.currency + "Address"}
                                    onTouchOutside={() => this.setState({ dialogVisible: false })} >

                                    <View style={styles.qrcontainer}>
                                        <QRCode
                                            value={this.state.userAddress}
                                            size={150}
                                        />
                                        <Text style={styles.address}>{this.state.userAddress}</Text>
                                        <Button
                                            title="Copy address"
                                            color="#1f10ed"
                                            accessibilityLabel="Learn more about this purple button"
                                            onPress={() => { this.copyFunction() }}
                                        />
                                        <View style={styles.newaddbutton}>
                                            <Button
                                                title="Get new address"
                                                color="#1f10ed"
                                                accessibilityLabel="Learn more about this purple button"
                                                onPress={() => { this.getaddFunction(this.state.currency) }}
                                            />
                                        </View>
                                    </View>
                                    <TouchableHighlight
                                        onPress={() => { this.closeModalVisible(false); }} style={{ alignItems: 'center', marginTop: 2 }}>
                                        <Text>Close</Text>
                                    </TouchableHighlight>
                                    <View>
                                    </View>
                                </Dialog>

                            </View>
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
        paddingTop: MH*0.5,
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
    qrView: {
        alignItems: 'center',
    },
    ModelView: {
        height: 400,
        marginTop: 200
    },
    qrcontainer: {
        alignItems: 'center',
        height: 400,
        justifyContent: 'center',
    },
    address: {
        fontSize: 18,
        fontWeight: "300",
        alignItems: 'center',
        marginTop: 20
    },
    newaddbutton: {

        alignItems: 'center',
        marginTop: 10
    },
    close: {
        marginTop: 10,
        alignItems: 'center',
    }



});
