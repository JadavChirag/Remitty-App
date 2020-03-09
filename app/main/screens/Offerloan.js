import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import InputText from '../componentItem/Offer/InputText'
import GradiantButton from '../componentItem/Select/gradiantButton'
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import { Dropdown } from 'react-native-material-dropdown';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
export default class Offerloan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',
      interestper: 0,
      showme: true,
      amount: null,
      user_id: 0,
      order_id: 0,
      tableHead: ['Date', 'Currency', 'Amount', 'Action'],
      tableData: [
        ['No records found at the moment'],
      ],
      tableHead1: ['Date', 'Currency', 'Amount'],
      tableData1: [['No records found at the moment'],],
      balance: 0
    };
  }
  componentDidMount() {
    this.initialize();
    this.load();
    this.props.navigation.addListener('willFocus', this.load)
  }
  initialize = async () => {
    this.setState({
      user_id: await AsyncStorage.getItem('user_id')
    });
  }
  load = (token) => {
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
            this.getfee(res.token);
            this.getpendingloan(res.token);
            this.getactiveloan(res.token);
            this.balance(res.token);
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
  getpendingloan = (token) => {
    try {
      fetch(Constant.req_url + "pending_offers", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          user_id: this.state.user_id
        }),
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            var result = res.result;
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
              this.setState({ tableData: testdata });
            }
            else {
              this.setState({ tableData: [['No records found at the moment'],] });
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
      fetch(Constant.req_url + "active_offers", {
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
              interestper: res.result.lender_interest,
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

  offerloan = (token) => {
    try {
      fetch(Constant.req_url + "offer_loan", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          amount: this.state.amount,
          currency: this.state.currency,
          user_id: this.state.user_id
        }),
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            alert(res.message);
            this.setState({
              showme: false,
              balance: parseFloat(this.state.balance) - this.state.amount,
            });
            this.gettoken('getpendingloan');
            this.gettoken('getactiveloan');
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
          currency: this.state.currency,
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
    // alert(this.state.currency);
    try {
      fetch(Constant.req_url + "cancel_offer", {
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
  // changeCurrency = (cur) => {
  //   this.setState({currency:'cur'})
  // }
  gettoken = (name) => {
    let {
      amount,
      currency
    } = this.state;
    if (name == 'offerloan') {
      if (amount == null) { alert('please fill all input!'); return }
    }
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
            if (name == 'offerloan') {
              this.offerloan(res.token);
            }
            else if (name == 'cancel') {
              this.cancel(res.token);
            }
            else if (name == 'getpendingloan') {
              this.getpendingloan(res.token);
            }
            else if (name == 'getactiveloan') {
              this.getactiveloan(res.token);
            }
            else {
              this.balance(res.token);
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

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(data)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Cancel</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <ScrollView >
        <View style={styles.container}>

          <Text style={styles.title}>Offer A Loan</Text>

          <View style={{
            textAlign: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', width: '90%', height: 90, elevation: 5, shadowOffset: { height: 2 },
            shadowOpacity: 0.3, marginTop: 15, marginBottom: 20, borderWidth: 1,
            borderColor: 'rgba(240,240,240,0.8)', alignSelf: 'center'
          }}>
            <Text style={{ fontWeight: "200", fontSize: 18, color: '#1A1F84', marginTop: 5 }}>Available Balance</Text>
            <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>{parseFloat(this.state.balance).toFixed(2) + " " + this.state.currency}</Text>


          </View>

          <Dropdown
            label='Select Currency'
            data={Constant.fiatcurrencies}
            dropdownPosition={0}
            animationDuration={300}
            containerStyle={{ width: '80%', alignSelf: 'center', marginTop: -5 }}
            onChangeText={(currency, index) => { this.setState({ currency, selectedIndex: index }); this.gettoken('balance'); }}
            value={this.state.currency}
          // selectedIndex={this.state.selectedIndex}
          />

          <InputText
            txtplaceholder="Enter loan Amount" onChangeText={(amount) =>
              this.setState({ amount })} />
          <Text style={[styles.txtsub, { marginTop: 30 }]}>Expected Cryptos Collateral</Text>

          <View style={{ width: '90%', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={[styles.txtsub, { marginTop: 30 }]}>%Rate</Text>
            <Text style={[styles.txtsub, { marginTop: 30 }]}>{this.state.interestper}% Per Month</Text>
          </View>

          <GradiantButton
            textIndo="OFFER NOW"
            onPress={() => this.gettoken('offerloan')}
          />
          <Text style={[styles.txtsub, { marginTop: 30, marginBottom: 30, backgroundColor: '#fff' }]}>Pending loans</Text>
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

          <Text style={[styles.txtsub, { marginTop: 30, marginBottom: 30, backgroundColor: '#fff' }]}>Active loans</Text>
          <View style={styles.teblecontainer}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              <Row data={this.state.tableHead1} style={styles.head} textStyle={styles.text} />
              <Rows data={this.state.tableData1} textStyle={styles.text} />
            </Table>
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
    backgroundColor: '#ffffff',
  },
  teblecontainer: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff', width: '100%' },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    fontWeight: "bold",
    color: 'black'
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
    backgroundColor: '#040d14'
  },
  head: { height: 40, backgroundColor: '#c8e1ff' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#fff' },
  btn: { width: 58, height: 18, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});
