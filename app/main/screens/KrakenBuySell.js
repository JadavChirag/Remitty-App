import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import { processRequest } from "@api/raveApi";
import LinearGradient from 'react-native-linear-gradient'
import {
    Content,
    Container
} from 'native-base';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class KrakenBuySell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account_bank: '044',
            account_number: '0690000044',
            amount: '500',
            narration: 'New transfer',
            currency: 'NGN',
            reference: 'mk-902837-jk',
            beneficiary_name: 'Kwame Adew',
            scaleAnimationDialog: false,
            resultMsg: '',
            showwaiting: 'none',
            type: 'buy',
            showwaiting_price: 'none',
            showwaiting_request: 'none',
            showwaiting_getnewaddress: 'none',
            showwaiting_make_order: 'none',
        };
    }
    getdata() {
        return {
            account_bank: this.state.account_bank,
            account_number: this.state.account_number,
            amount: this.state.amount,
            narration: this.state.narration,
            currency: this.state.currency,
            reference: this.state.reference,
            beneficiary_name: this.state.beneficiary_name,
            seckey: Constant.secretkey,
        }
    }
    async requestRaveApi(k) {
        if (this.state.showwaiting_getnewaddress == 'flex' || this.state.showwaiting == 'flex' || this.state.showwaiting_price == 'flex' || this.state.showwaiting_request == 'flex' || this.state.showwaiting_make_order == 'flex') { return; }
        try {
            fetch(`${Constant.token_url}`, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'fedde198212@gmail.com',
                    password: '123123',
                })
            })
                .then((response) => response.json())
                .then((res => {
                    if (res.status == 1) {
                        this.choose_type(res.token, k);
                    }
                    else {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: JSON.stringify(res),
                            showwaiting: 'none',
                            showwaiting_price: 'none',
                            showwaiting_request: 'none',
                            showwaiting_getnewaddress: 'none',
                            showwaiting_make_order: 'none',
                        })
                    }
                })
                ).done();
        }
        catch (e) {
            alert(e)
        }
        // const result = await processRequest('create/', 'POST', this.getdata())
        // if (result[1].status == 'success') {
        //     this.setState({
        //         scaleAnimationDialog: true,
        //         resultMsg: 'Successfully Initialize!',
        //         // showwaiting: 'none'
        //     })
        // }
        // else {
        //     this.setState({
        //         scaleAnimationDialog: true,
        //         resultMsg: 'Already Exist!',
        //         // showwaiting: 'none'
        //     })
        // }
    }
    choose_type = (val, m) => {
        switch (m) {
            case 1:
                this.buysellfunc(val);
                break;
            case 2:
                this.getpricefunc(val);
                break;
            case 3:
                this.requestWithdraw(val);
                break;
            case 4:
                this.getNewaddress(val);
                break;
            case 5:
                this.makeOrder(val);
                break;
            default:
                break;
        }

    }
    makeOrder = (val) => {
        const url = 'https://remittyllc.com/api/v0/kraken/make_order'
        try {
            fetch(url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    btc_type: 'BTC',
                    money_type: 'USD',
                    order_type: 'buy',
                    money_amount: 5,
                    btc_amount: 1,
                    token: val,
                })
            })
                .then((response) => response.json())
                .then((res => {
                    if (res.status == 1) {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.data,
                            showwaiting_make_order: 'none',
                            token: res.token
                        })
                    }
                    else {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.message,
                            showwaiting_make_order: 'none'
                        })
                    }
                })
                ).done();
        }
        catch (e) {
            alert(e)
        }
    }
    getNewaddress = (val) => {
        const url = 'https://remittyllc.com/getnewaddress'
        try {
            fetch(url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: 16,
                    currency: 'BTC',
                    token: val,
                })
            })
                .then((response) => response.json())
                .then((res => {
                    if (res.status == 1) {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.result,
                            showwaiting_getnewaddress: 'none',
                            token: res.token
                        })
                    }
                    else {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.result,
                            showwaiting_getnewaddress: 'none'
                        })
                    }
                })
                ).done();
        }
        catch (e) {
            alert(e)
        }
    }
    requestWithdraw = (val) => {
        const url = 'https://remittyllc.com/request'
        try {
            fetch(url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: 16,
                    currency: 'ETH',
                    token: val,
                    amount: 0.001,
                    phone_number: 9677880633,
                })
            })
                .then((response) => response.json())
                .then((res => {
                    if (res.status == 1) {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.result,
                            showwaiting_request: 'none',
                            token: res.token
                        })
                    }
                    else {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.result,
                            showwaiting_request: 'none'
                        })
                    }
                })
                ).done();
        }
        catch (e) {
            alert(e)
        }
    }
    buysellfunc = (val) => {
        const url = 'https://remittyllc.com/currency_exchange'
        try {
            fetch(url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: 16,
                    currency: 'BTC',
                    token: val,
                    amount: 0.001,
                    price: 5187.37,
                    type: 'buy',
                })
            })
                .then((response) => response.json())
                .then((res => {
                    if (res.status == 1) {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.message,
                            showwaiting: 'none',
                            token: res.token
                        })
                    }
                    else {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.message,
                            showwaiting: 'none'
                        })
                    }
                })
                ).done();
        }
        catch (e) {
            alert(e)
        }
    }
    getpricefunc = (val) => {
        const url = 'https://remittyllc.com/getprice'
        try {
            fetch(url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: val,
                    pair: 'BTC-USD',
                    type: 'buy',
                })
            })
                .then((response) => response.json())
                .then((res => {
                    if (res.status == 1) {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.result,
                            showwaiting_price: 'none',
                            token: res.token
                        })
                    }
                    else {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.message,
                            showwaiting_price: 'none'
                        })
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
                <Text style={styles.instruction}>
                    Please Input Data to Krakenbuysell
                </Text>
                <TextInput
                    placeholder="Account Bank(ex: 044)"
                    style={styles.valuetext}
                    onChangeText={(account_bank) => this.setState({ account_bank })}
                    value={this.state.account_bank}
                />
                <TextInput
                    placeholder="Account Number(ex: 0690000044)"
                    style={styles.valuetext}
                    onChangeText={(account_number) => this.setState({ account_number })}
                    value={this.state.account_number}
                />
                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => { this.setState({ showwaiting_make_order: 'flex' }); this.requestRaveApi(5) }} style={styles.buttonStyle}>
                        <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting_make_order !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                        </ActivityIndicator>
                        <Text style={[styles.buttonText, { display: this.state.showwaiting_make_order == 'flex' ? 'none' : 'flex' }]}>
                            make order
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => { this.setState({ showwaiting_getnewaddress: 'flex' }); this.requestRaveApi(4) }} style={styles.buttonStyle}>
                        <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting_getnewaddress !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                        </ActivityIndicator>
                        <Text style={[styles.buttonText, { display: this.state.showwaiting_getnewaddress == 'flex' ? 'none' : 'flex' }]}>
                            getNewaddress
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => { this.setState({ showwaiting_request: 'flex' }); this.requestRaveApi(3) }} style={styles.buttonStyle}>
                        <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting_request !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                        </ActivityIndicator>
                        <Text style={[styles.buttonText, { display: this.state.showwaiting_request == 'flex' ? 'none' : 'flex' }]}>
                            requestwithdraw
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => { this.setState({ showwaiting_price: 'flex' }); this.requestRaveApi(2) }} style={styles.buttonStyle}>
                        <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting_price !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                        </ActivityIndicator>
                        <Text style={[styles.buttonText, { display: this.state.showwaiting_price == 'flex' ? 'none' : 'flex' }]}>
                            getprice
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => { this.setState({ showwaiting: 'flex' }); this.requestRaveApi(1) }} style={styles.buttonStyle}>
                        <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                        </ActivityIndicator>
                        <Text style={[styles.buttonText, { display: this.state.showwaiting == 'flex' ? 'none' : 'flex' }]}>
                            buy or sell
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <Dialog
                    onTouchOutside={() => {
                        this.setState({ scaleAnimationDialog: false, showwaiting: 'none' });
                    }}
                    width={0.9}
                    visible={this.state.scaleAnimationDialog}
                    dialogAnimation={new ScaleAnimation()}
                    onHardwareBackPress={() => {
                        console.log('onHardwareBackPress');
                        this.setState({ scaleAnimationDialog: false });
                        return true;
                    }}
                    dialogTitle={
                        <DialogTitle
                            title={this.state.resultMsg}
                            hasTitleBar={false}
                        />
                    }
                    actions={[
                        <DialogButton
                            text="DISMISS"
                            onPress={() => {
                                this.setState({ scaleAnimationDialog: false });
                            }}
                            key="button-1"
                        />,
                    ]}
                >
                </Dialog>
                <Header navigation={this.props.navigation}/>
            </Content>
        );
    }
}
const styles = StyleSheet.create({
    buttonStyle: {
        width: '100%',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 50,
    },
    linearGradient: {
        width: '90%',
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
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 15,
        paddingBottom: 15,
    },
    instruction: {
        padding: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10
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
    valuetext: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 10,
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