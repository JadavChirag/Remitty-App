import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  PermissionsAndroid
} from 'react-native';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'
import { Icon, Container, Content } from "native-base";
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import { Dialog } from 'react-native-simple-dialogs';
import GetLocation from 'react-native-get-location';
import ImagePicker from 'react-native-image-picker';
import initial from '../../assets/images/ic_initial.png';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
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
      stocksList_search: [],
      matches: 0,
      searchValue: '',
      location: '',
      dialogVisible: false,
      filePath: { data: '' },
      pairdetails: [],
      categoryList: [],
    };



    this.myTextInput = React.createRef();

    try {
      this.gettoken('init');
    }
    catch (e) {
      alert(e)
    }
  }


  tabs = [
    {
      key: 'Browse',
      icon: '<Image source={profileicon1} color="white" name="Group" style={{ width: 20, height: 20 }} />',
      label: 'Browse',
      barColor: '#3145C2',
    },
    {
      key: 'notification',
      icon: 'movie',
      label: 'Notification',
      barColor: '#3145C2',
    },
    {
      key: 'chat',
      icon: 'music-note',
      label: 'Chat',
      barColor: '#3145C2',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ];
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
            console.log(res[0]);
            AsyncStorage.setItem('Location', res[0].locality);
            AsyncStorage.setItem('formattedAddress', res[0].formattedAddress);
            this.setState({ location: res[0].locality + ' ' + res[0].country });
          })
            .catch(err => console.log(err))
        },
        (error) => {
          // See error code charts below.
          alert(JSON.stringify(error.code));
          alert(JSON.stringify(error.message));
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
              this.get_products(res.token, 'stocks');
              this.get_category(res.token);
            }
            if (name == "filtercategory") {
              this.filtercategory(res.token);
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
              stocksList_search: res.result,
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

  get_category = (token) => {

    try {
      fetch(Constant.req_url + "get_category", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
        }),
      }).then((response) => response.json())
        .then((res => {
          // alert(JSON.stringify(res.result));
          this.setState({
            showme: false
          })
          if (res.status) {
            let categoryList = res.result;
            this.setState({
              categoryList: categoryList
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
      fetch(Constant.req_url + "get_products", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          location: this.state.location,
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
              stocksList_search: res.result,
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
  _viewportfolio = (user_id) => {
    alert(user_id); return false;
    try {
      fetch(Constant.req_url + "getportfolio", {
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
              productList: res.result,
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
  closeModalVisible(visible) {
    this.setState({ dialogVisible: visible });
  }
  locationSearch(data) {
    console.log(data, 'dfsdfsfd');
    this.setState({ location: data });
  }
  locationSearch1(data) {
    this.gettoken('init');
  }
  implementSearch(data) {
    var temp = [];
    var count = 0;
    var searchData = data.toUpperCase();
    var arr = this.state.productList;
    for (var i = 0; i < arr.length; i++) {
      var actualData = arr[i].title.toUpperCase();
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
  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )
  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )
  render() {
    return (
      <View style={styles.container}>
        <Content style={styles.scrollContainer}>
          <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
            <TouchableOpacity onPress={() => { this.setState({ dialogVisible: true }) }} style={styles.buttonStyle}>
              <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                Post-N-Sell
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                width: "90%",
                alignSelf: 'center',
              }}
            >
              <View style={{ width: "50%", marginLeft: 0, marginTop: -35, }} >
                <Dropdown
                  label={this.state.listcategory == null ? 'Category' : this.state.listcategory}
                  data={this.state.categoryList}
                  dropdownPosition={0}
                  animationDuration={300}
                  containerStyle={{ width: '90%' }}
                  onChangeText={(listcategory, index) => { this.setState({ listcategory, selectedIndex: index }); this.gettoken('filtercategory'); }}
                  value={this.state.pair}
                  textColor='rgb(0,0,0)'
                  baseColor='rgb(128,128,128)'
                // selectedIndex={this.state.selectedIndex}
                />
              </View>
              <View style={{ width: "50%", marginLeft: 5 }} >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 0,
                    width: "100%",
                    // borderBottomColor:'gray',
                    // borderBottomWidth:0.5,
                    // paddingBottom:0,
                  }}
                >
                  <Icon
                    name="ios-search"
                    type="Ionicons"
                    style={{
                      fontSize: 20,
                      marginTop: 10
                    }}
                  />
                  <TextInput
                    style={[
                      styles.periodType,
                      { fontSize: 15, marginLeft: 5 }
                    ]}
                    placeholder="Search Ad's"
                    value={this.state.searchValue}
                    onChangeText={(text) => this.implementSearch(text)}
                  />
                </View>
                <View
                  style={{
                    borderBottomColor: 'rgb(128,128,128)',
                    borderBottomWidth: 0.5,
                    marginTop: -8
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              width: "90%",
              alignSelf: 'center',
            }}
          >
            <Icon
              name="ios-search"
              type="Ionicons"
              style={{
                fontSize: 20,
                marginTop: 10
              }}
            />
            <TextInput
              style={[
                styles.periodType,
                { fontSize: 15, marginLeft: 5, }
              ]}
              placeholder="Search location"
              value={this.state.location}
              onBlur={(text) => this.locationSearch1()}
              onChangeText={(text) => this.locationSearch(text)}
            />
          </View>
          <View
            style={{
              borderBottomColor: 'rgb(128,128,128)',
              borderBottomWidth: 0.5,
              marginTop: -8,
              width: "90%",
              alignSelf: 'center',
            }}
          />
          {/* <View style={{ flexDirection: 'row', textAlign: 'center', alignItems: 'center', marginLeft: 60 }} placeholder='Search stocks'>
            <Text style={styles.textStyle}> Location : </Text>
            <TextInput
              style={[
                styles.periodType,
                { fontSize: 15, marginLeft: 5, marginTop: 35, }
              ]}
              placeholder="Search location"
              value={this.state.location}
              onBlur={(text) => this.locationSearch1()}
              onChangeText={(text) => this.locationSearch(text)}
            />
          </View> */}
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {this.state.stocksList_search.map((data, i) => {
              var imageurl = Constant.req_url + data.images;
              return <TouchableOpacity onPress={() => this.props.navigation.navigate('productview', { datas: data.id })}>
                <View key={i} style={styles.box}>
                  <Image source={{ uri: imageurl }}
                    style={{ width: Dimensions.get('window').width / 2 - 8, height: 200 }} />
                </View>
              </TouchableOpacity>;
            })}
          </View>
          <Dialog
            visible={this.state.dialogVisible}
            title="What are you selling?"
            onTouchOutside={() => this.setState({ dialogVisible: false })} >
            <View style={styles.qrcontainer}>
              <Text style={styles.address}>Choose category</Text>
              <Dropdown
                label={this.state.category == null ? 'Category' : this.state.category}
                data={this.state.categoryList}
                dropdownPosition={0}
                animationDuration={300}
                containerStyle={{ width: '90%' }}
                onChangeText={(category, index) => { this.setState({ category, selectedIndex: index }); this.getImage(index); }}
                value={this.state.category}
                textColor='rgb(128,128,128)'
                baseColor='rgb(128,128,128)'
              // selectedIndex={this.state.selectedIndex}
              />
            </View>
            <TouchableHighlight
              onPress={() => { this.closeModalVisible(false); }} style={{ alignItems: 'center', marginTop: 2 }}>
              <Text>Close</Text>
            </TouchableHighlight>
            <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.filePath.data }} style={{ width: 50, height: 50 }} />
            <View>
            </View>
          </Dialog>
        </Content>
        <Header navigation={this.props.navigation} />
      </View>
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
