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
    Alert
} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import {
    Content,
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
export default class GuestFourScreen extends Component {
    constructor(props) {
        super(props);
        const bookingdata = this.props.navigation.getParam('bookingdata');
        this.state = {
            bookingdata: bookingdata
        }
    }

    book_host = () => {
        let {
            bookingdata
        } = this.state;
        const url = 'https://remittyllc.com/pay_book_host';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: bookingdata.user_id,
                hostDate: bookingdata.hostDate,
                hostName: bookingdata.hostName,
                guestName: bookingdata.guestName,
                numberGuest: bookingdata.numberGuest,
                numberNight: bookingdata.numberNight,
                hostContact: bookingdata.hostContact,
                pricePerNight: bookingdata.pricePerNight,
                currency: bookingdata.currency,
                serviceFees: bookingdata.serviceFees,
                tax: bookingdata.tax,
                sumPrice: bookingdata.sumPrice,
                Total: bookingdata.Total,
            })
            ,
        }).then((response) => response.json())
            .then((res => {
                Alert.alert(
                    'Host Results',
                    res.message,
                    [
                        { text: 'OK', onPress: () => this.props.navigation.navigate('Index') },
                    ],
                    { cancelable: false },
                );
            })
            ).done();
    }
    render() {
        let { bookingdata } = this.state;
        return (
            <View style={styles.container}>
                <Content style={{ width: '100%' }}>
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        <View style={{ height: 30 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, }}>
                            <Text style={{ fontSize: 30, color: 'black' }}>
                                Remitty Holding LLC
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Date
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                {bookingdata.hostDate}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Host Name
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                {bookingdata.hostName}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Guest Name
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                {bookingdata.guestName}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Number of guest
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                {bookingdata.numberGuest}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Number of night
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                {bookingdata.numberNight}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, color: 'black' }}>
                                    {bookingdata.pricePerNight}
                                </Text>
                                <Text style={{ fontSize: 20, color: 'black' }}>
                                    {bookingdata.currency + ' '}
                                </Text>
                                <Text style={{ fontSize: 20, color: 'black' }}>
                                    per night
                                </Text>
                                <Text style={{ fontSize: 20, color: 'black' }}>
                                    {' (' + bookingdata.pricePerNight + '*' + bookingdata.numberNight + ')'}
                                </Text>
                            </View>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                {bookingdata.sumPrice}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Service fees
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                {bookingdata.serviceFees}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderBottomColor: 'black', borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Tax
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                {bookingdata.tax}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderBottomColor: 'black', borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Total
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                {bookingdata.Total}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Host Contact
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                {bookingdata.hostContact}
                            </Text>
                        </View>
                        
                        <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                            <TouchableOpacity onPress={() => this.book_host()} style={styles.buttonStyle}>
                                <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                                </ActivityIndicator>
                                <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                    Pay
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <View style={{ height: 20 }}></View>
                    </View>
                </Content>
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
