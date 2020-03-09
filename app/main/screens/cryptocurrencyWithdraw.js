
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import GradiantButton from '../componentItem/gradiantButton'
import StellarSdk from '@pigzbe/react-native-stellar-sdk';
import {
    Content,
    Container
} from 'native-base';
const operators = [{
    value: 'MTN'
}, {
    value: 'MPS'
}];
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class cryptocurrencyWithdraw extends Component {
    TOKEN_CODE = "RHT";
    TOKEN_ISSUER = "GCLNYYCC226567NWO7RYVB3DKJ5E7QEBY7R5RC3EYXWQBIRWM7ISWF24";
    TOKEN_LIMIT = "45000000";
    constructor(props) {
        super(props);

        StellarSdk.Network.usePublicNetwork();
        this.server = new StellarSdk.Server("https://horizon.stellar.org");
        this.state = {
            operators: operators,
            currency_get: 'GHS',
            currency: 'USD',
            account_bank: 'MTN',
            balance_btc: '0.0',
            balance_eth: '0.0',
            balance_ltc: '0.0',
            recipient_get: '0.0',
            sedd: false,
            country: 'Ghana(Ghana mobile money)',
            r_name: 0,
            r_account: 0,
            r_amount: 0,
            selectedIndex: 0,
            currency: 'BTC',
            rate: '0.0',
            balance: 0,
            showme: true,
            user_id: 0,
            curprice:0,
            esti_val:"0.00",
        };


        this.myTextInput = React.createRef();

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
                        this.getprice(res.token);
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                )
        }
        catch (e) {
            alert(e)
        }

    }
    getprice = (token) => {

        try {
            fetch(Constant.req_url+"getconversionprice", {
                method: 'POST',
                body: JSON.stringify({
                    user_id         :   this.state.user_id,
                    fromcurrency    :   this.state.currency,
                    tocurrency      :   'USD',
                    token           :   token
                }),
            }).then((response) => response.json())
                .then((res => {
                    this.setState({ curprice : parseFloat(res).toFixed(8) });
                })
            );
        }
        catch (e) {
            alert(e)
        }
    }  
    estival = (r_amount) => {
        var extivalue = parseFloat((this.state.balance*this.state.curprice)-(r_amount*this.state.curprice)).toFixed(2);
        if(extivalue<0){
            extivalue = 0;
        }
        this.setState({
            esti_val:extivalue,
            r_amount:r_amount
        })
        return extivalue;
    }
    async refreshBalance() {
        if (!this.state.address) {
            return
        }

        const account = await this.loadAccount(this.state.address);
        if (!account)
            return;

        var tokenAdded = false;

        for (let i in account.balances) {
            let item = account.balances[i];
            if (item.asset_type == 'native') {
                let balance = item.balance;
                let number = parseFloat(balance);
                this.setState({
                    xlmBalance: number.toString()
                });
            }
            else if (item.asset_code == this.TOKEN_CODE &&
                item.asset_issuer == this.TOKEN_ISSUER) {
                let balance = item.balance;
                let number = parseFloat(balance);
                this.setState({
                    tokenBalance: number.toString()
                });
                tokenAdded = true;
            } else {
                console.log("Unknow Type:", item.asset_type, ", Balance:", item.balance);
            }
        }

        if (!tokenAdded) {
            this.addNewAsset(this.TOKEN_CODE, this.TOKEN_ISSUER, this.TOKEN_LIMIT, this.state.address);
        }
    }

    async loadAccount(address) {
        let account;
        try {
            // If balance is not enough, it will be failed to load account. It needs 1 XLM at least
            account = await this.server.loadAccount(address);
        }
        catch (e) {
            console.log("Failed to load account: ", e);
            return null;
        }
        return account;
    }

    async send() {


        if (this.state.tokenBalance < this.state.r_amount) {
            Alert.alert("Insufficient balance");
            return
        }

        const account = await this.loadAccount(this.state.address);
        if (!account) {
            Alert.alert("Failed to send", "Your account is invalid");
            return;
        }

        const asset = new StellarSdk.Asset(this.TOKEN_CODE, this.TOKEN_ISSUER);
        const fee = await this.server.fetchBaseFee();

        let transaction;
        try {
            transaction = new StellarSdk.TransactionBuilder(account, { fee: fee })
                .addOperation(StellarSdk.Operation.payment({
                    asset: asset,
                    destination: this.state.r_account,
                    amount: this.state.r_amount
                }))
                .addMemo(StellarSdk.Memo.text('Remitty'))
                .setTimeout(30)
                .build();
        } catch (e) {
            console.log("Failed to build transaction: ", e);
            Alert.alert("Failed to send", "Build transaction failed");
            return;
        }

        transaction.sign(this.keyPair);

        try {
            await this.server.submitTransaction(transaction);
            this.refreshBalance();
        } catch (e) {
            console.log('An error has occured:', e);
            Alert.alert("Failed to send", "Submit transaction failed");
        }

        Alert.alert("Sent", this.state.r_amount + "RHT to " + this.state.r_account);
    }



    componentDidMount() {
        this.initialize();
    }
    initialize = async () => {
        this.setState({
            user_id: await AsyncStorage.getItem('user_id')
        })
    }
    componentWillMount() {

        setTimeout(() => {
            this.setState({
                showme: false
            })
        }, 3000)
        const url = 'https://api.ravepay.co/v2/banks/NG?public_key=FLWPUBK_TEST-fc1356183ca31a6b449d32d06aadf597-X'
        // try {
        //     fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //     }).then((response) => response.json())
        //         .then((res => {
        //             if (res.status == 'success') {
        //                 // alert(res.data.Banks[0].Code);
        //                 let bank_codes = [];
        //                 let bank_names = [];
        //                 for (let i = 0; i < res.data.Banks.length; i++) {
        //                     bank_codes.push(res.data.Banks[i].Code);
        //                     bank_names.push({ value: res.data.Banks[i].Name });
        //                 }
        //                 this.setState({
        //                     bank_codes: bank_codes,
        //                     bank_names: bank_names
        //                 })
        //             }
        //             else {
        //                 alert(JSON.stringify(res));
        //             }
        //         })
        //         );
        // }
        // catch (e) {
        //     alert(e)
        // }

    }
    gowithfee = () => {
        if (this.state.r_amount == 0 || this.state.r_account == 0) { alert('input full data'); return; }
        try {
            this.setState({
                showme: true
            })
            fetch(Constant.token_url, {
                method: 'POST',
                body: JSON.stringify({
                    email: Constant.authemail,
                    password: Constant.authpass,
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.request(res.token);
                    }
                    else {
                        alert(JSON.stringify(res));
                        this.setState({ showme: false });
                    }
                })
                )
        }
        catch (e) {
            alert(e)
        }
    }
    balance = (token) => {
        try {
            fetch(Constant.req_url + "getparticularbalance", {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    currency: this.state.currency,
                    token: token
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.setState({ balance: parseFloat(res.result).toFixed(8) });
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                )
        }
        catch (e) {
            alert(e)
        }
    }
    gettoken = (name) => {
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
                        if (name == 'balance') {
                            this.balance(res.token);
                        }
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                )
        }
        catch (e) {
            alert(e)
        }
    }
    request = (token) => {
        if (this.state.r_amount == 0 || this.state.r_account == 0) { alert('input full data'); return; }
        try {
            fetch(Constant.req_url + "withdraw_request", {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    user_id: this.state.user_id,
                    currency: this.state.currency,
                    address: this.state.r_account,
                    amount: this.state.r_amount,
                }),
            }).then((response) => response.json())
                .then((res => {
                    this.setState({
                        showme: false
                    })
                    if (res.status) {
                        this.gettoken('balance');

                        if (this.state.currency == 'RHT') {
                            this.send();
                        }
                        else {
                            this.setState({
                                r_amount: '',
                                r_account: ''
                            });
                        }
                    }
                    else {
                        alert(JSON.stringify(res.message));
                    }
                })
                )
        }
        catch (e) {
            alert(e)
        }
    }

    render() {
        let { balance_btc } = this.state;
        let { balance_eth } = this.state;
        let { balance_ltc } = this.state;
        this.state.currency = this.props.navigation.getParam('currency', 'BTC');
        return (
            <View style={styles.container}>
                {
                    this.state.showme ? <ActivityIndicator style={{ flex: 1 }} size="large" /> :

                        <Content style={{ width: '100%' }}>
                            <Text style={[styles.title, { marginTop: 25 }]}>{this.props.navigation.getParam('currency', 'BTC')} Withdraw </Text>
                            <View style={{
                                textAlign: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', width: '90%', height: 90, elevation: 5, shadowOffset: { height: 2 },
                                shadowOpacity: 0.3, marginTop: 15, marginBottom: 20, borderWidth: 1,
                                borderColor: 'rgba(240,240,240,0.8)', alignSelf: 'center'
                            }}>
                                <Text style={{ fontWeight: "200", fontSize: 18, color: '#1A1F84', marginTop: 5 }}>Available Balance</Text>
                                <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>{this.state.balance + ' ' + this.props.navigation.getParam('currency', 'BTC')}</Text>
                            </View>


                            <TextInput
                                style={styles.textcontainer_label}
                                label='Recipient Crypto Address'
                                placeholder="Recipient Crypto Address"
                                onChangeText={(r_account) => this.setState({ r_account })}
                            ></TextInput>
                            <TextInput
                                style={styles.textcontainer_label}
                                label='Amount'
                                placeholder="0.00"
                                onChangeText={(r_amount) =>  { this.setState({ r_amount }); this.estival(r_amount); }}
                            ></TextInput>
                             <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 10, marginLeft: 40, marginTop: 5 }}>Estimated value : {parseFloat(this.state.curprice * this.state.r_amount).toFixed(2) + ' USD'}  </Text>
                                <Text style={{ fontSize: 10, marginLeft: 40, marginTop: 5 }}>Estimated balance : {this.state.esti_val}  USD</Text>
                            </View>

                            <GradiantButton
                                style={{ width: 200 }}
                                textIndo="Submit"
                                onPress={() => this.gowithfee()}
                            />
                            <View style={{ height: 50 }}></View>
                        </Content>
                }
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    send_part: {
        flexDirection: 'row',
        marginTop: 20,
        width: '80%',
        height: 70,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        alignSelf: 'center',
        elevation: 3,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
    },
    destext: {
        marginTop: 25,
        alignSelf: 'center',
        color: 'black',
        fontSize: 15,

    },
    countries: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        padding: 0,
        borderRadius: 5,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
    },
    texttop: {
        color: 'rgb(0, 0, 0)',
        textAlign: 'center',
        fontSize: 15,
        flexDirection: 'row'
    },
    textamount: {
        marginTop: 5,
        color: 'rgb(0, 0, 0)',
        textAlign: 'left',
        fontSize: 15,
        padding: 5
    },
    textunder: {
        color: 'rgb(0, 0, 0)',
        textAlign: 'center',
        fontSize: 15,
        marginRight: 5
    },
    topitems: {
        width: '80%',
        paddingTop: 25,
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 20,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
        backgroundColor: 'white',
        padding: 10,
        borderColor: 'rgba(240,240,240,0.8)',
        borderWidth: 1,
        flexDirection: 'row',
        height: 70,
    },
    amountcontainer: {
        width: '90%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        justifyContent: 'center',
        // marginHorizontal: 3,
        marginTop: 5,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        //marginHorizontal:15,
        elevation: 3,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
        backgroundColor: 'white',
        padding: 0
    },
    selectcountry: {
        flexDirection: 'row',
        marginTop: 20,
        width: '80%',
        height: 60,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        paddingLeft: 10,
        elevation: 3,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
        alignSelf: 'center'
    },
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
        color: 'green'
    },
    txtsub: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        fontWeight: "600",
        color: 'black'
    },
    textcontainer_label: {
        // width: 350,
        // color: 'black',
        textAlign: 'left',
        alignSelf: 'center',
        // alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'row',
        marginTop: 10,
        width: '80%',
        height: 60,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,1)',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        paddingLeft: 10,
        elevation: 2,
        // justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
    },
});
