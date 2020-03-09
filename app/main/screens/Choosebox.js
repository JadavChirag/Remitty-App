import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    Content
} from 'native-base';
import Dialog, {
    DialogTitle,
    DialogButton,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class Choosebox extends Component {
    constructor(props) {
        super(props);
        const data = this.props.navigation.getParam('data');
        this.state = {
            data: data,
            total_amount: data.total_amount,
            currency_get: data.currency_get,
            r_name: data.r_name,
            account_number: data.r_account,
            recipient_get: data.recipient_get,
            account_bank: data.account_bank,
        };
    }
    componentDidMount() {
        // alert(JSON.stringify(this.state.data));
    }
    initiate_Transfer = async() => {
        if (this.state.currency_get == 'NGN') {
            try {
                await fetch('https://api.ravepay.co/v2/gpx/transfers/create', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        account_bank: this.state.account_bank,
                        account_number: this.state.account_number,
                        amount: this.state.total_amount,
                        seckey: "FLWSECK_TEST-540e40f66b92934b9764334f6f8cf626-X",
                        narration: "New transfer",
                        currency: this.state.currency_get,
                        reference: 'mk-908307-jk'
                    }),
                }).then((response) => response.json())
                    .then((res => {
                        // alert(JSON.stringify(res));
                        if (res.status == 'success') {
                            alert(res.message)
                            this.setState({
                                showwaiting_bankbtn: false,
                            })
                        }
                        else {
                            alert(JSON.stringify(res));
                        }
                    })
                    ).done();
            }
            catch (e) {
                alert(e)
            }
        }
        else {
            alert('rest');
        }
    }
    card_Transfer = () => {
        alert('card transfer');
    }
    render() {
        return (
            <Content style={styles.container}>
                <View style={{ height: 20 }}>
                </View>
                <View style={styles.topitems}>
                    <Text style={[styles.texttop, { color: '#3244C2', fontWeight: 'bold' }]}>
                        Total amount
                        </Text>
                    <View style={styles.texttop}>
                        <Text style={styles.textunder}>
                            {this.state.total_amount}
                        </Text>
                        <Text style={styles.textunder}>
                            {this.state.currency_get}
                        </Text>
                    </View>
                </View>
                <Text style={styles.instruction}>
                    Pay With
                </Text>
                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => { this.setState({ showwaiting_bankbtn: 'flex' }); this.initiate_Transfer() }} style={styles.buttonStyle}>
                        <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting_bankbtn !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                        </ActivityIndicator>
                        <Text style={[styles.buttonText, { display: this.state.showwaiting_bankbtn == 'flex' ? 'none' : 'flex' }]}>
                            Select Bank Account
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => { this.setState({ showwaiting_cardbtn: 'flex' }); this.card_Transfer() }} style={styles.buttonStyle}>
                        <ActivityIndicator style={[styles.buttonText, { display: this.state.showwaiting_cardbtn !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                        </ActivityIndicator>
                        <Text style={[styles.buttonText, { display: this.state.showwaiting_cardbtn == 'flex' ? 'none' : 'flex' }]}>
                            Card
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <View style={{ height: 20 }}></View>
                <Dialog
                    onTouchOutside={() => {
                        this.setState({ scaleAnimationDialog: false, showwaiting_cardbtn: 'none', showwaiting_bankbtn: false });
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
    topitems: {
        width: '80%',
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