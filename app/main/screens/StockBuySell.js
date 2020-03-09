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
  Picker,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import GradiantButton from "../componentItem/gradiantButton";
import LinearGradient from "react-native-linear-gradient";
import LineChart from "react-native-responsive-linechart";

const data = [6, 8, 6, 12, 20, 12];
const xLabels = ["FEB", "ARP", "JUN", "AUG", "OCT", "DEC"];

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
  insetX: 10
};
export default class StockBuySell extends Component {
  constructor(props) {
    super(props);

    var market_price_data_arr = [];
        market_price_data_arr['1D'] = [];
        market_price_data_arr['1D'][0] = 0;
        market_price_data_arr['1D'][1] = 0;
        market_price_data_arr['1D'][2] = 0;
        market_price_data_arr['1D'][3] = 0;
        market_price_data_arr['1D'][4] = 0;
        market_price_data_arr['1D'][5] = 0;

    this.state = {
      chartData: [0,0,0,0,0,0],
      chartButtons: [
        {
          id: 0,
          title: "1D",
          buttonstyle: styles.activeButton,
          textStyle: styles.activeText
        },
        {
          id: 1,
          title: "1W",
          buttonstyle: styles.inactiveButton,
          textStyle: styles.inactiveText
        },
        {
          id: 2,
          title: "1M",
          buttonstyle: styles.inactiveButton,
          textStyle: styles.inactiveText
        },
        {
          id: 3,
          title: "1Y",
          buttonstyle: styles.inactiveButton,
          textStyle: styles.inactiveText
        },
        {
          id: 4,
          title: "5Y",
          buttonstyle: styles.inactiveButton,
          textStyle: styles.inactiveText
        }
      ],
      chartLabel: "1 Day",
      showme:true,
      user_id:0,
      stock_name:'',
      market_price:0,
      market_price_data:market_price_data_arr,
      bar_list:[],
      market_price_one_day:[],
      market_price_one_week:[],
      market_price_one_mth:[],
      market_price_one_year:[],
      market_price_fiv_year:[],
      your_shares:0,
      avg_price:0,
      equity_value:0,
      market_price_yesterday:0,
      showme : true,
    };

    try {
      this.gettoken('get_bars');
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
      user_id :await AsyncStorage.getItem('user_id')
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
            if(name=='get_bars'){
              this.get_bars(this.state.stock_name,'1D');
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



  get_bars = (name,timeframe) => {
     this.setState({
                showme:true
            })
    var urlll = Constant.req_url+'api_get_detail/getBars?timeframe='+timeframe+'&symbol='+name+'&limit=1000&user_id='+this.state.user_id+"&watchlist="+name;
    try {
      fetch(urlll, {
        method: 'GET',
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {

            var market_price_data_arr = [];
                market_price_data_arr['1D'] = [];
                market_price_data_arr['1D'][0] = res.res.response[name][0].h;
                market_price_data_arr['1D'][1] = res.res.response[name][1].h;
                market_price_data_arr['1D'][2] = res.res.response[name][2].h;
                market_price_data_arr['1D'][3] = res.res.response[name][3].h;
                market_price_data_arr['1D'][4] = res.res.response[name][4].h;
                market_price_data_arr['1D'][5] = res.res.response[name][5].h;

                var equity_value = 0;
                equity_value = res.res_sha.qty * res.res.response[name][0].h;
                equity_value = equity_value.toFixed(2);

                var market_price_yesterday = Math.abs(res.res_fin['1D'][0]-res.res_fin['1D'][1]);
                market_price_yesterday = market_price_yesterday.toFixed(2);

                var diff_per = (res.res_fin['1D'][0]*market_price_yesterday) / 100;
                diff_per = diff_per.toFixed(4);

                var h1 = res.res_fin['1D'][0];
                var h2 = res.res_fin['1D'][1];

                var diff_per = ((h1-h2)/h1) * 100;
                diff_per = diff_per.toFixed(2);

            this.setState({
              bar_list: res.res,
              market_price:res.res_fin['1D'][0],
              market_price_yesterday:market_price_yesterday,
              market_price_diff_per:diff_per,
              market_price_data :market_price_data_arr,
              market_price_one_day :res.res_fin['1D'],
              market_price_one_week :res.res_fin['1W'],
              market_price_one_mth :res.res_fin['1M'],
              market_price_one_year :res.res_fin['1Y'],
              market_price_fiv_year :res.res_fin['5Y'],
              your_shares :res.res_sha.qty,
              avg_price :res.res_sha.avg,
              equity_value:equity_value,
              showme:false,
            });
            this.changeChartData(0);

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
    switch (val) {
      case 0:
        this.setState({
          chartButtons: chartButtons,
          chartData: [
            this.state.market_price_data['1D'][5],
            this.state.market_price_data['1D'][4],
            this.state.market_price_data['1D'][3],
            this.state.market_price_data['1D'][2],
            this.state.market_price_data['1D'][1],
            this.state.market_price_data['1D'][0],
          ],
          chartLabel: "1 Day"
        });
        break;
      case 1:
        this.setState({
          chartButtons: chartButtons,
          chartData: [1, 6, 8, 6, 12, 10, 12],
          chartLabel: "1 Week"
        });
        break;
      case 2:
        this.setState({
          chartButtons: chartButtons,
          chartData: [11, 17, 1, 6, 8, 6, 2, 9, 22],
          chartLabel: "1 Month"
        });
        break;
      case 3:
        this.setState({
          chartButtons: chartButtons,
          chartData: [21, 7, 11, 16, 18, 6, 2, 20, 13],
          chartLabel: "1 Year"
        });
        break;
      case 4:
        this.setState({
          chartButtons: chartButtons,
          chartData: [10, 7, 11, 6, 18, 6, 3, 10, 8],
          chartLabel: "5 Years"
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

    this.state.stock_name = this.props.navigation.getParam('stock_name', 'BTC');

    let { chartData, chartLabel } = this.state;
    return (
      <View style={styles.container}>
       {
                this.state.showme ? <ActivityIndicator style={{flex:1}} size="large"/> :
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.containerChart}>
              <View style={{ flexDirection: "row", marginTop: 0 }}>
                <Text
                  style={{
                    // marginLeft: 40,
                    fontSize: 50,
                    color: "#00ff00",
                    marginTop: 25
                  }}
                >
                  ${this.state.market_price}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 0 }}>
                <Text style={[styles.periodType, { color: "#fe03a2" }]}>
                  $ {this.state.market_price_yesterday} ( {this.state.market_price_diff_per} %)
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", width: "100%", height: 235,marginTop:10 }}
              >
                <LineChart
                  style={{ flex: 1, marginBottom: 10 }}
                  config={config}
                  data={chartData}
                />
              </View>
              <View style={styles.buttonContainer1}>{this.buttonGruop()}</View>
            </View>
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                marginBottom: 10,
                paddingLeft: 15
              }}
            >
              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate("Payloan")}
                style={styles.linearGradient11}
              >
                <LinearGradient
                  colors={["#800080", "#800080"]}
                  style={styles.buttonStyle11}
                >
                  <Text style={styles.buttonText11} onPress={() =>
                    this.props.navigation.navigate('SellStocks',{stock_name:this.state.stock_name})
                  }>SELL</Text>
                </LinearGradient>
              </TouchableOpacity>


              <GradiantButton
                textIndo="BUY"
                onPress={() =>
                  this.props.navigation.navigate('BuyStocks',{stock_name:this.state.stock_name})
                }
                style={{ borderRadius: 20 }}
              />
            </View>
            <View style={{height:20}}></View>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%'}}>
              <View>
                <Text style={styles.buttonText12}>{this.state.your_shares}</Text>
                <Text style={styles.buttonText13}>Your Shares</Text>
              </View>
              <View>
                <Text style={styles.buttonText12}>{this.state.equity_value}</Text>
                <Text style={styles.buttonText13}>Equity Value</Text>
              </View>
              <View>
                <Text style={styles.buttonText12}>{this.state.avg_price}</Text>
                <Text style={styles.buttonText13}>Average price</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      }
      <Header navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText12: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00ff00",
    textAlign: "center"
  },
  buttonText13: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    marginTop: 10
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
    marginTop: 0
  },
  activeButton: {
    borderBottomColor: "#00ff00",
    borderBottomWidth: 2,
    paddingLeft: 15,
    paddingRight: 15
  },
  inactiveButton: {
    borderBottomColor: "rgba(0,0,0,0)",
    borderBottomWidth: 2,
    paddingLeft: 15,
    paddingRight: 15
  },
  activeText: {
    color: "#00ff00",
    fontWeight: "bold",
    padding: 10,
    fontSize: 13
  },
  inactiveText: {
    color: "#fe02a2",
    padding: 10,
    fontSize: 13
  },
  container: {
    width: LW,
    height: LH,
    paddingTop: MH*0.5,
    alignItems: "center",
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
