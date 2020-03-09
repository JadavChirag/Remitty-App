import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';
import stringsoflanguages from './stringsoflanguages';

import TextIconButton from '../componentItem/pay/TextIconButton'
import GradiantButton from '../componentItem/balance/button'
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler';

import bitcoinIcon from '../../assets/images/bitcoin.png';
import ethIcon from '../../assets/images/eth.png';
import litecoinIcon from '../../assets/images/litecoin.png';
import remittyIcon from '../../assets/images/R.png';
import rippleIcon from '../../assets/images/ripple.png';
import usdicon from '../../assets/images/usdicon.png';
import euricon from '../../assets/images/euricon.png';
import cadicon from '../../assets/images/cadicon.png';

import atomicon from '../../assets/images/atomicon.png';

import daiicon from '../../assets/images/daiicon.png';
import usdcicon from '../../assets/images/usdcicon.png';
import etcicon from '../../assets/images/etcicon.png';

import linkicon from '../../assets/images/linkicon.png';
import baticon from '../../assets/images/baticon.png';
import repicon from '../../assets/images/repicon.png';
import zrxicon from '../../assets/images/zrxicon.png';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;

type Props = {};
export default class DipositeScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            paylists: [],
        };

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
                        this.paylist(res.token);
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

    paylist = (token) => {
        try {
            fetch(Constant.req_url + "getpayrequests", {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    user_id: this.state.user_id,
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.setState({ paylists: res.result });
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

    componentDidMount() {
        this.initialize();
    }
    initialize = async () => {
        this.setState({
            user_id: await AsyncStorage.getItem('user_id')
        })
    }
    renderButtons() {
        return this.state.paylists.map((item) => {
            var cur = item.method.split("_");
            return (
                <TextIconButton
                    textTitle={item.amount + ' ' + cur[0] + ' request'}
                    textSub={stringsoflanguages.from + ' ' + item.firstname + ' ' + item.lastname}
                    textNumber={stringsoflanguages.Pay + '/' + stringsoflanguages.cancel}
                    onPress={() => this.props.navigation.navigate('payPage', { id: item.id })}
                />
            );
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.container}>
                        <TextIconButton
                            textTitle={stringsoflanguages.Paywithoutrequest}
                            textSub={stringsoflanguages.Toyourcontacts}
                            textNumber={stringsoflanguages.Pay}
                            onPress={() => this.props.navigation.navigate('payCurrency')}
                        />
                        {
                            this.renderButtons()
                        }
                    </View>
                </ScrollView>
                <Header navigation={this.props.navigation} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: LW,
        height: LH,
        paddingTop: MH * 0.6,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingBottom: 30

    },
    containerSub: {
        width: '100%',
        paddingHorizontal: 0,
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginBottom: 5
    },
    title: {
        fontWeight: "600",
        fontSize: 24,
        color: '#8D006D',

    },
    txtSub: {
        fontWeight: "400",
        fontSize: 18,
        color: 'black',

    },

});
