import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from 'react-native';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import TextIconButton from '../componentItem/balance/TextIconButton'
import remittyIcon from '../../assets/images/R.png';

type Props = {};
import profileicon from '../../assets/images/profileicon.png';

export default class Stocks extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      showme: true,
      user_id: 0,
      postfolioList: [],
      stocksList_search: [],
      matches: 0,
      searchValue: ''
    };

    this.myTextInput = React.createRef();

    try {
      this.gettoken('get_portfolio');
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
    });
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
            if(name=='get_portfolio')
            {
              this.get_portfolio(res.token,'stocks');
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

  get_portfolio = (token) => {
    try {
      fetch(Constant.req_url+"getportfolio", {
        method: 'POST',
        body: JSON.stringify({
          token:token,
          user_id:this.state.user_id,
        }),
      }).then((response) => response.json())
        .then((res => {
          // alert(JSON.stringify(res.result))
          this.setState({
            showme:false
          })
          if (res.status) {
            this.setState({
              postfolioList: res.result,
            });
          }
          else {
             alert(res.message);
          }
        })
      );
    }
    catch (e) {
      alert(e)
    }
  }

   _viewportfolio = (user_id) => {
    alert(user_id); return false;
    try {
      fetch(Constant.req_url+"getportfolio", {
        method: 'POST',
        body: JSON.stringify({
          token:token,
        }),
      }).then((response) => response.json())
        .then((res => {
          this.setState({
            showme:false
          })
          if (res.status) {
            this.setState({
              postfolioList: res.result,
            });
          }
          else {
            // alert(JSON.stringify(res.message));
          }
        })
      );
    }
    catch (e) {
      alert(e)
    }
  }

  implementSearch(data) {
    var temp = [];
    var count = 0;
    var searchData = data.toUpperCase();
    var arr = this.state.stocksList;
    for (var i = 0; i < arr.length; i++) {
      var actualData = arr[i].symbol.toUpperCase();
      if (actualData.includes(searchData)) {
        temp.push(arr[i]);
        count++;
      }
    }
    this.setState({
      stocksList_search: temp,
      matches: count,
      searchValue: data
    });
  }
  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.textStyle} placeholder='Search stocks'>Portfolio rating</Text>

        <View style={styles.container}>
          {this.state.postfolioList.map((data, i) => {
            var proper = data.profitperctotal;
            if (data.profittotal > data.losstotal) {
              var diff = data.profittotal - data.losstotal;
              var greenper = ((diff / data.profittotal) * 100);
              var redper = (100 - greenper) * 2;
              var greenper = greenper * 2;
            }
            else if (data.profittotal < data.losstotal) {
              var diff = data.losstotal - data.profittotal;
              var redper = (diff / data.losstotal) * 100;
              var greenper = (100 - redper) * 2;
              var redper = redper * 2;
            }
            else {
              var redper = 50;
              var greenper = 50;
            }
            console.log(data.profittotal);
            console.log(data.losstotal);
            console.log(redper);
            console.log(greenper, 'fksdjfkhsdf');

            return <TouchableOpacity onPress={() => this.props.navigation.navigate('portfolioview', { datas: data })}><View key={i} style={styles.box}>
              <View style={styles.boxheader}>
                <Image source={profileicon}
                  style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.companyStyle}>{data.firstname + " " + data.lastname}</Text>
              </View>
              <View style="{styles.gain}">
                <Text style={styles.companyStyle} >{"Gain " + proper + "%"}</Text>
              </View>
              <View style="style.footerview">
                <Text style={styles.profittext} >PROFIT AND LOSS</Text>
                <Text style={styles.profitamount}>{data.profittotal + "$"} <Text style="{styles.lossamount}" >{data.losstotal + "$"}</Text> </Text>
                <View style={styles.lines}>
                  <View style={{
                    backgroundColor: '#42b866',
                    width: greenper
                  }}></View>
                  <View style={{
                    backgroundColor: '#ff5c5c',
                    width: redper
                  }}></View>

                </View>

              </View>
            </View>
            </TouchableOpacity>
              ;
          })}
        </View>
        <Header navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: LW,
    height: LH,
    paddingTop: MH,
  },
  profitamount:
  {
    width: 200, textAlign: 'center', marginTop: 10,
  },
  footerview: {
    marginTop: 10,
  },
  lossamount: {
    textAlign: 'right', marginLeft: 100
  },
  textStyle: {
    fontFamily: 'sans-serif-light',
    fontSize: 25,
    marginTop: 35,
    textAlign: 'center',
  },
  companyStyle: {
    fontFamily: 'sans-serif-light',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#162330',
    textAlign: 'center',
  },
  profittext: {
    fontFamily: 'sans-serif-light',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#162330',
    textAlign: 'center',
    marginTop: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  gain: {
    textAlign: 'center',
    marginTop: 10,
  },
  lines: {
    height: 2,
    width: 200,
    marginTop: 10,
    backgroundColor: '#42b866',

    flexDirection: 'row',
  },
  line1:
  {
    backgroundColor: '#42b866',
    width: 100
  },
  line2:
  {
    backgroundColor: '#ff5c5c',
    width: 100
  },
  box: {
    margin: 2,
    width: Dimensions.get('window').width / 2 - 8,
    height: 200,
    shadowOffset: { width: 100, height: 100, },
    shadowColor: '#F6F811',
    shadowOpacity: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#e5e5e5',
    backgroundColor: '#F6F7FD',
  },
  boxheader: {
    width: Dimensions.get('window').width / 2 - 8,
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#d1dcf5',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    justifyContent: 'center'
  },
  inputContainer: {
    alignItems: 'center',
  },
  searchboxStyle: {
    width: 350,
    textAlign: 'center',
    backgroundColor: '#040d14',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#21CE99',
    borderRadius: 30,
    marginTop: 20,
  },
});
