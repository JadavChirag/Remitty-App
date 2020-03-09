import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Image
} from 'react-native';
import InputText from '../componentItem/Offer/InputText'
import { Dropdown } from 'react-native-material-dropdown';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import LinearGradient from 'react-native-linear-gradient'
import GetLocation from 'react-native-get-location';
import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select product image',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'rajareact',
  },
};
export default class Stocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showme: true,
      user_id: 0,
      postfolioList: [],
      stocksList_search: [],
      conditionList: [{ value: 'New' }, { value: 'Like New' }, { value: 'Good' }, { value: 'Fair' }, { value: 'Poor' }],
      matches: 0,
      searchValue: '',
      dialogVisible: false,
      filePath: this.props.navigation.getParam('imagedata'),
      category: this.props.navigation.getParam('category'),
      productdetail: [],
      title: '',
      price: 0,
      condition: '',
      description: '',
      //category:'',
      location: '',
    };

    AsyncStorage.getItem("formattedAddress").then((value) => {
      if (value != '' && value != null) {
        this.setState({ location: value });
      }

    });

    this.myTextInput = React.createRef();

    try {
      this.gettoken('init');
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


    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    })
      .then(location => {
        console.log(location);

      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }

  gettoken = (name) => {
    //alert(name);
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
            if (name == 'init') {
              this.get_products(res.token);
            }
            if (name == 'adpost') {
              this.adpost(res.token);
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

  get_category = (token) => {

    try {
      fetch(Constant.req_url + "get_category", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
        }),
      }).then((response) => response.json())
        .then((res => {

          this.setState({
            showme: false
          })
          if (res.status) {
            this.setState({
              categoryList: res.result,
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

  get_products = (token) => {
    try {
      fetch(Constant.req_url + "get_prodperties", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          id: this.props.navigation.getParam('datas'),
        }),
      }).then((response) => response.json())
        .then((res => {
          this.setState({
            showme: false
          })
          alert(JSON.stringify(res));
          if (res.status) {
            this.setState({
              productdetail: res.result,
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

  adpost = (token) => {
    let {
      title,
      price,
      condition,
      description,
      category,
      location,
    } = this.state;
    var listcategory = this.state.categoryList[this.state.category];

    if (title == null || condition == null || description == null || category == null || location == null || price == 0) { alert('please fill all input!'); return }
    const data = new FormData();
    data.append('token', token);
    data.append('user_id', this.state.user_id);
    data.append('title', this.state.title);
    data.append('condition', this.state.condition);
    data.append('description', this.state.description);
    data.append('category', this.state.category);
    data.append('location', this.state.location);
    data.append('price', this.state.price);
    data.append('fileData', {
      uri: this.state.filePath.uri,
      type: this.state.filePath.type,
      name: this.state.filePath.fileName,
      data: this.state.filePath.data,
      token: token
    });
    try {
      fetch(Constant.req_url + "addadvertisment", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: data,
      }).then((response) => response.json())
        .then((res => {

          this.setState({
            showme: false
          })
          if (res.status) {
            alert(res.message);
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

  closeModalVisible(visible) {
    this.setState({ dialogVisible: visible });
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

  getImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        alert(JSON.stringify(response));
        const data = new FormData();
        data.append('name', 'avatar');
        data.append('fileData', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
          data: response.data
        });

        // const config = {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   body: JSON.stringify({
        //       user_id: this.state.user_id,
        //       data:data
        //   }),
        // };
        // fetch(Constant.req_url+"uploadimg", config)
        // .then((res) =>{
        //   alert(JSON.stringify(res));
        // }).catch((err)=>{
        //   console.log(err)
        // });

      }

    });
  }



  render() {
    var imageurl = Constant.req_url + this.state.productdetail.images;
    return (


      <ScrollView style={styles.scrollContainer}>

        <Text style={styles.textStyle} placeholder='Search stocks'>Listing Details</Text>

        <View style={{ marginTop: 10, marginLeft: 60, flexDirection: "row", }}>
          <Image source={{ uri: imageurl }} style={{ width: 50, height: 50, marginLeft: 10 }} />
          <View style={styles.imagebox}></View>
          <View style={styles.imagebox}></View>
          <View style={styles.imagebox}></View>
        </View>

        <InputText txtplaceholder="Title" onChangeText={(title) => this.setState({ title })} value={this.state.productdetail.title} />

        <InputText txtplaceholder="Price" onChangeText={(price) => this.setState({ price })} value="200000" />

        <View style={{ alignItems: 'center' }}>
          <Dropdown
            label='Condition'
            data={this.state.conditionList}
            dropdownPosition={0}
            animationDuration={300}
            containerStyle={{ width: '80%' }}
            onChangeText={(condition, index) => { this.setState({ condition, selectedIndex: index }); }}
            value={this.state.productdetail.productcondition}
            textColor='rgb(128,128,128)'
            baseColor='rgb(128,128,128)'
          // selectedIndex={this.state.selectedIndex}
          />
        </View>
        <InputText txtplaceholder="Description" onChangeText={(description) => this.setState({ description })} value={this.state.productdetail.description} />
        <View style={{ alignItems: 'center' }}>
          <Dropdown
            label='Category'
            data={this.state.categoryList}
            dropdownPosition={0}
            animationDuration={300}
            containerStyle={{ width: '80%' }}
            onChangeText={(category, index) => { this.setState({ category, selectedIndex: index }); this.getImage(index); }}
            value={this.state.productdetail.category}
            textColor='rgb(128,128,128)'
            baseColor='rgb(128,128,128)'
          // selectedIndex={this.state.selectedIndex}
          />
        </View>

        <InputText txtplaceholder="Location" onChangeText={(location) => this.setState({ location })} value={this.state.location} />

        <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
          <TouchableOpacity onPress={() => {
            this.gettoken('adpost');
          }} style={styles.buttonStyle}>

            <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
              Submit
                            </Text>
          </TouchableOpacity>
        </LinearGradient>

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
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  buttonStyle: {
    width: '100%',
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
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
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#e5e5e5',
    backgroundColor: '#F6F7FD',
  },
  imagebox: {
    marginLeft: 10,
    width: 50,
    height: 50,
    //shadowOffset:{  width: 100,  height: 100,  },
    //shadowColor: '#F6F811',
    shadowOpacity: 10,
    // borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#211d1d',
    // backgroundColor: '#F6F7FD',
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
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 15,
    paddingBottom: 15,
  },
  linearGradient1: {
    width: '50%',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 3,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    elevation: 2,
  },
});
