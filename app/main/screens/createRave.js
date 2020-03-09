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
import { processRequest } from "@API/raveApi";
import LinearGradient from 'react-native-linear-gradient'
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
export default class CreateRave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account_bank: '044',
            account_number: '0690000044',
            showwaiting: 'none',
        };
    }
    getdata() {
        return {
            account_number: this.state.account_number,
            account_bank: this.state.account_bank,
            seckey: Constant.secretkey,
        }
    }
    async requestRaveApi() {
        if(this.state.showwaiting=='flex'){ return;}
        const result = await processRequest('beneficiaries/create/', 'POST', this.getdata())
        if (result[1].status == 'success') {
            this.setState({
                scaleAnimationDialog: true,
                resultMsg: 'Successfully Create!',
                // showwaiting: 'none'
            })
        }
        else {
            this.setState({
                scaleAnimationDialog: true,
                resultMsg: 'Already Exist!',
                // showwaiting: 'none'
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 20 }}>
                </View>
                <Text style={styles.instruction}>
                    Please Input Data to Create!
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
                    <TouchableOpacity onPress={() => {this.setState({showwaiting: 'flex'});this.requestRaveApi()}} style={styles.buttonStyle}>
                        <ActivityIndicator style={[styles.buttonText,{display: this.state.showwaiting!=='flex'? 'none':'flex'}]} size="small" color="#ffffff">
                        </ActivityIndicator>
                        <Text style={[styles.buttonText,{display: this.state.showwaiting=='flex'? 'none':'flex'}]}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <Dialog
                    onTouchOutside={() => {
                        this.setState({ scaleAnimationDialog: false ,showwaiting: 'none'});
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
            </View>
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
        height: 50
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
        marginTop: 10,
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10
    },
    text: {
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15,
    },
    btn: {
        marginTop: 20,
        backgroundColor: 'rgb(245, 166, 35)',
        alignSelf: 'center',
        width: '90%',
        borderRadius: 10,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
    },
    valuetext: {
        fontSize: 15,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 15,
        padding: 20,
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