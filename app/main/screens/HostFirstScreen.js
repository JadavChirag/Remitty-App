import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {
    Content,
    Container
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const placesources = [{
    value: 'Entire place'
}, {
    value: 'Private room'
}, {
    value: 'Shared room'
}];
const guestnumbers = [{
    value: '1 guest'
}, {
    value: '2 guests'
}, {
    value: '3 guests'
}, {
    value: '4 guests'
}, {
    value: '5 guests'
}, {
    value: '6 guests'
}, {
    value: '7 guests'
}, {
    value: '8 guests'
}, {
    value: '9 guests'
}, {
    value: '10 guests'
}, {
    value: '11 guests'
}, {
    value: '12 guests'
}, {
    value: '13 guests'
}, {
    value: '14 guests'
}, {
    value: '15 guests'
}];
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default class HostFirstScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeSource: 'Entire place',
            guestNumber: '1 guest',
            cca2: 'US',
            countryname: 'United States',
            numberofGuests: 1,
            streetAddress: '',
            Apt: '',
            townCity: '',
            zipCode: '',
            showing_activity: 'none',

        }
    }
    gotoNext = () => {
        let {
            placeSource,
            numberofGuests,
            countryname,
            streetAddress,
            Apt,
            townCity,
            zipCode,
            region
        } = this.state;
        primaryData = {
            placeSource: placeSource,
            numberofGuests: numberofGuests + 1,
            countryname: countryname,
            streetAddress: streetAddress,
            Apt: Apt,
            townCity: townCity + ',' + region,
            zipCode: zipCode
        }
        // alert(JSON.stringify(primaryData))
        this.props.navigation.navigate('HostSecondScreen',{primaryData:primaryData});
    }
    render() {
        return (
            <View style={styles.container}>
                <Content style={{ width: '100%' }}>
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        <View style={{ height: 10 }}></View>
                        <Text style={{ width: '100%', textAlign: 'left', color: 'black', fontSize: 15, padding: 15, marginTop: 10, alignSelf: 'center' }} >Earn Money as a host</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <Dropdown
                                label=''
                                data={placesources}
                                dropdownPosition={0}
                                animationDuration={500}
                                containerStyle={{ width: '50%', marginTop: -5, marginLeft: 10, marginRight: 10, borderColor: 'gray', paddingLeft: 10, paddingRight: 10, borderWidth: 1, }}
                                onChangeText={(placeSource, index) => {
                                    this.setState({
                                        placeSource,
                                    });
                                }}
                                value={this.state.placeSource}
                            />
                            <Dropdown
                                label=''
                                data={guestnumbers}
                                dropdownPosition={0}
                                animationDuration={500}
                                containerStyle={{ width: '40%', marginTop: -5, borderColor: 'gray', marginLeft: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10, borderWidth: 1, }}
                                onChangeText={(guestNumber, index) => {
                                    this.setState({
                                        guestNumber,
                                        numberofGuests: index
                                    });
                                }}
                                value={this.state.guestNumber}
                            />
                        </View>
                        <Text style={{ width: '100%', textAlign: 'left', color: 'black', fontSize: 15, padding: 15, marginTop: 0, alignSelf: 'center' }} >Location/Country</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '95%', borderWidth: 1, borderColor: 'gray', padding: 20, marginLeft: 10, marginRight: 10, marginTop: 0, marginBottom: 0 }}>
                        <GooglePlacesAutocomplete
                                placeholder='Search'
                                minLength={2} // minimum length of text to search
                                autoFocus={false}
                                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                                listViewDisplayed='auto'    // true/false/undefined
                                fetchDetails={true}
                                renderDescription={row => row.description} // custom description render
                                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                    let res = details.formatted_address.split(", ");
                                    this.setState({
                                        townCity: res[0],
                                        region: res[1],
                                        countryname: res[2],
                                    })
                                }}
                                getDefaultValue={() => ''}
                                query={{
                                    // available options: https://developers.google.com/places/web-service/autocomplete
                                    key: 'AIzaSyDevDlcD-iiGG4qOs1OE8ZKsi11HTODjtA',
                                    language: 'en', // language of the results
                                    types: '(cities)' // default: 'geocode'
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
                        <Text style={{ width: '100%', textAlign: 'left', color: 'black', fontSize: 15, padding: 15, marginTop: 0, alignSelf: 'center' }} >Street Address</Text>
                        <TextInput
                            onChangeText={(streetAddress) => this.setState({ streetAddress })}
                            style={{ width: '95%', borderWidth: 1, borderColor: 'gray', padding: 10, alignSelf: 'center' }}
                        >
                        </TextInput>
                        <Text style={{ width: '100%', textAlign: 'left', color: 'black', fontSize: 15, padding: 15, marginTop: 0, alignSelf: 'center' }} >Apt, Suit, Building access codes(optional)</Text>
                        <TextInput
                            onChangeText={(Apt) => this.setState({ Apt })}
                            style={{ width: '95%', borderWidth: 1, borderColor: 'gray', padding: 10, alignSelf: 'center' }}
                        >
                        </TextInput>
                        {/* <Text style={{ width: '100%', textAlign: 'left', color: 'black', fontSize: 15, padding: 15, marginTop: 0, alignSelf: 'center' }} >Town/City</Text>
                        <TextInput
                            onChangeText={(townCity) => this.setState({ townCity })}
                            style={{ width: '95%', borderWidth: 1, borderColor: 'gray', padding: 10, alignSelf: 'center' }}
                        >
                        </TextInput> */}
                        <Text style={{ width: '100%', textAlign: 'left', color: 'black', fontSize: 15, padding: 15, marginTop: 0, alignSelf: 'center' }} >Zip code /postal code</Text>
                        <TextInput
                            onChangeText={(zipCode) => this.setState({ zipCode })}
                            keyboardType='numeric'
                            style={{ width: '95%', borderWidth: 1, borderColor: 'gray', padding: 10, alignSelf: 'center' }}
                        >
                        </TextInput>
                        <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                            <TouchableOpacity onPress={() => this.gotoNext()} style={styles.buttonStyle}>
                                <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                </ActivityIndicator>
                                <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <View style={{ height: 20 }}></View>
                    </View>
                </Content>
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    countryname: {
        fontSize: 15,
        color: 'black',
        padding: 5,
    },
    linearGradient1: {
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        justifyContent: 'center',
        marginHorizontal: 3,
        marginTop: 10,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
    },
    itemdialog1: {
        width: '50%',
        paddingLeft: 15,
        borderRadius: 0,
        justifyContent: 'center',
        marginTop: 1,
        alignSelf: 'center',
        // shadowOffset: { height: 2 },
        // shadowOpacity: 0.3,
        // elevation: 3,
        backgroundColor: 'white',
        padding: 5,
        borderBottomColor: 'rgba(0,0,0,0.4)',
        borderBottomWidth: 1,
    },
    itemdialog2: {
        width: '50%',
        paddingLeft: 15,
        borderRadius: 0,
        justifyContent: 'center',
        marginTop: 1,
        alignSelf: 'center',
        // shadowOffset: { height: 2 },
        // shadowOpacity: 0.3,
        // elevation: 3,
        backgroundColor: 'white',
        padding: 5,
        borderBottomColor: 'rgba(0,0,0,0.4)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.4)',
        borderRightWidth: 1,
    },
    cardpart: {
        width: '100%',
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 20,
        alignSelf: 'center',
        // shadowOffset: { height: 2 },
        // shadowOpacity: 0.3,
        // elevation: 3,
        backgroundColor: 'white',
        padding: 5,
        // borderColor: 'rgba(240,240,240,0.8)',
        // borderWidth: 1,
    },
    itemdialog: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 0,
        alignSelf: 'center',
        // shadowOffset: { height: 2 },
        // shadowOpacity: 0.3,
        // elevation: 3,
        backgroundColor: 'white',
        padding: 5,
        borderBottomColor: 'rgba(0,0,0,0.4)',
        borderBottomWidth: 1,
    },
    textcontainer: {
        flexDirection: 'column',
        marginTop: 20,
        width: '80%',
        height: 80,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        alignSelf: 'center',
        elevation: 2,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
        fontSize: 20
    },
    activeTab: {
        alignContent: 'center',
        width: '33%',
        borderBottomColor: 'rgba(0,0,0,0.5)',
        borderBottomWidth: 5,
    },
    inactiveTab: {
        alignContent: 'center',
        width: '33%',
    },
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
        width: '80%',
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
    sendmoneyinput: {
        width: '100%',
        textAlign: 'center',
        color: '#00ff00',
        fontSize: 25
    },
    titletext: {
        width: '100%',
        fontSize: 15,
        marginLeft: 10,
        paddingTop: 10,
    },
    sendmoney: {
        borderRightColor: 'rgba(0,0,0,0.5)',
        borderRightWidth: 0.5,
        width: '65%',
    },
    addbtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    addtext: {
        width: '100%',
        fontSize: 15,
        marginLeft: 10,
        paddingTop: 6,
        color: 'black'
    },
    addicon: {
        fontSize: 25,
        color: 'rgba(0,0,0,1)',
        paddingTop: 5,
    },
    hori_line: {
        width: '100%',
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 10
    },
    send_part: {
        flexDirection: 'row',
        marginTop: 20,
        width: '80%',
        height: 70,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        alignSelf: 'center',
        elevation: 3,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
    },
    destext: {
        marginTop: 25,
        alignSelf: 'center',
        color: 'black',
        fontSize: 15,

    },
    countries: {
        // width: '50%',
        backgroundColor: 'white',
        marginTop: 10,
        padding: 0,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    countries1: {
        // width: '40%',
        backgroundColor: 'white',
        marginTop: 10,
        padding: 0,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    texttop: {
        color: 'rgb(0, 0, 0)',
        textAlign: 'center',
        fontSize: 15,
        flexDirection: 'row'
    },
    textamount: {
        marginTop: 5,
        color: 'rgb(0, 0, 0)',
        textAlign: 'left',
        fontSize: 15,
        padding: 5
    },
    textunder: {
        color: 'rgb(0, 0, 0)',
        textAlign: 'center',
        fontSize: 15,
        marginRight: 5
    },
    topitems: {
        width: '80%',
        paddingTop: 25,
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 20,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
        backgroundColor: 'white',
        padding: 10,
        borderColor: 'rgba(240,240,240,0.8)',
        borderWidth: 1,
        flexDirection: 'row',
        height: 70,
    },
    amountcontainer: {
        width: '90%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 5,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
        backgroundColor: 'white',
        padding: 0
    },
    selectcountry: {
        flexDirection: 'row',
        marginTop: 20,
        width: '80%',
        height: 60,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        paddingLeft: 10,
        elevation: 3,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
        alignSelf: 'center'
    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    containerSub: {
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        fontWeight: "bold",
        color: 'green'
    },
    txtsub: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        fontWeight: "600",
        color: 'black'
    },
});
