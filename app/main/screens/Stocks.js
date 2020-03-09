import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import { Icon, Container, Content } from "native-base";
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import TextIconButton from '../componentItem/stock/TextButton'
import remittyIcon from '../../assets/images/R.png';

type Props = {};

export default class Stocks extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      showme: true,
      user_id: 0,
      stocksList: [],
      stocksList_search: [],
      matches: 0,
      searchValue: ''
    };

    this.myTextInput = React.createRef();

    try {
      this.gettoken('get_stocks');
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
      user_id: await AsyncStorage.getItem('user_id')
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
            if (name == 'get_stocks') {
              this.get_stocks(res.token, 'stocks');
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

  get_stocks = (token, table) => {
    try {
      fetch(Constant.req_url + "stocks_get", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          table: table
        }),
      }).then((response) => response.json())
        .then((res => {
          this.setState({
            showme: false
          })
          if (res.status) {
            console.log(res.result);
            this.setState({
              stocksList: res.result,
              stocksList_search: res.result
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

  renderButtons() {

    return (

      <View
        style={{
          height: 1,
          backgroundColor: "rgba(0,255,191,1)",
          width: "90%",
          alignSelf: "center"
        }}
      />
    );

  }

  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.textStyle} placeholder='Search stocks'>Please select the Stock</Text>
        <View style={styles.itemcontainer}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 0,
              width: "85%",
              alignSelf: "center"
            }}
          >
            <Icon
              name="ios-search"
              type="Ionicons"
              style={{
                fontSize: 20,
                color: "rgba(0,255,0,0.7)",
                marginTop: 23
              }}
            />
            <TextInput
              style={[
                styles.periodType,
                { color: "#fe03a2", fontSize: 15, marginLeft: 20 }
              ]}
              placeholder="Search Symbol"
              placeholderTextColor="rgba(0,255,0,0.7)"
              value={this.state.searchValue}
              onChangeText={(text) => this.implementSearch(text)}
            />
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "rgba(0,255,191,1)",
              width: "90%",
              alignSelf: "center"
            }}
          />
        </View>
        <Content style={styles.scrollContainer}>
          <View style={[styles.container,{paddingTop:5}]}>
            {this.state.stocksList_search.map((data, i) => {
              var mprice = parseFloat(data['mprice']).toFixed(2);
              var diff = (data['diff']);
              var diff_per = data['diff_per'];
              return <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  width: "90%",
                  alignSelf: "center",
                  justifyContent: 'space-between'
                }}
              >
                <View style={{ width: '60%' }}>
                  <Text style={[styles.buttonText12, { color: '#fe02a2' }]}>{data['symbol']}</Text>
                  <Text style={[styles.buttonText13, { color: "rgba(0,255,191,1)" }]}>{data['name']}</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={styles.buttonText12}>{mprice}</Text>
                  <Text style={[styles.buttonText13, { color: '#fe02a2' }]}>{diff} {diff_per} </Text>
                </View>

                <View style={{ width: '15%', paddingLeft: 20, paddingBottom: 10 }}>
                  <TextIconButton
                    textTitle="Trade"
                    textSub="Remitty"
                    textNumber="0.0"
                    icon={remittyIcon}
                    onPress={() => this.props.navigation.navigate('StockBuySell', { stock_name: data.symbol })}
                  />
                </View>
              </View>
            })}
          </View>
          <View style={{height:50}}></View>
        </Content>
        <Header navigation={this.props.navigation} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: LW,
    height: LH,
    paddingTop: MH,
    backgroundColor:'black'
  },
  buttonText12: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00ff00",
    // textAlign: "center"
  },
  buttonText13: {
    fontSize: 13,
    color: "white",
    // textAlign: "center",
    marginTop: 5
  },
  textStyle: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: 15,
    marginTop: 35,
    textAlign: 'center',
  },
  companyStyle: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: 15,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#040d14',
  },
  box: {
    margin: 2,
    width: Dimensions.get('window').width / 2 - 8,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#21CE99',
    shadowOffset: { width: 100, height: 100, },
    shadowColor: '#FFFFFF',
    shadowOpacity: 10,
  },
  inputContainer: {
    alignItems: 'center',
  },
  searchboxStyle: {
    width: 350,
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: '#040d14',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#21CE99',
    borderRadius: 30,
    marginTop: 20,
  },
});
