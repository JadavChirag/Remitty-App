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
import { Icon } from "native-base";
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import TextIconButton from '../componentItem/stock/TextButton'
import remittyIcon from '../../assets/images/R.png';
import editIcon from '../../assets/images/editicon.png';
import JavascriptTimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
 
// The desired locales.
import en from 'javascript-time-ago/locale/en'

JavascriptTimeAgo.locale(en)

type Props = {};

export default class Stocks extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      showme:true,
      user_id:0,
      chatList:[],
      stocksList_search:[],
      matches:0,
      searchValue:''
    };

    this.myTextInput = React.createRef();

    try {
     this.gettoken('get_products');
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
            if(name=='get_products')
            {
              this.get_products(res.token);
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

  get_products = (token) => {
    try {
      fetch(Constant.req_url+"getpropertylist", {
        method: 'POST',
        body: JSON.stringify({
          token:token,
          user_id:this.state.user_id,
        }),
      }).then((response) => response.json())
        .then((res => {
          alert(JSON.stringify(res));
          this.setState({
            showme:false
          })
          if (res.status) {
            if(res.result.length>0)
            {
                this.setState({
                  chatList: res.result,
                  stocksList_search: res.result
                });
              }
          else
          {
            
            alert("No products found")
          }
          }
          else {
            alert(JSON.stringify(res.message));
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

  renderButtons()
        {
           
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
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.textStyle} placeholder='Search stocks'>Rental properties</Text>
       
        <View style={styles.container}>
          {this.state.chatList.map((data, i) => {
            var image = data.images;
            var imageurl = Constant.req_url+image;
            if(this.state.user_id==data.from_user_id)
            {
              var name = data.sfirstname+' '+data.slastname;
            }
            else
            {
              var name = data.bfirstname+' '+data.blastname;
            }
            var day = new Date(data.createdDate).getDate();
            var monthIndex = new Date(data.createdDate).getMonth();
           
            
            return <View>
                  <View
                  style={{
                  flexDirection: "row",
                  marginTop: 10,
                  width: "100%",
                  alignSelf: "center",
                  justifyContent:'space-between'
                  }}
                  >
                      <View style={{width:'30%'}}>
                      <Image source={{uri:imageurl}}
                      style={{ width: 50, height:50,marginLeft:5}} />
                      </View>
                      <View style={{width:'55%'}}>
                      <Text style={styles.buttonText12}>{data.title}</Text>
                      <Text style={[styles.buttonText13,{color:'#fe02a2'}]}>{data.price} </Text>
                      </View>

                      <View style={{width:'15%', paddingLeft:20,paddingBottom:10}}>
                       <TouchableOpacity onPress={() => this.props.navigation.navigate('propertyEdit',{datas:data.id})}><Image source={editIcon} style={{ width: 20, height:20,marginLeft:5}} /></TouchableOpacity>
                      </View>
                  </View>
                  <View
                  style={{
                  height: 1,
                  backgroundColor: "rgba(0,255,191,1)",
                  width: "100%",
                  alignSelf: "center",
                  marginTop: 8,
                  }}
                  />
              </View>



          })}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
   buttonText12: {
    fontSize: 20,
    fontWeight: "bold",
    //color: "#00ff00",
    // textAlign: "center"
  },
  buttonText13: {
    fontSize: 13,
    color: "white",
    // textAlign: "center",
    marginTop: 5
  },
  textStyle: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    fontWeight: "bold",
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
    
  },
  box: {
    margin: 2,
    width: Dimensions.get('window').width/2-8,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#21CE99',
    shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#FFFFFF',
    shadowOpacity: 10,
  },
  inputContainer:{
    alignItems: 'center',
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
});
