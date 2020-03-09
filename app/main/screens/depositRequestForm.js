import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    AsyncStorage,
} from 'react-native';
import GradiantButton from '../componentItem/gradiantButton'
import InputText from '../componentItem/Offer/InputText'
import {
    Content,
    Container
} from 'native-base';
const operators = [{
    value: 'MTN'
}, {
    value: 'MPS'
}];
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class currencyWithdraw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            operators: operators,
            currency_get: 'GHS',
            currency: 'USD',
            account_bank: 'MTN',
            recipient_get: '0.0',
            sedd: false,
            country: 'Ghana(Ghana mobile money)',
            r_name: 0,
            r_account: 0,
            r_amount: 0,
            r_transid: '',
            r_cmt: '',
            selectedIndex: 0,
            rate: '0.0',
            balance:0,
            mobilemoney_phone:'',
            mobilemoney_carrier:'',
            swift_code:'',
            bank_name:'',
            account_name:'',
            account_number:'',
            bank_details:'Test bank details',
            showme:true,
            user_id:0,
            query: ''
        };

        this.myTextInput = React.createRef();

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
                    this.bank_details(res.token);
                    this.balance(res.token);
                }
                else {
                    alert(JSON.stringify(res));
                }
            }));
        }
        catch (e) {
            alert(e)
        }
    }
    componentDidMount() {
        this.initialize();
    }
    initialize = async () => {
        this.setState({
            user_id:await AsyncStorage.getItem('user_id')
        })
    }
    componentWillMount() {
        setTimeout(()=> { 
            this.setState({
                showme:false
            })
        },3000)
        const url = 'https://api.ravepay.co/v2/banks/NG?public_key=FLWPUBK_TEST-fc1356183ca31a6b449d32d06aadf597-X'
        // try {
        //     fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //     }).then((response) => response.json())
        //         .then((res => {
        //             if (res.status == 'success') {
        //                 // alert(res.data.Banks[0].Code);
        //                 let bank_codes = [];
        //                 let bank_names = [];
        //                 for (let i = 0; i < res.data.Banks.length; i++) {
        //                     bank_codes.push(res.data.Banks[i].Code);
        //                     bank_names.push({ value: res.data.Banks[i].Name });
        //                 }
        //                 this.setState({
        //                     bank_codes: bank_codes,
        //                     bank_names: bank_names
        //                 })
        //             }
        //             else {
        //                 alert(JSON.stringify(res));
        //             }
        //         })
        //         );
        // }
        // catch (e) {
        //     alert(e)
        // }

    }

    submitDepReq = () => {
        if (this.state.r_amount == 0 || this.state.r_transid == '' || this.state.r_cmt == '') {
            alert('input full data');
            return;
        }
        try {
            this.setState({
                showme:true
            })
            fetch(Constant.token_url, {
                method: 'POST',
                body: JSON.stringify({
                    email: Constant.authemail,
                    password: Constant.authpass,
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.submitDepReqrequest(res.token);
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
    bank_details = (token) => {
        try {
            fetch(Constant.req_url+"bank_details", {
                method: 'POST',
                body: JSON.stringify({
                    token:token
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        var message = res.message;
                        this.setState(message);
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
    balance = (token) => {
        try {
            fetch(Constant.req_url+"getparticularbalance", {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    currency:this.state.currency,
                    token:token
                }),
            }).then((response) => response.json())
                .then((res => { 
                    if (res.status) {
                        this.setState({ balance : parseFloat(res.result).toFixed(8) });
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
                        if(name=='balance')
                        {
                            this.balance(res.token);
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
    submitDepReqrequest = (token) => {
        if (this.state.r_amount == 0 || this.state.r_cmt == '' || this.state.r_transid == '') {
            alert('input full data');
            return;
        }
        try {
            fetch(Constant.req_url+"deposit_request", {
                method: 'POST',
                body: JSON.stringify({
                    cmt:this.state.r_cmt,
                    amount: this.state.r_amount,
                    transid:this.state.r_transid,
                    user_id: this.state.user_id,
                    currency: this.state.currency,
                    token:token
                }),
            }).then((response) => response.json())
                .then((res => {
                    this.setState({
                        showme:false
                    })
                    alert(res.message);
                })
            );
        }
        catch (e) {
            alert(e)
        }

    }

    render() {
        const { query } = this.state;

        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        this.state.currency = this.props.navigation.getParam('currency', 'BTC');

        return (
            <View style={styles.container}>
            {
                this.state.showme ? <ActivityIndicator style={{flex:1}} size="large"/> :

                <Content style={{ width: '100%' }}>

                    <Text style={[styles.title, { marginTop: 25 }]}>{this.props.navigation.getParam('currency', 'BTC')} Request </Text>

                    <View style={{
                        textAlign: 'center',alignItems: 'center', borderRadius: 10, backgroundColor: 'white', width: '90%', height: 320,  elevation: 5, shadowOffset: { height: 2 },
                        shadowOpacity: 0.3, marginTop: 15, marginBottom: 20,borderWidth:1,
                        borderColor:'rgba(240,240,240,0.8)',alignSelf: 'center'
                    }}>

                        <Text style={{ fontWeight: "200", fontSize: 18, color: '#1A1F84', marginTop: 5 }}>Available Balance</Text>
                        <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>{this.state.balance+' '+this.props.navigation.getParam('currency', 'BTC')}</Text>

                        <Text style={{ fontWeight: "200", fontSize: 18, color: '#1A1F84', marginTop: 5 }}>Bank details</Text>
                        <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>
                            <Text style={{ alignSelf: 'center', paddingLeft: 20 }}>Bank name : {this.state.bank_name}</Text>
                        </Text>
                        <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>
                            <Text style={{ alignSelf: 'center', paddingLeft: 20 }}>Account name : {this.state.account_name}</Text>
                        </Text>
                        <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>
                            <Text style={{ alignSelf: 'center', paddingLeft: 20 }}>Account number : {this.state.account_number}</Text>
                        </Text>
                        <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>
                            <Text style={{ alignSelf: 'center', paddingLeft: 20 }}>Swift code : {this.state.swift_code}</Text>
                        </Text>

                        <Text style={{ fontWeight: "200", fontSize: 18, color: '#1A1F84', marginTop: 5 }}>Mobile money</Text>
                        <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>
                            <Text style={{ alignSelf: 'center', paddingLeft: 20 }}>Phone : {this.state.mobilemoney_phone}</Text>
                        </Text>
                        <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>
                            <Text style={{ alignSelf: 'center', paddingLeft: 20 }}>Carrier : {this.state.mobilemoney_carrier}</Text>
                        </Text>
                    </View>



                    <InputText
                        style={{ alignSelf: 'center', }}
                        txtplaceholder="Transaction ID"
                        onChangeText={(r_transid) => this.setState({ r_transid })}
                        value={this.state.r_transid}
                    />

                    <InputText
                        style={{ alignSelf: 'center', }}
                        txtplaceholder="Comments"
                        onChangeText={(r_cmt) => this.setState({ r_cmt })}
                        value={this.state.r_cmt}
                    />

                    <InputText
                        style={{ alignSelf: 'center', }}
                        txtplaceholder="Amount"
                        onChangeText={(r_amount) => this.setState({ r_amount })}
                        value={this.state.r_amount}
                    />

                    <GradiantButton
                        style={{ width: 200 }}
                        textIndo="Submit"
                        onPress={() => this.submitDepReq()}
                    />
                </Content>
                }
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        padding: 0,
        borderRadius: 5,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
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
        // marginHorizontal: 3,
        marginTop: 5,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        //marginHorizontal:15,
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
    textcontainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: '80%',
        height: 60,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        paddingLeft: 10,
        elevation: 2,
        justifyContent: 'space-between',
        borderWidth:1,
        borderColor:'rgba(240,240,240,0.8)',
    },
});
