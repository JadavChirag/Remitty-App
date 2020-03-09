import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import {
    Content,
    Container
} from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const countries = [{
    value: 'NG'
}, {
    value: 'GH'
}, {
    value: 'KE'
}, {
    value: 'ZA'
}];
const currencies_NG = [{
    value: 'NGN'
}, {
    value: 'USD'
}, {
    value: 'EUR'
}, {
    value: 'GBP'
},
{
    value: 'UGX'
}, {
    value: 'TZS'
}];
const currencies_GH = [{
    value: 'GHS'
}, {
    value: 'USD'
}];
const currencies_KE = [{
    value: 'KES'
}];
const currencies_ZA = [{
    value: 'ZAR'
}];
export default class InputRave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            selectedIndex: 0,
            defaultcountry: 'NG',
            defaultcurrency: 'NGN',
            currencies: currencies_NG
        };
    }
    componentWillReceiveProps(){
        if(this.props.date!==null){
            this.setState({
                amount: null
            })
        }
        else{
            return;
        }
    }
    changecountry(val) {
        switch (val) {
            case 'NG':
                this.setState({
                    defaultcountry: val,
                    currencies: currencies_NG,
                    defaultcurrency: 'NGN',
                })
                break;
            case 'GH':
                this.setState({
                    defaultcountry: val,
                    currencies: currencies_GH,
                    defaultcurrency: 'GHS',
                })
                break;
            case 'KE':
                this.setState({
                    defaultcountry: val,
                    currencies: currencies_KE,
                    defaultcurrency: 'KES',
                })
                break;
            case 'ZA':
                this.setState({
                    defaultcountry: val,
                    currencies: currencies_ZA,
                    defaultcurrency: 'ZAR',
                })
                break;
            default:
                break;
        }
    }
    inputClick(){
        if((parseFloat(this.state.amount)<5)||(this.state.amount==null)||(/^\d+$/.test(this.state.amount))==false){alert('Please Input Correct Amount'); return}
        this.props.navigation.navigate('Bar', { amount: this.state.amount, country: this.state.defaultcountry, currency: this.state.defaultcurrency })
    }
    render() {
        return (
            <Content style={styles.container}>
                <View style={{ height: 20 }}>
                </View>
                <Text style={styles.instruction}>
                    Please Input Data to Initialize!
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: 20 }}>
                    <View style={styles.country}>
                        <Dropdown
                            style={{ width: '100%', height: 30 }}
                            label='Select Country'
                            data={countries}
                            dropdownPosition={0}
                            animationDuration={500}
                            containerStyle={{ width: 150 }}
                            onChangeText={(defaultcountry) => this.changecountry(defaultcountry)}
                            value={this.state.defaultcountry}
                            selectedIndex={this.state.selectedIndex}
                        />
                    </View>
                    <View style={styles.country}>
                        <Dropdown
                            style={{ width: '100%', height: 30 }}
                            label='Select Currency'
                            data={this.state.currencies}
                            dropdownPosition={0}
                            animationDuration={500}
                            containerStyle={{ width: 150 }}
                            onChangeText={(defaultcurrency) => this.setState({defaultcurrency})}
                            value={this.state.defaultcurrency}
                            selectedIndex={this.state.selectedIndex}

                        />
                    </View>
                </View>
                <TextInput
                    keyboardType='number-pad'
                    placeholder="Amount(ex: min $5)"
                    style={styles.valuetext}
                    onChangeText={(amount) => this.setState({ amount })}
                    value={this.state.amount}
                />
                <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => this.inputClick()} style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>
                            Input
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <Header navigation={this.props.navigation}/>
            </Content>
        );
    }
}
const styles = StyleSheet.create({
    country: {
        width: '45%',
        paddingHorizontal: 8,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
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
        marginTop: 15,
        padding: 20,
        borderRadius: 5,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
        fontSize: 15,
    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
    },
})