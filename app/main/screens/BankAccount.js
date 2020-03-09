import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import Constant from "@common/Constant";
import { processRequest } from "@api/raveApi";
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-material-dropdown';
import {
    Content,
    Container,
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
const currencies = [{
    value: 'NGN'
}, {
    value: 'GHS'
}, {
    value: 'KES'
}, {
    value: 'UGX'
}, {
    value: 'TZS'
}, {
    value: 'USD'
}];
export default class BankAccount extends Component {
    constructor(props) {
        super(props);
        const amount = this.props.navigation.getParam('amount');
        const currency = this.props.navigation.getParam('currency');
        const cca2 = this.props.navigation.getParam('cca2');
        this.state = {
            PBFPubKey: Constant.publickey,
            accountbank: null,
            accountnumber: null,
            currency: null,
            country: null,
            amount: null,
            email: null,
            passcode: null,
            subaccounts: null,
            phonenumber: null,
            firstname: null,
            lastname: null,
            IP: null,
            txRef: null,
            payment_type: null,
            bvn: null,
            device_fingerprint: null,
            redirect_url: null,
            narration: null,
            currency: currency,
            reference: null,
            beneficiary_name: null,
            scaleAnimationDialog: false,
            resultMsg: '',
            showwaiting: 'none',
            showwaiting_price: 'none',
            defaultcurrency: 'USD',
        };
    }
    getdata2() {
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
    getdata1() {
        return {
            account_number: this.state.account_number,
            account_bank: this.state.account_bank,
            seckey: Constant.secretkey,
        }
    }
    async requestRaveApi(k) {
        if (this.state.showwaiting == 'flex' || this.state.showwaiting_price == 'flex') { return; }
        if (k == 1) {
            const result1 = await processRequest('beneficiaries/create/', 'POST', this.getdata1())
            if (result1[1].status == 'success') {
                this.setState({
                    scaleAnimationDialog: true,
                    resultMsg: 'Successfully Create!',
                    showwaiting_price: 'none'
                })
            }
            else {
                this.setState({
                    scaleAnimationDialog: true,
                    resultMsg: 'Error: Try again',
                    showwaiting_price: 'none'
                })
            }
        }
        else {
            const result2 = await processRequest('create/', 'POST', this.getdata2())
            if (result2[1].status == 'success') {
                this.setState({
                    scaleAnimationDialog: true,
                    resultMsg: 'Successfully Initialize!',
                    showwaiting: 'none'
                })
            }
            else {
                this.setState({
                    scaleAnimationDialog: true,
                    resultMsg: 'Already Exist!',
                    showwaiting: 'none'
                })
            }
        }

    }
    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.container}>
                    <View style={{ height: 20 }}>
                    </View>
                    <Text style={styles.instruction}>
                        Receiver Bank Information
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
                        <TouchableOpacity onPress={() => { this.setState({ showwaiting_price: 'flex' }); this.requestRaveApi(1) }} style={styles.buttonStyle}>
                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting_price !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                            </ActivityIndicator>
                            <Text style={[styles.buttonText, { display: this.state.showwaiting_price == 'flex' ? 'none' : 'flex' }]}>
                                Create transfer
                        </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={styles.currencies}>
                        <Dropdown
                            style={{ width: '100%', height: 30 }}
                            label='Select Country'
                            data={currencies}
                            dropdownPosition={0}
                            animationDuration={500}
                            containerStyle={{ width: '90%', alignSelf: 'center', }}
                            onChangeText={(defaultcurrency) => this.setState({ defaultcurrency })}
                            value={this.state.defaultcurrency}
                            selectedIndex={this.state.selectedIndex}
                        />
                    </View>
                    <TextInput
                        placeholder="Narration(ex: New transfer)"
                        style={styles.valuetext}
                        onChangeText={(narration) => this.setState({ narration })}
                        value={this.state.narration}
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
                        <TouchableOpacity onPress={() => { this.setState({ showwaiting: 'flex' }); this.requestRaveApi(2) }} style={styles.buttonStyle}>
                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                            </ActivityIndicator>
                            <Text style={[styles.buttonText, { display: this.state.showwaiting == 'flex' ? 'none' : 'flex' }]}>
                                Initialize transfer
                        </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={{ height: 20 }}></View>
                    <Dialog
                        onTouchOutside={() => {
                            this.setState({ scaleAnimationDialog: false, showwaiting: 'none', showwaiting_price: false });
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
                </Content>
                <Header navigation={this.props.navigation}/>
            </Container>
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
        marginTop: 20,
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