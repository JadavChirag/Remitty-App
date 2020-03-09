import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Button,
    AsyncStorage,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import {
    Textarea,
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

import GradiantButton from '../componentItem/gradiantButton'
import LinearGradient from 'react-native-linear-gradient'
import InputText from '../componentItem/Buysell/InputText'
import { Dropdown } from 'react-native-material-dropdown';
import Header from '../componentItem/Header/Header'
import Tabviewer from '../componentItem/Tabviewer/Tabviewer'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;

export default class TradingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaleAnimationDialog: false,
            tabb: 1,
            buyy: true,
            price: 232.3,
            data: [
                {
                    quantity: 226.6,
                    price: 225.7,
                },
                {
                    quantity: 226.6,
                    price: 225.7,
                },
                {
                    quantity: 226.6,
                    price: 225.7,
                },
                {
                    quantity: 226.6,
                    price: 225.7,
                },
                {
                    quantity: 226.6,
                    price: 225.7,
                },
                {
                    quantity: 226.6,
                    price: 225.7,
                },
                {
                    quantity: 226.6,
                    price: 225.7,
                },
                {
                    quantity: 226.6,
                    price: 225.7,
                },
                {
                    quantity: 226.6,
                    price: 225.7,
                },
                {
                    quantity: 226.6,
                    price: 225.7,
                },
            ]
        }
    }
    render() {
        let { data } = this.state;
        return (
            <Container>
                <View style={styles.container}>
                    <Tabviewer state={this.state.tabb}
                        c1={() => this.setState({ tabb: 1 })}
                        c2={() => this.setState({ tabb: 2 })}
                        c3={() => this.setState({ tabb: 3 })} />
                    <View style={{ display: this.state.tabb == 1 ? 'flex' : 'none', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', }}>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <TouchableOpacity>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    padding: 10,
                                    width: "90%",
                                }}>
                                    LIMIT ORDER
                                </Text>
                            </TouchableOpacity>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: "85%",
                            }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ buyy: true })}
                                    style={{
                                        backgroundColor: 'darkblue',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 30,
                                        borderRadius: 5,
                                        borderColor: this.state.buyy ? 'cyan' : "darkblue",
                                        borderWidth: 1,
                                    }} >
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        paddingHorizontal: 15,
                                        color: !this.state.buyy ? 'white' : "cyan",
                                    }}>
                                        BUY
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setState({ buyy: false })}
                                    style={{
                                        backgroundColor: 'darkblue',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 30,
                                        borderRadius: 5,
                                        borderColor: !this.state.buyy ? 'cyan' : "darkblue",
                                        borderWidth: 1,
                                    }} >
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        paddingHorizontal: 15,
                                        color: this.state.buyy ? 'white' : "cyan",
                                    }}>
                                        SELL
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: "85%",
                                backgroundColor: 'darkblue',
                                height: 30,
                                alignItems: 'center',
                                borderRadius: 5,
                                marginTop: 10,
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    paddingLeft: 10,
                                }}>{this.state.price}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => {
                                        let { price } = this.state;
                                        let moreprice = price - 1;
                                        this.setState({
                                            price: moreprice
                                        })
                                    }}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            paddingRight: 10,
                                        }}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        paddingRight: 10,
                                    }}>|</Text>
                                    <TouchableOpacity onPress={() => {
                                        let { price } = this.state;
                                        let moreprice = price + 1;
                                        this.setState({
                                            price: moreprice
                                        })
                                    }}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            paddingRight: 10,
                                        }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: "85%",
                                backgroundColor: 'darkblue',
                                height: 30,
                                alignItems: 'center',
                                borderRadius: 5,
                                marginTop: 10,
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    paddingLeft: 10,
                                }}>QUANTITY</Text>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    paddingRight: 10,
                                }}>
                                    ETH
                                    </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: "85%",
                                height: 30,
                                alignItems: 'center',

                                marginTop: 10,
                            }}>
                                <Text style={{
                                    backgroundColor: 'darkblue',
                                    borderRadius: 5,
                                    padding: 5,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                    25%</Text>
                                <Text style={{
                                    backgroundColor: 'darkblue',
                                    borderRadius: 5,
                                    padding: 5,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>50%</Text>
                                <Text style={{
                                    backgroundColor: 'darkblue',
                                    borderRadius: 5,
                                    padding: 5,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>75%</Text>
                                <Text style={{
                                    backgroundColor: 'darkblue',
                                    borderRadius: 5,
                                    padding: 5,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>100%</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: "85%",
                                marginTop: 15,
                            }}>
                                <Text style={{ color: 'white', }}>Available</Text>
                                <Text style={{ color: 'white', }}>=3.5642363</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: "85%",
                                marginTop: 10,
                            }}>
                                <Text style={{ color: 'white', }}>Vol</Text>
                                <Text style={{ color: 'white', }}>=0USDT</Text>
                            </View>
                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 40,
                                backgroundColor: 'darkcyan',
                                borderRadius: 10,
                                width: '80%',
                                marginTop: 10,
                            }}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{this.state.buyy ? 'BUY' : 'SELL'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: "85%",
                                marginTop: 10,
                            }}>
                                <Text style={{ color: 'white', fontSize: 12, }}>Price(USDT)</Text>
                                <Text style={{ color: 'white', fontSize: 12, }}>Quantity(ETH)</Text>
                            </View>
                            {
                                data.map((item, key) => (
                                    <View key={key} style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: "85%",
                                        marginTop: 10,
                                    }}>
                                        <Text style={{ color: '#f0f', fontSize: 14, }}>{item.price}</Text>
                                        <Text style={{ color: '#f0f', fontSize: 14, }}>{item.quantity}</Text>
                                    </View>
                                ))
                            }
                            <View style={{
                                 alignItems:'center',
                                 width: "85%",
                                 marginTop: 10,
                            }}>
                                <Text style={{ color: '#f0f', fontSize: 20, }}>225.34</Text>
                                <Text style={{ color: '#f0f', fontSize: 12, }}>-5463.322USD</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ display: this.state.tabb == 2 ? 'flex' : 'none' }}>
                        <TouchableOpacity>
                            <Text>
                                You can put content of Tab2
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ display: this.state.tabb == 3 ? 'flex' : 'none' }}>
                        <TouchableOpacity>
                            <Text>
                                Please put content of Tab3
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View >
                <Header navigation={this.props.navigation} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle11: {
        alignSelf: 'center',
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 10,
    },
    linearGradient11: {
        alignSelf: 'center',
        width: '45%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        marginHorizontal: 5,
        marginTop: 10,
    },
    buttonText11: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'

    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
        alignItems: 'center',
        backgroundColor: '#3900ff',

    },
    containerSub: {
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    title: {
        fontWeight: "600",
        fontSize: 24,
        color: 'black',
        marginTop: 15

    },
    txtSub: {
        fontWeight: "600",
        fontSize: 24,
        color: 'black',


    },
    textcontainer: {
        width: '100%',

        alignItems: 'flex-start',
        backgroundColor: 'white'
    },
    teblecontainer: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff', width: '100%' },
    dialogContentView: {
        // flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        // backgroundColor: '#000',
        // opacity: 0.4,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    head: { height: 40, backgroundColor: '#c8e1ff' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#fff' },
    btn: { width: 58, height: 18, backgroundColor: '#c8e1ff', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }

});
