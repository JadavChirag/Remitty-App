import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator,
    Image,
    StatusBar,
    AsyncStorage
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
    Content
} from 'native-base';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import TextInputMask from 'react-native-text-input-mask';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;


const check1 = require('../../assets/images/check1.png');
const uncheck1 = require('../../assets/images/uncheck1.png');
export default class ForgetPassword extends Component {
    static navigationOptions = {
        header: null,
        title: null
    }
    constructor(props) {
        super(props);
        const data = this.props.navigation.getParam('data');
        this.state = {
            emailphonenumber: null,
            password: null,
            showme: false
        };
    }
    forget = async () => {
        let {
            emailphonenumber,
            password
        } = this.state;

        if (emailphonenumber == null) { alert('please fill all input!'); return }

        let token = this.gettoken();

    }
    gettoken = () => {
        try {
            this.setState({
                showme: true
            })
            fetch(Constant.token_url, {
                method: 'POST',
                body: JSON.stringify({
                    email: 'dev5@britisheducationonline.org',
                    password: 'bux@2018',
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.forgetcall(res.token);
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                )
        }
        catch (e) {
            alert(e)
        }
    }
    forgetcall = (token) => {
        var post_val = JSON.stringify({
            token: token,
            email: this.state.emailphonenumber,
        });

        try {
            this.setState({
                showme: true
            });
            fetch(Constant.req_url + "forget_password", {
                method: 'POST',
                body: post_val,
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        alert(res.message);
                        this.props.navigation.navigate('Login');
                    }
                    else if (res.message) {
                        alert(res.message);
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                )
        }
        catch (e) {
            alert(e)
        }
    }
    render() {
        return (
            <Content style={styles.container}>
                <StatusBar backgroundColor={'rgba(0,0,0,0)'} hidden={true} />
                <View style={{ height: 80 }}>
                </View>
                <Text style={styles.instruction}>
                    Reset Password
                </Text>
                <View style={{ height: 50 }}></View>
                <View style={styles.cardpart}>
                    <View style={[styles.itemdialog3, {
                        borderWidth: 1,
                        borderRadius: 5,
                    }]}>
                        <TextInput
                            refInput={ref => { this.input = ref }}
                            onChangeText={(emailphonenumber) =>
                                this.setState({ emailphonenumber })}
                            style={{ fontSize: 15 }}
                            placeholder="Email Address"
                        >
                        </TextInput>
                    </View>
                    <View style={{ height: 70 }}></View>
                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                        <TouchableOpacity onPress={() => this.forget()} style={styles.buttonStyle}>
                            {
                                this.state.showme ? <ActivityIndicator style={{ flex: 1 }} color="#FFFFFF" size="large" /> :
                                    <Text style={[styles.buttonText, { display: this.state.showwaiting_cardbtnsend == 'flex' ? 'none' : 'flex', fontSize: 15 }]}>
                                        Send
                            </Text>
                            }
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={{ height: 30 }}></View>
                    <View style={styles.itemdialog2}>
                        <Text style={{ color: 'black', fontSize: 15 }}>Go back Login? </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 15 }}>  Log in </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    cardpart: {
        width: '85%',
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 10,
    },
    itemdialog: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 0,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    itemdialog1: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 5,
        justifyContent: 'flex-end',
        marginTop: 0,
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 10
    },
    itemdialog3: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 0,
        alignSelf: 'center',
        backgroundColor: '#fff',
    },
    itemdialog2: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 0,
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 10
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
        width: '50%',
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
        fontSize: 30,
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
        backgroundColor: '#fff'
    },
})