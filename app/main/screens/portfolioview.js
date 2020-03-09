import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Image
} from 'react-native';
import GradiantButton from '../componentItem/Getloan/GradiantBtn';
import { ScrollView } from 'react-native-gesture-handler';
import profileicon from '../../assets/images/profileicon.png';
import LineChart from "react-native-responsive-linechart";
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
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
export default class GetaLoanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',
      collcurrency: 'BTC',
      datas: this.props.navigation.getParam('datas'),
      trade_userid: this.props.navigation.getParam('datas').user_id,
      interestper: 0,
      collateral_perc: 0,
      collateral_amount: 0,
      showme: true,
      amount: null,
      user_id: 0,
      order_id: 0,
      tableHead: ['Date', 'Pair', 'Amount', 'Profit'],
      tableData: [
        ['No records found at the moment'],
      ],
      tableHead1: ['Date', 'Currency', 'Amount', 'Paid'],
      tableData1: [['No records found at the moment'],],
      followtext: 'Follow',
      balance: 0,
      chartData: [0.1, 0.5, 1.5, 0, 0, 0],
      chartButtons: [
        {
          id: 0,
          title: "1W",
          buttonstyle: styles.activeButton,
          textStyle: styles.activeText
        },
        {
          id: 1,
          title: "1M",
          buttonstyle: styles.inactiveButton,
          textStyle: styles.inactiveText
        },
        {
          id: 2,
          title: "6M",
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
      chartLabel: "1 Week",
    };



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
            this.getuserdetails(res.token);
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
  componentDidMount() {
    this.initialize();
  }
  initialize = async () => {

    this.setState({
      user_id: await AsyncStorage.getItem('user_id')
    });

  }

  getuserdetails = (token) => {
    try {
      fetch(Constant.req_url + "getuserdetails", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          user_id: this.state.trade_userid
        }),
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            var result = res.result;
            var followers = result.followers;
            var followarr = followers.split(",");
            if (followarr.includes(this.state.user_id)) {
              this.setState({ followtext: "Following" });

            }

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

  getactiveloan = (token) => {
    try {
      fetch(Constant.req_url + "active_loans", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          user_id: this.state.user_id
        }),
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            var result = res.result;
            var testdata1 = [];
            var testdata = [];
            if (result.length > 0) {
              for (var i = 0; i < result.length; i++) {
                var testdata1 = [];
                testdata1.push(result[i].created_date);
                testdata1.push(result[i].currency);
                testdata1.push(result[i].loan_amount);
                testdata1.push(result[i].id);
                testdata.push(testdata1);
              }
              this.setState({ tableData1: testdata });
            }
            else {
              this.setState({ tableData1: [['No records found at the moment'],] });
            }


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


  getfee = (token) => {
    try {
      fetch(Constant.req_url + "getfeedetails", {
        method: 'POST',
        body: JSON.stringify({
          token: token
        }),
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            this.setState({
              interestper: res.result.borrower_interest,
              collateral_perc: res.result.collateral_perc,
              showme: false
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

  getloan = (token) => {
    try {
      fetch(Constant.req_url + "get_loan", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          amount: this.state.amount,
          currency: this.state.currency,
          collateral_currency: this.state.collcurrency,
          user_id: this.state.user_id
        }),
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            alert(res.message);
            this.setState({
              showme: false,
            });
            this.gettoken('getactiveloan');
            this.gettoken('getpendingloan');
            this.gettoken('balance');
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
  balance = (token) => {
    // alert(this.state.currency);
    try {
      fetch(Constant.req_url + "getparticularbalance", {
        method: 'POST',
        body: JSON.stringify({
          user_id: this.state.user_id,
          currency: this.state.collcurrency,
          token: token
        }),
      }).then((response) => response.json())
        .then((res => {

          if (res.status) {

            this.setState({ balance: parseFloat(res.result).toFixed(8) });
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
  cancel = (token) => {
    try {
      fetch(Constant.req_url + "cancel_loan", {
        method: 'POST',
        body: JSON.stringify({
          user_id: this.state.user_id,
          order_id: this.state.order_id,
          token: token
        }),
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            alert(res.message);
            this.gettoken('getpendingloan');
            this.gettoken('balance');
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
  follow = (token) => {
    try {
      fetch(Constant.req_url + "follow", {
        method: 'POST',
        body: JSON.stringify({
          user_id: this.state.user_id,
          trade_userid: this.state.trade_userid,
          token: token
        }),
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            alert(res.message);
            if (res.message == 'Followed successfully') {
              this.setState({ followtext: 'Following' });
            }
            else {
              this.setState({ followtext: 'Follow' });

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
  // changeCurrency = (cur) => {
  //   this.setState({currency:'cur'})
  // }
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
            if (name == 'follow') {
              this.follow(res.token);
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

  _alertIndex(order_id) {
    this.setState({ order_id: order_id });
    this.gettoken('cancel');
  }
  _alertIndex1(order_id) {
    this.setState({ order_id: order_id });
    this.gettoken('paid');
  }

  collateral_calc() {
    this.setState({ collateral_amount: this.state.amount + (this.state.amount * this.state.collateral_perc / 100) });
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
            20, -10, 0, 0, 20
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

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(data)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Cancel</Text>
        </View>
      </TouchableOpacity>
    );

    const element1 = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex1(data)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Pay loan</Text>
        </View>
      </TouchableOpacity>
    );
    let { chartData, chartLabel } = this.state;
    return (
      <ScrollView >
        <View style={styles.container}>

          <Text style={styles.title}>Copy trading</Text>

          <View style={{
            textAlign: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', width: '90%', height: 100, elevation: 5, shadowOffset: { height: 2 },
            shadowOpacity: 0.3, marginTop: 15, marginBottom: 20, borderWidth: 1,
            borderColor: 'rgba(240,240,240,0.8)', alignSelf: 'center',
          }}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Image source={profileicon}
                style={{ width: 30, height: 30, marginRight: 10 }} /><Text style={{ fontWeight: "200", fontSize: 18, color: '#1A1F84', marginTop: 5 }}>{this.state.datas.firstname + " " + this.state.datas.lastname} </Text>
            </View>
            <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 10 }}>{"Gain " + this.state.datas.profitperctotal + "%"}</Text>

          </View>
          <GradiantButton
            textIndo={this.state.followtext}
            onPress={() => this.gettoken('follow')}
          />

          <GradiantButton
            textIndo="Chat"
            onPress={() => this.props.navigation.navigate('Chat')}
          />
          <Text style={[styles.txtsub, { marginTop: 30, marginBottom: 30, backgroundColor: '#fff' }]}>Activity chart</Text>
          <View
            style={{ flexDirection: "row", width: "90%", height: 235, marginTop: 10 }}
          >
            <LineChart
              style={{ flex: 1, marginBottom: 10 }}
              config={config}
              data={chartData}
            />
          </View>

          <View style={styles.buttonContainer1}>{this.buttonGruop()}</View>

          <Text style={[styles.txtsub, { marginTop: 30, marginBottom: 30, backgroundColor: '#fff' }]}>Trade histories</Text>
          <View style={styles.teblecontainer}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
              {
                state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
          </View>
        </View>
        <Header navigation={this.props.navigation} />
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
    backgroundColor: '#ffffff',
   
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
  teblecontainer: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff', width: '100%' },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    fontWeight: "bold",
    color: 'black'
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
  txtsub: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    fontWeight: "600",
    color: 'black'
  },
  dropdown: {
    flex: 1,
    alignItems: 'center',
  },

  head: { height: 40, backgroundColor: '#c8e1ff' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#fff' },
  btn: { width: 58, height: 18, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});