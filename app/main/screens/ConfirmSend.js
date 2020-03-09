import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    Content
} from 'native-base';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const check1 = require('../../assets/images/check1.png');
const uncheck1 = require('../../assets/images/uncheck1.png');
export default class ConfirmSend extends Component {
    constructor(props) {
        super(props);
        const userdata = this.props.navigation.getParam('userdata');
        this.state = {
            userdata: userdata,
            transationId: 3241,//userdata.tracsationId,
            recipient_name: userdata.recipient_name,
            transationFee: 0,
            amount_due: userdata.recipient_get,
            tocurrency: userdata.tocurrency,
            fromcurrency: userdata.fromcurrency,
            rate: userdata.rate,
            create_initial_state: 'none',
            account_bank: userdata.recipient_value==null?userdata.add_account_bank:userdata.recipient_type,
            account_number: userdata.recipient_value==null?userdata.add_account_number:userdata.recipient_value,
        };
    }
    change_radio = (val) => {
        switch (val) {
            case 1:
                this.setState({
                    source1: check1,
                    source2: uncheck1,
                    source3: uncheck1,
                })
                break;
            case 2:
                this.setState({
                    source1: uncheck1,
                    source2: check1,
                    source3: uncheck1,
                })
                break;
            case 3:
                this.setState({
                    source1: uncheck1,
                    source2: uncheck1,
                    source3: check1,
                })
                break;
            default:
                break;
        }
    }
    create_initial = () => {
        try {
            fetch('https://api.ravepay.co/v2/gpx/transfers/beneficiaries/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account_bank: this.state.account_bank,
                    account_number: this.state.account_number,
                    seckey: "FLWSECK_TEST-540e40f66b92934b9764334f6f8cf626-X",
                }),
            }).then((response) => response.json())
                .then((res => {
                    // alert(JSON.stringify(res));
                    if (res.status == 'success') {
                        // alert(res.message)
                        this.initiate_Transfer();
                    }
                    else {
                        alert(JSON.stringify(res));
                        this.setState({
                            create_initial_state: 'none',
                        })
                    }
                })
                ).done();
        }
        catch (e) {
            this.setState({
                create_initial_state: 'none',
            })
            alert(e)
        }
    }
    initiate_Transfer = () => {

        try {
            fetch('https://api.ravepay.co/v2/gpx/transfers/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account_bank: this.state.account_bank,
                    account_number: this.state.account_number,
                    amount: this.state.amount_due,
                    seckey: "FLWSECK_TEST-540e40f66b92934b9764334f6f8cf626-X",
                    narration: "thank you",
                    currency: this.state.tocurrency,
                    reference: 'mk-908307-jk'+new Date(),
                    beneficiary_name: this.state.recipient_name
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status == 'success') {
                        alert(res.status)
                        Alert.alert(
                            'Conguratulations!',
                            res.status,
                            [
                              { text: 'OK', onPress: () => this.props.navigation.navigate('SendScreen') },
                            ],
                            { cancelable: false },
                          );
                        this.setState({
                            create_initial_state: 'none',
                        })
                    }
                    else {
                        this.setState({
                            create_initial_state: 'none',
                        })
                        alert(JSON.stringify(res));
                    }
                })
                ).done();
        }
        catch (e) {
            alert(e)
        }
    }
    render() {
        return (
            <Content style={styles.container}>
                <View style={{ height: 20 }}>
                </View>
                <View style={styles.cardpart}>
                    <View style={styles.itemdialog}>
                        <View>
                            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                                Transaction ID
                            </Text>
                            <Text style={[styles.textdata, { marginLeft: 95 }]}>
                                {this.state.transationId}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.itemdialog}>
                        <View>
                            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                                Recipient Name/Number
                            </Text>
                            <Text style={[styles.textdata, { marginLeft: 80 }]}>
                                {this.state.recipient_name}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.itemdialog}>
                        <View>
                            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                                Transaction fees
                            </Text>
                            <Text style={[styles.textdata, { marginLeft: 100 }]}>
                                {this.state.transationFee}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.itemdialog}>
                        <View>
                            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                                Amount Due
                            </Text>
                            <Text style={[styles.textdata, { marginLeft: 80 }]}>
                                {this.state.amount_due + "" + this.state.tocurrency}
                            </Text>
                        </View>
                    </View>
                    <Text style={{ marginLeft: 0, fontWeight: 'bold', textAlign: 'center', marginTop: 20, width: '100%', color: 'black', padding: 5 }}>
                        {"1" + this.state.fromcurrency + " = " + this.state.rate + this.state.tocurrency}
                    </Text>
                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                        <TouchableOpacity onPress={() => { this.create_initial(); this.setState({ create_initial_state: 'flex' }) }} style={styles.buttonStyle}>
                            <ActivityIndicator style={[styles.buttonText, { display: this.state.create_initial_state !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                            </ActivityIndicator>
                            <Text style={[styles.buttonText, { display: this.state.create_initial_state == 'flex' ? 'none' : 'flex' }]}>
                                Confirm Payment
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <View style={{ height: 20 }}></View>
                <Header navigation={this.props.navigation}/>
            </Content>
        );
    }
}
const styles = StyleSheet.create({
    textdata: {
        color: 'black',
        fontSize: 15,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        width: '100%',
    },
    textunder: {
        color: 'rgb(0, 0, 0)',
        textAlign: 'center',
        fontSize: 15,
        marginRight: 5
    },
    texttop: {
        padding: 10,
        justifyContent: 'center',
        color: 'rgb(0, 0, 0)',
        textAlign: 'center',
        fontSize: 15,
        flexDirection: 'row'
    },
    cardpart: {
        width: '95%',
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
    topitems: {
        width: '95%',
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
        backgroundColor: 'white',
        padding: 10,
        borderColor: 'rgba(240,240,240,0.8)',
        borderWidth: 1,
    },
    buttonStyle: {
        width: '100%',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 50,
    },
    linearGradient: {
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
    linearGradient2: {
        width: '90%',
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
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 15,
        paddingBottom: 15,
    },
    instruction: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 15,
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: 'black'
    },
    btn: {
        marginTop: 20,
        backgroundColor: 'rgb(245, 166, 35)',
        alignSelf: 'center',
        width: '90%',
        borderRadius: 5,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
    },
    currencies: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        padding: 0,
        borderRadius: 5,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
    },
    valuetext: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        padding: 15,
        borderRadius: 5,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
    },
})