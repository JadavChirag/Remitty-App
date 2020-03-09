import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {
    Content,
    Icon
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, {
    DialogContent,
    DialogButton,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import { getDistance } from 'geolib';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoder';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const avatar = require('../../assets/images/ic_avatarman.png');
const sendcurrencies = [{
    value: 'USD'
}, {
    value: 'GBP'
}, {
    value: 'EUR'
}, {
    value: 'CAD'
}];
const fromcurrencies = ['USD', 'GBP', 'EUR', 'CAD'];

export default class PassengerFirstScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendcurrency: 'USD',
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            checkedbidarr: [
                {
                    avatar: avatar,
                    accepted: false,
                    price: 12,
                    title: 'My Ride',
                    text: '3815N 15th Ave Phoenix Arizona',
                },
                {
                    avatar: avatar,
                    accepted: true,
                    price: 12,
                    title: 'Ride Status',
                    text: 'Accepted by Brian',
                    username: 'Brian'
                }
            ],
            bidarr: [
                {
                    avatar: avatar,
                    name: 'Terry',
                    bidamount: 17,
                },
                {
                    avatar: avatar,
                    name: 'Vallery',
                    bidamount: 15,
                },
            ],
            startAddress: 'Phonex',
            estimated_price: 0,
            estimated_miles: 0,
            fromcurrency:'USD',
        }
    }
    sendpushnotification=()=>{
        let {
            lastLat,
            lastLong,
            passengername,
            fromcurrency,
            offered_price,
            estimated_miles,
        } = this.state;
        pushdata = {
            passlat:lastLat,
            passlong:lastLong,
            passname:passengername,
            passcurr:fromcurrency,
            passprice:offered_price,
            passdistance:estimated_miles
        }
        // alert(JSON.stringify(pushdata))
        // return;
        fetch('https://remittyllc.com/send_push_data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pushdata),
        }).then((response) => response.json())
            .then((res => {
                // alert(JSON.stringify('Success!'))
                this.props.navigation.navigate('Index');
                return;
               
            })
            )
    }
    transation = (region) => {
        let {
            lastLat,
            lastLong,
        } = this.state;
        // data = {
        //     lastLat: lastLat,
        //     lastLong: lastLong,
        //     region:region,
        // }
        let distance = getDistance(region, {
            latitude: lastLat,
            longitude: lastLong,
        });
        let dis = parseFloat(distance) / 1609.34;
        let price = (0.99 * dis).toFixed(2);
        this.setState({
            estimated_price: price,
            estimated_miles: dis.toFixed(2),
        })
        // alert(dis+' mile');
    }
    componentDidMount() {
        this.initialize();
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
            this.onRegionChange(region, region.latitude, region.longitude);
        }, (error) => console.log(error));
    }
    initialize = async () => {
        let username = await AsyncStorage.getItem('username');
        this.setState({
            passengername: username == null ? 'brian' : username,
            // lastname: await AsyncStorage.getItem('lastname'),
            // email: await AsyncStorage.getItem('email'),
            // phonenum: await AsyncStorage.getItem('phonenum'),
        });
    }
    async onRegionChange(region, lastLat, lastLong) {
        Geocoder.fallbackToGoogle('AIzaSyDevDlcD-iiGG4qOs1OE8ZKsi11HTODjtA');
        var NY = {
            lat: lastLat,
            lng: lastLong
        };

        Geocoder.geocodePosition(NY).then(res => {
            // alert(JSON.stringify(res))
            let startAddress = res[0].formattedAddress;

            this.setState({
                mapRegion: region,
                // If there are no new values set the current ones
                lastLat: lastLat || this.state.lastLat,
                lastLong: lastLong || this.state.lastLong,
                startAddress: startAddress
            });
        })
            .catch(err => console.log(err))

    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    showcheckedarr = () => {
        let { checkedbidarr } = this.state;
        return (
            <View>
                {
                    checkedbidarr.map((item, key) => {
                        if (item.accepted == false) {
                            return (
                                <View key={key} style={{
                                    marginTop: 15,
                                    width: '100%',
                                    shadowOffset: { height: 2 },
                                    shadowOpacity: 0.3,
                                    elevation: 10,
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        width: '100%',
                                        padding: 10,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: '#000',
                                    }}>
                                        {item.title}
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        width: '95%',
                                    }}>
                                        <Image
                                            source={item.avatar}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 30 / 2,
                                                resizeMode: 'cover',
                                            }} />
                                        <View style={{ width: 210 }}>
                                            <Text style={{
                                                width: 200,
                                                fontSize: 12,
                                                color: 'black',
                                                marginLeft: 10,
                                            }}>
                                                Current location to
                                            </Text>
                                            <Text style={{
                                                fontSize: 12,
                                                color: 'black',
                                                marginLeft: 10,
                                            }}>
                                                {
                                                    item.text
                                                }
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
                                            <Text style={{
                                                fontSize: 15,
                                                color: 'green',
                                            }}>
                                                {
                                                    item.price + 'USD'
                                                }
                                            </Text>
                                            <TouchableOpacity style={{ borderRadius: 30 / 2, height: 30, width: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff0000', marginLeft: 5 }}>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: 'white',
                                                    }}
                                                >Cancel</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    <View style={{ height: 15, }}></View>
                                </View>
                            )
                        }
                        else {
                            return (
                                <View key={key} style={{
                                    marginTop: 15,
                                    width: '100%',
                                    shadowOffset: { height: 2 },
                                    shadowOpacity: 0.3,
                                    elevation: 10,
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        width: '100%',
                                        padding: 10,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: '#000',
                                    }}>
                                        {item.title}
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        width: '95%',
                                    }}>
                                        <Image
                                            source={item.avatar}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 30 / 2,
                                                resizeMode: 'cover',
                                            }} />
                                        <View style={{ width: 210 }}>
                                            <Text style={{
                                                fontSize: 15,
                                                color: 'black',
                                                marginLeft: 10,
                                            }}>
                                                {
                                                    item.text
                                                }
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
                                            <Text style={{
                                                fontSize: 15,
                                                color: 'green',
                                            }}>
                                                {
                                                    item.price + 'USD'
                                                }
                                            </Text>
                                            <TouchableOpacity style={{ borderRadius: 30 / 2, height: 30, width: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff0000', marginLeft: 5, display: 'none', }}>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: 'white',
                                                    }}
                                                >Cancel</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    <View style={{ height: 15, }}></View>
                                </View>
                            )
                        }
                    })
                }
            </View>
        )
    }
    showbid = () => {
        let { bidarr } = this.state;
        return (
            <View>
                {
                    bidarr.map((item, key) => {
                        return (
                            <View style={{ flexDirection: 'row', marginBottom: 10, width: '95%', alignSelf: 'center' }} key={key}>
                                <Image source={item.avatar} style={{ width: 30, height: 30, borderRadius: 30 / 2, resizeMode: 'cover' }} />
                                <Text style={{ width: '15%', marginLeft: 10, color: 'black', fontSize: 15, }}>{item.name}</Text>
                                <Text style={{ width: '10%', marginLeft: 10, color: 'black', fontSize: 15, }}>Bid</Text>
                                <Text style={{ width: '15%', marginLeft: 10, color: 'green', fontSize: 15, }}>{item.bidamount + 'USD'}</Text>
                                <View style={{ flexDirection: 'row', width: '40%', justifyContent: 'flex-end', marginLeft: 10 }}>
                                    <TouchableOpacity style={{ borderRadius: 30 / 2, height: 30, width: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00E922', marginLeft: 5, }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: 'white',
                                            }}
                                        >Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ borderRadius: 30 / 2, height: 30, width: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff0000', marginLeft: 5, }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: 'white',
                                            }}
                                        >Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )

    }
    render() {
        return (
            <View style={styles.container}>
                <Content style={{ width: '100%' }}>
                    <View style={{
                        marginTop: 30,
                        alignSelf: 'center',
                        width: '90%',
                        shadowOffset: { height: 2 },
                        shadowOpacity: 0.3,
                        elevation: 10,
                        backgroundColor: 'white',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 0.5, width: '95%' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 15, color: '#000' }}>*</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('PassengerSecondScreen')} style={{}}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 0, color: '#000' }}>
                                    Pick-Up
                                </Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 0, color: '#000' }}>
                                    {this.state.startAddress}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '95%' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 15, color: '#000' }}>*</Text>
                            <TouchableOpacity style={{}}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 0, color: '#000' }}>
                                    Drop-Off
                                </Text>
                                <View style={{ width: 300, }}>
                                    <GooglePlacesAutocomplete
                                        placeholder='Search'
                                        minLength={2} // minimum length of text to search
                                        autoFocus={false}
                                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                                        listViewDisplayed='auto'    // true/false/undefined
                                        fetchDetails={true}
                                        renderDescription={row => row.description} // custom description render
                                        onPress={(data, details = null) => {
                                            // alert(JSON.stringify(details)) // 'details' is provided when fetchDetails = true
                                            let res = details.formatted_address.split(", ");
                                            let region = details.geometry.location;
                                            this.setState({
                                                townCity: res[0],
                                                region: region,
                                                countryname: res[2],
                                            })
                                            this.transation(region)
                                        }}
                                        getDefaultValue={() => ''}
                                        query={{
                                            // available options: https://developers.google.com/places/web-service/autocomplete
                                            key: 'AIzaSyDevDlcD-iiGG4qOs1OE8ZKsi11HTODjtA',
                                            language: 'en', // language of the results
                                            // types: '(cities)' // default: 'geocode'
                                        }}

                                        styles={{
                                            textInputContainer: {
                                                width: '100%'
                                            },
                                            description: {
                                                fontWeight: 'bold'
                                            },
                                            predefinedPlacesDescription: {
                                                color: '#1faadb'
                                            }
                                        }}

                                        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                                        // currentLocationLabel="Current location"
                                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                        GoogleReverseGeocodingQuery={{
                                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                        }}
                                        GooglePlacesSearchQuery={{
                                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                            rankby: 'distance',
                                            type: 'cafe'
                                        }}
                                        GooglePlacesDetailsQuery={{
                                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                            fields: 'formatted_address',
                                        }}
                                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                        // predefinedPlaces={[homePlace, workPlace]}

                                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                                    // renderLeftButton={() => <Image source={require('../../assets/images/bank.png')} />}
                                    // renderRightButton={() => <Text>Custom text after the input</Text>}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 0, color: '#000', width: '90%', alignSelf: 'center', marginTop: 20, }} >
                        My offer
                    </Text>
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', marginTop: 15, }}>
                        <View style={styles.countries}>
                            <Dropdown
                                label=''
                                data={sendcurrencies}
                                dropdownPosition={0}
                                animationDuration={500}
                                containerStyle={{ width: '30%', marginTop: -5, marginRight: 5, marginLeft: 15, }}
                                onChangeText={(sendcurrency, index) => {
                                    this.setState({
                                        sendcurrency,
                                        fromcurrency: fromcurrencies[index],
                                        selectedIndex: index
                                    });
                                }}
                                value={this.state.sendcurrency}
                            />
                            <TextInput
                                keyboardType="number-pad"
                                onChangeText={(offered_price)=>this.setState({offered_price})}
                                style={{ fontSize: 20, paddingLeft: 10, paddingTop: 18, color: '#000', width: '70%', borderLeftColor: 'black', borderLeftWidth: 0.5 }}>

                            </TextInput>
                        </View>
                        <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                            <TouchableOpacity onPress={() => { this.sendpushnotification()}} style={styles.buttonStyle}>
                                <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                </ActivityIndicator>
                                <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                    Enter
                            </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    <View style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 20,
                        alignItems: 'center',
                        shadowOffset: { height: 2 },
                        shadowOpacity: 0.3,
                        elevation: 10,
                        backgroundColor: 'white',
                        // flexDirection: 'row',
                        // justifyContent: 'space-between',
                        // paddingLeft: 20,
                        // paddingRight: 20,
                        paddingTop:10,
                        paddingBottom:10,
                    }}>
                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', padding: 5 }}>
                                {'Miles  ' + this.state.estimated_miles}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'green', padding: 5 }}>
                                0.99$/mile
                            </Text>
                        </View>
                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', padding: 5 }}>
                                Estimated Price
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'green', padding: 5 }}>
                                {this.state.estimated_price + '$'}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, }}>
                        {
                            this.showcheckedarr()
                        }
                    </View>
                    <View style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 20,
                        alignItems: 'center',
                        shadowOffset: { height: 2 },
                        shadowOpacity: 0.3,
                        elevation: 10,
                        backgroundColor: 'white',
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', padding: 5 }}>
                            BIDS
                        </Text>
                        <View style={{ width: '100%' }}>
                            {
                                this.showbid()
                            }
                        </View>
                    </View>
                    <View style={{ height: 50 }}></View>
                </Content>
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 15,
        paddingBottom: 15,
    },
    buttonStyle: {
        width: '100%',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 50,
    },
    linearGradient1: {
        width: '30%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        justifyContent: 'center',
        marginHorizontal: 3,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 10,
    },
    countries: {
        width: '60%',
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 0,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});
