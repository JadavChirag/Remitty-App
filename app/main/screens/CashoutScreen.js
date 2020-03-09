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
    Image,
    Dimensions,
    AsyncStorage,
    TextInput,
    TouchableOpacity
} from 'react-native';

import GradiantButton from '../componentItem/gradiantButton'
import SelectButton from '../componentItem/selectButton'
import TextIconButtonSnd from '../componentItem/send/IconTextButton'
import TextButton from '../componentItem/send/TextButton'
import InputText from '../componentItem/Offer/InputText'
import InputTextSnd from '../componentItem/send/InputText'

import bitcoinIcon from '../../assets/images/bitcoin.png';
import ethIcon from '../../assets/images/eth.png';
import RemityIcon from '../../assets/images/R.png';
import ArroryIcon from '../../assets/images/arrowdown.png';
import ExchangeIcon from '../../assets/images/exchange.png';
import litecoinIcon from '../../assets/images/litecoin.png';
import swapicon from '../../assets/images/swapicon.png';
import { Dropdown } from '../componentItem/react-native-material-dropdown';
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal';
import {
    Content,
    Container
} from 'native-base';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const countries = [{
    value: 'Ghana(Ghana mobile money)'
}, {
    value: 'Kenya(Mpesa)'
}, {
    value: 'Tanzania(Mpesa)'
}, {
    value: 'Rwanda(Rwanda mobile money)'
}, {
    value: 'Nigeria(Account Bank)'
}, {
    value: 'Uganda(Uganda mobile money)'
}];
const operators = [{
    value: 'MTN'
}, {
    value: 'MPS'
}];
const currencies = [{
    value: 'USD'
}];

const currencies_from = [
{
    value: 'USD'
},
{
    value: 'XAF'
}
];

const convertcurrencies_all = [{
    value: 'EUR'
}, {
    value: 'GBP'
}, {
    value: 'CAD'
}, {
    value: 'AUD'
}, {
    value: 'XAF'
}, {
    value: 'NGN'
}, {
    value: 'KES'
}, {
    value: 'INR'
}, {
    value: 'CNY'
}, {
    value: 'PHP'
}, {    
    value: 'GHS'
}, {
    value: 'MXN'
}, {
    value: 'MYR'
}, {
    value: 'THB'
}, {
    value: 'TRY'
}, {
    value: 'TZS'
}, {
    value: 'UGS'
}, {
    value: 'XOF'
}, {
    value: 'ZAR'
}, {
    value: 'CHF'
}, {
    value: 'SEK'
}, {
    value: 'SGD'
}, {
    value: 'HKD'
}, {
    value: 'JPY'
}];

const convertcurrencies_usd = [{
    value: 'USD'
}];


const payment_methods = [
{
    value: 'Bank Transfer'
},
{
    value: 'Paypal'
},
// {
//     value: 'Google Pay'
// },
// {
//     value: 'Mobile money'
// },
// {
//     value: 'Apple Pay'
// }
];
const currency_gets = ['GHS', 'KES', 'TZS', 'RWF', 'NGN', 'UGX'];
const exchange_currency = require('../../assets/images/exchange_currency.png');
export default class SendScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operators: operators,
            currency_get: 'GHS',
            fromcurrency: 'USD',
            tocurrency: 'USD',
            beneficiary_name:null,
            account_number:null,
            national_code:null,
            bank_name:null,
            swift_code:null,
            bank_address:null,
            routing_number:null,
            sedd: false,
            payment_method: 'Bank Transfer',
            balance: 0,
            r_account: 0,
            amount: '0.00',
            curprice: 1,
            currencyconv_fees_bank: 35,
            currencyconv_fees_others: 12.99,
            feeprice: 35,
            selectedIndex: 0,
            rate: '0.0',
            convertcurrencies: convertcurrencies_all,
            currencies_from: currencies_from,
        };
    }
    componentDidMount() {
        this.initialize();
        this.gettoken('balance');
    }

    initialize = async () => {
        this.setState({
            user_id :await AsyncStorage.getItem('user_id')
        });
    }

    gettoken = (name) => {

        if(this.state.payment_method=='Cash App' || this.state.payment_method=='Venmo'){
            this.setState({ convertcurrencies : convertcurrencies_usd });
            this.setState({ tocurrency : 'USD' });
        } else {
            this.setState({ convertcurrencies : convertcurrencies_all });
        }


        let {
            beneficiary_name,
            account_number,
            national_code,
            bank_name,
            bank_address,
            routing_number,
            swift_code
        } = this.state;

        if(name=="withdrawsubmit")
        {
            if (this.state.amount == 0 ) { alert('please fill all input!');  return }
        }

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
                        if(name=="bankaccountdetails")
                        {
                            this.bankaccountdetails(res.token);
                        }
                        else if(name=="balance")
                        {
                            this.balance(res.token);
                        }
                        else if(name=="venmoaccountdetails")
                        {
                            this.venmoaccountdetails(res.token);
                        }
                        else if(name=="paypalaccountdetails")
                        {
                            this.paypalaccountdetails(res.token);
                        }
                        else if(name=="getprice_det")
                        {
                            this.getprice_det(res.token);
                        }
                        else if(name=="withdrawsubmit")
                        {
                            this.withdrawsubmit(res.token);
                        }
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

     bankaccountdetails = (token) => {
        try {
            fetch(Constant.req_url+"addbankdetials", {
                method: 'POST',
                body: JSON.stringify({
                    user_id             : this.state.user_id,
                    beneficiary_name    : this.state.beneficiary_name,
                    account_number      : this.state.account_number,
                    national_code       : this.state.national_code,
                    bank_name           : this.state.bank_name,
                    bank_address        : this.state.bank_address,
                    routing_number      : this.state.routing_number,
                    swift_code          : this.state.swift_code,
                    token               : token
                }),
            }).then((response) => response.json())
                .then((res => {
                        
                    if (res.status) {
                        alert(res.message);
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

    paypalaccountdetails = (token) => {
        try {
            fetch(Constant.req_url+"addpaypaldetails", {
                method: 'POST',
                body: JSON.stringify({
                    user_id             : this.state.user_id,
                    paypal_account      : this.state.paypal_account,
                    token               : token
                }),
            }).then((response) => response.json())
                .then((res => {
                        alert(JSON.stringify(res));
                    if (res.status) {
                        alert(res.message);
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

    venmoaccountdetails = (token) => {
        try {
            fetch(Constant.req_url+"addvenmodetails", {
                method: 'POST',
                body: JSON.stringify({
                    user_id             : this.state.user_id,
                    venmo_account    : this.state.venmo_account,
                    token               : token
                }),
            }).then((response) => response.json())
                .then((res => {
                        
                    if (res.status) {
                        alert(res.message);
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

    balance = (token) => {
        try {
            fetch(Constant.req_url+"getparticularbalance", {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    currency:this.state.fromcurrency,
                    token:token
                }),
            }).then((response) => response.json())
                .then((res => { 
                    if (res.status) {
                        
                        this.setState({ balance : parseFloat(res.result).toFixed(8) });
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

    getprice = (token) => {
        try {
            fetch(Constant.req_url+"getconversionprice", {
                method: 'POST',
                body: JSON.stringify({
                    user_id         :   this.state.user_id,
                    fromcurrency    :   this.state.fromcurrency,
                    tocurrency      :   this.state.tocurrency,
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

    getprice_det = (token) => {

        try {
            fetch(Constant.req_url+"getconversionpricedet", {
                method: 'POST',
                body: JSON.stringify({
                    user_id         :   this.state.user_id,
                    fromcurrency    :   this.state.fromcurrency,
                    tocurrency      :   this.state.tocurrency,
                    token           :   token
                }),
            }).then((response) => response.json())
                .then((res => {
                    this.setState({ balance : parseFloat(res.balance_fromcurrency).toFixed(8) });
                    this.setState({ curprice : parseFloat(res.curprice).toFixed(8) });
                    this.setState({ currencyconv_fees_bank : parseFloat(res.currencyconv_fees_bank).toFixed(8) });
                    this.setState({ currencyconv_fees_others : parseFloat(res.currencyconv_fees_others).toFixed(8) });

                    if(this.state.fromcurrency=='XAF'){
                        this.setState({ tocurrency : 'USD' });
                        this.setState({ convertcurrencies : convertcurrencies_usd });
                    }

                    if(this.state.payment_method=='Bank Transfer'){
                        this.setState({ feeprice : parseFloat(res.currencyconv_fees_bank).toFixed(8) });
                    } else {
                        this.setState({ feeprice : parseFloat(res.currencyconv_fees_others).toFixed(8) });
                    }

                })
            );
        }
        catch (e) {
            alert(e)
        }
    }

    withdrawsubmit = (token) => {
        try {
            fetch(Constant.req_url+"withdrawsubmit", {
                method: 'POST',
                body: JSON.stringify({
                    user_id         :   this.state.user_id,
                    fromcurrency    :   this.state.fromcurrency,
                    tocurrency      :   this.state.tocurrency,
                    payment_method  :   this.state.payment_method,
                    amount          :   this.state.amount,
                    curprice        :   this.state.curprice,
                    currencyconv_fees_bank        :   this.state.currencyconv_fees_bank,
                    currencyconv_fees_others      :   this.state.currencyconv_fees_others,
                    token           :   token
                }),
            }).then((response) => response.json())
                .then((res => { 
                    if(res.status)
                    {
                        alert(res.message);
                        this.gettoken('balance');
                        this.setState({ amount : 0});
                    } else {
                        alert(JSON.stringify(res))
                    }
                })
            );
        }
        catch (e) {
            alert(e)
        }
    }
    calculate = () =>{
        // alert('fsdfsdf')
    }
    selectcurrency = () =>{
        // alert('fsdfsdf')
    }
    selectfromcurrency = () =>{
        // alert('fsdfsdf')
    }
    selecttocurrency = () =>{
        // alert('fsdfsdf')
    }
    render() {
        let { balance_btc } = this.state;
        let { balance_eth } = this.state;
        let { balance_ltc } = this.state;
        return (
            <View style={styles.container}>
                <Content style={{ width: '100%' }}>
                    <Text style={[styles.title, { marginTop: 20, opacity: 0 }]}>Send from</Text>
                
                  
                    <Text style={[styles.title, { marginTop: 2 }]}>Cashout</Text>
                    
                    <View style={{
                    textAlign: 'center',alignItems: 'center', borderRadius: 10, backgroundColor: 'white', width: '90%', height: 90,  elevation: 5, shadowOffset: { height: 2 },
                    shadowOpacity: 0.3, marginTop: 15, marginBottom: 20,borderWidth:1,
                    borderColor:'rgba(240,240,240,0.8)',alignSelf: 'center'
                    }}>
                            <Text style={{ fontWeight: "200", fontSize: 18, color: '#1A1F84', marginTop: 5 }}>Available Balance</Text>
                            <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>{parseFloat(this.state.balance).toFixed(2)}</Text>
                            
                    </View>

                     <View style={styles.send_part}>
                        <Dropdown
                            label='Select Currency'
                            data={this.state.currencies_from}
                            dropdownPosition={0}
                            animationDuration={300}
                            containerStyle={{ width: '30%',  marginTop: -5,  }}
                            onChangeText={(fromcurrency, index) => { this.setState({ fromcurrency, selectedIndex: index }); this.gettoken('getprice_det'); this.selectfromcurrency(); }}
                            value={this.state.fromcurrency}
                        />
                        <Image source={swapicon} style={{ width: 30, height: 30,marginRight:10 }} />
                          <Dropdown
                            label='Select Currency'
                            data={this.state.convertcurrencies}
                            dropdownPosition={0}
                            animationDuration={300}
                            containerStyle={{ width: '30%', marginTop: -5 }}
                            onChangeText={(tocurrency, index) => { this.setState({ tocurrency, selectedIndex: index }); this.gettoken('getprice_det'); this.selecttocurrency(); }}
                            value={this.state.tocurrency}
                        />
                        
                    </View>

                     <View style={styles.countries}>
                        <Dropdown
                            style={{ width: '100%', height: 30 }}
                            label='Select Payment'
                            data={payment_methods}
                            dropdownPosition={0}
                            animationDuration={500}
                            containerStyle={{ width: '90%', alignSelf: 'center', }}
                            onChangeText={(payment_method, index) => { this.setState({payment_method: payment_method}); this.gettoken('getprice_det'); } }
                            value={this.state.country}
                        // selectedIndex={this.state.selectedIndex}
                        />
                    </View>
                        <Text style={{ fontSize:10,marginLeft:40,marginTop:5 }}>Note : Before submit withdraw form need to fill the payment account details. <Text style={{color: 'blue'}}
                        onPress={() => this.props.navigation.navigate('AccountScreen')}>
                        Click here
                        </Text> to update </Text>

                     <InputText
                        style={{ alignSelf: 'center', }}
                        txtplaceholder="Withdraw amount"
                        onChangeText={this.calculate(),(amount) => this.setState({ amount }) }
                        value={this.state.amount}
                    />
                    <View style={{ flexDirection:'row' }}>
                    <Text style={{ fontSize:10,marginLeft:40,marginTop:5 }}>Estimated value : {(this.state.curprice*this.state.amount)+' '+this.state.tocurrency}  </Text>

                    <Text style={{ fontSize:10,marginLeft:50,marginTop:5 }}>Estimated balance : {(this.state.balance-this.state.amount)+' '+this.state.tocurrency}  </Text>
                    </View>

                    {(this.state.payment_method=='Bank Transfer') || (this.state.payment_method=='Paypal') || (this.state.payment_method=='Mobile money') ? (
                        <Text style={[styles.txtsub, { marginTop: 25 }]}>Conversion rate : {this.state.curprice+' '+this.state.tocurrency} </Text>
                    ) : null}
        
                    <Text style={[styles.txtsub, { marginTop: 25 }]}>Fees : {this.state.feeprice+' USD'} </Text>          
                    
                    <GradiantButton
                        style={{ width: 200 }}
                        textIndo="Submit"
                        onPress={() => this.gettoken('withdrawsubmit')}
                    />

                    <View style={{ height: 50 }}></View>

                   
                </Content>
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
});
