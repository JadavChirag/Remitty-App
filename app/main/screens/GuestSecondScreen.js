import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import {
    Content,
    Container
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import ImageSlider from 'react-native-image-slider';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class GuestFirstScreen extends Component {
    constructor(props) {
        super(props);
        const hostdata = this.props.navigation.getParam('hostdata');
        this.state = {
            cca2: 'US',
            countryname: hostdata[0].countryname,
            townCity: hostdata[0].townCity,
            hostdata: hostdata,
            imageurl1: hostdata[0].imageurl1,
            imageurl2: hostdata[0].imageurl2,
            imageurl3: hostdata[0].imageurl3,
            imageurl4: hostdata[0].imageurl4,
            placeSource: hostdata[0].placeSource,
            pricepernight: hostdata[0].pricepernight,
            currency: hostdata[0].currency,
            BTC: hostdata[0].BTC,
            ETH: hostdata[0].ETH,
            LTC: hostdata[0].LTC,
            BTCcash: hostdata[0].BTCcash,
            ETHclassic: hostdata[0].ETHclassic,
            Usdc: hostdata[0].Usdc,
            Dai: hostdata[0].Dai,
            contactNumber: hostdata[0].contactNumber,
            coolingandheating: hostdata[0].coolingandheating,
            breakfast: hostdata[0].breakfast,
            washeranddryer: hostdata[0].washeranddryer,
            freeparking: hostdata[0].freeparking,
            wifi: hostdata[0].wifi,
            product_description: hostdata[0].product_description,
            zipCode: hostdata[0].zipCode,
            Apt: hostdata[0].Apt,
            streetAddress: hostdata[0].streetAddress,
            numberofGuests: hostdata[0].numberofGuests,
        }
    }
    render() {
        let {
            imageurl1,
            imageurl2,
            imageurl3,
            imageurl4,
            placeSource,
            currency,
            pricepernight,
            product_description,
            wifi,
            freeparking,
            washeranddryer,
            breakfast,
            coolingandheating,
            BTC,
            ETH,
            LTC,
            BTCcash,
            ETHclassic,
            Usdc,
            Dai,
            contactNumber
        } = this.state;
        // const images = [
        //     imageurl1,
        //     imageurl2,
        //     imageurl3,
        //     imageurl4,
        // ] = this.state;
        return (
            <View style={styles.container}>
                <Content style={{ width: '100%' }}>
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        <View style={{ height: 30 }}></View>
                        <View style={{ height: 200 }}>
                            <ImageSlider
                                images={[
                                    imageurl1,
                                    imageurl2,
                                    imageurl3,
                                    imageurl4
                                ]} />
                        </View>
                    </View>
                    <View style={{ height: 15, }}></View>
                    <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'black' }}></View>
                    <View style={{ height: 15, }}></View>
                    <View style={{ width: '90%', alignSelf: 'center', }}>
                        <Text style={{ fontSize: 15, color: 'black', }}>{placeSource}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontSize: 15, color: 'black', }}>{pricepernight}</Text>
                            <Text style={{ fontSize: 15, color: 'black', }}>{currency + ' '}</Text>
                            <Text style={{ fontSize: 15, color: 'black', }}>Per night</Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontSize: 15, color: 'black', }}>Accept crypto currencies: </Text>
                            <Text style={{ fontSize: 15, color: 'black', display: BTC == 1 ? 'flex' : 'none' }}>BTC,</Text>
                            <Text style={{ fontSize: 15, color: 'black', display: LTC == 1 ? 'flex' : 'none' }}>LTC,</Text>
                            <Text style={{ fontSize: 15, color: 'black', display: ETH == 1 ? 'flex' : 'none' }}>ETH,</Text>
                            <Text style={{ fontSize: 15, color: 'black', display: BTCcash == 1 ? 'flex' : 'none' }}>Bitcoin cash,</Text>
                            <Text style={{ fontSize: 15, color: 'black', display: ETHclassic == 1 ? 'flex' : 'none' }}>Ethereum classic,</Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontSize: 15, color: 'black', }}>Accept stable coins: </Text>
                            <Text style={{ fontSize: 15, color: 'black', display: Usdc == 1 ? 'flex' : 'none' }}>Usdc,</Text>
                            <Text style={{ fontSize: 15, color: 'black', display: Dai == 1 ? 'flex' : 'none' }}>Dai,</Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontSize: 15, color: 'black', }}>Amenities: </Text>
                            <Text style={{ fontSize: 15, color: 'black', display: wifi == 1 ? 'flex' : 'none' }}>wifi,</Text>
                            <Text style={{ fontSize: 15, color: 'black', display: freeparking == 1 ? 'flex' : 'none' }}>freeparking,</Text>
                            <Text style={{ fontSize: 15, color: 'black', display: washeranddryer == 1 ? 'flex' : 'none' }}>washeranddryer,</Text>
                            <Text style={{ fontSize: 15, color: 'black', display: breakfast == 1 ? 'flex' : 'none' }}>breakfast,</Text>
                            <Text style={{ fontSize: 15, color: 'black', display: coolingandheating == 1 ? 'flex' : 'none' }}>coolingandheating,</Text>
                        </View>
                        <Text style={{ fontSize: 15, color: 'black', }}>Description</Text>
                        <Text style={{ fontSize: 15, color: 'black', }}>{product_description}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontSize: 15, color: 'black', }}>Contact </Text>
                            <Text style={{ fontSize: 15, color: 'black' }}> = </Text>
                            <Text style={{ fontSize: 15, color: 'black', }}>{contactNumber},</Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontSize: 15, color: 'black', }}>Message </Text>
                            <Text style={{ fontSize: 15, color: 'black' }}> = </Text>
                            <Text style={{ fontSize: 15, color: 'black', }}>Hi,brian,</Text>
                        </View>
                    </View>
                </Content>
                <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'black' }}></View>
                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                    <TouchableOpacity onPress={() =>
                        this.props.navigation.navigate('GuestThirdScreen', {
                            pricepernight:pricepernight,
                            contactNumber:contactNumber,
                            currency:currency
                        })} style={styles.buttonStyle}>
                        <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                        </ActivityIndicator>
                        <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <View style={{ height: 20 }}></View>
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
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
