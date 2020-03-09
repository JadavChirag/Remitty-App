import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
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
export default class KrakenWithdraw extends Component {
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
                    email: 'fedde198212@gmail.com',
                    password: '123123',
                })
            })
                .then((response) => response.json())
                .then((res => {
                    if (res.status == 1) {
                        this.deposit(res.token);
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
     deposit=(val)=> {
        const url =  'https://remittyllc.com/withdraw_request'
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
                    address: '0x4abab06f69b44496a8353edc1aa45634d7ee1cc8',
                    amount: 1000,
                })
            })
                .then((response) => response.json())
                .then((res => {
                    if (res.status == 1) {
                        this.setState({
                            scaleAnimationDialog: true,
                            resultMsg: 'Successfully create token and deposit!',
                            showwaiting: 'none',
                            token : res.token
                        })
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
    render() {
        return (
            <Content style={styles.container}>

                <View style={{ height: 20 }}>

                </View>
                <Text style={styles.instruction}>
                    Please Input Data to KrakenWithdraw
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
                <TextInput
                    placeholder="Amount(ex: 500)"
                    style={styles.valuetext}
                    onChangeText={(amount) => this.setState({ amount })}
                    value={this.state.amount}
                />
                <TextInput
                    placeholder="Narration(ex: New transfer)"
                    style={styles.valuetext}
                    onChangeText={(narration) => this.setState({ narration })}
                    value={this.state.narration}
                />
                <TextInput
                    placeholder="Currency(ex: NGN)"
                    style={styles.valuetext}
                    onChangeText={(currency) => this.setState({ currency })}
                    value={this.state.currency}
                />
                <TextInput
                    placeholder="Reference(ex: mk-902837-jk)"
                    style={styles.valuetext}
                    onChangeText={(reference) => this.setState({ reference })}
                    value={this.state.reference}
                />
                <TextInput
                    placeholder="Beneficiary Name(ex: Kwame Adew)"
                    style={styles.valuetext}
                    onChangeText={(beneficiary_name) => this.setState({ beneficiary_name })}
                    value={this.state.beneficiary_name}
                />
                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => { this.setState({ showwaiting: 'flex' }); this.requestRaveApi() }} style={styles.buttonStyle}>
                        <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                        </ActivityIndicator>
                        <Text style={[styles.buttonText, { display: this.state.showwaiting == 'flex' ? 'none' : 'flex' }]}>
                            create token and deposit
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