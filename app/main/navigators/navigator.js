/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {TouchableOpacity, View, Image, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../screens/Login';
import portfolio from '../screens/portfolio';
import portfolioview from '../screens/portfolioview';
import KYCScreen from '../screens/KycScreen';
import Chat from '../screens/Chat';
import BuySellScreen from '../screens/BuySell';
import IndexScreen from '../screens/index';
import SelectScreen from '../screens/Select';
import SendScreen from '../screens/SendScreen';
import Balance from '../screens/balance';
import DepositScreen from '../screens/depositScreen';
import GetaLoanScreen from '../screens/GetAloan';
import CashinScreen from '../screens/Cashin';
import CryptoCashloansScreen from '../screens/CryptoCashloans';
import TradeExchangeScreen from '../screens/TradeExchange';
import RaveTest from '../screens/raveTest';
import FriendList from '../screens/FriendList';
import DepositRequestScreen from '../screens/depositRequestScreen';
import depositRequestForm from '../screens/depositRequestForm';
import InputRave from '../screens/inputRave';
import BuycurrencyScreen from '../screens/BuycurrencyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AccountScreen from '../screens/AccountScreen';
import CashoutScreen from '../screens/CashoutScreen';
import StockSelect from '../screens/StockSelect';
import ConfirmSend from '../screens/ConfirmSend';
import Signup from '../screens/Signup';
import ForgetPassword from '../screens/ForgetPassword';
import Stocks from '../screens/Stocks';
import StockInfo from '../screens/StockInfo';
import StockAccount from '../screens/StockAccount';
import StockBuySell from '../screens/StockBuySell';
import BuyStocks from '../screens/Buy';
import SellStocks from '../screens/Sell';
import Personal from '../screens/Personal';
import HostFirstScreen from '../screens/HostFirstScreen';
import HostSecondScreen from '../screens/HostSecondScreen';
import HostThirdScreen from '../screens/HostThirdScreen';
import GuestFirstScreen from '../screens/GuestFirstScreen';
import GuestSecondScreen from '../screens/GuestSecondScreen';
import GuestThirdScreen from '../screens/GuestThirdScreen';
import GuestFourScreen from '../screens/GuestFourScreen';
import DriverFirstScreen from '../screens/DriverFirstScreen';
import PassengerFirstScreen from '../screens/PassengerFirstScreen';
import PassengerSecondScreen from '../screens/PassengerSecondScreen';
import DriverBidScreen from '../screens/DriverBidScreen';
import PayloanScreen from '../screens/Payloan';
import OfferloanScreen from '../screens/Offerloan';
import payList from '../screens/payList';
import payPage from '../screens/payPage';
import payCurrency from '../screens/payCurrency';
import payDirect from '../screens/payDirect';
import WithDrawScreen from '../screens/withDraw';
import currencyWithdraw from '../screens/currencyWithdraw';
import WithDrawCryptoScreen from '../screens/withDrawCrypto';
import cryptocurrencyWithdraw from '../screens/cryptocurrencyWithdraw';
import FreelancerScreen from '../screens/FreelancerScreen';
import EmployeerScreen from '../screens/EmployeerScreen';
import WorkRoomScreen from '../screens/WorkRoomScreen';
import MtnScreen from '../screens/mtnScreen';
import advertisementList from '../screens/advertisementList';
import adsCreate from '../screens/adsCreate';
import adsEdit from '../screens/adsEdit';
import marketChat from '../screens/marketChat';
import marketChatList from '../screens/marketChatList';
import Package from '../screens/Package';
import productview from '../screens/productview';
import propertyPackage from '../screens/propertyPackage';
import propListings from '../screens/propListings';
import propertyview from '../screens/propertyview';
import propertyCreate from '../screens/propertyCreate';
import propertyEdit from '../screens/propertyEdit';
import propertyChat from '../screens/propertyChat';
import propertyChatList from '../screens/propertyChatList';
import rentalList from '../screens/rentalList';
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import ContentScreen from '../screens/ContentScreen';
import CashoutChooseScreen from '../screens/CashoutChooseScreen';
import CashoutPaypalScreen from '../screens/CashoutPaypalScreen';
import CashoutBankScreen from '../screens/CashoutBankScreen';
import CashoutPayoneerScreen from '../screens/CashoutPayoneerScreen';
import ShippingScreen from '../screens/ShippingScreen';
import TradingScreen from '../screens/TradingScreen';
class IndexTitleIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <LinearGradient
        colors={['#f00', '#f00', '#f00']}
        style={{
          flex: 1,
          width: Dimensions.get('window').width,
          height: '130%',
          alignItems: 'center',
          paddingRight: 140,
        }}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <View
          style={{
            alignItem: 'center',
            justifyContent: 'center',
            width: '100%',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <View
            style={{
              width: '100%',
              height: 42,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/images/titlelogo.png')}
              style={{
                marginTop: 5,
                width: 35,
                height: 35,
                resizeMode: 'contain',
              }}
            />
            {/* <Text style={{ fontSize: 25, color: 'white' }}>Post</Text>
            <Text style={{ fontSize: 25, color: 'white' }}>Market</Text> */}
          </View>
        </View>
      </LinearGradient>
    );
  }
}

class LeftIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.goBack();
  };
  render() {
    return (
      <LinearGradient
        colors={['#f00', '#f00', '#f00']}
        style={{
          flex: 1,
          width: '100%',
          paddingRight: 60,
          paddingLeft: 10,
        }}>
        <View
          style={{
            alignItem: 'center',
            width: '100%',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{backgroundColor: '#f00'}}
            onPress={this.toggleDrawer.bind(this)}>
            <Image
              source={require('../../assets/images/backbutton.png')}
              style={{
                marginTop: 5,
                width: 18,
                height: 12,
                tintColor: 'white',
                marginLeft: 5,
              }}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}
class RightIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <LinearGradient
        colors={['#f00', '#f00', '#f00', '#f00']}
        style={{
          flex: 1,
          width: '100%',
          height: '150%',
          paddingRight: 10,
          paddingLeft: 60,
        }}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <View
          style={{
            height: 150,
            alignItem: 'center',
            width: '100%',
            flexDirection: 'row',
            marginTop: 20,
          }}
        />
      </LinearGradient>
    );
  }
}

class OtherIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <LinearGradient
        colors={['#f00', '#f00', '#f00', '#f00']}
        style={{flex: 1, width: '100%', height: '150%'}}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <View
          style={{
            alignItem: 'center',
            justifyContent: 'center',
            width: '100%',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View
            style={{
              marginLeft: 0,
              width: 100,
              height: 42,
              marginBottom: 5,
              flexDirection: 'row',
            }}>
            {/* <Text style={{ fontSize: 25, color: 'white' }}>Post</Text>
            <Text style={{ fontSize: 25, color: 'white' }}>Market</Text> */}
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const navigator = createStackNavigator(
  {
    Login: {screen: Login},
    ShippingScreen: {screen: ShippingScreen},
    Chat: {screen: Chat},
    Index: {screen: IndexScreen},
    TradingScreen: {screen: TradingScreen},
    WorkRoomScreen: {screen: WorkRoomScreen},
    FreelancerScreen: {screen: FreelancerScreen},
    EmployeerScreen: {screen: EmployeerScreen},
    Signup: {screen: Signup},
    DriverBidScreen: {screen: DriverBidScreen},
    payList: {screen: payList},
    CashoutBankScreen: {screen: CashoutBankScreen},
    CashoutPaypalScreen: {screen: CashoutPaypalScreen},
    CashoutChooseScreen: {screen: CashoutChooseScreen},
    CashoutPayoneerScreen: {screen: CashoutPayoneerScreen},

    advertisementList: {screen: advertisementList},
    marketChatList: {screen: marketChatList},
    marketChat: {screen: marketChat},
    Package: {screen: Package},
    adsCreate: {screen: adsCreate},
    adsEdit: {screen: adsEdit},
    productview: {screen: productview},
    propertyChat: {screen: propertyChat},
    propertyChatList: {screen: propertyChatList},
    propertyCreate: {screen: propertyCreate},
    propertyEdit: {screen: propertyEdit},
    propertyPackage: {screen: propertyPackage},
    propertyview: {screen: propertyview},
    propListings: {screen: propListings},
    rentalList: {screen: rentalList},

    LanguageSelectionScreen: {screen: LanguageSelectionScreen},
    ContentScreen: {screen: ContentScreen},

    WithDraw: {screen: WithDrawScreen},
    payPage: {screen: payPage},
    payCurrency: {screen: payCurrency},
    KYCScreen: {screen: KYCScreen},
    WithDrawCrypto: {screen: WithDrawCryptoScreen},
    payDirect: {screen: payDirect},
    PassengerFirstScreen: {screen: PassengerFirstScreen},
    PassengerSecondScreen: {screen: PassengerSecondScreen},
    DriverFirstScreen: {screen: DriverFirstScreen},
    HostThirdScreen: {screen: HostThirdScreen},
    HostSecondScreen: {screen: HostSecondScreen},
    GuestFirstScreen: {screen: GuestFirstScreen},
    GuestSecondScreen: {screen: GuestSecondScreen},
    GuestThirdScreen: {screen: GuestThirdScreen},
    GuestFourScreen: {screen: GuestFourScreen},
    HostFirstScreen: {screen: HostFirstScreen},
    StockAccount: {screen: StockAccount},
    StockSelect: {screen: StockSelect},
    Personal: {screen: Personal},
    portfolio: {screen: portfolio},
    portfolioview: {screen: portfolioview},
    Deposit: {screen: DepositScreen},
    DepositRequest: {screen: DepositRequestScreen},
    depositRequestForm: {screen: depositRequestForm},
    Offeraloan: {screen: OfferloanScreen},
    Payloan: {screen: PayloanScreen},
    ForgetPassword: {screen: ForgetPassword},
    AccountScreen: {screen: AccountScreen},
    CashoutScreen: {screen: CashoutScreen},
    ProfileScreen: {screen: ProfileScreen},
    SendScreen: {screen: SendScreen},
    ConfirmSend: {screen: ConfirmSend},
    BuycurrencyScreen: {screen: BuycurrencyScreen},
    Stocks: {screen: Stocks},
    StockInfo: {screen: StockInfo},
    StockBuySell: {screen: StockBuySell},
    BuyStocks: {screen: BuyStocks},
    SellStocks: {screen: SellStocks},
    FriendList: {screen: FriendList},
    BuySell: {screen: BuySellScreen},
    currencyWithdraw: {screen: currencyWithdraw},
    cryptocurrencyWithdraw: {screen: cryptocurrencyWithdraw},
    Bar: {screen: RaveTest},
    InputRave: {screen: InputRave},
    GetaLoan: {screen: GetaLoanScreen},
    Balance: {screen: Balance},
    Select: {screen: SelectScreen},
    Cashin: {screen: CashinScreen},
    TradeExchange: {screen: TradeExchangeScreen},
    CryptoCashloans: {screen: CryptoCashloansScreen},
    MtnScreen: {screen: MtnScreen},
  },
  {
    headerMode: 'none',
    // defaultNavigationOptions: ({ navigation }) => {
    //     if (navigation.state.routeName === 'Index') {
    //         return {
    //             headerStyle: {
    //                 height: 80,
    //                 backgroundColor: '#f00',
    //                 elevation: 0,
    //                 shadowOpacity: 0,
    //             },
    //             headerTintColor: 'rgba(255,255,255,1)',
    //             headerTitle: <IndexTitleIcon navigationProps={navigation} />,
    //             headerLeft: <OtherIcon navigationProps={navigation} />,
    //             headerRight: <OtherIcon navigationProps={navigation} />,
    //         };
    //     }
    //     else {
    //         return {
    //             headerStyle: {
    //                 height: 80,
    //                 backgroundColor: '#f00',
    //                 elevation: 0,
    //                 shadowOpacity: 0,
    //             },
    //             headerTintColor: 'rgba(255,255,255,1)',
    //             headerTitle: <IndexTitleIcon navigationProps={navigation} />,
    //             headerLeft: <LeftIcon navigationProps={navigation} />,
    //             headerRight: <RightIcon navigationProps={navigation} />,
    //         };
    //     }
    // },
  },
);

const AppNavigator = createAppContainer(navigator);

export default AppNavigator;
