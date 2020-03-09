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
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import GradiantButton from '../componentItem/gradiantButton';
import InputText from '../componentItem/Buysell/InputText';
import { Dropdown } from 'react-native-material-dropdown';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Header from '../componentItem/Header/Header';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import Constant from "@common/Constant";
export default class BuySell extends Component {
    state = {
        defaultAnimationDialog: false,
        BuySellType: '',
        currency: 'BTC',
        fiatcurrency: 'USD',
        cryptobal: 0,
        fiatbal: 0,
        user_id: 0,
        price: 0,
        amount: null,
        pairdetails: [],
        tableHead: ['Date', 'Currency', 'Amount', 'Status'],
        tableData: [
            ['No records found at the moment'],
        ],
        scaleAnimationDialog: false,

    };
    componentDidMount() {
        this.initialize();
        this.load();
        this.props.navigation.addListener('willFocus', this.load)
    }
    initialize = async () => {

        this.setState({
            user_id: await AsyncStorage.getItem('user_id')
        });

    }

    load = () => {
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
                        this.balance(res.token);
                        this.pairs(res.token);
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
        if (name == 'orderplace') {
            let {
                amount,
                price
            } = this.state;
            if (amount == null || price == 0) { alert('please fill all input!'); return }
        }
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
                        if (name == "balance") {
                            this.balance(res.token);
                        }
                        else if (name == "getprice") {
                            this.getprice(res.token);
                        }
                        else if (name == "orderplace") {
                            this.orderplace(res.token);
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
    balance = (token) => {
        // alert(this.state.currency);
        try {
            fetch(Constant.req_url + "getbalance", {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    token: token
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        var index = res.result.findIndex(x => x.currency === this.state.currency);
                        var index1 = res.result.findIndex(x => x.currency === this.state.fiatcurrency);
                        this.setState({ cryptobal: parseFloat(res.result[index].balance).toFixed(8) });
                        this.setState({ fiatbal: parseFloat(res.result[index1].balance).toFixed(8) });
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

    pairs = (token) => {
        // alert(this.state.currency);
        try {
            fetch(Constant.req_url + "getpairs", {
                method: 'POST',
                body: JSON.stringify({
                    token: token
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.setState({ pairdetails: res.result });
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

    getprice = (token) => {
        try {
            fetch(Constant.req_url + "getprice", {
                method: 'POST',
                body: JSON.stringify({
                    pair: this.state.pair,
                    type: this.state.BuySellType.toLowerCase(),
                    token: token
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.setState({ price: parseFloat(res.result).toFixed(8) });
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

    orderplace = (token) => {
        try {
            fetch(Constant.req_url + "currency_exchange", {
                method: 'POST',
                body: JSON.stringify({
                    pair: this.state.pair,
                    amount: this.state.amount,
                    price: this.state.price,
                    type: this.state.BuySellType.toLowerCase(),
                    user_id: this.state.user_id,
                    token: token
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        alert(res.message);
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

    setpair = (index) => {
        var fcurrency = this.state.pairdetails[index].first_currency;
        var scurrency = this.state.pairdetails[index].second_currency;
        this.setState({
            currency: fcurrency,
            fiatcurrency: scurrency,
        });
        this.gettoken('balance');
    }

    render() {
        const state = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Buy/sell</Text>
                    <View style={{
                        textAlign: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', width: '90%', height: 110, elevation: 5, shadowOffset: { height: 2 },
                        shadowOpacity: 0.3, marginTop: 15, marginBottom: 20, borderWidth: 1,
                        borderColor: 'rgba(240,240,240,0.8)', alignSelf: 'center'
                    }}>
                        <Text style={{ fontWeight: "200", fontSize: 18, color: '#1A1F84', marginTop: 5 }}>Available Balance</Text>
                        <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>{this.state.currency + " " + this.state.cryptobal}</Text>
                        <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>{this.state.fiatcurrency + " " + this.state.fiatbal}</Text>
                    </View>

                    <Dropdown
                        label={this.state.pair == null ? 'Select pair' : this.state.pair}
                        data={this.state.pairdetails}
                        dropdownPosition={0}
                        animationDuration={300}
                        containerStyle={{ width: '80%', alignSelf: 'center', marginTop: -5 }}
                        onChangeText={(pair, index) => { this.setState({ pair, selectedIndex: index }); this.setpair(index); }}
                        value={this.state.pair}
                    // selectedIndex={this.state.selectedIndex}
                    />

                    <View style={[styles.containerSub, { flexDirection: 'row', marginTop: 40, }]}>

                        {/* <GradiantButton
                            textIndo="Buy"
                            onPress={() => {
                                this.setState({
                                    BuySellType: 'Buy',
                                    scaleAnimationDialog: true,
                                });
                                this.gettoken('getprice');
                            }}
                        /> */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#800080',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 40,
                                width: 140,
                                borderRadius: 5,
                                marginTop: 30,
                                marginLeft: 20,
                            }}
                            onPress={() => {
                                this.setState({
                                    BuySellType: 'Buy',
                                    scaleAnimationDialog: true,
                                });
                                this.gettoken('getprice');
                            }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>Buy</Text>
                        </TouchableOpacity>
                        <GradiantButton
                            textIndo="Sell"
                            onPress={() => {
                                this.setState({
                                    BuySellType: 'Sell',
                                    scaleAnimationDialog: true,
                                });
                            }}
                        />
                    </View>
                    <Dialog
                        onTouchOutside={() => {
                            this.setState({ scaleAnimationDialog: false });
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
                                title={this.state.BuySellType}
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
                        <DialogContent>
                            <InputText
                                txtplaceholder="Enter Amount" onChangeText={(text) =>
                                    this.setState({ amount: text })} />
                            <Text>{this.state.BuySellType + " Price : " + this.state.price}</Text>

                            <Button
                                title={this.state.BuySellType}
                                onPress={() => {
                                    this.setState({ defaultAnimationDialog: true }); this.gettoken('orderplace');
                                }}
                            />

                        </DialogContent>
                        <TouchableHighlight
                            onPress={() => { this.setState({ scaleAnimationDialog: false }); }} style={{ alignItems: 'center', marginTop: 2, marginBottom: 10 }}>
                            <Text>Close</Text>
                        </TouchableHighlight>
                    </Dialog>
                    <Text style={[styles.title, { marginTop: 50, marginBottom: 30, backgroundColor: '#fff' }]}>Exchange history</Text>
                    <View style={styles.teblecontainer}>
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                            {
                                state.tableData.map((rowData, index) => (
                                    <TableWrapper key={index} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            }
                        </Table>
                    </View>


                </View >
                <Header navigation={this.props.navigation} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: LW,
        height: LH,
        paddingTop: MH,

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
