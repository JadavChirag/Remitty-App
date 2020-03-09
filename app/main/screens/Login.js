/* eslint-disable no-alert */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Content,Container } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from '../componentItem/Swiper';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import { LoginManager, AccessToken } from "react-native-fbsdk";
const check1 = require('../../assets/images/check1.png');
const uncheck1 = require('../../assets/images/uncheck1.png');
const stocks = require('../../assets/images/ic_stocksinvestment.png');
const lending = require('../../assets/images/ic_lending.png');
const vacation = require('../../assets/images/ic_vacationrentals.png');
const payrequest = require('../../assets/images/ic_payrequestmoney.png');
const cryptos = require('../../assets/images/ic_crytosexchange.png');
const merchant = require('../../assets/images/ic_merchantpayment.png');
const cryptosloans = require('../../assets/images/ic_cryptosloans.png');
const gettaxi = require('../../assets/images/ic_gettaxi.png');


export default class Login extends Component {
  static navigationOptions = {
    headerShown: false,
    title: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      emailphonenumber: AsyncStorage.getItem('userId'),
      password: AsyncStorage.getItem('password'),
      showme: false,
      showme1: false,
      showme2: false,
      onecheck: false,
      twocheck: false,
      showwaiting_cardbtnsend: false,
    };
    AsyncStorage.getItem('userId').then(value => {
      if (value !== '' && value != null) {
        this.setState({ onecheck: true });
      }
      this.setState({ emailphonenumber: value });
    });

    AsyncStorage.getItem('password').then(value => {
      if (value !== '' && value != null) {
        this.setState({ twocheck: true });
      }
      this.setState({ password: value });
    });
  }

  _signin = () => {
    let { emailphonenumber, password } = this.state;
    if (emailphonenumber == null || password == null) {
      alert('please fill all input!');
      return;
    }

    this.gettoken();
  };

  gettoken = () => {
    try {
      this.setState({
        showme: true,
      });
      fetch(Constant.token_url, {
        method: 'POST',
        body: JSON.stringify({
          email: Constant.authemail,
          password: Constant.authpass,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status) {
            this.signincall(res.token);

          } else {
            // alert(JSON.stringify(res));
            this.setState({
              showme: false,
              showme1:false
            });
          }
        });
    } catch (e) {
      this.setState({
        showme: false,
        showme1:false
      });
      alert(e);
    }
  };

  signincall = token => {
    AsyncStorage.getItem('fcmToken').then(value => {
      var post_val = JSON.stringify({
        token: token,
        email: this.state.emailphonenumber,
        fcmtoken: value,
        password: this.state.password,
      });
      try {
        this.setState({
          showme: true,
        });
        fetch(Constant.req_url + 'user_login', {
          method: 'POST',
          body: post_val,
        })
          .then(response => response.json())
          .then(res => {
            this.setState({
              showme: false,
              showme1:false
            });
            // alert(JSON.stringify(res))
            if (res.status) {
              var id = res.result.id;
              if (this.state.onecheck) {
                AsyncStorage.setItem('userId', this.state.emailphonenumber);
              } else {
                AsyncStorage.setItem('userId', '');
              }

              if (this.state.twocheck) {
                AsyncStorage.setItem('password', this.state.password);
              } else {
                AsyncStorage.setItem('password', '');
              }
              AsyncStorage.setItem('user_id', id.toString());
              AsyncStorage.setItem('username', res.result.firstname);
              AsyncStorage.setItem('lastname', res.result.lastname);
              AsyncStorage.setItem('email', res.result.email);
              AsyncStorage.setItem('phonenum', res.result.phonenum);
              AsyncStorage.setItem('useralldata', JSON.stringify(res.result));
              this.props.navigation.navigate('Index');
            } else if (res.message) {
              this.setState({
                showme: false,
                showme1:false
              });
              alert(res.message);
            } else {
              this.setState({
                showme: false,
                showme1:false
              });
              alert(JSON.stringify(res));
            }
          });
      } catch (e) {
        alert(e);
        this.setState({
          showme: false,
          showme1:false
        });
      }
    });
  };

  facebookLogin = () => {
    // LoginManager.logInWithPermissions(['public_profile']).then(
    //   function(result) {
    //     if (result.isCancelled) {
    //       alert('Login was cancelled');
    //     } else {
    //       alert('Login was successful with permissions: '
    //         + result.grantedPermissions.toString());
    //     }
    //   },
    //   function(error) {
    //     alert('Login failed with error: ' + error);
    //   }
    // );

    this.setState({
      showme1: true,
    });
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;
            this.getFacebookProfile(accessToken);
          });
        } else {
          alert('Login cancelled');
          this.setState({
            showme1: false,
          });
        }
      },
      error => {
        alert('Login fail with error: ' + error);
        this.setState({
          showme1: false,
        });
      },
    );
  };

  getFacebookProfile = token => {
    fetch(
      'https://graph.facebook.com/v5.0/me?fields=id,first_name,last_name,email&access_token=' +
      token,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        fetch(Constant.token_url, {
          method: 'POST',
          body: JSON.stringify({
            email: Constant.authemail,
            password: Constant.authpass,
          }),
        })
          .then(result => result.json())
          .then(accToken => {
            this.accountCheck(data, accToken);
          });
      });
  };

  accountCheck = (data, token) => {
    // alert(JSON.stringify(data))
    // return
    AsyncStorage.getItem('fcmToken').then(fcmToken => {
      var post_val = JSON.stringify({
        token: token,
        email: data.email,
        fcmtoken: fcmToken,
        password: '',
      });
      fetch(Constant.req_url + 'user_login', {
        method: 'POST',
        body: post_val,
      })
        .then(response => response.json())
        .then(res => {
          if (res.status) {
            this.setState({
              showme: false,
              showme1:false
            });

            LoginManager.logOut();

            AsyncStorage.setItem('userId', '');
            AsyncStorage.setItem('password', '');
            AsyncStorage.setItem('user_id', data.id);
            AsyncStorage.setItem('username', data.first_name);
            AsyncStorage.setItem('lastname', data.last_name);
            AsyncStorage.setItem('email', data.email);
            AsyncStorage.setItem('phonenum', '');
            AsyncStorage.setItem('useralldata', JSON.stringify({ firstname: data.first_name, lastname: data.last_name }));
            this.props.navigation.navigate('Index');
          }
          else if (res.message) {
            const msg =
              'This account hasn`t been registered yet. Do you want to register this account now?';
            if (window.confirm(msg)) {
              this.registerAccount(data, token);
            } else {
              this.setState({
                showme: false,
                showme1:false
              });
            }
          }
        });
    });
  };

  registerAccount = (data, token) => {
    const params = JSON.stringify({
      token: token,
      first_name: data.firstname,
      email: data.email,
      password: '',
      cpassword: '',
      register_type: 'email',
    });
    fetch(Constant.req_url + 'user_register', {
      method: 'POST',
      body: params,
    })
      .then(response => response.json())
      .then(res => {
        if (res.status) {
          this.setState({
            showme: false,
            showme1:false,
            emailphonenumber: data.email,
            password: '',
          });

          LoginManager.logOut();
          this.gettoken();
        } else if (res.message) {
          this.setState({
            showme1:false,
            showme:false,
          })
          alert(res.message);
        }
      });
  };
  // componentDidMount() {
  //   this.setState({
  //     showme: false,
  //   });
  // }
  render() {
    return (
      <Content style={styles.container}>
        <StatusBar backgroundColor={'rgba(0,0,0,0)'} hidden={true} />
        <Text style={styles.instruction}>Welcome</Text>
        <View
          style={{
            height: 200,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Swiper
            autoplay={true}
            loop={true}
            dotColor="#bbbbbb"
            activeDotColor="#ffffff"
            showsButtons={false}
            autoplayTimeout={3}
            style={styles.wrapper}>
            <ImageBackground
              style={{ width: '100%', height: '100%' }}
              source={require('../../assets/images/loginbg.png')}
            />
            <ImageBackground
              style={{ width: '100%', height: '100%' }}
              source={require('../../assets/images/loginbg1.png')}
            />
            <ImageBackground
              style={{ width: '100%', height: '100%' }}
              source={require('../../assets/images/loginbg2.png')}
            />
            <ImageBackground
              style={{ width: '100%', height: '100%' }}
              source={require('../../assets/images/loginbg3.png')}
            />
            <ImageBackground
              style={{ width: '100%', height: '100%' }}
              source={require('../../assets/images/loginbg4.png')}
            />
          </Swiper>
        </View>
        <View style={styles.itemdialog2}>
          <Text style={{ color: 'black', fontSize: 15 }}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 15,
              }}>
              {' '}
              Sign up{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <TextInput
              placeholder="Enter User ID"
              keyboardType={'email-address'}
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'black',
                padding: 5,
                width: '60%',
                backgroundColor: 'white',
                paddingLeft: 15,
              }}
              returnKeyType={'next'}
              value={this.state.emailphonenumber}
              onChangeText={emailphonenumber =>
                this.setState({ emailphonenumber })
              }
            />
            <TouchableOpacity
            
              onPress={() => this.setState({ onecheck: !this.state.onecheck })}
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={this.state.onecheck === false ? uncheck1 : check1}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginLeft: 5,
                }}>
                Save user ID
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: 20,
            }}>
            <TextInput
              placeholder="Enter Password"
              secureTextEntry={true}
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'black',
                padding: 5,
                width: '60%',
                backgroundColor: 'white',
                paddingLeft: 15,
              }}
              returnKeyType={'done'}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
            <TouchableOpacity
              onPress={() => this.setState({ twocheck: !this.state.twocheck })}
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={this.state.twocheck === false ? uncheck1 : check1}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginLeft: 5,
                }}>
                Save password
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 20 }} />
          <LinearGradient
            colors={['#ff0000', '#ff0000']}
            style={styles.linearGradient1}>
            <TouchableOpacity
              onPress={() => this._signin()}
              style={styles.buttonStyle}>
              {this.state.showme ? (
                <ActivityIndicator
                  style={{ flex: 1 }}
                  color="#FFFFFF"
                  size="large"
                />
              ) : (
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        display:
                          this.state.showwaiting_cardbtnsend === 'flex'
                            ? 'none'
                            : 'flex',
                        fontSize: 15,
                      },
                    ]}>
                    Sign In
                </Text>
                )}
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.itemdialog2}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgetPassword')}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 15,
                }}>
                Forgot User ID / Password{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignSelf: 'center',
            width: '100%',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '45%',
                height: 1,
                backgroundColor: 'black',
                marginTop: 10,
              }}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 15,
              }}>
              OR
            </Text>
            <View
              style={{
                width: '45%',
                height: 1,
                backgroundColor: 'black',
                marginTop: 10,
              }}
            />
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <LinearGradient
              colors={['#ff0000', '#ff0000']}
              style={[styles.linearGradient1, { width: '80%', alignSelf: 'center' }]}>
              <TouchableOpacity
                onPress={() => this.facebookLogin()}
                style={styles.buttonStyle}>
                {this.state.showme1 ? (
                  <ActivityIndicator
                    style={{ flex: 1 }}
                    color="#FFFFFF"
                    size="large"
                  />
                ) : (
                    <Text
                      style={[
                        styles.buttonText,
                        {
                          display:
                            this.state.showwaiting_cardbtnsend === 'flex'
                              ? 'none'
                              : 'flex',
                          fontSize: 15,
                        },
                      ]}>
                      Continue with Facebook
                  </Text>
                  )}
              </TouchableOpacity>
            </LinearGradient>
            {/* <LinearGradient
              colors={['#ff0000', '#ff0000']}
              style={[styles.linearGradient1, {width: '45%'}]}>
              <TouchableOpacity
                onPress={() => this._signin()}
                style={styles.buttonStyle}>
                {this.state.showme2 ? (
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
                        display:
                          this.state.showwaiting_cardbtnsend === 'flex'
                            ? 'none'
                            : 'flex',
                        fontSize: 15,
                      },
                    ]}>
                    Instagram Login
                  </Text>
                )}
              </TouchableOpacity>
            </LinearGradient> */}
          </View>
          <View
            style={{
              height: 200,
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  height: 50,
                  alignItems: 'center',
                }}>
                <Image
                  source={stocks}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 5,
                  }}>
                  Invest in stocks
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  height: 50,
                  alignItems: 'center',
                }}>
                <Image
                  source={cryptos}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                />
                <View>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      marginLeft: 5,
                    }}>
                    Exchange{' '}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      marginLeft: 5,
                    }}>
                    cryptocurrencies
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  height: 50,
                  alignItems: 'center',
                }}>
                <Image
                  source={vacation}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 5,
                  }}>
                  Vacation Rentals
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  height: 50,
                  alignItems: 'center',
                }}>
                <Image
                  source={gettaxi}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 5,
                  }}>
                  Get Taxi
                </Text>
              </View>
            </View>
            <View style={{ width: 20 }} />
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  height: 50,
                  alignItems: 'center',
                }}>
                <Image
                  source={lending}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 5,
                  }}>
                  Send money
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  height: 50,
                  alignItems: 'center',
                }}>
                <Image
                  source={payrequest}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 5,
                  }}>
                  Recieve money
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  height: 50,
                  alignItems: 'center',
                }}>
                <Image
                  source={merchant}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 5,
                  }}>
                  Merchant payment
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  height: 50,
                  alignItems: 'center',
                }}>
                <Image
                  source={cryptosloans}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 5,
                  }}>
                  Cryptos loans{' '}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 12,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Privacy policy & statement{' '}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 12,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Compliance & Disclosure
            </Text>
          </View>
          <View style={{ height: 20 }} />
        </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  textunder: {
    color: 'rgb(0, 0, 0)',
    textAlign: 'center',
    fontSize: 15,
    marginRight: 5,
  },
  texttop: {
    padding: 10,
    justifyContent: 'center',
    color: 'rgb(0, 0, 0)',
    textAlign: 'center',
    fontSize: 15,
    flexDirection: 'row',
  },
  cardpart: {
    width: '90%',
    paddingLeft: 15,
    borderRadius: 5,
    justifyContent: 'space-between',
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#00FFFF',
    padding: 10,
  },
  itemdialog: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 15,
    borderRadius: 5,
    justifyContent: 'space-between',
    marginTop: 0,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  itemdialog1: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    justifyContent: 'flex-end',
    marginTop: 0,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  itemdialog2: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 0,
    alignSelf: 'center',
    padding: 10,
  },
  topitems: {
    width: '95%',
    paddingLeft: 15,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    elevation: 3,
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'rgba(240,240,240,0.8)',
    borderWidth: 1,
  },
  buttonStyle: {
    width: '100%',
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
  },
  linearGradient: {
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
  linearGradient2: {
    width: '90%',
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
  linearGradient1: {
    width: '80%',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 3,
    marginTop: 10,
    shadowOffset: { height: 2 },
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
  instruction: {
    padding: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 15,
    textAlign: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: '#ff0000',
  },
  text: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  btn: {
    marginTop: 20,
    backgroundColor: 'rgb(245, 166, 35)',
    alignSelf: 'center',
    width: '90%',
    borderRadius: 5,
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  currencies: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    padding: 0,
    borderRadius: 5,
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  valuetext: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  container: {
    flex:1
  },
});
console.disableYellowBox = true;
