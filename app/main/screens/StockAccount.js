/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  AsyncStorage
} from "react-native";
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import { Icon } from "native-base";
import GradiantButton from "../componentItem/gradiantButton";
import LinearGradient from "react-native-linear-gradient";
import LineChart from "react-native-responsive-linechart";
import {
  Content,
  Container
} from 'native-base';
const data = [6, 8, 6, 12, 20, 12];
const xLabels = ["FEB", "ARP", "JUN", "AUG", "OCT", "DEC"];
const totval = 0;

const config = {
  line: {
    visible: true,
    strokeWidth: 2,
    strokeColor: "#00ff00",
    gradientFrom: "#10ac84",
    gradientFromOpacity: 1,
    gradientTo: "#10ac84",
    gradientToOpacity: 0.4
  },
  area: {
    visible: false
  },
  yAxis: {
    visible: false,
    labelColor: "#54a0ff"
  },
  xAxis: {
    visible: true,
    labelFontSize: 12,
    labelColor: "#777"
  },
  grid: { visible: false },
  insetY: 10,
  insetX: 10,
  showme: true,
  user_id: 0,
};




export default class StockAccount extends Component {


  constructor(props) {
    super(props);


    var listdata = [];
    listdata[0] = [];
    listdata[0]['symbol'] = [''];
    listdata[0]['diff_per'] = [];

    var mprice = [];


    this.state = {
      chartData: [6, 8, 6, 12, 20, 12],
      chartButtons: [
        {
          id: 0,
          title: "Portfolio",
          buttonstyle: styles.inactiveButton,
          textStyle: styles.inactiveText,
        },

        {
          id: 1,
          title: "Watchlist",
          buttonstyle: styles.activeButton,
          textStyle: styles.activeText
        }
      ],
      chartLabel: "1 Day",
      listview: 'watchlist',
      portfolio: listdata,
      watchlist: listdata,
      listdata: listdata,
      listdata_search: listdata,
      matches: 0,
      searchValue: '',
      totalValue: 0
    };

    try {
      this.gettoken('stocks_portfolio');
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
    });
  }




  implementSearch(data) {
    var temp = [];
    var count = 0;
    var searchData = data.toUpperCase();
    var arr = this.state.listdata;
    for (var i = 0; i < arr.length; i++) {
      var actualData = arr[i].symbol.toUpperCase();
      if (actualData.includes(searchData)) {
        temp.push(arr[i]);
        count++;
      }
    }
    this.setState({
      listdata_search: temp,
      matches: count,
      searchValue: data
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
            if (name == 'stocks_portfolio') {
              this.stocks_portfolio();
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

  stocks_portfolio = (name) => {
    var user_id = this.state.user_id;
    var urlll = Constant.req_url + 'stocks_portfolio/' + user_id;

    try {
      fetch(urlll, {
        method: 'GET',
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            var watchlist = res.watchlist;
            var portfolio = res.portfolio;
            this.setState({
              watchlist: watchlist,
              portfolio: portfolio,
              listdata: watchlist,
              listdata_search: watchlist
            })
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

    if (val == 0) {
      this.calculatetotvalue();
    }
    switch (val) {
      case 0:
        this.setState({
          chartButtons: chartButtons,
          chartData: [21, 7, 1, 6, 8, 6, 12, 20, 12],
          chartLabel: "1 Day",
          listview: 'portfolio',
          listdata: this.state.portfolio,
          listdata_search: this.state.portfolio,
          searchValue: ''
        });

        break;
      case 1:
        this.setState({
          chartButtons: chartButtons,
          chartData: [1, 6, 8, 6, 12, 10, 12],
          chartLabel: "1 Week",
          listview: 'watchlist',
          listdata: this.state.watchlist,
          listdata_search: this.state.watchlist,
          searchValue: ''
        });
        break;
      default:
        break;
    }
  };

  calculatetotvalue = () => {
    var value = 0;
    console.log(this.state.listview);

    for (let i = 0; i < this.state.portfolio.length; i++) {
      value = value + this.state.portfolio[i].mprice
    }
    console.log(value);
    this.setState({
      totalValue: value,
    });

  }

  buttonGruop = () => {
    let { chartButtons } = this.state;
    return (
      <View style={styles.buttonContainer}>
        {chartButtons.map((item, index) => {
          return (
            <TouchableOpacity
              style={item.buttonstyle}
              key={item.id}
              onPress={() => this.changeChartData(item.id)}
            >
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








  render() {
    let { chartData, chartLabel } = this.state;
    return (
      <Container style={styles.container}>
        <View style={styles.buttonContainer1}>{this.buttonGruop()}</View>
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
        <Content>
          {this.state.listdata_search.map((rowData, index) => {
            this.totval = parseFloat(this.totval) + parseFloat(rowData['mprice']);
            return <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                width: "90%",
                alignSelf: "center",
                justifyContent: 'space-between'
              }}
            >
              <View >
                <Text style={[styles.buttonText12, { color: '#fe02a2' }]} onPress={() => this.props.navigation.navigate('StockBuySell', { stock_name: rowData['symbol'] })}>{rowData['symbol']}</Text>
                <Text style={[styles.buttonText13, { color: "rgba(0,255,191,1)" }]}>{rowData['name']}</Text>
              </View>
              <View style={{ width: '25%' }}>
                <Text style={styles.buttonText12}>{rowData['mprice']}</Text>
                <Text style={[styles.buttonText13, { color: '#fe02a2' }]} >{rowData['diff']} {rowData['diff_per']} </Text>
              </View>
            </View>
          })}
          {(this.state.totalValue > 0) ?
            <Text style={{
              color: "rgba(0,255,191,1)", marginTop: 10, fontSize: 20,
              fontWeight: "bold",
            }}>     Total amount :  {this.state.totalValue}</Text>
            : null}
          <View style={{ height: 20 }}></View>
        </Content>
        <Header navigation={this.props.navigation} />
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#040d14',
  },
  itemcontainer: {
    width: "100%"
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
  menucontainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: -190,
    marginTop: -55
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  buttonContainer1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30
  },
  activeButton: {
    borderColor: "rgba(0,255,191,1)",
    borderWidth: 2,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: "rgba(0,255,191,1)",
  },
  inactiveButton: {
    borderColor: "rgba(0,255,191,1)",
    borderWidth: 2,
    paddingLeft: 25,
    paddingRight: 25
  },
  activeText: {
    color: "#fe02a2",
    fontWeight: "bold",
    padding: 10,
    fontSize: 15,
    paddingLeft: 25,
    paddingRight: 25
  },
  inactiveText: {
    color: "#fe02a2",
    padding: 10,
    fontSize: 15,
    paddingLeft: 25,
    paddingRight: 25
  },
  container: {
    flex: 1,
    paddingTop: MH,
    // alignItems: "center",
    backgroundColor: "#000000",
  },
  containersub: {
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  containerChart: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    width: "90%",
    height: 400,
    paddingHorizontal: 15,
    elevation: 5,
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    marginTop: 20,
    borderWidth: 1,
    // borderColor: "rgba(240,240,240,0.8)",
    backgroundColor: "#000000"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  linearGradient: {
    width: "100%",
    height: 40,
    justifyContent: "center"
  },
  title: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 18,
    color: "#00ff00"
  },
  periodType: {
    fontWeight: "400",
    fontSize: 20,
    color: "black",
    marginTop: 10,
    marginHorizontal: 3,
    textAlign: "center"
  },
  periodType1: {
    fontWeight: "400",
    fontSize: 14,
    color: "gray",
    marginTop: 10,
    marginHorizontal: 10,
    textAlign: "center"
  },
  buttonStyle11: {
    alignSelf: "center",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    height: 40,
    justifyContent: "center"
  },
  linearGradient11: {
    alignSelf: "center",
    width: "45%",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginHorizontal: 5,
    marginTop: 30
  },
  buttonText11: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  }
});
