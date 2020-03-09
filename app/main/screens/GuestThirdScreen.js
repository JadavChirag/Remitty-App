import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import {
    Content,
    Container
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, {
    DialogContent,
    DialogButton,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const regionsources = [{
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
import addname from "../../assets/images/ic_addname.png";
export default class GuestFirstScreen extends Component {
    constructor(props) {
        super(props);
        const pricepernight = this.props.navigation.getParam('pricepernight');
        const contactNumber = this.props.navigation.getParam('contactNumber');
        const currency = this.props.navigation.getParam('currency');
        this.state = {
            cca2: 'US',
            countryname: 'United States',
            townCity: 'Phoenix Arizona',
            showing_activity: 'none',
            regionsources: regionsources,
            isDateTimePickerVisible: false,
            checkin_date: 'CHECK-IN',
            checkout_date: 'CHECKOUT',
            status: 0,
            namearr: [],
            choose_payment_show: false,
            contactNumber: contactNumber,
            pricepernight: pricepernight,
            currency: currency,
        }
    }
    componentDidMount() {
        this.initialize()
    }
    initialize = async () => {
        this.setState({
            host_name: await AsyncStorage.getItem('username'),
            user_id: await AsyncStorage.getItem('user_id'),
            // lastname: await AsyncStorage.getItem('lastname'),
            // email: await AsyncStorage.getItem('email'),
            // phonenum: await AsyncStorage.getItem('phonenum'),
        });
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    formatDate(date) {
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    }
    handleDatePicked = date => {
        if (this.state.status == 0) {
            let checkin_date = this.formatDate(date);
            this.setState({
                checkin_date: checkin_date,
            })
            this.hideDateTimePicker(date);
        }
        else {
            let checkout_date = this.formatDate(date);
            this.setState({
                checkout_date: checkout_date,
            })
            this.hideDateTimePicker(date);
        }
    };
    book_host = () => {
        let {
            user_id,
            numberofguests,
            numberofnights,
            pricepernight,
            contactNumber,
            checkin_date,
            host_name,
            namearr,
            currency
        } = this.state;
        let bookingdata = {
            user_id: user_id,
            hostDate: checkin_date,
            hostName: host_name,
            guestName: namearr[0],
            numberGuest: numberofguests,
            numberNight: numberofnights,
            hostContact: contactNumber,
            pricePerNight: pricepernight,
            currency: currency,
            serviceFees: 3.99,
            tax: 0,
            sumPrice: parseFloat(numberofnights) * parseFloat(pricepernight),
            Total: parseFloat(numberofnights) * parseFloat(pricepernight) + 3.99,
        }
        this.props.navigation.navigate('GuestFourScreen', { bookingdata: bookingdata })
    }
    name_add = () => {
        let { namearr, addedname } = this.state;
        namearr.push(addedname)
        this.setState({
            namearr: namearr,
            choose_payment_show: false,
        })
    }
    showNames = () => {
        let { namearr } = this.state;
        return (
            <View style={{ flexDirection: 'row' }}>
                {
                    namearr.map((item, key) => {
                        return (
                            <Text style={{ fontSize: 20, color: 'black' }}>{key > 0 ? ',' + item : '' + item}</Text>
                        )
                    })
                }
            </View>
        )

    }
    render() {
        return (
            <View style={styles.container}>
                <Dialog
                    onTouchOutside={() => {
                        this.setState({ choose_payment_show: false });
                    }}
                    width={0.9}
                    visible={this.state.choose_payment_show}
                    dialogAnimation={new ScaleAnimation()}
                    onHardwareBackPress={() => {
                        console.log('onHardwareBackPress');
                        this.setState({ choose_payment_show: false });
                        return true;
                    }}
                    actions={[
                        <DialogButton
                            text="DISMISS"
                            onPress={() => {
                                this.setState({ choose_payment_show: false });
                            }}
                            key="button-1"
                        />,
                    ]}
                >
                    <DialogContent>
                        {
                            <View style={{ width: '100%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 10 }}>
                                    <TextInput onChangeText={(addedname) => this.setState({ addedname })} style={{ fontSize: 20, color: 'black', width: '100%', padding: 0, alignSelf: 'center' }}>

                                    </TextInput>
                                </View>
                                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                                    <TouchableOpacity onPress={() => { this.name_add() }} style={styles.buttonStyle}>
                                        <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                        </ActivityIndicator>
                                        <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                            Add Name
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        }
                    </DialogContent>
                </Dialog>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                // minimumDate={new Date()}
                />
                <Content style={{ width: '100%' }}>
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        <View style={{ height: 30 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            <TouchableOpacity onPress={() => { this.showDateTimePicker(); this.setState({ status: 0, }) }}>
                                <Text style={{ fontSize: 20, color: 'black' }}>
                                    {this.state.checkin_date}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.showDateTimePicker(); this.setState({ status: 1, }) }}>
                                <Text style={{ fontSize: 20, color: 'black' }}>
                                    {this.state.checkout_date}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 15 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Number of night
                            </Text>
                            <TextInput  keyboardType='number-pad' onChangeText={(numberofnights) => this.setState({ numberofnights })} style={{ fontSize: 20, color: 'black', width: '50%', padding: 0 }}>

                            </TextInput>
                        </View>
                        <View style={{ height: 15 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Number of guest
                            </Text>
                            <TextInput keyboardType='number-pad' onChangeText={(numberofguests) => this.setState({ numberofguests })} style={{ fontSize: 20, color: 'black', width: '50%', padding: 0 }}>

                            </TextInput>
                        </View>
                        <View style={{ height: 15 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Names
                            </Text>
                            <View>
                                {
                                    this.showNames()
                                }
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10, }}>
                            <TouchableOpacity onPress={() => this.setState({ choose_payment_show: true })} style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'black' }}>
                                    Add Names
                                </Text>
                                <View style={{ marginLeft: 5, marginTop: 2, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: 'black' }}>
                                    <Image source={addname} style={{ width: 15, height: 15, resizeMode: 'contain', }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                            <TouchableOpacity onPress={() => this.book_host()} style={styles.buttonStyle}>
                                <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                </ActivityIndicator>
                                <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                    Book
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <View style={{ height: 20 }}></View>
                    </View>
                </Content>
                <View style={{ height: 50 }}></View>
                <Header navigation={this.props.navigation}/>
            </View >
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
