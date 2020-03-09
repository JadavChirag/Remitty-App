import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import LinearGradient from 'react-native-linear-gradient';
import {
    Content
} from 'native-base';
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class BuycurrencyScreen extends Component {
    constructor(props) {
        super(props);
        const cointype = this.props.navigation.getParam('cointype');
        const balance = this.props.navigation.getParam('balance');
        this.state = {
            balance: balance,
            resultMsg: '',
            showwaiting: 'none',
            email: "fedde198212@gmail.com",
            password: "123123",
            user_id: 16,
            cointype: cointype,
            token: "",
            price: "",
            amount: null,
            selectedIndex: 0,
            buysellstyle: 'buy',
            real_balance: balance,
            cca2: 'US',
            currency: 'USD'
        };
    };
    async requestRaveApi() {
        if (this.state.showwaiting == 'flex') { return; }
        try {
            fetch(`${Constant.token_url}`, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                })
            })
                .then((response) => response.json())
                .then((res => {
                    if (res.status == 1) {
                        this.getprice(res.token);
                    }
                    else {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.status,
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
    getprice = (token) => {
        url = 'https://remittyllc.com/getprice';
        try {
            fetch(url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pair: this.state.cointype + "-" + this.state.currency,
                    type: this.state.buysellstyle,
                    token: token
                })
            })
                .then((response) => response.json())
                .then((res => {
                    if (res.status == 1) {
                        // alert(JSON.stringify(res))
                        this.buycurrency(token, res.result);
                    }
                    else {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.status,
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
    buycurrency = (token, price) => {
        url = 'https://remittyllc.com/currency_exchange';
        try {
            fetch(url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    currency: this.state.cointype,
                    token: token,
                    amount: this.state.amount,
                    price: price,
                    type: this.state.buysellstyle
                })
            })
                .then((response) => response.json())
                .then((res => {
                    if (res.status == 1) {
                        var real_balance = parseFloat(this.state.balance) - parseFloat(this.state.amount);
                        var real_money = parseFloat(price) * parseFloat(this.state.amount);
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.message,
                            showwaiting: 'none',
                            price: price,
                            real_balance: real_balance
                        })
                        // setTimeout(() => { this.gobackSend(real_balance, real_money) }, 2000);
                    }
                    else {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: res.result,
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
    gobackSend = (bal, mon) => {
        this.setState({
            scaleAnimationDialog: false
        })
        switch (this.state.cointype) {
            case 'BTC':
                this.props.navigation.navigate('Send', { sort: 1, real_bal: bal, real_money: mon, date: new Date() });
                break;
            case 'ETH':
                this.props.navigation.navigate('Send', { sort: 2, real_bal: bal, real_money: mon, date: new Date() });
                break;
            case 'LTC':
                this.props.navigation.navigate('Send', { sort: 3, real_bal: bal, real_money: mon, date: new Date() });
                break;
            default:
                break;
        }

    }
    render() {
        return (
            <Content style={styles.container}>
                <View style={{ height: 20 }}>
                </View>
                <Text style={styles.cointype}>
                    {this.state.cointype}
                </Text>
                <View style={styles.topitems}>
                    <Text style={styles.texttop}>
                        Present Balance
                    </Text>
                    <Text style={styles.textunder}>
                        {this.state.real_balance + " " + this.state.cointype}
                    </Text>
                </View>
                <View style={{ height: 20 }}>
                </View>
                <View style={styles.currencypicker}>
                    <CountryPicker
                        onChange={(value) => this.setState({ country: value, currency: value.currency, cca2: value.cca2 })}
                        cca2={this.state.cca2}
                        translation='eng'
                    />
                    <Text style={{ marginLeft: 15, marginTop: 5 }}>
                        {/* hkhkhukh */}
                        {this.state.currency}
                        {/* {this.state.cca2} */}
                    </Text>
                </View>
                <View style={{ height: 20 }}>
                </View>
                <TextInput
                    keyboardType='number-pad'
                    placeholder="Amount(ex: 0.001)"
                    style={styles.valuetext}
                    onChangeText={(amount) => this.setState({ amount })}
                    value={this.state.amount}
                />
                <View style={{ height: 20 }}>
                </View>
                <View style={styles.topitems}>
                    <Text style={styles.texttop}>
                        Price
                    </Text>
                    <Text style={styles.textunder}>
                        {this.state.price}
                    </Text>
                </View>
                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => { this.setState({ showwaiting: 'flex' }); this.requestRaveApi(2) }} style={styles.buttonStyle}>
                        <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                        </ActivityIndicator>
                        <Text style={[styles.buttonText, { display: this.state.showwaiting == 'flex' ? 'none' : 'flex' }]}>
                            BuyCurrency
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <Dialog
                    onTouchOutside={() => {
                        this.setState({ scaleAnimationDialog: false, showwaiting: 'none', });
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
    texttop: {
        color: 'rgb(50, 69, 194)',
        textAlign: 'center',
        fontSize: 15
    },
    textunder: {
        marginTop: 5,
        color: 'rgb(0, 0, 0)',
        textAlign: 'center',
        fontSize: 20,
    },
    cointype: {
        marginLeft: 20,
        color: 'rgb(0, 0, 0)',
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
    },
    currencypicker: {
        flexDirection: 'row',
        width: '90%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        justifyContent: 'flex-start',
        marginHorizontal: 3,
        marginTop: 5,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
        backgroundColor: 'white',
        padding: 10
    },
    topitems: {
        width: '90%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        justifyContent: 'center',
        marginHorizontal: 3,
        marginTop: 5,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
        backgroundColor: 'white',
        padding: 10
    },
    country: {
        width: '45%',
        paddingHorizontal: 8,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
        height: 70,
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
        width: '90%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        justifyContent: 'center',
        marginHorizontal: 3,
        marginTop: 40,
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
        padding: 15,
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
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
    },
    valuetext: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 5,
        padding: 20,
        borderRadius: 5,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
        fontSize: 15,
    },
})