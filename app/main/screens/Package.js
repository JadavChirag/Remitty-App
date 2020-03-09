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
    TextInput,
    ScrollView,
    Button,
    AsyncStorage
} from 'react-native';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

import TextIconButton from '../componentItem/Payloan/iconTextButton'
import GradiantButton from '../componentItem/gradiantButton'
import LinearGradient from 'react-native-linear-gradient'
import InputText from '../componentItem/Buysell/InputText'
import SelectButton from '../componentItem/selectButton'
import { Dropdown } from 'react-native-material-dropdown';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const currencies = Constant.cryptocurrencies;
const fiatcurrencies = Constant.fiatcurrencies;
const pairs = Constant.pairs;
const packages = [{
    value: '3 Days'
}, {
    value: '5 Days'
}, {
    value: '1 Week'
}];

const curencies = [{
    value: 'USD'
}, {
    value: 'BTC'
}, {
    value: 'RHT'
}];

type Props = {};
export default class Package extends Component<Props> {
    state = {
        defaultAnimationDialog: false,
        BuySellType:'',
        packageplan:'3 Days',
        currency:'USD',
        fiatcurrency:'USD',
        btcbal:0,
        usdbal:0,
        rhtbal:0,
        balance:0,
        btcprice:0,
        usdprice:1,
        rhtprice:0,
        user_id:0,
        packageamount:0,
        price:0,
        amount:null,
        pairdetails:[],
        feedetails:[],
        tableHead   : ['Date', 'Currency', 'Amount','Plan', 'Status'],
        tableData   : [
                ['No records found at the meoment'],
            ],
            scaleAnimationDialog:false,

    };
     componentDidMount() {
        this.initialize();
        this.load();
        this.props.navigation.addListener('willFocus', this.load)
     }
     initialize = async () => {
    
      this.setState({
        user_id :await AsyncStorage.getItem('user_id'),
        productdet:this.props.navigation.getParam('productdetails'),
      });
    console.log(JSON.parse(this.state.productdet).prod_id);
     }

    load = () => {
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
                        this.getfeedetails(res.token);
                        this.getprice_det(res.token);
                        this.getpackagehistoty(resbbbbbbbbbbbbbb.token);
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
    gettoken = (name) => {
        if(name=='orderplace')
        {
            let {
            amount,
            price
        } = this.state;
          if (amount == null || price==0) { alert('please fill all input!');  return }
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
                        if(name=="balance")
                        {
                            this.balance(res.token);
                        }
                        else if(name=="getprice")
                        {
                            this.getprice(res.token);
                        }
                        else if(name=="buy")
                        {
                            this.buy(res.token);
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
    getprice_det = (token) => {

        try {
            fetch(Constant.req_url+"getconversionpricedet", {
                method: 'POST',
                body: JSON.stringify({
                    user_id         :   this.state.user_id,
                    fromcurrency    :   'BTC',
                    tocurrency      :   'USD',
                    token           :   token
                }),
            }).then((response) => response.json())
                .then((res => {
                    this.setState({ btcprice : parseFloat(res.curprice).toFixed(8) });
                })
            );
        }
        catch (e) {
            alert(e)
        }
    }
    buy = (token) => {
        try {
            fetch(Constant.req_url+"buypackage", {
                method: 'POST',
                body: JSON.stringify({
                user_id       : this.state.user_id,
                currency      : this.state.currency,
                packageamount : this.state.packageamount,
                packageplan   : this.state.packageplan,
                prod_id       : JSON.parse(this.state.productdet).prod_id,
                token         : token
                }),
            }).then((response) => response.json())
                .then((res => {
                    if(res.status)
                    {
                        alert(res.message)
                    }
                    else
                    {
                        alert(res.message)
                    }

                })
            );
        }
        catch (e) {
            alert(e)
        }
    }
     balance = (token) => {
      // alert(this.state.currency);
        try {
            fetch(Constant.req_url+"getbalance", {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    token:token
                }),
            }).then((response) => response.json())
                .then((res => {
                        
                    if (res.status) {
                        var btcindex = res.result.findIndex(x => x.currency ==='BTC');
                        var usdindex = res.result.findIndex(x => x.currency ==='USD');
                        var rhtindex = res.result.findIndex(x => x.currency ==='RHT');
                        this.setState({ btcbal : parseFloat(res.result[btcindex].balance).toFixed(8) });
                        this.setState({ usdbal : parseFloat(res.result[usdindex].balance).toFixed(8) });
                        this.setState({ balance : parseFloat(res.result[usdindex].balance).toFixed(8) });
                        this.setState({ rhtbal : parseFloat(res.result[rhtindex].balance).toFixed(8) });
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

getpackagehistoty = (token) => {
      // alert(this.state.currency);
        try {
            fetch(Constant.req_url+"getpackagehistoty", {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    token:token
                }),
            }).then((response) => response.json())
                .then((res => {
                        
                    if (res.status) {
                        if(res.result.length>0)
                        {
                            this.setState({ tableData : res.result });
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

    getfeedetails = (token) => {
        // alert(this.state.currency);
        try {
            fetch(Constant.req_url+"getfeedetails", {
                method: 'POST',
                body: JSON.stringify({
                    token:token
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.setState({ feedetails : res.result,packageamount:res.result.threedayspackage });
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
            fetch(Constant.req_url+"getprice", {
                method: 'POST',
                body: JSON.stringify({
                pair: this.state.pair,
                type: this.state.BuySellType.toLowerCase(),
                token:token
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.setState({ price : parseFloat(res.result).toFixed(8) });
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

    orderplace = (token) => {
        try {
            fetch(Constant.req_url+"currency_exchange", {
                method: 'POST',
                body: JSON.stringify({
                pair: this.state.pair,
                amount: this.state.amount,
                price: this.state.price,
                type: this.state.BuySellType.toLowerCase(),
                user_id: this.state.user_id,
                token:token
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

    getpackageprice = () => {
        var curpackage = this.state.packageplan;
        var currency = this.state.currency;
        var packageamount = (curpackage=='3 Days')?this.state.feedetails.threedayspackage:(curpackage=='5 Days')?this.state.feedetails.fivedayspackage:(curpackage=='1 Week')?this.state.feedetails.sevendayspackage:0;
        var curprice = (currency=='USD')?1:(currency=='BTC')?this.state.btcprice:(currency=='RHT')?this.state.feedetails.rhtprice:0;
        this.setState({
            packageamount : parseFloat(packageamount/curprice).toFixed(8),
        });
    }

    dependsoncurrency = () => {
        var curpackage = this.state.packageplan;
        var currency = this.state.currency;
        var curprice = (currency=='USD')?1:(currency=='BTC')?this.state.btcprice:(currency=='RHT')?this.state.feedetails.rhtprice:0;
        var balance = (currency=='USD')?this.state.usdbal:(currency=='BTC')?this.state.btcbal:(currency=='RHT')?this.state.rhtbal:0;
        var packageamount = (curpackage=='3 Days')?this.state.feedetails.threedayspackage:(curpackage=='5 Days')?this.state.feedetails.fivedayspackage:(curpackage=='1 Week')?this.state.feedetails.sevendayspackage:0;
        this.setState({
            packageamount : parseFloat(packageamount/curprice).toFixed(8),
            balance : balance,
        });
    }

    render() {
         const state = this.state;
        return (
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Buy Package</Text>
                <View style={{
                textAlign: 'center',alignItems: 'center', borderRadius: 10, backgroundColor: 'white', width: '90%', height: 110,  elevation: 5, shadowOffset: { height: 2 },
                shadowOpacity: 0.3, marginTop: 15, marginBottom: 20,borderWidth:1,
                borderColor:'rgba(240,240,240,0.8)',alignSelf: 'center'
                }}>
                    <Text style={{ fontWeight: "200", fontSize: 18, color: '#1A1F84', marginTop: 5 }}>Available Balance</Text>
                    <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>{this.state.currency+" "+this.state.balance }</Text>
                </View>
             
                
            <Dropdown
            label='Select Package'
            data={packages}
            dropdownPosition={0}
            animationDuration={300}
            containerStyle={{ width: '80%', alignSelf: 'center', marginTop: -5 }}
            onChangeText={(packageplan, index) => { this.setState({ packageplan, selectedIndex: index }); this.getpackageprice();}}
            value={this.state.packageplan}
            // selectedIndex={this.state.selectedIndex}
            />   

             <Dropdown
            label='Select currency'
            data={curencies}
            dropdownPosition={0}
            animationDuration={300}
            containerStyle={{ width: '80%', alignSelf: 'center', marginTop: -5 }}
            onChangeText={(currency, index) => { this.setState({ currency, selectedIndex: index }); this.dependsoncurrency();}}
            value={this.state.currency}
            // selectedIndex={this.state.selectedIndex}
            />   
            <Text>Package Amount : {this.state.packageamount+' '+this.state.currency}</Text>
                <View style={[styles.containerSub, { alignItems:'center', marginTop: 40, }]}>

                    <GradiantButton
                        textIndo="Buy"
                        onPress={() => {
                            this.setState({
                                BuySellType:'Buy it now',
                                scaleAnimationDialog: true,
                            });
                            this.gettoken('buy');
                        }}
                    />
                   
                </View>
              
                <Text style={[styles.title, { marginTop: 50, marginBottom: 30,backgroundColor: '#fff' }]}>Package history</Text>
                <View style={styles.teblecontainer}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                       <Rows data={state.tableData}/>
                    </Table>
                </View>


            </View >
            <Header navigation={this.props.navigation}/>
            </ScrollView>
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
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    title: {
        fontWeight: "600",
        fontSize: 24,
        color: 'black',
        marginTop: 15

    },
    txtSub: {
        fontWeight: "600",
        fontSize: 24,
        color: 'black',


    },
    textcontainer: {
        width: '100%',

        alignItems: 'flex-start',
        backgroundColor: 'white'
    },
    teblecontainer: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff',width:'100%' },
    dialogContentView: {
        // flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        // backgroundColor: '#000',
        // opacity: 0.4,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    head: { height: 40, backgroundColor: '#c8e1ff' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#fff' },
  btn: { width: 58, height: 18, backgroundColor: '#c8e1ff',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }

});
