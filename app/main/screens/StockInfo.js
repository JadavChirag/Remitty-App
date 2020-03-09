import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, AsyncStorage } from 'react-native';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import { Button } from 'react-native-elements';
//import { LineChart, Grid } from 'react-native-svg-charts';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';

import { ScrollView } from 'react-native-gesture-handler';

export default class StockInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showme:true,
      user_id:0,
      stock_name:'',
      market_price:0,
      market_price_0:0,
      market_price_1:0,
      market_price_2:0,
      market_price_3:0,
      market_price_4:0,
      market_price_5:0,
      bar_list:[],
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
    var urlll = Constant.req_url+'api_get_detail/getBars?timeframe='+timeframe+'&symbol='+name+'&limit=6';
    try {
      fetch(urlll, {
        method: 'GET',
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            this.setState({
              bar_list: res.res,
              market_price: res.res.response[name][0].h,
              market_price_0: res.res.response[name][0].h,
              market_price_1: res.res.response[name][1].h,
              market_price_2: res.res.response[name][2].h,
              market_price_3: res.res.response[name][3].h,
              market_price_4: res.res.response[name][4].h,
              market_price_5: res.res.response[name][5].h
            });
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

  render() {

    this.state.stock_name = this.props.navigation.getParam('stock_name', 'BTC');

    const chartConfig = {
      backgroundGradientFrom: '#040d14',
      backgroundGradientTo: '#040d14',
      color: (opacity = 1) => '#FFFFFF',
      strokeWidth: 3 // optional, default 3
    }

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [ this.state.market_price_5 , this.state.market_price_4, this.state.market_price_3, this.state.market_price_2, this.state.market_price_1, this.state.market_price_0 ],
        color: (opacity = 1) => '#21CE99', // optional
        strokeWidth: 1, // optional
      }]
    }

    const screenWidth = Dimensions.get('window').width

    return (
      <ScrollView >
      <View style={styles.container}>
        <Text style={styles.topHeading}>{this.state.stock_name}</Text>
        <Text style={styles.latestNum}>${this.state.market_price}</Text>

        <View style={styles.rowLayout}>
          <Text style={styles.plusValue}>+1.09$</Text>
          <Text>                                </Text>
          <Text style={styles.upValue}>
            <Image style={styles.arrowStyle} source={require('../../assets/images/upload.png')}>
            </Image>
          20% Today
          </Text>
        </View>

        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
        />

        <View style={styles.rowLayout}>
          <Button
            buttonStyle = {styles.btnStyle}
            titleStyle = {{ color: '#21CE99',
                            fontFamily: 'sans-serif-light',
                            fontSize: 20, }}
            onPress={() =>
              this.props.navigation.navigate('SellStocks',{stock_name:this.state.stock_name})
            }
            title="Sell"
            type="outline"
          />
          <Text>                    </Text>
          <Button
            buttonStyle = {styles.btnStyle}
            titleStyle = {{ color: '#21CE99',
                            fontFamily: 'sans-serif-light',
                            fontSize: 20, }}
            onPress={() =>
              this.props.navigation.navigate('BuyStocks',{stock_name:this.state.stock_name})
            }
            title="Buy"
            type="outline"
          />
        </View>

        <View style={styles.firstrowLayout}>
          <Text style={styles.numStyle}>10</Text>
          <Text>                     </Text>
          <Text style={styles.centernumStyle}>500</Text>
          <Text>                            </Text>
          <Text style={styles.numStyle}>42</Text>
        </View>

        <View style={styles.secrowLayout}>
          <Text style={styles.textStyle}>Your Shares</Text>
          <Text>         </Text>
          <Text style={styles.centertextStyle}>Equity Value</Text>
          <Text>         </Text>
          <Text style={styles.textStyle}>Average</Text>
        </View>
      </View>
      <Header navigation={this.props.navigation}/>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: LW,
        height: LH,
        paddingTop: MH,
    alignItems: 'center',
    backgroundColor: '#040d14'
  },
  topHeading: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    marginTop: 35,
  },
  rowLayout:{
    flexDirection: 'row',
    marginTop:30,
  },
  firstrowLayout: {
    flexDirection: 'row',
    marginTop:70,
  },
  secrowLayout: {
    flexDirection: 'row',
    marginTop:5,
  },
  latestNum: {
    color: '#21CE99',
    fontFamily: 'sans-serif-light',
    fontSize: 25,
    marginTop: 30,
  },
  plusValue: {
    color: '#21CE99',
    fontFamily: 'sans-serif-light',
    fontSize: 18,
  },
  upValue: {
    color: '#21CE99',
    fontFamily: 'sans-serif-light',
    fontSize: 18,
  },
  arrowStyle: {
    width: 18,
    height: 18,
  },
  btnStyle: {
    width: 100,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor:'#21CE99',
    marginTop: 40,
  },
  numStyle: {
    color: '#21CE99',
    fontFamily: 'sans-serif-light',
    fontSize: 20,
  },
  centernumStyle: {
    color: '#21CE99',
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    textAlign: 'center',
  },
  textStyle: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: 15,
  },
  centertextStyle: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: 15,
    textAlign: 'center',
  },
});
