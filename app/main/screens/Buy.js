import React from 'react';
import { 
  StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
// import PropTypes from 'prop-types';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class Buy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showme:true,
      user_id:0,
      stock_name:'CNSL',
      bar_list:[],
      order_type:Constant.stock_order_type,
      select_type:'Market',
      stop_price_style:false,
      limit_price_style:false,
      market_price:0,
      limit_price:0,
      stop_price:0,
      time_in_force:'day',
      quantity:0,
      tableHead: ['Symbol', 'Type', 'Quantity', 'Order id', 'Price', 'Action'],
      tableData: [
        ['No records found at the moment'],
      ],
      tableHead_executed: ['Symbol', 'Type', 'Quantity', 'Order id', 'Price', 'Status'],
      tableData_executed: [
        ['No records found at the moment'],
      ],
      open_table:'Pending',
      PendingColor:'#21CE99',
      ExecutedColor:'#FFFFFF'
    };

    try {
      this.gettoken('get_bars');
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
              this.get_bars(this.state.stock_name);
            } else if(name=='buyOrder'){
              this.buyOrder();
            } else if(name=='get_stocks')
            {
              this.get_stocks(res.token,'stock_order');
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

  get_bars = (name) => {
    var urlll = Constant.req_url+'api_get_detail/getBars?timeframe=1D&symbol='+name+'&limit=6';
    try {
      fetch(urlll, {
        method: 'GET',
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            this.setState({
              bar_list: res.res,
              market_price: res.res.response[name][0].h
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

  get_stocks = (token,table) => {
    try {
      fetch(Constant.req_url+"stocks_get", {
        method: 'POST',
        body: JSON.stringify({
          token:token,
          table:table,
          user_id: this.state.user_id,
        }),
      }).then((response) => response.json())
        .then((res => {
          this.setState({
            showme:false
          })
          if (res.status) {
            var result = res.result;
            var testdata = [];
            var testdata_executed = [];
            if(result.length>0)
            {
              for(var i=0;i<result.length;i++)
              {
                var testdata1 = [];
                var type = result[i].type;
                var status = result[i].status;
                var side = result[i].side;
                if(side=='buy'){
                  testdata1.push(result[i].symbol);
                  testdata1.push(type);
                  testdata1.push(result[i].qty);
                  testdata1.push(result[i].id);
                  testdata1.push(result[i][type+'_price']);
                  testdata1.push(result[i].id);
                  if(status=='Pending'){
                    testdata.push(testdata1);
                  } else {
                    testdata1.push(status);
                    testdata_executed.push(testdata1);
                  }
                }
              }
              this.setState({tableData:testdata});
              this.setState({tableData_executed:testdata_executed});
            }
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

  buyOrder = (name) => {
    var urlll = Constant.req_url+'api_get_detail/createOrder?user_id='+this.state.user_id+'&type=Limit&symbol='+this.state.stock_name+'&stop_price='+this.state.stop_price+'&limit_price='+this.state.limit_price+'&time_in_force='+this.state.time_in_force+'&side=buy&qty='+this.state.quantity+'&market_price='+this.state.market_price;
    // alert(urlll);
    try {
      fetch(urlll, {
        method: 'GET',
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            alert('Order placed successfully, Your transaction id : '+res.res.response.id);
          } else {
            alert(res.res);
          }
        })
      );
    }
    catch (e) {
      alert(e)
    }
  }

  select_type = () => {
    if(this.state.select_type=='Limit'){
      this.setState({
        limit_price_style: true,
        stop_price_style: false,
      });
    } else if(this.state.select_type=='Stop'){
      this.setState({
        limit_price_style: false,
        stop_price_style: true,
      });
    } else if(this.state.select_type=='Stop limit'){
      this.setState({
        limit_price_style: true,
        stop_price_style: true,
      });
    } else {
      this.setState({
        limit_price_style: false,
        stop_price_style: false,
      });
    }
  }

  _opentable(change_val) {
    if(change_val=='Pending'){
      this.setState({
        open_table:change_val,
        PendingColor:'#21CE99',
        ExecutedColor:'#FFFFFF'
      })
    } else {
      this.setState({
        open_table:change_val,
        PendingColor:'#FFFFFF',
        ExecutedColor:'#21CE99'
      })
    }
  }

  _cancelIndex(idd) {
    var urlll = Constant.req_url+'api_get_detail/cancelOrder?orderid='+idd+'&user_id='+this.state.user_id;
    try {
      fetch(urlll, {
        method: 'GET',
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            alert(res.res);
          } else {
            alert(res.res);
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

    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._cancelIndex(data)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Cancel</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.topHeading}>Buy {this.state.stock_name}</Text>

        <View style={styles.rowLayout}>
          <Text style={styles.textstyle}>MKT Price : </Text>
          <Text>                   </Text>
          <Text style={styles.textstyle}>{this.state.market_price}</Text>
        </View>

        <Dropdown
        label='Select Type'
        data={this.state.order_type}
        dropdownPosition={0}
        animationDuration={300}
        containerStyle={{ width: '50%', alignSelf: 'center'}}
        onChangeText={(select_type, index) => { this.setState({ select_type, selectedIndex: index }); this.select_type();}}
        value={this.state.select_type}
        style={styles.searchboxStyleTwo}
        // selectedIndex={this.state.selectedIndex}
        />

        <View style={styles.rowLayout}>
          <Text style={styles.labelStyle}>Quantity : </Text>
          <TextInput value={this.state.quantity} keyboardType='numeric' style={styles.inputStyle} onChangeText={(quantity) => this.setState({ quantity })} TextColor="#FFFFFF"></TextInput>
        </View>

        {this.state.limit_price_style ? (
          <View style={styles.rowLayout}>
              <Text style={styles.labelStyle}>Limit price : </Text>
              <TextInput style={styles.inputStyle} keyboardType='numeric' onChangeText={(limit_price) => this.setState({ limit_price })}></TextInput>
          </View>
        ) : null}

        {this.state.stop_price_style ? (
          <View style={styles.rowLayout}>
            <Text style={styles.labelStyle}>Stop price : </Text>
            <TextInput style={styles.inputStyle} keyboardType='numeric' onChangeText={(stop_price) => this.setState({ stop_price })}></TextInput>
          </View>
        ) : null}

        <Button
          buttonStyle = {styles.btnStyle}
          titleStyle = {{ color: '#21CE99',
                          fontFamily: 'sans-serif-light',
                          fontSize: 20, }}
          title="Buy"
          type="outline"
          onPress={() => this.gettoken('buyOrder')}
        />

        <Text style={styles.topHeading}>Order Status</Text>

        <View style={styles.rowLayout}>
          <TouchableOpacity onPress={() => this._opentable('Pending')}>
          <View>
            <Text style={styles.tableHeadStyle,{color: this.state.PendingColor}} >Pending</Text>
            <Text>                              </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._opentable('Executed')}>
          <View>
            <Text style={styles.tableHeadStyle,{color: this.state.ExecutedColor}} >Executed</Text>
          </View>
          </TouchableOpacity>
        </View>

        {this.state.open_table=='Pending' ? (
          <View style={styles.teblecontainer}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
              {
                this.state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 5 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
          </View>
        ) : null}


        {this.state.open_table=='Executed' ? (
          <View style={styles.teblecontainer}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={this.state.tableHead_executed} style={styles.head} textStyle={styles.text}/>
              {
                this.state.tableData_executed.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 7 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
          </View>
        ) : null}



      </View>
      <Header navigation={this.props.navigation}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: LW,
        height: LH,
        paddingTop: MH,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: '#040d14'
  },
  topHeading: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    marginTop: 35,
  },
  labelStyle: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: 14,
    borderBottomWidth :1,
    borderBottomColor: '#21CE99',
  },
  rowLayout:{
    flexDirection: 'row',
    marginTop:30,
  },
  inputStyle: {
    width: 80,
    color: '#FFFFFF',
    backgroundColor: '#040d14',
    borderBottomWidth :1,
    borderBottomColor: '#21CE99',
  },
  textstyle: {
    alignItems: 'center',
    textAlign: 'center',
    width: 80,
    color: '#FFFFFF',
    backgroundColor: '#040d14',
    borderBottomWidth :1,
    borderBottomColor: '#21CE99',
  },
  textStyleOld: {
    color: 'white',
    fontFamily: 'sans-serif-light',
    fontSize: 15,
    marginTop: 35,
    textAlign: 'center',
  },
  btnStyle: {
    width: 237,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor:'#21CE99',
    marginTop: 40,
  },
  tableHeadStyle: {
    fontFamily: 'sans-serif-light',
    fontSize: 18,
  },
  pendingStyle: {
    color: '#21CE99',
    fontFamily: 'sans-serif-light',
    fontSize: 18,
  },
  executedStyle: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: 18,
  },
  dropdown:{
    // flex: 1,
    alignItems: 'center',
    // color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    // backgroundColor: '#fff',
  },
  searchboxStyle: {
    width: 350,
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: '#040d14',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor:'#21CE99',
    borderRadius: 30,
    marginTop:20,
  },
  searchboxStyleTwo: {
    width: 350,
    color: '#FFFFFF',
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#040d14',
    borderColor:'#21CE99',
    borderRadius: 30,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#040d14',
  },
  teblecontainer: { flex: 1, padding: 16, paddingTop: 10, width:'100%' },
  head: { height: 40, backgroundColor: '#c8e1ff', color:'white' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#fff' },
  btn: { width: 58, height: 18, backgroundColor: '#c8e1ff',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});
