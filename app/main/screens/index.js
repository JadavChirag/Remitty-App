import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  PermissionsAndroid,
} from 'react-native';
import { Container, Content } from 'native-base';
import firebase from 'react-native-firebase';
import DropdownAlert from 'react-native-dropdownalert';
import TextIconButton from '../componentItem/indexItemButton';
import GradiantButton from '../componentItem/gradiantButton';
import LinearGradient from 'react-native-linear-gradient';
import avatarman from '../../assets/images/ic_avatarman.png';
import stringsoflanguages from './stringsoflanguages';
import dropdownmenu from '../../assets/images/ic_dropdownmenu.png';
import portfoliobutton from '../../assets/images/portfoliobutton.png';
import walletsbutton from '../../assets/images/walletsbutton.png';
import depositbutton from '../../assets/images/depositbutton.png';
import cashoutbutton from '../../assets/images/cashoutbutton.png';
import businessbutton from '../../assets/images/businessbutton.png';
import mtnbutton from '../../assets/images/mtnicon.png';
import loansbutton from '../../assets/images/loansbutton.png';
import buysellbutton from '../../assets/images/buysellbutton.png';
import rentbutton from '../../assets/images/rentbutton.png';
import stocksbutton from '../../assets/images/stocksbutton.png';
import cryptocurrenciesbutton from '../../assets/images/cryptocurrenciesbutton.png';
import copybutton from '../../assets/images/copybutton.png';
import workbutton from '../../assets/images/workbutton.png';
import Swiper from '../componentItem/Swiper';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
const y_textarray1 = ['20', '15', '10', '5'];
const y_textarray2 = ['40', '35', '30', '25'];
const y_textarray3 = ['25', '20', '15', '10'];
const y_textarray4 = ['35', '30', '25', '20'];
const y_textarray5 = ['15', '10', '5', '0'];
import Header1 from '../componentItem/Header/Header1'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useralldata: {
        firstname: null,
        lastname: null,
      },
      chartData: [6, 8, 6, 12, 20, 12],
      chartButtons: [
        {
          id: 0,
          title: '1D',
          buttonstyle: styles.activeButton,
          textStyle: styles.activeText,
        },
        {
          id: 1,
          title: '1W',
          buttonstyle: styles.inactiveButton,
          textStyle: styles.inactiveText,
        },
        {
          id: 2,
          title: '1M',
          buttonstyle: styles.inactiveButton,
          textStyle: styles.inactiveText,
        },
        {
          id: 3,
          title: '1Y',
          buttonstyle: styles.inactiveButton,
          textStyle: styles.inactiveText,
        },
        {
          id: 4,
          title: '5Y',
          buttonstyle: styles.inactiveButton,
          textStyle: styles.inactiveText,
        },
      ],
      chartLabel: '1 Day',
      y_texts: y_textarray1,
      est_balance: 0,
    };
    this.requestLocationPermission();
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Cool Photo App needs access to your location ' +
            'so you can take awesome pictures.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  getuseralldata = async () => {
    let useralldata = await AsyncStorage.getItem('useralldata');
    this.setState({
      useralldata: JSON.parse(useralldata),
    });
  };

  componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
    this.getuseralldata();
    this.initializefun();
  }

  initializefun = async () => {
    this.setState({
      user_id: await AsyncStorage.getItem('user_id'),
    });

    try {
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
            this.estbalance(res.token);
          } else {
            // alert(JSON.stringify(res));
          }
        });
    } catch (e) {
      alert(e);
    }
  };

  estbalance = token => {
    try {
      fetch(Constant.req_url + 'getestimatedbalance', {
        method: 'POST',
        body: JSON.stringify({
          user_id: this.state.user_id,
          token: token,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status) {
            this.setState({
              est_balance: parseFloat(res.result).toFixed(8),
            });
          } else {
            // alert(JSON.stringify(res));
          }
        });
    } catch (e) {
      alert(e);
    }
  };

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }
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
        const { title, body } = notification;
        firebase.notifications().displayNotification(notification);
        if (title) {
          this.showAlert(title, body);
        }
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        if (title) {
          this.showAlert(title, body);
        }
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      if (title) {
        this.showAlert(title, body);
      }
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    this.dropdown.alertWithType('success', title, body, 4000000);
    setTimeout(() => {
      this.props.navigation.navigate('DriverBidScreen');
    }, 3000);
  }

  changeChartData = val => {
    let { chartButtons } = this.state;
    chartButtons.map((item, index) => {
      if (val == index) {
        (item.buttonstyle = styles.activeButton),
          (item.textStyle = styles.activeText);
      } else {
        (item.buttonstyle = styles.inactiveButton),
          (item.textStyle = styles.inactiveText);
      }
    });
    switch (val) {
      case 0:
        this.setState({
          chartButtons: chartButtons,
          chartData: [21, 7, 1, 6, 8, 6, 12, 20, 12],
          chartLabel: '1 Day',
          y_texts: y_textarray1,
        });
        break;
      case 1:
        this.setState({
          chartButtons: chartButtons,
          chartData: [1, 6, 8, 6, 12, 10, 12],
          chartLabel: '1 Week',
          y_texts: y_textarray2,
        });
        break;
      case 2:
        this.setState({
          chartButtons: chartButtons,
          chartData: [11, 17, 1, 6, 8, 6, 2, 9, 22],
          chartLabel: '1 Month',
          y_texts: y_textarray3,
        });
        break;
      case 3:
        this.setState({
          chartButtons: chartButtons,
          chartData: [21, 7, 11, 16, 18, 6, 2, 20, 13],
          chartLabel: '1 Year',
          y_texts: y_textarray4,
        });
        break;
      case 4:
        this.setState({
          chartButtons: chartButtons,
          chartData: [10, 7, 11, 6, 18, 6, 3, 10, 8],
          chartLabel: '5 Years',
          y_texts: y_textarray5,
        });
        break;
      default:
        break;
    }
  };

  buttonGruop = () => {
    let { chartButtons } = this.state;
    return (
      <View style={styles.buttonContainer}>
        {chartButtons.map((item, index) => {
          return (
            <TouchableOpacity
              style={item.buttonstyle}
              key={item.id}
              onPress={() => this.changeChartData(item.id)}>
              <Text style={item.textStyle}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  showRightAxis = () => {
    let { y_texts } = this.state;
    return (
      <View style={{ justifyContent: 'space-around', height: '100%' }}>
        {y_texts.map((item, index) => {
          return (
            <Text style={{ color: 'black', textAlign: 'center' }}>{item}</Text>
          );
        })}
      </View>
    );
  };
  render() {
    let { est_balance, useralldata } = this.state;
    return (
      <Container style={styles.containerheader}>
        <LinearGradient
          colors={['#f00', '#f00']}
          style={styles.linearGradient}>
          <View style={{ width: '100%', height: 90 }} />
        </LinearGradient>
        <View
          style={{
            zIndex: 99,
            marginTop: -35,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <TextIconButton
            icon={dropdownmenu}
            onPress={this.showMenu}
            iconstyle={{
              width: 25,
              height: 25,
              margin: 0,
              borderRadius: 25 / 2,
              resizeMode: 'center',
            }}
            textstyle={{ display: 'none' }}
            style={{ width: 40, height: 40, margin: 0, borderRadius: 40 / 2 }}
          />
          <TextIconButton
            iconstyle={{
              width: 30,
              height: 30,
              margin: 0,
              borderRadius: 30 / 2,
              resizeMode: 'center',
            }}
            textstyle={{ display: 'none' }}
            style={{ width: 40, height: 40, margin: 0, borderRadius: 40 / 2 }}
            icon={avatarman}
            onPress={() => this.props.navigation.navigate('ProfileScreen')}
          />
        </View>
        <Menu style={styles.menucontainer} ref={this.setMenuRef}>
          <MenuItem
            onPress={() => {
              this.hideMenu();
              this.props.navigation.navigate('KYCScreen');
            }}>
            {stringsoflanguages.Verification + "(kyc)"}
          </MenuItem>
          <MenuDivider></MenuDivider>
          <MenuItem
            onPress={() => {
              this.hideMenu();
              this.props.navigation.navigate('LanguageSelectionScreen');
            }}>
            {stringsoflanguages.SettingLanguage}
          </MenuItem>
        </Menu>
        <Content style={{ width: '100%' }}>
          <View style={styles.containersub}>
            <Text style={styles.title}>
              {stringsoflanguages.Hello + ' ' + useralldata.firstname + ' ' + useralldata.lastname}
            </Text>
          </View>
          <View style={styles.container}>
            <View
              style={{
                height: 200,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Swiper
                showsPagination={false}
                autoplay={true}
                loop={true}
                dotColor="#a1a1a1"
                activeDotColor="#000"
                showsButtons={false}
                autoplayTimeout={3}
                style={styles.wrapper}>
                <View style={styles.swipercontent}>
                  <View style={styles.swiperitems}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 15,
                      }}>
                      <Image
                        source={buysellbutton}
                        style={{ width: 35, height: 35, resizeMode: 'contain' }}
                      />
                      <View style={{ width: 10 }} />
                      <Text
                        style={{
                          marginLeft: 0,
                          fontSize: 25,
                          color: '#fe02a2',
                          fontWeight: 'bold',
                        }}>
                        {stringsoflanguages.Ecommerce}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        style={[
                          styles.periodType,
                          { color: '#000000', marginTop: 0, fontSize: 20 },
                        ]}
                      />
                      <Text
                        style={[
                          styles.periodType,
                          {
                            color: '#000000',
                            marginTop: 0,
                            fontSize: 20,
                            fontStyle: 'italic',
                          },
                        ]}>
                        {stringsoflanguages.SlideT1}
                      </Text>
                      <Text
                        style={[
                          styles.periodType,
                          { color: '#0000ff', marginTop: 0, fontSize: 20 },
                        ]}>
                        {stringsoflanguages.SlideB1}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.swipercontent}>
                  <View style={styles.swiperitems}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 15,
                      }}>
                      <Image
                        source={workbutton}
                        style={{ width: 40, height: 40, resizeMode: 'contain' }}
                      />
                      <View style={{ width: 10 }} />
                      <Text
                        style={{
                          marginLeft: 0,
                          fontSize: 25,
                          color: '#fe02a2',
                          fontWeight: 'bold',
                        }}>
                        {stringsoflanguages.Work}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        style={[
                          styles.periodType,
                          {
                            color: '#000000',
                            marginTop: 0,
                            fontSize: 20,
                            fontStyle: 'italic',
                          },
                        ]}>
                        {stringsoflanguages.SlideT2}
                      </Text>
                      <Text
                        style={[
                          styles.periodType,
                          { color: '#0000ff', marginTop: 0, fontSize: 20 },
                        ]}>
                        {stringsoflanguages.SlideB2}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.swipercontent}>
                  <View style={styles.swiperitems}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 15,
                      }}>
                      <Image
                        source={rentbutton}
                        style={{ width: 25, height: 25, resizeMode: 'contain' }}
                      />
                      <View style={{ width: 10 }} />
                      <Text
                        style={{
                          marginLeft: 0,
                          fontSize: 25,
                          color: '#fe02a2',
                          fontWeight: 'bold',
                        }}>
                        {stringsoflanguages.Vacation + ' ' + stringsoflanguages.Rentals}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        style={[
                          styles.periodType,
                          {
                            color: '#000000',
                            marginTop: 0,
                            fontSize: 20,
                            fontStyle: 'italic',
                          },
                        ]}>
                        {stringsoflanguages.SlideT3}
                      </Text>
                      {/* <Text
                        style={[
                          styles.periodType,
                          {
                            color: '#000000',
                            marginTop: 0,
                            fontSize: 20,
                            fontStyle: 'italic',
                          },
                        ]}>
                        
                      </Text> */}
                      <Text
                        style={[
                          styles.periodType,
                          { color: '#0000ff', marginTop: 0, fontSize: 20 },
                        ]}>
                        {stringsoflanguages.SlideB3}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.swipercontent}>
                  <View style={styles.swiperitems}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 15,
                      }}>
                      <Image
                        source={stocksbutton}
                        style={{ width: 25, height: 25, resizeMode: 'contain' }}
                      />
                      <View style={{ width: 10 }} />
                      <Text
                        style={{
                          marginLeft: 0,
                          fontSize: 25,
                          color: '#fe02a2',
                          fontWeight: 'bold',
                        }}>
                        {stringsoflanguages.Stocks + stringsoflanguages.and + ' ' + stringsoflanguages.cryptos}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        style={[
                          styles.periodType,
                          { color: '#000000', marginTop: 0, fontSize: 20 },
                        ]}
                      />
                      <Text
                        style={[
                          styles.periodType,
                          {
                            color: '#000000',
                            marginTop: 0,
                            fontSize: 20,
                            fontStyle: 'italic',
                          },
                        ]}>
                        {stringsoflanguages.SlideT4}
                      </Text>
                      <Text
                        style={[
                          styles.periodType,
                          { color: '#0000ff', marginTop: 0, fontSize: 20 },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </Swiper>
            </View>
            <View style={{ marginTop: -20 }} />
            <View
              style={[
                styles.containersub,
                {
                  borderBottomColor: '#00ff00',
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                  flexDirection: 'row',
                },
              ]}>
              <View>
                <Text style={styles.title}>{stringsoflanguages.Estimated + ' ' + stringsoflanguages.Balance}</Text>
                <Text style={{ color: '#fe02a2', marginTop: 5, fontSize: 20 }}>
                  {'$' + est_balance}
                </Text>
              </View>
              <View>
                <Text style={styles.title}>{stringsoflanguages.Reward + ' ' + stringsoflanguages.point}</Text>
                <Text style={{ color: 'black', marginTop: 5, fontSize: 20 }}>
                  0
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.specialgroupcontainer,
                { backgroundColor: '#ffffff' },
              ]}>
              <View style={{ height: 15 }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '80%',
                }}
              />
              <View style={{ height: 10 }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('BuySell')}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 15,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {stringsoflanguages.Exchange}
                  </Text>
                  <Image
                    source={cryptocurrenciesbutton}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Stocks')}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {stringsoflanguages.Stocks}
                  </Text>
                  <Image
                    source={stocksbutton}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('portfolio')}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 15,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {stringsoflanguages.Social}
                  </Text>
                  <Image
                    source={copybutton}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ height: 15 }} />
            </View>
            <View
              style={[
                styles.specialgroupcontainer,
                { backgroundColor: '#ffffff' },
              ]}>
              <View style={{ height: 15 }} />
              <View style={{ height: 10 }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('advertisementList')}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 15,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {stringsoflanguages.Buysellitemfast}
                  </Text>
                  <Image
                    source={buysellbutton}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    // this.props.navigation.navigate('GuestFirstScreen')
                    this.props.navigation.navigate('rentalList')
                  }
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 0,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {stringsoflanguages.Guest}
                  </Text>
                  <Image
                    source={rentbutton}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('TradingScreen')
                  }
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 15,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {stringsoflanguages.Work}
                  </Text>
                  <Image
                    source={workbutton}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ height: 15 }} />
            </View>
            <View
              style={[
                styles.specialgroupcontainer,
                { backgroundColor: '#ffffff', height: 190 },
              ]}>
              <View style={{ height: 15 }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Balance')}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 15,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {stringsoflanguages.Wallets}
                  </Text>
                  <Image
                    source={walletsbutton}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('CashoutScreen')
                  }
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {stringsoflanguages.Cashout}
                  </Text>
                  <Image
                    source={depositbutton}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('StockAccount')}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 15,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {stringsoflanguages.Portfolio}
                  </Text>
                  <Image
                    source={portfoliobutton}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ height: 15 }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('CryptoCashloans')
                  }
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 15,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {stringsoflanguages.Loans}
                  </Text>
                  <Image
                    source={loansbutton}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AccountScreen')}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {stringsoflanguages.Cashin}
                  </Text>
                  <Image
                    source={cashoutbutton}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                      marginTop: 2,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('MtnScreen')}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70 / 2,
                    borderWidth: 0,
                    borderColor: '#00fa9a',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 15,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    MTN
                  </Text>
                  <Image
                    source={mtnbutton}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      marginTop: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 10 }} />
          </View>
        </Content>
        <View
          style={{
            marginTop: 0,
            flexDirection: 'row',
            marginBottom: 10,
            paddingLeft: 15,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('payList')}
            style={styles.linearGradient11}>
            <LinearGradient
              colors={['#800080', '#800080']}
              style={styles.buttonStyle11}>
              <Text style={styles.buttonText11}>{stringsoflanguages.Pay}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <GradiantButton
            textIndo={stringsoflanguages.Request}
            onPress={() =>
              this.props.navigation.navigate('WithDraw', { filter: 'Buy' })
            }
            style={{ borderRadius: 20, marginTop: -20 }}
          />
        </View>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          successImageSrc={require('../../assets/images/R.png')}
        />
        <Header1 navigation={this.props.navigation} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  swiperitems: {
    alignItems: 'center',
    width: '90%',
    height: 150,
    paddingHorizontal: 15,
    marginTop: 10,
    backgroundColor: 'rgba(50,255,255,0.1)',
    borderRadius: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 5,
  },
  swipercontent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  menucontainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: -190,
    marginTop: -55,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: -22,
  },
  activeButton: {
    borderBottomColor: '#00ff00',
    borderBottomWidth: 2,
    paddingLeft: 15,
    paddingRight: 15,
  },
  inactiveButton: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2,
    paddingLeft: 15,
    paddingRight: 15,
  },
  activeText: {
    color: '#00ff00',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 13,
  },
  inactiveText: {
    color: '#000000',
    padding: 10,
    fontSize: 13,
  },
  containerheader: {
    // flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: LW,
    height: LH,
    paddingTop: MH,
  },
  container: {

    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 0,
  },
  containersub: {
    width: '95%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  containerChart: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    height: 140,
    paddingHorizontal: 15,
    elevation: 5,
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    marginTop: 10,
  },
  specialgroupcontainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    elevation: 5,
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    marginTop: 15,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  linearGradient: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  title: {
    marginTop: 0,
    fontWeight: '600',
    fontSize: 18,
    color: '#00ff00',
  },
  periodType: {
    fontWeight: '400',
    fontSize: 15,
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
  },
  periodType1: {
    fontWeight: '400',
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  buttonStyle11: {
    alignSelf: 'center',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
  },
  linearGradient11: {
    alignSelf: 'center',
    width: '45%',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 10,
  },
  buttonText11: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
