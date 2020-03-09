/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TextIconButtonSnd from '../componentItem/Cashin/IconTextbutton'
import GradiantButton from '../componentItem/gradiantButton'
import bankIcon from '../../assets/images/bank.png';
import visaIcon from '../../assets/images/visa.png';
import paypalIcon from '../../assets/images/paypal.png';
import masterIcon from '../../assets/images/mastercard.png';
import expressIcon from '../../assets/images/express.png';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const data = [{
    value: 'Bank1', icon: paypalIcon
}, {
    value: 'Bank2', icon: visaIcon
}, {
    value: 'Bank3', icon: masterIcon
}, {
    value: 'Bank4', icon: masterIcon
}];


type Props = {};
export default class DepositScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.state = {
            paymentmethod: '',
            selectedIndex: 0,
        }

    }
    renderBase = (item, index) => {

        return <View style={{ height: 30, flexDirection: 'row' }}>
            <Text>{item.value}</Text>
            <Text>{item.value}</Text>
        </View>
    }
    onChangeText = (args) => {

        // alert( this.state.selectedIndex)
    }
    extract = (index) => {
        alert(index)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerSub}>
                    <GradiantButton
                        textIndo="Deposit"
                        onPress={() => this.props.navigation.navigate('InputRave')}
                    />
                     <GradiantButton
                        textIndo="WithDrawl"
                        onPress={() => this.props.navigation.navigate('InitialRave')}
                    />
                </View>
                <Header navigation={this.props.navigation}/>
             </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        // justifyContent:'center',

    },
    containerSub: {
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 50
    },
    title: {
        fontWeight: "900",
        fontSize: 28,
        color: 'black',

    },
    txtSub: {
        fontWeight: "300",
        fontSize: 16,
        color: '#1A1F84',

    },
    textcontainer: {
        width: '100%',

        alignItems: 'flex-start',
        backgroundColor: 'white'
    }

});
