import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Alert
} from 'react-native';
import {
    Content,
    Icon,
    CheckBox,
    Container
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import initial from '../../assets/images/ic_initial.png';
import { Dropdown } from 'react-native-material-dropdown';
import { TextInput } from 'react-native-gesture-handler';
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const options = {
    title: 'Select Avatar',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const guestnumbers = [{
    value: 'USD'
}, {
    value: 'EUR'
}, {
    value: 'GBP'
}, {
    value: 'CAD'
}];
export default class HostThirdScreen extends Component {
    constructor(props) {
        super(props);
        const secondaryData = this.props.navigation.getParam('secondaryData');
        this.state = {
            secondaryData: secondaryData,
            phonenum: '',
            guestNumber: 'USD',
            cca2: 'US',
            callingCode: 1,
            countryname: 'United States',
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false,
            checked7: false,
            showing_activity: 'none',
            pricepernight: 0,
            hostcontact: '123452325',
            user_id: '23',
        }
    }
    componentDidMount() {
        this.initialize()
    }
    initialize = async () => {
        this.setState({
            user_id: await AsyncStorage.getItem('user_id'),
            // lastname: await AsyncStorage.getItem('lastname'),
            // email: await AsyncStorage.getItem('email'),
            // phonenum: await AsyncStorage.getItem('phonenum'),
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
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    postData = () => {
        let {
            pricepernight,
            hostcontact,
            secondaryData,
            checked1,
            checked2,
            checked3,
            checked4,
            checked5,
            checked6,
            checked7,
            guestNumber,
            callingCode,
            user_id
        } = this.state;
        postdata = {
            currency: guestNumber,
            pricepernight: pricepernight,
            contactNumber: '+' + callingCode + hostcontact,
            BTC: checked1 == true ? true : false,
            ETH: checked2 == true ? true : false,
            LTC: checked3 == true ? true : false,
            BTCcash: checked4 == true ? true : false,
            ETHclassic: checked5 == true ? true : false,
            Usdc: checked6 == true ? true : false,
            Dai: checked7 == true ? true : false,
            user_id: user_id
        }
        var data = Object.assign(secondaryData, postdata);
        hostdata = JSON.stringify(data);
        fetch('https://remittyllc.com/save_host_data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: hostdata,
        }).then((response) => response.json())
            .then((res => {
                // alert(JSON.stringify(res))
                // return;
                if (res.status == 1) {
                    this.setState({
                        showing_activity: 'none'
                    })
                    Alert.alert(
                        'Host Results',
                        res.message,
                        [
                            { text: 'OK', onPress: () => this.props.navigation.navigate('Index') },
                        ],
                        { cancelable: false },
                    );
                    return
                }
                else {
                    this.setState({
                        showing_activity: 'none'
                    })
                    alert('Error, Please check Network, or Host data!')
                    return
                }
            })
            )
    }
    render() {
        let {
            checked1,
            checked2,
            checked3,
            checked4,
            checked5,
            checked6,
            checked7
        } = this.state;
        return (
            <View style={styles.container}>
                <Content style={{ width: '100%' }}>
                    <View style={{ height: 30 }}></View>
                    <View style={styles.itembuttoncontainer}>
                        <View style={styles.addbtn}>
                            <Text style={[styles.addtext, { marginTop: 5, fontSize: 15 }]}>
                                Price per night
                            </Text>
                            <View style={{ width: '70%', flexDirection: 'row' }}>
                                <View style={{ width: '40%', marginTop: 0, marginRight: 5, marginLeft: 5, }}>
                                    <Dropdown
                                        label=''
                                        data={guestnumbers}
                                        dropdownPosition={0}
                                        animationDuration={500}
                                        containerStyle={{ width: '100%', marginTop: -5, borderColor: 'gray', marginLeft: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10, borderWidth: 1, height: 65 }}
                                        onChangeText={(guestNumber, index) => {
                                            this.setState({
                                                guestNumber,
                                            });
                                        }}
                                        value={this.state.guestNumber}
                                    />
                                </View>
                                <TextInput
                                    keyboardType='number-pad'
                                    onChangeText={(pricepernight) => this.setState({ pricepernight })}
                                    style={{ marginTop: -5, marginLeft: 2, width: '60%', borderWidth: 1, borderColor: 'gray', paddingTop: 30, alignSelf: 'center', height: 65 }}
                                >
                                </TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={styles.itembuttoncontainer}>
                        <View style={styles.addbtn}>
                            <Text style={[styles.addtext, { marginTop: 5, fontSize: 15 }]}>
                                Host Contact
                            </Text>
                            <View style={{ width: 12 }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '70%', borderWidth: 1, borderColor: 'gray', padding: 20, marginLeft: 10, marginRight: 10, marginTop: 0, marginBottom: 0 }}>
                                <CountryPicker
                                    onChange={(value) => this.setState({ countryname: value.name, cca2: value.cca2, callingCode: value.callingCode })}
                                    cca2={this.state.cca2}
                                    translation='eng'
                                    showCountryNameWithFlag={true}
                                />
                                <Text style={[styles.countryname, { marginLeft: 5, marginTop: 4 }]}>
                                    {'+' + this.state.callingCode + ' '}
                                </Text>
                                <TextInput
                                    onChangeText={(hostcontact) => this.setState({ hostcontact })}
                                    style={{ padding: 0, width: '70%' }}
                                    keyboardType='phone-pad'
                                ></TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={styles.itembuttoncontainer}>
                        <View style={[styles.addbtn, { width: '100%' }]}>
                            <View>
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }} >Accept </Text>
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>crypto currencies</Text>
                            </View>
                            <View style={{ width: '80%' }}>
                                <View style={{ width: '100%', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                        <CheckBox color="black" onPress={() => this.setState({ checked1: !this.state.checked1 })} checked={checked1 == true ? true : false} />
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 15, }}>Bitcoin </Text>
                                </View>
                                <View style={{ width: '50%', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                        <CheckBox color="black" onPress={() => this.setState({ checked2: !this.state.checked2 })} checked={checked2 == true ? true : false} />
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 15, }}>Ethereum  </Text>
                                </View>
                                <View style={{ width: '50%', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                        <CheckBox color="black" onPress={() => this.setState({ checked3: !this.state.checked3 })} checked={checked3 == true ? true : false} />
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 15, }}>Litecoin  </Text>
                                </View>
                                <View style={{ width: '50%', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                        <CheckBox color="black" onPress={() => this.setState({ checked4: !this.state.checked4 })} checked={checked4 == true ? true : false} />
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 15, }}>Bitcoin cash </Text>
                                </View>
                                <View style={{ width: '50%', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                        <CheckBox color="black" onPress={() => this.setState({ checked5: !this.state.checked5 })} checked={checked5 == true ? true : false} />
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 15, }}>Ethereum classic  </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.itembuttoncontainer}>
                        <View style={[styles.addbtn, { width: '100%' }]}>
                            <View>
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }} >Accept  </Text>
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>stable coins</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <View style={{ width: '100%', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10, marginLeft: 12 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                        <CheckBox color="black" onPress={() => this.setState({ checked6: !this.state.checked6 })} checked={checked6 == true ? true : false} />
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 15, }}>Usdc </Text>
                                </View>
                                <View style={{ width: '50%', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 10, marginLeft: 12 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                        <CheckBox color="black" onPress={() => this.setState({ checked7: !this.state.checked7 })} checked={checked7 == true ? true : false} />
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 15, }}>Dai  </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 30 }}></View>
                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                        <TouchableOpacity onPress={() => { this.postData(); this.setState({ showing_activity: 'flex' }) }} style={styles.buttonStyle}>
                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                            </ActivityIndicator>
                            <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                Post
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={{ height: 20 }}></View>
                </Content>
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    addtextinput: {
        fontSize: 15,
        color: 'black',
        borderColor: 'gray',
        borderWidth: 1,
        width: '70%'
    },
    imagebutton: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagepart: {
        width: 98,
        height: 98,
        borderRadius: 98 / 2,
        resizeMode: 'cover'
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
        width: '70%',
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
    addbtn: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addtext: {
        fontSize: 15,
        paddingTop: 10,
        color: 'black'
    },
    titletext: {
        fontSize: 20,
        padding: 10,
        color: 'black',
        textAlign: 'center',
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
    hori_line1: {
        width: '60%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 10,
        alignSelf: 'center',
    },
    itembuttoncontainer: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 25,
        padding: 0,
        borderRadius: 5,
        justifyContent: 'space-between'
    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});
