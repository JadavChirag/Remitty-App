import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Image,
  PermissionsAndroid
} from 'react-native';
import {
  Container,
  Content
} from 'native-base';
import GradiantButton from '../componentItem/propertyview/GradiantBtn';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import GetLocation from 'react-native-get-location';
import ImagePicker from 'react-native-image-picker';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import profileicon from '../../assets/images/profileicon.png';
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
      productList: [],
      similarList: [],
      suggestList: [],
      stocksList_search: [],
      matches: 0,
      searchValue: '',
      location: '',
      category: '',
      firstname: '',
      lastname: '',
      dialogVisible: false,
      filePath: { data: '' },
      pairdetails: []
    };

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

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location',
        'message': 'This app would like to view your location.'
      }
    ).then(() => {
      Geolocation.getCurrentPosition(
        (position) => {

          var NY = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          Geocoder.geocodePosition(NY).then(res => {
            // res is an Array of geocoding object (see below)

            AsyncStorage.setItem('Location', res[0].locality);
            AsyncStorage.setItem('formattedAddress', res[0].formattedAddress);
            this.setState({ location: res[0].locality });
          })
            .catch(err => console.log(err))
        },
        (error) => {
          // See error code charts below.
          // alert(JSON.stringify(error.code));
          // alert(JSON.stringify(error.message));
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });


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
            if (name == 'get_similarprod') {
              this.get_similarprod(res.token);
            }
            if (name == 'get_suggestprod') {
              this.get_suggestprod(res.token);
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

  filtercategory = (token) => {
    var listcategory = this.state.categoryList[this.state.listcategory];
    // alert('fdsfsdfsdf')
    try {
      fetch(Constant.req_url + "filtercategory", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          category: this.state.listcategory,
        }),
      }).then((response) => response.json())
        .then((res => {
          if (res.status) {
            this.setState({
              productList: res.result,
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

  get_similarprod = (token) => {

    try {
      fetch(Constant.req_url + "get_similarproperty", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          user_id: this.state.user_id,
          id: this.props.navigation.getParam('datas'),
        }),
      }).then((response) => response.json())
        .then((res => {
          // alert(JSON.stringify(res));
          this.setState({
            showme: false
          })
          if (res.status) {
            this.setState({
              similarList: res.result,
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

  get_suggestprod = (token) => {

    try {
      fetch(Constant.req_url + "get_suggestproperty", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          user_id: this.state.user_id,
          id: this.props.navigation.getParam('datas'),
        }),
      }).then((response) => response.json())
        .then((res => {
          // alert(JSON.stringify(res));
          this.setState({
            showme: false
          })
          if (res.status) {
            this.setState({
              suggestList: res.result,
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
      alert(this.props.navigation.getParam('datas'));
      fetch(Constant.req_url + "get_prodperties", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          id: this.props.navigation.getParam('datas'),
        }),
      }).then((response) => response.json())
        .then((res => {
          // alert(JSON.stringify(res));
          this.setState({
            showme: false
          })
          if (res.status) {

            this.setState({
              productList: res.result,
              category: res.result.category,
            });
            this.gettoken('get_similarprod');
            this.gettoken('get_suggestprod');
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
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
          dialogVisible: false,
        });

        this.props.navigation.navigate('adsCreate', { imagedata: source, category: this.state.category });

      }

    });
  }



  render() {
    var imageurl = Constant.req_url + this.state.productList.images;
    return (
      <Container style={styles.container}>
        <Content>
          <View style={{ paddingTop: 0 }}>

            <Image source={{ uri: imageurl }}
              style={{ width: '100%', height: 250 }} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle} placeholder='Search stocks'> {this.state.productList.title}</Text>
              <Text style={styles.textStyleright} placeholder='Search stocks'>${this.state.productList.price}/night</Text>
            </View>
            <Text style={{ marginLeft: 10 }}>2d Before</Text>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 15
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', marginTop: 25, marginLeft: 10, justifyContent: 'center', }}>
                <Image source={profileicon}
                  style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.companyStyle}>{this.state.productList.firstname + " " + this.state.productList.lastname}</Text>
              </View>
              <View style={{ marginLeft: 30, width: '100%' }}>
                <GradiantButton
                  textIndo='Chat'
                  onPress={() => this.props.navigation.navigate('propertyChat', { productdetails: JSON.stringify(this.state.productList) })}
                />
              </View>
            </View>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 15
              }}
            />
          </View>

          <View style={{ textAlign: 'center', alignItems: 'center', marginTop: 0 }}>
            <GradiantButton
              textIndo='Book now'
              onPress={() => this.props.navigation.navigate('booknow', { productdetails: JSON.stringify(this.state.productList) })}
            />
          </View>
          <Text style={styles.textStyle} placeholder='Search stocks'> Similar Properties</Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {
              (this.state.similarList.length > 1) ?

                this.state.similarList.map((data, i) => {
                  var imageurl = Constant.req_url + data.images;
                  return <TouchableOpacity onPress={() => this.props.navigation.navigate('propertyview', { datas: data.id })}>
                    <View key={i} style={styles.box}>
                      <Image source={{ uri: imageurl }}
                        style={{ width: Dimensions.get('window').width / 2 - 8, height: 200 }} />
                    </View>
                  </TouchableOpacity>;
                }) :
                <View style={{ textAlign: 'center', alignItems: 'center' }}>
                  <Text style={{ marginLeft: 150 }}>No Products Found</Text>
                </View>
            }
          </View>

          <Text style={styles.textStyle} placeholder='Search stocks'> Suggested Properties</Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {this.state.suggestList.map((data, i) => {
              var imageurl = Constant.req_url + data.images;
              return <TouchableOpacity onPress={() => this.props.navigation.navigate('propertyview', { datas: data.id })}>
                <View key={i} style={styles.box}>
                  <Image source={{ uri: imageurl }}
                    style={{ width: Dimensions.get('window').width / 2 - 8, height: 200 }} />
                </View>
              </TouchableOpacity>;
            })}
          </View>
          <View style={{ height: 300 }}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          </View>
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

  },
  map: {
    height: 400,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 15
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
    marginTop: 15,
    fontWeight: 'bold',
    color: '#162330',
    textAlign: 'center',
  },
  textStyleright: {
    fontFamily: 'sans-serif-light',
    fontSize: 25,
    marginTop: 25,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#FF0000',
    marginLeft: 'auto'
  },
  textStyle1: {
    fontFamily: 'sans-serif-light',
    fontSize: 25,
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
    alignSelf: 'center',
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    elevation: 2,
  },
});
