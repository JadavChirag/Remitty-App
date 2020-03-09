import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TextInputMask from 'react-native-text-input-mask';
import {
    Content,
    Icon
} from 'native-base';
import { ExchangeRate, } from '@API/Rave';
import LinearGradient from 'react-native-linear-gradient';
import PayPal from 'react-native-paypal-wrapper';
import md5 from 'md5';
import Dialog, {
    DialogContent,
    DialogButton,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import { mobileValidate, emailValidate } from '@common/Constant';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
let recipient_type = '';
const cardimg = require('../../assets/images/card.png');

const receivecurrencies = [{
    value: 'USD'
}, {
    value: 'KES'
}, {
    value: 'GHS'
}, {
    value: 'NGN'
}, {
    value: 'EUR'
}];
const sendcurrencies = [{
    value: 'USD'
}, {
    value: 'GBP'
}, {
    value: 'EUR'
}, {
    value: 'BTC(Bitcoin)'
}, {
    value: 'LTC(Litecoin)'
}, {
    value: 'ETH(Ethereum)'
}];
const fromcurrencies = ['USD', 'GBP', 'EUR', 'BTC', 'LTC', 'ETH'];
const tocurrencies = ['USD', 'KES', 'GHS', 'NGN', 'EUR'];
const check = require('../../assets/images/check1.png');
const uncheck = require('../../assets/images/uncheck1.png');
//test part///
const api_token = 'Bearer 1c18d8cb-5841-4362-8905-8e3ad72409da';
const profile_id = 4932;

export default class SendScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receivecurrency: 'USD',
            amount_paypal: '0.0',
            sendcurrency: 'USD',
            tocurrency: 'USD',
            fromcurrency: 'USD',
            account_bank: '',
            account_code: [],
            sendAmount: 0,
            recipient_get: 0,
            selectedIndex: 0,
            rate: '0.0',
            source1: check,
            source2: uncheck,
            recipient_names: [],
            bank_codes: [],
            showing_activity: 'none',
            scaleAnimationDialog: false,
            ach_payment_dialog: false,
            card_payment_dialog: false,
            paypal_payment_dialog: false,
            ibantab: styles.activeTab,
            sortcodetab: styles.inactiveTab,
            ibantab1: styles.activeTab,
            sortcodetab1: styles.inactiveTab,
            routingnumbertab1: styles.inactiveTab,
            payouType: 'IBAN',
            showing_addstate: 'none',
            type_account: true,
            recipient_bank_type: 'IBAN',
            recipient_value: null,
            choose_payment_show: false,
            paypal_currencies: [
                { value: 'USD' },
                { value: 'EUR' },
                { value: 'AUD' },
                { value: 'GBP' },
                { value: 'HKD' },
                { value: 'AUD' },
                { value: 'CAD' },
                { value: 'CZK' },
                { value: 'DKK' },
                { value: 'HUF' },
                { value: 'ILS' },
                { value: 'JPY' },
                { value: 'MXN' },
                { value: 'TWD' },
                { value: 'NZD' },
                { value: 'NOK' },
                { value: 'PHP' },
                { value: 'PLN' },
                { value: 'RUB' },
                { value: 'SGD' },
                { value: 'SEK' },
                { value: 'CHF' },
                { value: 'THB' }
            ],
            currency_paypal: 'USD',
            cardno: null, 
            cvv: null,
            expirymonth: null,
            expiryyear: null,
            amount_card: null,
            email_card: null,
        }
    }
    componentDidMount() {
        PayPal.initialize(PayPal.SANDBOX, "AYX7ViMwmTgsiGraG4ndVGhp49AM8xwWUiQCezcq__26byZsgyfXHjwQucnkLBlFxhDvDGI3Edq1pbMS");
    }
    exchange_currency = async () => {
        let {
            fromcurrency,
            tocurrency,
            sendAmount
        } = this.state;
        let data = {
            secret_key: 'FLWSECK_TEST-540e40f66b92934b9764334f6f8cf626-X',
            service: "rates_convert",
            service_method: "post",
            service_version: "v1",
            service_channel: "transactions",
            service_channel_group: "merchants",
            service_payload: {
                FromCurrency: fromcurrency,
                ToCurrency: tocurrency,
                Amount: sendAmount
            }
        }
        let responsedata = await ExchangeRate(data);
        if (responsedata !== false) {
            this.setState({
                recipient_get: responsedata.ToAmount,
                rate: responsedata.Rate,
            })
            // alert(JSON.stringify(responsedata))
        }
        else {
            alert('error')
        }
    }
    chanageTab = (val) => {
        switch (val) {
            case 1:
                this.setState({
                    ibantab: styles.activeTab,
                    sortcodetab: styles.inactiveTab,
                    routingnumbertab: styles.inactiveTab,
                    payouType: 'IBAN',
                    pay_US: true,
                    pay_SA: false,
                    type_ach: 'USD',
                    country_type: 'US'
                })
                break;
            case 2:
                this.setState({
                    ibantab: styles.inactiveTab,
                    sortcodetab: styles.activeTab,
                    routingnumbertab: styles.inactiveTab,
                    payouType: 'Sort Code',
                    pay_US: false,
                    pay_SA: true,
                    type_ach: 'ZAR',
                    country_type: 'ZA'
                })
                break;
            case 3:
                this.setState({
                    ibantab: styles.inactiveTab,
                    sortcodetab: styles.inactiveTab,
                    routingnumbertab: styles.activeTab,
                    payouType: 'Routing Number',
                })
                break;
            default:
                break;
        }
    }
    chanageTab1 = (val) => {
        switch (val) {
            case 1:
                this.setState({
                    ibantab1: styles.activeTab,
                    sortcodetab1: styles.inactiveTab,
                    routingnumbertab1: styles.inactiveTab,
                    recipient_bank_type: 'IBAN',
                })
                break;
            case 2:
                this.setState({
                    ibantab1: styles.inactiveTab,
                    sortcodetab1: styles.activeTab,
                    routingnumbertab1: styles.inactiveTab,
                    recipient_bank_type: 'Sort Code',
                })
                break;
            case 3:
                this.setState({
                    ibantab1: styles.inactiveTab,
                    sortcodetab1: styles.inactiveTab,
                    routingnumbertab1: styles.activeTab,
                    recipient_bank_type: 'Routing Number',
                })
                break;
            default:
                break;
        }
    }
    getKey = (seckey) => {
        let keymd5 = md5(seckey);
        let keymd5last12 = keymd5.substr(-12);
        let seckeyadjusted = seckey.replace('FLWSECK-', '');
        let seckeyadjustedfirst12 = seckeyadjusted.substr(0, 12);
        return seckeyadjustedfirst12 + keymd5last12;
    }
    encrypt3Des = (key, text) => {
        let forge = require('node-forge');
        let cipher = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(key));
        cipher.start({ iv: '' });
        cipher.update(forge.util.createBuffer(text, 'utf-8'));
        cipher.finish();
        let encrypted = cipher.output;
        return (forge.util.encode64(encrypted.getBytes()));
    }
    add_ACH = () => {
        let { type_ach, country_type } = this.state;
        let data = JSON.stringify(
            {
                PBFPubKey: "FLWPUBK_TEST-fc1356183ca31a6b449d32d06aadf597-X",
                currency: type_ach,
                payment_type: "account",
                country: country_type,
                amount: "100",
                email: "zzg02016891@gmail.com",
                phonenumber: "5204063923",
                firstname: "Zww",
                lastname: "Zifac",
                IP: "355426087298442",
                txRef: "rave-checkout-" + Date.now(),
                is_us_bank_charge: 1,
                redirect_url: "https://remittyllc.com",
                device_fingerprint: "69e6b7f0b72037aa8428b70fbe03986c"
            }
        )
        let Seckey = 'FLWSECK_TEST-540e40f66b92934b9764334f6f8cf626-X';
        let key = this.getKey(Seckey);
        let post_enc = this.encrypt3Des(key, data);
        fetch('https://api.ravepay.co/flwv3-pug/getpaidx/api/charge', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                PBFPubKey: 'FLWPUBK_TEST-fc1356183ca31a6b449d32d06aadf597-X',
                client: post_enc,
                alg: '3DES-24'
            })
            ,
        }).then((response) => response.json())
            .then((res => {
                alert(JSON.stringify(res));
            })
            ).done();
    }
    paypal_payment = () => {
        let { currency_paypal, amount_paypal } = this.state;
        // if (registered_coll_meters.includes(collectorid + meterid) == false) { alert('meter and collector not match!, try again!'); return; }
        if (currency_paypal == null || amount_paypal == null) { alert('Please input amount and choose currency'); return; }
        // this.setState({ paypal_interface: false })
        PayPal.pay({
            price: "" + amount_paypal,
            currency: currency_paypal,
            description: 'Your description goes here',
        }).then(confirm => {
            alert(JSON.stringify(confirm));
            this.save_Transaction(confirm.response.id)
        })
            .catch(error => alert(JSON.stringify(error)));
    }
    save_Transaction = async (id) => {
        // let { meterid, collectorid, amount_paypal, data, credit_amount } = this.state;
        // data = {
        //   collectorId: collectorid,
        //   meterId: meterid,
        //   flag: "transaction",
        //   paymentAmount: amount_paypal,
        //   transactionId: id,
        //   credit: credit_amount,////////////I need to add
        //   paymentMethod: "paypal",
        //   payerId: data.user_id
        // }
        // let result = await addTransaction(data);
        // if (result != false) {
        //   alert('success')
        // }
        // else {
        //   alert('Saving Failed')
        // }
    }
    card_payment = () => {
        let { 
            cardno, 
            cvv,
            expirymonth,
            expiryyear,
            amount_card,
            email_card,
         } = this.state;
        let data = JSON.stringify(
            {
                PBFPubKey: "FLWPUBK_TEST-fc1356183ca31a6b449d32d06aadf597-X",
                cardno: cardno,
                cvv: cvv,
                expirymonth: expirymonth,
                expiryyear: expiryyear,
                currency: "NGN",
                country: "NG",
                amount: amount_card,
                email: email_card,
                phonenumber: "0902620185",
                firstname: "brain",
                lastname: "zifac",
                IP: "355426087298442",
                txRef: "MC-" + Date.now(),
                meta: [{ metaname: "flightID", metavalue: "123949494DC" }],
                redirect_url: "https://remittyllc.com",
                device_fingerprint: "69e6b7f0b72037aa8428b70fbe03986c"
            }
        )
        let Seckey = 'FLWSECK_TEST-540e40f66b92934b9764334f6f8cf626-X';
        let key = this.getKey(Seckey);
        let post_enc = this.encrypt3Des(key, data);
        fetch('https://api.ravepay.co/flwv3-pug/getpaidx/api/charge', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                PBFPubKey: 'FLWPUBK_TEST-fc1356183ca31a6b449d32d06aadf597-X',
                client: post_enc,
                alg: '3DES-24'
            })
            ,
        }).then((response) => response.json())
            .then((res => {
                alert(JSON.stringify(res.status));
            })
            ).done();
    }
    transation = () => {
        let { recipient_name, add_account_bank, add_account_number, recipient_get, tocurrency, fromcurrency, rate, recipient_value } = this.state;
        userdata = {
            recipient_get: recipient_get,
            recipient_name: recipient_name,
            add_account_bank: add_account_bank,
            add_account_number: add_account_number,
            tocurrency: tocurrency,
            fromcurrency: fromcurrency,
            rate: rate,
            recipient_type: recipient_type,
            recipient_value: recipient_value
        }
        this.props.navigation.navigate('ConfirmSend', {
            userdata: userdata
        })
        // fetch('https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         "txref": "MC-09182829",
        //         "SECKEY": "FLWSECK_TEST-540e40f66b92934b9764334f6f8cf626-X"
        //     }),
        // }).then((response) => response.json())
        //     .then((res => {
        //         alert(JSON.stringify(res));
        //         this.props.navigation.navigate('ConfirmSend') 
        //     })
        //     ).done();
    }
    add_recipient = () => {
        let { payouType } = this.state;
        let recipient_names = this.state.recipient_names;
        recipient_names.push({ value: this.state.recipient_name, account_number: this.state.add_account_number, payouType: payouType });
        this.setState({
            recipient_names: recipient_names
        })
    }
    change_radio = (val) => {
        switch (val) {
            case 1:
                this.setState({
                    source1: check,
                    source2: uncheck,
                    type_account: true
                })
                break;
            case 2:
                this.setState({
                    source2: check,
                    source1: uncheck,
                    type_account: false,
                    recipient_value: null
                })
                break;
            default:
                break;
        }
    }
    choose_type = async () => {
        let { recipient_value } = this.state;
        let email = await emailValidate(recipient_value);
        let phone = await mobileValidate(recipient_value);
        if (phone == true) {
            recipient_type = 'phone'
        }
        else if (email == true) {
            recipient_type = 'email'
        }
        else {
            recipient_type = 'MPS'
        }
        // alert(recipient_type);
        this.setState({
            recipient_type: recipient_type
        })
    }
    render() {
        const { source1 } = this.state;
        const { source2 } = this.state;
        return (
            <View style={styles.container}>
                <Content style={{ width: '100%' }}>
                    <Dialog
                        onTouchOutside={() => {
                            this.setState({ choose_payment_show: false, showwaiting_cardbtn: 'none' });
                        }}
                        width={0.9}
                        visible={this.state.choose_payment_show}
                        dialogAnimation={new ScaleAnimation()}
                        onHardwareBackPress={() => {
                            console.log('onHardwareBackPress');
                            this.setState({ choose_payment_show: false });
                            return true;
                        }}
                        actions={[
                            <DialogButton
                                text="DISMISS"
                                onPress={() => {
                                    this.setState({ choose_payment_show: false });
                                }}
                                key="button-1"
                            />,
                        ]}
                    >
                        <DialogContent>
                            {
                                <View style={{ width: '100%' }}>
                                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                                        <TouchableOpacity onPress={() => { this.setState({ choose_payment_show: false, ach_payment_dialog: true }) }} style={styles.buttonStyle}>
                                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                            </ActivityIndicator>
                                            <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                                ACH Payment
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                                        <TouchableOpacity onPress={() => { this.setState({ choose_payment_show: false, card_payment_dialog: true }) }} style={styles.buttonStyle}>
                                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                            </ActivityIndicator>
                                            <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                                Card Payment
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                                        <TouchableOpacity onPress={() => { this.setState({ choose_payment_show: false, paypal_payment_dialog: true }) }} style={styles.buttonStyle}>
                                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                            </ActivityIndicator>
                                            <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                                PayPal Payment
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            }
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        onTouchOutside={() => {
                            this.setState({ paypal_payment_dialog: false, showwaiting_cardbtn: 'none' });
                        }}
                        width={0.9}
                        visible={this.state.paypal_payment_dialog}
                        dialogAnimation={new ScaleAnimation()}
                        onHardwareBackPress={() => {
                            console.log('onHardwareBackPress');
                            this.setState({ paypal_payment_dialog: false });
                            return true;
                        }}
                        actions={[
                            <DialogButton
                                text="DISMISS"
                                onPress={() => {
                                    this.setState({ paypal_payment_dialog: false });
                                }}
                                key="button-1"
                            />,
                        ]}
                    >
                        <DialogContent>
                            {
                                <View style={{ width: '100%' }}>
                                    <View style={styles.cardpart}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', borderColor: 'gray', height: 50, borderWidth: 0.5, }}>
                                            <View style={{ width: '60%', }}>
                                                <TextInput
                                                    style={styles.inputvalue}
                                                    placeholder="Please Input Amount"
                                                    maxLength={20}
                                                    onChangeText={(amount_paypal) => this.setState({ amount_paypal })}
                                                    keyboardType='number-pad'>
                                                </TextInput>
                                            </View>
                                            <View style={{ width: 1, backgroundColor: 'gray', }}></View>
                                            <View style={{ width: '25%', marginTop: 0, marginRight: 5, marginLeft: 5, }}>
                                                <Dropdown
                                                    label={this.state.currency_paypal == null ? 'Select Currency' : null}
                                                    data={this.state.paypal_currencies}
                                                    dropdownPosition={0}
                                                    animationDuration={500}
                                                    containerStyle={{ width: '85%', marginTop: -20, marginRight: 5, marginLeft: 5, alignSelf: 'center' }}
                                                    onChangeText={(currency_paypal) =>
                                                        this.setState({ currency_paypal })
                                                    }
                                                    value={this.state.currency_paypal}
                                                />
                                            </View>
                                        </View>
                                        <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                                            <TouchableOpacity onPress={() => { this.setState({ paypal_payment_dialog: false }); this.paypal_payment() }} style={styles.buttonStyle}>
                                                <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting_cardbtnsend !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                                </ActivityIndicator>
                                                <Text style={[styles.buttonText, { display: this.state.showwaiting_cardbtnsend == 'flex' ? 'none' : 'flex' }]}>
                                                    Next
                                                </Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                </View>
                            }
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        onTouchOutside={() => {
                            this.setState({ card_payment_dialog: false, showwaiting_cardbtn: 'none' });
                        }}
                        width={0.8}
                        visible={this.state.card_payment_dialog}
                        dialogAnimation={new ScaleAnimation()}
                        onHardwareBackPress={() => {
                            console.log('onHardwareBackPress');
                            this.setState({ card_payment_dialog: false });
                            return true;
                        }}
                        actions={[
                            <DialogButton
                                text="DISMISS"
                                onPress={() => {
                                    this.setState({ card_payment_dialog: false });
                                }}
                                key="button-1"
                            />,
                        ]}
                    >
                        <DialogContent>
                            {
                                <View style={{ width: '105%', alignSelf: 'center' }}>
                                    <View style={styles.cardpart}>
                                        <View style={styles.itemdialog}>
                                            <View>
                                                <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                                                    Names
                                                </Text>
                                                <TextInputMask
                                                    refInput={ref => { this.input = ref }}
                                                    onChangeText={(formatted, extracted) => {
                                                        console.log(formatted);
                                                        this.setState({ recipient_name_card: extracted });
                                                    }}
                                                    placeholder=""
                                                />
                                            </View>
                                            <Image source={cardimg} style={{ width: 30, height: 30, resizeMode: 'contain', marginTop: 20, opacity: 0 }} />
                                        </View>
                                        <View style={styles.itemdialog}>
                                            <View>
                                                <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                                                    Card Number
                                                </Text>
                                                <TextInputMask
                                                    refInput={ref => { this.input = ref }}
                                                    onChangeText={(formatted, extracted) => {
                                                        console.log(formatted);
                                                        this.setState({ cardno: extracted });
                                                    }}
                                                    mask={"[0000] [0000] [0000] [0000]"}
                                                    placeholder="5438 8980 1456 0229"
                                                />
                                            </View>
                                            <Image source={cardimg} style={{ width: 30, height: 30, resizeMode: 'contain', marginTop: 20, opacity: 0.4 }} />
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.itemdialog2}>
                                                <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                                                    VALID TILL
                                                </Text>
                                                <TextInputMask
                                                    refInput={ref => { this.input = ref }}
                                                    onChangeText={(formatted, extracted) => {
                                                        console.log(formatted)
                                                        this.setState({ expirymonth: extracted.substring(0, 2), expiryyear: extracted.substring(2, 4) })
                                                    }}
                                                    mask={"[00]/[00]"}
                                                    placeholder="MM/YY"
                                                />
                                            </View>
                                            <View style={styles.itemdialog1}>
                                                <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                                                    CVV/CVV2
                                                </Text>
                                                <TextInputMask
                                                    refInput={ref => { this.input = ref }}
                                                    onChangeText={(formatted, extracted) => {
                                                        console.log(formatted)
                                                        this.setState({ cvv: extracted })
                                                    }}
                                                    mask={"[0000]"}
                                                    placeholder="123"
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.itemdialog}>
                                            <View>
                                                <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                                                    Email
                                                </Text>
                                                <TextInputMask
                                                    refInput={ref => { this.input = ref }}
                                                    onChangeText={(formatted, extracted) => {
                                                        console.log(formatted);
                                                        this.setState({ email_card: extracted });
                                                    }}
                                                    placeholder="example@gmail.com"
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.itemdialog}>
                                            <View>
                                                <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                                                    Amount
                                                </Text>
                                                <TextInputMask
                                                    refInput={ref => { this.input = ref }}
                                                    onChangeText={(formatted, extracted) => {
                                                        console.log(formatted);
                                                        this.setState({ email_card: extracted });
                                                    }}
                                                    mask={"[0000000000000000000000000000000]"}
                                                    placeholder=""
                                                />
                                            </View>
                                        </View>
                                        <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                                            <TouchableOpacity onPress={() => { this.setState({ card_payment_dialog: false }); this.card_payment() }} style={styles.buttonStyle}>
                                                <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting_cardbtnsend !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                                </ActivityIndicator>
                                                <Text style={[styles.buttonText, { display: this.state.showwaiting_cardbtnsend == 'flex' ? 'none' : 'flex' }]}>
                                                    Save
                                                </Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                </View>
                            }
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        onTouchOutside={() => {
                            this.setState({ ach_payment_dialog: false, showwaiting_cardbtn: 'none' });
                        }}
                        width={0.9}
                        visible={this.state.ach_payment_dialog}
                        dialogAnimation={new ScaleAnimation()}
                        onHardwareBackPress={() => {
                            console.log('onHardwareBackPress');
                            this.setState({ ach_payment_dialog: false });
                            return true;
                        }}
                        actions={[
                            <DialogButton
                                text="DISMISS"
                                onPress={() => {
                                    this.setState({ ach_payment_dialog: false });
                                }}
                                key="button-1"
                            />,
                        ]}
                    >
                        <DialogContent>
                            {
                                <View style={{ width: '95%', alignSelf: 'center' }}>
                                    {/* <View style={{ width: '95%', alignSelf: 'center', }}>
                                        <Dropdown
                                            label='Select Your Bank'
                                            data={this.state.recipient_names}
                                            dropdownPosition={0}
                                            animationDuration={500}
                                            containerStyle={{ width: '100%', alignSelf: 'center', }}
                                            onChangeText={(account_bank, index) => this.setState({
                                                account_bank: account_bank,
                                                account_code: this.state.bank_codes[index],
                                                account_index: index
                                            })}
                                            value={this.state.account_bank}
                                        />
                                    </View> */}
                                    <View style={styles.itemdialog4}>
                                        <View>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', marginTop: 15 }}>
                                                Names
                                            </Text>
                                            <TextInput
                                                onChangeText={(recipient_name) => {
                                                    this.setState({ recipient_name: recipient_name });
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 10 }}></View>
                                    </View>
                                    <View style={styles.itemdialog4}>
                                        <View>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', marginTop: 15 }}>
                                                Your Bank Details
                                            </Text>
                                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                                <TouchableOpacity onPress={() => this.chanageTab(1)} style={[this.state.ibantab, { width: '50%' }]}>
                                                    <Text style={{ width: '100%', textAlign: 'center', paddingBottom: 11, paddingTop: 10 }}>
                                                        US ACH Bank
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={{ height: '100%', width: 1, backgroundColor: 'rgba(0,0,0,0.5)', }}></View>
                                                <TouchableOpacity onPress={() => this.chanageTab(2)} style={[this.state.sortcodetab, { width: '50%' }]}>
                                                    <Text style={{ width: '100%', textAlign: 'center', paddingBottom: 11, paddingTop: 10 }}>
                                                        SA ACH Bank
                                                    </Text>
                                                </TouchableOpacity>
                                                {/* <View style={{ height: '100%', width: 1, backgroundColor: 'rgba(0,0,0,0.5)', }}></View>
                                                <TouchableOpacity onPress={() => this.chanageTab(3)} style={this.state.routingnumbertab}>
                                                    <Text style={{ width: '100%', textAlign: 'center', paddingBottom: 0, paddingTop: 5 }}>
                                                        Routing    Number
                                                    </Text>
                                                </TouchableOpacity> */}
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 0 }}></View>
                                    </View>
                                    <View style={styles.itemdialog4}>
                                        <View>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', marginTop: 15 }}>
                                                Email
                                            </Text>
                                            <TextInput
                                                onChangeText={(add_account_number) => {
                                                    this.setState({ add_account_number: add_account_number });
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 10 }}></View>
                                    </View>
                                    <View style={styles.itemdialog4}>
                                        <View>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', marginTop: 15 }}>
                                                Amount{/* {this.state.payouType} */}
                                            </Text>
                                            <TextInput
                                                onChangeText={(add_recipient_value) => {
                                                    this.setState({ add_recipient_value: add_recipient_value });
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 10 }}></View>
                                    </View>
                                    <View style={{ height: 20 }}></View>
                                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                                        <TouchableOpacity onPress={() => { this.setState({ showing_addstate: 'flex', ach_payment_dialog: false }); this.add_ACH() }} style={styles.buttonStyle}>
                                            <ActivityIndicator style={[styles.buttonText, { display: this.stateshowing_addstate !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                            </ActivityIndicator>
                                            <Text style={[styles.buttonText, { display: this.stateshowing_addstate == 'flex' ? 'none' : 'flex' }]}>
                                                Save
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            }
                        </DialogContent>
                    </Dialog>
                    <View style={{ height: 30 }}></View>
                    {/* <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                        <TouchableOpacity onPress={() => { this.setState({ choose_payment_show: true }) }} style={styles.buttonStyle}>
                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                            </ActivityIndicator>
                            <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                Your Payments
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient> */}
                    <View style={{ height: 30 }}></View>
                    <View style={styles.countries}>
                        <View style={styles.sendmoney}>
                            <Text style={styles.titletext}>
                                You send
                            </Text>
                            <TextInput
                                style={styles.sendmoneyinput}
                                keyboardType="number-pad"
                                placeholder="0"
                                onEndEditing={() => this.exchange_currency()}
                                onChangeText={(sendAmount) => {
                                    this.setState({ sendAmount });
                                }}>
                            </TextInput>
                        </View>
                        <Dropdown
                            label=''
                            data={sendcurrencies}
                            dropdownPosition={0}
                            animationDuration={500}
                            containerStyle={{ width: '30%', marginTop: -5, marginRight: 5, marginLeft: 5 }}
                            onChangeText={(sendcurrency, index) => {
                                this.setState({
                                    sendcurrency,
                                    fromcurrency: fromcurrencies[index],
                                    selectedIndex: index
                                });
                                this.exchange_currency();
                            }}
                            value={this.state.sendcurrency}
                        />
                    </View>
                    <Text style={{ width: '100%', textAlign: 'center', color: 'black', fontSize: 25, padding: 15, marginTop: 10 }} >{"1" + this.state.fromcurrency + " = " + this.state.rate + this.state.tocurrency}</Text>
                    <View style={styles.countries}>
                        <View style={{ borderRightColor: 'rgba(0,0,0,0.5)', borderRightWidth: 0.5, width: '65%', }}>
                            <Text style={styles.titletext}>
                                Recipient gets
                            </Text>
                            <Text style={{ width: '100%', textAlign: 'center', color: '#00ff00', fontSize: 25, padding: 15 }} >{this.state.recipient_get}</Text>
                        </View>
                        <Dropdown
                            label=''
                            data={receivecurrencies}
                            dropdownPosition={0}
                            animationDuration={300}
                            containerStyle={{ width: '30%', marginTop: -5, marginRight: 5, marginLeft: 5 }}
                            onChangeText={(receivecurrency, index) => {
                                this.setState({ receivecurrency, tocurrency: tocurrencies[index] });
                                this.exchange_currency()
                            }}
                            value={this.state.receivecurrency}
                        />
                    </View>
                    <Text style={{ width: '100%', textAlign: 'center', color: 'black', fontSize: 25, padding: 15, marginTop: 10 }} >{"Total = " + this.state.recipient_get + " "+this.state.tocurrency}</Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 10 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', width: '95%', marginTop: 15 }}>
                        <TouchableOpacity>
                            <Text style={{ marginLeft: 20, marginRight: 0, color: 'black', fontSize: 15, fontWeight: 'bold' }}>Select Payout method</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', fontSize: 15, }}>
                        <Image source={source1} style={{ width: 20, height: 20, resizeMode: 'contain', marginTop: 0, marginLeft: 10 }} />
                        <TouchableOpacity onPress={() => this.change_radio(1)}>
                            <Text
                                style={{ alignSelf: 'center', marginLeft: 10, color: 'black', fontWeight: 'bold' }}>Phone number, E-mail, M-pesa</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput style={styles.textcontainer}
                        placeholder="Mobile phone, Email, M-pesa"
                        onChangeText={(recipient_value) => this.setState({ recipient_value })}
                        returnKeyType='done'
                        multiline={false}
                        onEndEditing={this.choose_type}
                        editable={this.state.type_account}
                    ></TextInput>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', width: '95%', marginTop: 15 }}>
                        <Image source={source2} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        <TouchableOpacity onPress={() => this.change_radio(2)}>
                            <Text style={{ marginLeft: 10, marginRight: 0, color: 'black', fontSize: 15, fontWeight: 'bold' }}>Bank transfer</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.countries1}>
                        <Dropdown
                            label='Select recipient'
                            data={this.state.recipient_names}
                            dropdownPosition={0}
                            animationDuration={500}
                            containerStyle={{ width: '100%', alignSelf: 'center', }}
                            onChangeText={(account_bank, index) => this.setState({
                                account_bank: account_bank,
                                account_code: this.state.bank_codes[index],
                                account_index: index
                            })}
                            value={this.state.account_bank}
                        />
                    </View>
                    <View style={styles.countries1}>
                        <TouchableOpacity onPress={() => this.setState({ scaleAnimationDialog: true })} style={styles.addbtn}>
                            <Icon name="add-box" type="MaterialIcons" style={styles.addicon} />
                            <Text style={styles.addtext}>
                                Add new Recipient
                        </Text>
                        </TouchableOpacity>
                        <View style={styles.hori_line}></View>
                    </View>
                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                        <TouchableOpacity onPress={() => { this.setState({ showing_activity: 'none' }); this.transation() }} style={styles.buttonStyle}>
                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                            </ActivityIndicator>
                            <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={{ height: 50 }}></View>
                    <Dialog
                        onTouchOutside={() => {
                            this.setState({ scaleAnimationDialog: false, showwaiting_cardbtn: 'none' });
                        }}
                        width={0.9}
                        visible={this.state.scaleAnimationDialog}
                        dialogAnimation={new ScaleAnimation()}
                        onHardwareBackPress={() => {
                            console.log('onHardwareBackPress');
                            this.setState({ scaleAnimationDialog: false });
                            return true;
                        }}
                        // dialogTitle={
                        //     <DialogTitle
                        //         title='Type recipient information'
                        //         hasTitleBar={false}
                        //     />
                        // }
                        actions={[
                            <DialogButton
                                text="DISMISS"
                                onPress={() => {
                                    this.setState({ scaleAnimationDialog: false });
                                }}
                                key="button-1"
                            />,
                        ]}
                    >
                        <DialogContent>
                            {
                                <View style={{ width: '100%' }}>
                                    <View style={styles.itemdialog}>
                                        <View>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', marginTop: 15 }}>
                                                Names
                                            </Text>
                                            <TextInput
                                                onChangeText={(recipient_name) => {
                                                    this.setState({ recipient_name: recipient_name });
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 10 }}></View>
                                    </View>
                                    <View style={styles.itemdialog}>
                                        <View>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', marginTop: 15 }}>
                                                Recipient Bank Details
                                            </Text>
                                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                                <TouchableOpacity onPress={() => this.chanageTab1(1)} style={this.state.ibantab1}>
                                                    <Text style={{ width: '100%', textAlign: 'center', paddingBottom: 11, paddingTop: 10 }}>
                                                        IBAN
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={{ height: '100%', width: 1, backgroundColor: 'rgba(0,0,0,0.5)', }}></View>
                                                <TouchableOpacity onPress={() => this.chanageTab1(2)} style={this.state.sortcodetab1}>
                                                    <Text style={{ width: '100%', textAlign: 'center', paddingBottom: 11, paddingTop: 10 }}>
                                                        Sort Code
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={{ height: '100%', width: 1, backgroundColor: 'rgba(0,0,0,0.5)', }}></View>
                                                <TouchableOpacity onPress={() => this.chanageTab1(3)} style={this.state.routingnumbertab1}>
                                                    <Text style={{ width: '100%', textAlign: 'center', paddingBottom: 11, paddingTop: 10 }}>
                                                        Routing Number
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 0 }}></View>
                                    </View>
                                    <View style={styles.itemdialog}>
                                        <View>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', marginTop: 15 }}>
                                                Account Number
                                            </Text>
                                            <TextInput
                                                onChangeText={(add_account_number) => {
                                                    this.setState({ add_account_number: add_account_number });
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 10 }}></View>
                                    </View>
                                    <View style={styles.itemdialog}>
                                        <View>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', marginTop: 15 }}>
                                                {this.state.recipient_bank_type}
                                            </Text>
                                            <TextInput
                                                onChangeText={(add_account_bank) => {
                                                    this.setState({ add_account_bank: add_account_bank });
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 10 }}></View>
                                    </View>
                                    <View style={{ height: 20 }}></View>
                                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
                                        <TouchableOpacity onPress={() => { this.setState({ showing_addstate: 'flex', scaleAnimationDialog: false }); this.add_recipient() }} style={styles.buttonStyle}>
                                            <ActivityIndicator style={[styles.buttonText, { display: this.stateshowing_addstate !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                            </ActivityIndicator>
                                            <Text style={[styles.buttonText, { display: this.stateshowing_addstate == 'flex' ? 'none' : 'flex' }]}>
                                                Add Recipient
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            }
                        </DialogContent>
                    </Dialog>
                </Content>
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient1: {
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        justifyContent: 'center',
        marginHorizontal: 3,
        marginTop: 10,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
    },
    itemdialog1: {
        width: '50%',
        paddingLeft: 15,
        borderRadius: 0,
        justifyContent: 'center',
        marginTop: 1,
        alignSelf: 'center',
        // shadowOffset: { height: 2 },
        // shadowOpacity: 0.3,
        // elevation: 3,
        backgroundColor: 'white',
        padding: 5,
        borderBottomColor: 'rgba(0,0,0,0.4)',
        borderBottomWidth: 1,
    },
    itemdialog2: {
        width: '50%',
        paddingLeft: 15,
        borderRadius: 0,
        justifyContent: 'center',
        marginTop: 1,
        alignSelf: 'center',
        // shadowOffset: { height: 2 },
        // shadowOpacity: 0.3,
        // elevation: 3,
        backgroundColor: 'white',
        padding: 5,
        borderBottomColor: 'rgba(0,0,0,0.4)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.4)',
        borderRightWidth: 1,
    },
    cardpart: {
        width: '100%',
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 20,
        alignSelf: 'center',
        // shadowOffset: { height: 2 },
        // shadowOpacity: 0.3,
        // elevation: 3,
        backgroundColor: 'white',
        padding: 5,
        // borderColor: 'rgba(240,240,240,0.8)',
        // borderWidth: 1,
    },
    itemdialog: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 0,
        alignSelf: 'center',
        // shadowOffset: { height: 2 },
        // shadowOpacity: 0.3,
        // elevation: 3,
        backgroundColor: 'white',
        padding: 5,
        borderBottomColor: 'rgba(0,0,0,0.4)',
        borderBottomWidth: 1,
    },
    textcontainer: {
        flexDirection: 'column',
        marginTop: 20,
        width: '80%',
        height: 80,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        alignSelf: 'center',
        elevation: 2,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
        fontSize: 20
    },
    activeTab: {
        alignContent: 'center',
        width: '33%',
        borderBottomColor: 'rgba(0,0,0,0.5)',
        borderBottomWidth: 5,
    },
    inactiveTab: {
        alignContent: 'center',
        width: '33%',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 15,
        paddingBottom: 15,
    },
    buttonStyle: {
        width: '100%',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 50,
    },
    linearGradient1: {
        width: '80%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        justifyContent: 'center',
        marginHorizontal: 3,
        marginTop: 20,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
    },
    sendmoneyinput: {
        width: '100%',
        textAlign: 'center',
        color: '#00ff00',
        fontSize: 25
    },
    titletext: {
        width: '100%',
        fontSize: 15,
        marginLeft: 10,
        paddingTop: 10,
    },
    sendmoney: {
        borderRightColor: 'rgba(0,0,0,0.5)',
        borderRightWidth: 0.5,
        width: '65%',
    },
    addbtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    addtext: {
        width: '100%',
        fontSize: 15,
        marginLeft: 10,
        paddingTop: 6,
        color: 'black'
    },
    addicon: {
        fontSize: 25,
        color: 'rgba(0,0,0,1)',
        paddingTop: 5,
    },
    hori_line: {
        width: '100%',
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 10
    },
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
        marginTop: 10,
        padding: 0,
        borderRadius: 5,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    countries1: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 10,
        padding: 0,
        borderRadius: 5,
        justifyContent: 'space-between'
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
        marginTop: 5,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
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
});
