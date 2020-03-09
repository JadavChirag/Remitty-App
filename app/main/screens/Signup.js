/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  YellowBox,
  AsyncStorage,
  Clipboard,
  StatusBar
} from 'react-native';
YellowBox.ignoreWarnings(['Require cycle:']);
import {
  Content,
  CheckBox
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
// import TextInputMask from 'react-native-text-input-mask';
import CountryPicker from 'react-native-country-picker-modal';

import firebase from 'react-native-firebase';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class Signup extends Component {
  static navigationOptions = {
    header: null,
    title: null,
  };

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line

    this.removeNotificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        // const { title, body } = notification;
        const notification11 = new firebase.notifications.Notification()
          .setNotificationId('notificationId')
          .setTitle('My notification title')
          .setBody('My notification body')
          .setData({
            key1: 'value1',
            key2: 'value2',
          });

        firebase.notifications().displayNotification(notification11);
      });
    this.removeNotificationListener = firebase
      .notifications()
      .onNotification(notification => {
        //   const { title, body } = notification;
        // console.log('onNotificationOpened:');
        // // alert(JSON.stringify(notification));
        // Alert.alert(title, body)
        const notification11 = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .setData({
            key1: 'value1',
            key2: 'value2',
          });

        notification11.android
          .setChannelId('fcm_FirebaseNotifiction_default_channel')
          .android.setSmallIcon(notification.ic_launcher);

        firebase.notifications().displayNotification(notification11);
      });
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  //1
  async checkPermission() {
    console.log('checkper');
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    const fcmToken = await firebase.messaging().getToken();
    Clipboard.setString(fcmToken);
    AsyncStorage.setItem('fcmToken', fcmToken);
    console.log(AsyncStorage.getItem('fcmToken'));
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        // const {title, body} = notification;
        console.log('onNotification:');
        // alert('onNotification:')
        // const localNotification = new firebase.notifications.Notification({
        //   sound: 'sampleaudio',
        //   show_in_foreground: true,
        // })
        // .setSound('sampleaudio.wav')
        // .setNotificationId(notification.notificationId)
        // .setTitle(notification.title)
        // .setBody(notification.body)
        // .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
        // .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
        // .android.setColor('#000000') // you can set a color here
        // .android.setPriority(firebase.notifications.Android.Priority.High);

        // firebase.notifications()
        //   .displayNotification(localNotification)
        //   .catch(err => console.error(err));

        //      const notification11 = new firebase.notifications.Notification()
        // .setNotificationId(notification.notificationId)
        // .setTitle(notification.title)
        // .setBody(notification.body)
        // .setData({
        //   key1: 'value1',
        //   key2: 'value2',
        // });

        // notification11.android.setChannelId(notification.channelId).android.setSmallIcon(notification.ic_launcher);
        // this.setState({token:notification})
        console.log(notification);
        notification.android.setChannelId(
          'fcm_FirebaseNotifiction_default_channel',
        );
        // then display it by calling displayNotification
        firebase.notifications().displayNotification(notification);

        // firebase.notifications().displayNotification(notification11)
      });

    const channel = new firebase.notifications.Android.Channel(
      'fcm_FirebaseNotifiction_default_channel',
      'Demo app name',
      firebase.notifications.Android.Importance.High,
    )
      .setDescription('Demo app description')
      .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        console.log('onNotificationOpened:');
        Alert.alert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('getInitialNotification:');
      Alert.alert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log('JSON.stringify:', JSON.stringify(message));
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      showingInput1: styles.inactiveInput,
      showingInput2: styles.activeInput,
      showingTab1: styles.inactiveTab,
      showingTab2: styles.activeTab,
      cca2: 'US',
      callingCode: '1',
      sign_type: 'email',
      username: null,
      useremail: null,
      userpass: null,
      usercpass: null,
      term_check: false,
      userphone: null,
      userpincode: null,
      usercpincode: null,
      showing_signup: 'none',
      showme: false,
      first_name: '',
      last_name: '',
    };
  }
  gettoken = () => {
    try {
      this.setState({
        showme: true,
      });
      fetch(Constant.token_url, {
        method: 'POST',
        body: JSON.stringify({
          email: 'dev5@britisheducationonline.org',
          password: 'bux@2018',
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status) {
            this.signupcall(res.token);
          } else {
            alert(JSON.stringify(res));
          }
        });
    } catch (e) {
      alert(e);
    }
  };
  signupcall = token => {
    if (this.state.sign_type === 'email') {
      var post_val = JSON.stringify({
        token: token,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.useremail,
        password: this.state.userpass,
        cpassword: this.state.usercpass,
        register_type: this.state.sign_type,
      });
    } else {
      var post_val = JSON.stringify({
        token: token,
        first_name: this.state.username,
        phone_number: this.state.userphone,
        password: this.state.userpincode,
        cpassword: this.state.usercpincode,
        register_type: 'mobilenumber',
        country_code: this.state.cca2,
      });
    }
    try {
      this.setState({
        showme: true,
      });
      fetch(Constant.req_url + 'user_register', {
        method: 'POST',
        body: post_val,
      })
        .then(response => response.json())
        .then(res => {
          this.setState({
            showme: false,
          });
          if (res.status) {
            alert(res.message);
          } else if (res.message) {
            alert(res.message);
          } else {
            alert(JSON.stringify(res));
          }
        });
    } catch (e) {
      alert(e);
    }
  };
  _signup = async () => {
    let {
      sign_type,
      term_check,
      usercpass,
      usercpincode,
      useremail,
      userphone,
      username,
      userpass,
      userpincode,
      cca2,
      first_name,
      last_name,
    } = this.state;
    if (sign_type === 'email') {
      if (
        first_name == '' ||
        last_name == '' ||
        useremail == null ||
        userpass == null ||
        usercpass == null
      ) {
        alert('please fill all input!');
        this.setState({ showing_signup: 'none' });
        return;
      }
      if (userpass !== usercpass) {
        alert('Do not match password and confirm password!');
        this.setState({ showing_signup: 'none' });
        return;
      }
      if (term_check !== true) {
        Alert.alert(
          'NOTE!',
          'Do you agree about our terms and policy?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () =>
                this.setState({ term_check: true, showing_signup: 'none' }),
            },
          ],
          { cancelable: false },
        );
        this.setState({ showing_signup: 'none' });
        return;
      }

      this.gettoken()
    }
    if (sign_type === 'phone') {
      if (
        username == null ||
        userphone == null ||
        cca2 == null ||
        userpincode == null
      ) {
        alert('please fill all input!');
        this.setState({ showing_signup: 'none' });
        return;
      }
      if (userpincode !== usercpincode) {
        alert('Do not match password and confirm password!');
        this.setState({ showing_signup: 'none' });
        return;
      }
      if (term_check !== true) {
        Alert.alert(
          'NOTE!',
          'Do you agree about our terms and policy?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () =>
                this.setState({ term_check: true, showing_signup: 'none' }),
            },
          ],
          { cancelable: false },
        );

        this.setState({ showing_signup: 'none' });
        return;
      }
      this.gettoken()
    }
  };
  chanageTab = val => {
    switch (val) {
      case 1:
        this.setState({
          sign_type: 'phone',
          showingInput1: styles.activeInput,
          showingInput2: styles.inactiveInput,
          showingTab1: styles.activeTab,
          showingTab2: styles.inactiveTab,
        });
        break;
      case 2:
        this.setState({
          sign_type: 'email',
          showingInput1: styles.inactiveInput,
          showingInput2: styles.activeInput,
          showingTab1: styles.inactiveTab,
          showingTab2: styles.activeTab,
        });
        break;
      default:
        break;
    }
  };
  render() {
    const { showingTab1, showingTab2, showingInput1, showingInput2 } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'rgba(0,0,0,0)'} hidden={true} />
        <Content style={{ width: '100%' }}>
          <View style={{ height: 50 }} />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 0,
              alignSelf: 'center',
              width: '90%',
              justifyContent: 'space-around',
            }}>
            <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>
              CREATE ACCOUNT
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'center',
                display: 'none',
              }}>
              <TouchableOpacity
                onPress={() => this.chanageTab(1)}
                style={[showingTab1, { width: '65%' }]}>
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    paddingBottom: 10,
                    paddingTop: 10,
                    fontSize: 15,
                  }}>
                  Phone Number
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.chanageTab(2)}
                style={[showingTab2, { width: '45%' }]}>
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    paddingBottom: 10,
                    paddingTop: 10,
                    fontSize: 15,
                  }}>
                  Email
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardpart}>
            <View
              style={[styles.itemdialog3, {
                borderWidth: 1,
                borderRadius: 5,
              }]}
            >
              <TextInput
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={first_name => this.setState({ first_name })}
                style={{ fontSize: 15 }}
                placeholder="First Name"
              />
            </View>
            <View style={{ height: 10 }} />
            <View
              style={[styles.itemdialog3, {
                borderWidth: 1,
                borderRadius: 5,
              }]}
            >
              <TextInput
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={last_name => this.setState({ last_name })}
                style={{ fontSize: 15 }}
                placeholder="Last Name"
              />
            </View>
            <View style={{ height: 10 }} />
            <View
              style={[styles.itemdialog3, {
                borderWidth: 1,
                borderRadius: 5,
              }]}
            >
              <TextInput
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={useremail => this.setState({ useremail })}
                style={showingInput2}
                placeholder="Email Address"
              />
              <View
                style={[
                  showingInput1,
                  { flexDirection: 'row', justifyContent: 'flex-start' },
                ]}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <View style={{ marginTop: 10 }}>
                    <CountryPicker
                      onChange={value => {
                        this.setState({
                          cca2: value.cca2,
                          callingCode: value.callingCode,
                          country: value,
                        });
                      }}
                      cca2={this.state.cca2}
                      translation="eng"
                    />
                  </View>
                  <Text style={{ marginTop: 13, fontSize: 15, marginLeft: 5 }}>
                    {'+' + this.state.callingCode}
                  </Text>
                </View>
                <TextInput
                  refInput={ref => {
                    this.input = ref;
                  }}
                  onChangeText={userphone => this.setState({ userphone })}
                  style={{ fontSize: 15, marginLeft: 5 }}
                  placeholder="Phone Number"
                />
              </View>
            </View>
            <View style={{ height: 10 }} />
            <View
              style={[styles.itemdialog3, {
                borderWidth: 1,
                borderRadius: 5,
              }]}
            >
              <TextInput
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={userpass => this.setState({ userpass })}
                style={showingInput2}
                placeholder="Password"
                secureTextEntry={true}
              />
              <TextInput
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={userpincode => this.setState({ userpincode })}
                style={showingInput1}
                placeholder="Pincode(4 digit)"
                maxLength={4}
                secureTextEntry={true}
              />
            </View>
            <View style={{ height: 10 }} />
            <View
              style={[styles.itemdialog3, {
                borderWidth: 1,
                borderRadius: 5,
              }]}
            >
              <TextInput
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={usercpass => this.setState({ usercpass })}
                style={showingInput2}
                placeholder="Confirm Password"
                secureTextEntry={true}
              />
              <TextInput
                refInput={ref => {
                  this.input = ref;
                }}
                onChangeText={usercpincode => this.setState({ usercpincode })}
                style={showingInput1}
                placeholder="Confirm Pincode"
                maxLength={4}
                secureTextEntry={true}
              />
            </View>
            <View style={{ height: 10 }} />
            <View style={styles.itemdialog1}>
              <CheckBox
                color="gray"
                style={{ marginTop: 5 }}
                checked={this.state.term_check}
                onPress={() =>
                  this.setState({ term_check: !this.state.term_check })
                }
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'gray',
                  fontSize: 15,
                  marginLeft: 20,
                }}>
                I have read and understood Terms of Service, Risk & Compliance
                Disclosure, Privacy policy and statement.
              </Text>
            </View>
            <View style={{ height: 30 }} />
            <LinearGradient
              colors={['#3145C2', '#3145C2']}
              style={styles.linearGradient1}>
              <TouchableOpacity
                onPress={() => {
                  this._signup();
                  this.setState({ showing_signup: 'none' });
                }}
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
                            this.state.showing_signup === 'flex'
                              ? 'none'
                              : 'flex',
                          fontSize: 15,
                        },
                      ]}>
                      Create Account
                  </Text>
                  )}
              </TouchableOpacity>
            </LinearGradient>
            <View style={{ height: 30 }} />
            <View style={styles.itemdialog2}>
              <Text style={{ color: 'black', fontSize: 15 }}>Already User? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text
                  style={{ fontWeight: 'bold', color: 'black', fontSize: 15 }}>
                  {' '}
                  Log in{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activeInput: {
    display: 'flex',
    fontSize: 15,
  },
  inactiveInput: {
    display: 'none',
    fontSize: 15,
  },
  activeTab: {
    alignContent: 'center',
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 5,
  },
  inactiveTab: {
    alignContent: 'center',
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
  cardpart: {
    width: '90%',
    paddingLeft: 15,
    borderRadius: 5,
    justifyContent: 'space-between',
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  itemdialog3: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 15,
    borderRadius: 5,
    justifyContent: 'space-between',
    marginTop: 0,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  itemdialog1: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    justifyContent: 'space-between',
    marginTop: 0,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  itemdialog2: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 0,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
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
    color: 'black',
    fontSize: 15,
  },
  titletext: {
    width: '100%',
    fontSize: 15,
    marginLeft: 10,
    paddingTop: 10,
  },
  sendmoney: {},
  addbtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  addtext: {
    width: '100%',
    fontSize: 15,
    marginLeft: 10,
    paddingTop: 6,
    color: 'black',
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
    marginTop: 10,
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
    justifyContent: 'space-between',
  },
  countries1: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    padding: 0,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  texttop: {
    color: 'rgb(0, 0, 0)',
    textAlign: 'center',
    fontSize: 15,
    flexDirection: 'row',
  },
  textamount: {
    marginTop: 5,
    color: 'rgb(0, 0, 0)',
    textAlign: 'left',
    fontSize: 15,
    padding: 5,
  },
  textunder: {
    color: 'rgb(0, 0, 0)',
    textAlign: 'center',
    fontSize: 15,
    marginRight: 5,
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
    borderWidth: 1,
    borderColor: 'rgba(240,240,240,0.8)',
    backgroundColor: 'white',
    padding: 0,
  },
  selectcountry: {
    flexDirection: 'row',
    marginTop: 20,
    width: '80%',
    height: 60,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,1)',
    alignItems: 'center',
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    paddingLeft: 10,
    elevation: 3,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(240,240,240,0.8)',
    alignSelf: 'center',
  },
  container: {
   flex:1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerSub: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: 'green',
  },
  txtsub: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    fontWeight: '600',
    color: 'black',
  },
});
