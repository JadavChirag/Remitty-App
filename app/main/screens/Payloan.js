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
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import TextIconButton from '../componentItem/Payloan/iconTextButton'
import GradiantButton from '../componentItem/Select/gradiantButton'
import LinearGradient from 'react-native-linear-gradient'

import bitcoinIcon from '../../assets/images/bitcoin.png';
import ethIcon from '../../assets/images/eth.png';
import litecoinIcon from '../../assets/images/litecoin.png';
import sendMoneyIcon from '../../assets/images/sendMoney.png';
import cryptoIcon from '../../assets/images/cashloan.png';
import tradeExchangeIcon from '../../assets/images/tradeExchange.png';
import cashInIcon from '../../assets/images/cashIn.png';

import {
    Content,
    Container
} from 'native-base';

type Props = {};
export default class Index extends Component<Props> {
  constructor(props) {
      super(props);
      this.state = {
        user_id:0,
        firstname:'',
        selectfield:'BTC',
        col_wallet_bal:0,
        balance:0,
        showme:true,
        currency:'USD',
        tableData1  : [['No records found at the moment'],],
        loan_balance:0,
        due_loan:false,
        due_loan_date:'',
        due_loan_amount:'',
        due_loan_day:'',
        btc_balance:0,
        ltc_balance:0,
        eth_balance:0,
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
                    this.profile_details(res.token);
                    this.gettoken('loan_balance');
                    this.gettoken('getbalance');
                  }
                  else {
                    this.setState({showme:false})
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
      this.initialize();
  }
  initialize = async () => {
      this.setState({
          user_id:await AsyncStorage.getItem('user_id')
      })
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
                      if(name=='profile_details'){
                        this.profile_details(res.token);
                      } else if(name=='loan_balance'){
                        this.getactiveloan(res.token);
                      } else if(name=='getbalance'){
                        this.getbalance(res.token);
                      }
                  }
                  else {
                    this.setState({showme:false})
                    alert(JSON.stringify(res));
                  }
              })
          );
      }
      catch (e) {
          alert(e)
      }
  }

  getactiveloan = (token) => {
     try {
          fetch(Constant.req_url+"active_loans", {
             method: 'POST',
             body: JSON.stringify({
               token:token,
               user_id:this.state.user_id
             }),
         }).then((response) => response.json())
             .then((res => {
               var loan_amount = 0;
               var loan_date = '';
               var loan_amount = 0;
               var loan_day = '';
                 if (res.status) {
                   var result = res.result;
                   var testdata1 = [];
                   var testdata = [];
                   if(result.length>0)
                   {
                     for(var i=0;i<result.length;i++)
                     {
                       var testdata1 = [];
                       testdata1.push(result[i].created_date);
                       testdata1.push(result[i].currency);
                       testdata1.push(result[i].loan_amount);
                       testdata.push(testdata1);
                       loan_amount = loan_amount + result[i].loan_amount;
                       if(loan_date==''){
                         this.setState({due_loan:true});
                         loan_date = result[i].created_date;
                         loan_amount = result[i].loan_amount;

                         var res = loan_date.split(" ");
                         var date = res[0];
                         date=date.replace(/([0-9]{2})\-([0-9]{2})\-([0-9]{4})/g, '$3-$2-$1');
                         var d = new Date(date);

                         var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                         loan_day = days[d.getDay()];
                       }
                     }
                    this.setState({tableData1:testdata});
                   }
                   else
                   {
                     this.setState({tableData1:[['No records found at the moment'],]});
                   }
                 }
                 else {
                   // alert(res.message);
                 }
                 this.setState({
                   loan_balance:loan_amount,
                   due_loan_date:loan_date,
                   due_loan_amount:loan_amount,
                   due_loan_day:loan_day,
                  });
             })
          );
     }
     catch (e) {
         alert(e)
     }
 }

  get_col_wallet_bal = (selectfield) => {
    this.setState({showme:true})
    this.setState({ selectfield : selectfield });
    this.gettoken('profile_details');
  }

  profile_details = (token) => {
      try {
        var String_1 = "col_";
        var String_2 = this.state.selectfield;
        var String_3 = "_wallet";
        var selectfield = String_1.concat(String_2 , String_3);
          fetch(Constant.req_url+"profile_details", {
              method: 'POST',
              body: JSON.stringify({
                  user_id: this.state.user_id,
                  selectfield:'col_bal',
                  token:token
              }),
          }).then((response) => response.json())
              .then((res => {
                  if (res.status) {
                      this.setState({ firstname : res.result['firstname'], col_wallet_bal : res.result[selectfield] });
                      this.setState({showme:false})
                  }
                  else {
                      alert(JSON.stringify(res));
                      this.setState({showme:false})
                  }
              })
          );
      }
      catch (e) {
          alert(e)
      }
  }

  getbalance = (token) => {
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
                    var ltcindex = res.result.findIndex(x => x.currency ==='LTC');
                    var ethindex = res.result.findIndex(x => x.currency ==='ETH');
                    this.setState({
                      btc_balance : parseFloat(res.result[btcindex].balance).toFixed(8),
                      ltc_balance : parseFloat(res.result[ltcindex].balance).toFixed(8),
                      eth_balance : parseFloat(res.result[ethindex].balance).toFixed(8)}
                    );
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
  }




    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerSub}>
                    <Text style={[styles.title, { marginTop: 20 }]}>Hello {this.state.firstname}</Text>
                </View>
                <View style={styles.containerSub}>
                    <Text style={styles.txtSub}>Your loan summary</Text>
                </View>
                <View style={[styles.containerSub, { flexDirection: 'row', marginTop: 20 }]}>
                  <View style={{ width: '40%' }}>
                      <Text style={[styles.txtSub, { textAlign: 'center' }]}>Loan Balance</Text>
                      <Text style={[styles.txtSub, { textAlign: 'center' }]}>$ {this.state.loan_balance}</Text>
                  </View>
                  <View style={{ width: '60%' }}>
                      <Text style={[styles.txtSub, { textAlign: 'center', color: '#00E63A' }]}>Crypto collateral</Text>
                      <Text style={[styles.txtSub, { textAlign: 'center' }]}>{this.state.col_wallet_bal} {this.state.selectfield}</Text>
                  </View>
                </View>
                <Text style={[styles.title, { textAlign: 'center',color: 'black', marginTop: 20, fontSize: 20 }]}>Repay Loans Now</Text>
                <Text style={[styles.txtSub, { textAlign: 'center',fontSize:16 }]}>your loan of $ {this.state.due_loan_amount} is due this</Text>
                <Text style={[styles.txtSub, { textAlign: 'center',fontSize:16 }]}>{this.state.due_loan_day} {this.state.due_loan_date}</Text>
                <GradiantButton
                textIndo="Repay Now"
                onPress={() => this.props.navigation.navigate('Offeraloan')}
                />
                <View style={styles.containerSub}>
                    <Text style={[styles.txtSub, { marginTop: 20, fontWeight: "600",fontSize:20 }]}>wallets</Text>
                </View>
                <TextIconButton
                 textTitle="BTC"
                 textSub="Bitcoin"
                 textNumber={this.state.btc_balance}
                 icon={bitcoinIcon}
                 onPress={() => this.get_col_wallet_bal('BTC')}
                 // onPress={() => this.props.navigation.navigate('PostList')}
                />
                <TextIconButton
                 textTitle="ETH"
                 textSub="Ethereum"
                 textNumber={this.state.eth_balance}
                 icon={ethIcon}
                 onPress={() => this.get_col_wallet_bal('ETH')}
                />
                <TextIconButton
                 textTitle="LTC"
                 textSub="Lite coin"
                 textNumber={this.state.ltc_balance}
                 icon={litecoinIcon}
                 onPress={() => this.get_col_wallet_bal('LTC')}
                />
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
        // padding: 0
    },
    containerSub: {
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
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
