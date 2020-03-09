/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {Component} from 'react';
import {ButtonGroup, Icon} from 'react-native-elements';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {PricingCard} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const api = 'http://qa.clickmegh.com/wire_admin/merchant_api/';
const key = '3029CE75F4E5CD077303';
const check = require('../../assets/images/check1.png');
const uncheck = require('../../assets/images/uncheck1.png');

export default class MtnScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGettingBalance: true,
      isSendingTransaction: false,
      transactionFinished: false,
      transactionResult: null,
      accountBal: 0,
      balanceCurrency: 'EUR',
      moneyCurrency: 'XAF',
      selectedIndex: 0,
      phoneNumber: '',
      amount: '',
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    this.getAccountBalance().then(result => {
      if (result.status === 'success') {
        this.setState({
          isGettingBalance: false,
          accountBal:
            result.data.availableBalance === undefined
              ? 0
              : result.data.availableBalance,
          balanceCurrency:
            result.data.currency === undefined ? 'EUR' : result.data.currency,
        });
      } else {
        this.setState({
          isGettingBalance: false,
        });
        alert(
          'An error has been occurred from server. \n' +
            JSON.stringify(result.error),
        );
      }
    });
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }

  transaction() {
    if (this.state.phoneNumber === '') {
      alert('Your phone number is required.');
    } else if (this.state.amount === '') {
      alert('How much do you want to transfer?');
    } else {
      this.setState({isSendingTransaction: true});
      if (this.state.selectedIndex === 0) {
        this.createCollectionTransaction(
          this.state.phoneNumber,
          this.state.amount,
        ).then(result => {
          this.setState({isSendingTransaction: false});
          if (result.status === 'success') {
            alert(JSON.stringify(result));
            this.setState({
              transactionFinished: true,
              transactionResult: result.data.Transaction,
            });
          } else {
            alert(
              'An error has been occurred from server. \n' +
                JSON.stringify(result.error),
            );
          }
        });
      } else {
        this.createDisbursementTransaction(
          this.state.phoneNumber,
          this.state.amount,
        ).then(result => {
          this.setState({isSendingTransaction: false});
          if (result.status === 'success') {
            alert(JSON.stringify(result));
            this.setState({
              transactionFinished: true,
              transactionResult: result.data.Transaction,
            });
          } else {
            alert(
              'An error has been occurred from server. \n' +
                JSON.stringify(result.error),
            );
          }
        });
      }
    }
  }

  createCollectionTransaction(phone, amount) {
    amount = parseFloat(amount) * 0.95;
    return new Promise(resolve => {
      fetch(api + 'create_transaction_collection/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Api-Key': key,
        },
        body: JSON.stringify({
          Transaction: {
            sender_phone_no: phone,
            amount: amount,
            // currency: this.state.moneyCurrency,
            currency: 'EUR',
            network: '1',
          },
        }),
      })
        .then(response => response.json())
        .then(data => {
          resolve({status: 'success', error: null, data: data});
        })
        .catch(error => {
          resolve({status: 'failed', error: error, data: null});
        });
    });
  }

  createDisbursementTransaction(phone, amount) {
    amount = parseFloat(amount) * 0.95;
    return new Promise(resolve => {
      fetch(api + 'create_transaction_disbursement/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Api-Key': key,
        },
        body: JSON.stringify({
          Transaction: {
            benef_phone_no: phone,
            amount: amount,
            // currency: this.state.moneyCurrency,
            currency: 'EUR',
            network: '1',
          },
        }),
      })
        .then(response => response.json())
        .then(data => {
          resolve({status: 'success', error: null, data: data});
        })
        .catch(error => {
          resolve({status: 'failed', error: error, data: null});
        });
    });
  }

  getTransaction(id) {
    return new Promise(resolve => {
      fetch(api + 'get_transaction/${id}', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Api-Key': key,
        },
      })
        .then(response => response.json())
        .then(data => {
          resolve({status: 'success', error: null, data: data});
        })
        .catch(error => {
          resolve({status: 'failed', error: error, data: null});
        });
    });
  }

  getAccountBalance() {
    return new Promise(resolve => {
      fetch(api + 'get_account_bal/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Api-Key': key,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (
            data.availableBalance !== undefined &&
            data.currency !== undefined
          ) {
            resolve({status: 'success', error: null, data: data});
          } else {
            resolve({status: 'failed', error: data, data: null});
          }
        })
        .catch(error => {
          resolve({status: 'failed', error: error, data: null});
        });
    });
  }

  render() {
    const buttons = ['Deposit', 'Withdraw'];
    const {selectedIndex} = this.state;
    return (
      <View style={styles.container}>
        {this.state.isGettingBalance ? (
          <ActivityIndicator style={{flex: 1}} size="large" />
        ) : (
          <>
            {!this.state.transactionFinished ? (
              <>
                <View style={{height: 15}} />
                <Text
                  style={{
                    color: '#56fca2',
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 15,
                  }}>
                  Account Balance
                </Text>
                <Text style={{textAlign: 'center', fontSize: 25}}>
                  {this.state.accountBal} {this.state.balanceCurrency}
                </Text>
                <View style={{height: 15}} />
                <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  textStyle={{fontWeight: 'bold'}}
                  selectedButtonStyle={{backgroundColor: '#56fca2'}}
                />
                <View style={{height: 15}} />
                <View style={styles.inputSection}>
                  <Icon
                    iconStyle={styles.inputIcon}
                    name="phone"
                    size={25}
                    type="MaterialIcons"
                    color="#202023"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={this.state.phoneNumber}
                    onChangeText={value => {
                      this.setState({phoneNumber: value});
                    }}
                    underlineColorAndroid="transparent"
                    textContentType="telephoneNumber"
                    dataDetectorTypes="phoneNumber"
                    keyboardType="phone-pad"
                  />
                </View>
                <View style={{height: 15}} />
                <View style={styles.inputSection}>
                  <Icon
                    iconStyle={styles.inputIcon}
                    name="account-balance-wallet"
                    size={25}
                    type="MaterialIcons"
                    color="#202023"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Transaction Amount"
                    value={this.state.amount}
                    onChangeText={value => {
                      this.setState({amount: value});
                    }}
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                  />
                </View>
                <View style={{height: 15}} />
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#202023',
                      fontSize: 15,
                    }}>
                    Money Currency:{' '}
                  </Text>
                </View>
                <View style={{height: 15}} />
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({moneyCurrency: 'XAF'})}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        this.state.moneyCurrency === 'XAF' ? check : uncheck
                      }
                      style={{width: 25, height: 25, resizeMode: 'contain'}}
                    />
                    <Text
                      style={{color: '#202023', fontSize: 15, marginLeft: 5}}>
                      XAF
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({moneyCurrency: 'GHS'})}
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        this.state.moneyCurrency === 'GHS' ? check : uncheck
                      }
                      style={{width: 25, height: 25, resizeMode: 'contain'}}
                    />
                    <Text
                      style={{color: '#202023', fontSize: 15, marginLeft: 5}}>
                      GHS
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({moneyCurrency: 'UGX'})}
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        this.state.moneyCurrency === 'UGX' ? check : uncheck
                      }
                      style={{width: 25, height: 25, resizeMode: 'contain'}}
                    />
                    <Text
                      style={{color: '#202023', fontSize: 15, marginLeft: 5}}>
                      UGX
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({moneyCurrency: 'ZMW'})}
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        this.state.moneyCurrency === 'ZMW' ? check : uncheck
                      }
                      style={{width: 25, height: 25, resizeMode: 'contain'}}
                    />
                    <Text
                      style={{color: '#202023', fontSize: 15, marginLeft: 5}}>
                      ZMW
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({moneyCurrency: 'XOF'})}
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        this.state.moneyCurrency === 'XOF' ? check : uncheck
                      }
                      style={{width: 25, height: 25, resizeMode: 'contain'}}
                    />
                    <Text
                      style={{color: '#202023', fontSize: 15, marginLeft: 5}}>
                      XOF
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{height: 15}} />
                <LinearGradient
                  colors={['#56fca2', '#56fca2']}
                  style={styles.linearGradient1}>
                  <TouchableOpacity
                    onPress={() => this.transaction()}
                    style={styles.buttonStyle}>
                    {this.state.isSendingTransaction ? (
                      <ActivityIndicator
                        style={{flex: 1}}
                        color="#FFFFFF"
                        size="large"
                      />
                    ) : (
                      <Text
                        style={[
                          styles.buttonText,
                          {
                            display: this.state.isSendingTransaction
                              ? 'none'
                              : 'flex',
                            fontSize: 15,
                          },
                        ]}>
                        Submit Transaction
                      </Text>
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              </>
            ) : (
              <PricingCard
                color="#4f9deb"
                containerStyle={{
                  width: '90%',
                }}
                title={
                  this.state.selectedIndex === 0 ? 'Collection' : 'Disbursement'
                }
                price={this.state.amount + ' ' + this.state.moneyCurrency}
                info={[
                  'Status: ' + this.state.transactionResult.status,
                  'Transaction ID: ' +
                    this.state.transactionResult.transaction_id,
                  'Fee: ' +
                    (parseFloat(this.state.transactionResult.fee) +
                      parseFloat(this.state.amount) * 0.05) +
                    ' ' +
                    this.state.moneyCurrency,
                  'Collected amount: ' +
                    this.state.transactionResult.collected_amount +
                    ' ' +
                    this.state.moneyCurrency,
                  'Actual amount: ' +
                    this.state.transactionResult.actual_amount +
                    ' ' +
                    this.state.moneyCurrency,
                ]}
                button={{title: 'BACK TO TRANSACTION'}}
                onButtonPress={() =>
                  this.setState({
                    phoneNumber: '',
                    amount: '',
                    transactionFinished: false,
                  })
                }
              />
            )}
          </>
        )}
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
  },
  containerSub: {
    width: '100%',
    paddingHorizontal: 0,
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
    color: '#8D006D',
  },
  txtSub: {
    fontWeight: '400',
    fontSize: 18,
    color: 'black',
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
    marginTop: 10,
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    elevation: 2,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 15,
    paddingBottom: 15,
  },
  inputSection: {
    height: 50,
    margin: 0,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  inputIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  input: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'transparent',
    color: '#202023',
  },
});
