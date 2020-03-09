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

import GradiantButton from '../componentItem/gradiantButton'
import LinearGradient from 'react-native-linear-gradient'
import InputText from '../componentItem/Buysell/InputText'
import { Dropdown } from 'react-native-material-dropdown';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const convertcurrencies_all = [
    {
        value: 'USD'
    }, {
        value: 'EUR'
    }, {
        value: 'GBP'
    }, {
        value: 'CAD'
    }, {
        value: 'AUD'
    },
    {
        value: 'CNY'
    }, {
        value: 'MXN'
    }, {
        value: 'PHP'
    }, {
        value: 'HKD'
    }, {
        value: 'NZD'
    },
    {
        value: 'CHF'
    }, {
        value: 'HUF'
    }, {
        value: 'SEK'
    }, {
        value: 'THB'
    }, {
        value: 'ILS'
    },
    {
        value: 'NOK'
    }, {
        value: 'SGD'
    }, {
        value: 'PLN'
    }
];
const categrylist = [
    {
        value: 'Website,mobile, IT & software '
    }, {
        value: 'Graphics & Design'
    }, {
        value: 'Digital Marketing & Sells'
    }, {
        value: 'Writing & Translation'
    }, {
        value: 'Video & Animation'
    },
    {
        value: 'Music & Audio'
    }, {
        value: 'Architecture'
    }, {
        value: 'Programming & Tech'
    }, {
        value: 'Business, legal & Accounting'
    }, {
        value: 'Data Entry & Admin'
    },
    {
        value: 'Science & Engineering'
    }, {
        value: 'Others'
    }
];
export default class EmployeerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaleAnimationDialog: false,
            tocurrency: 'USD',
        }
    }
    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={{ height: 20, }}></View>
                    <View style={{ width: '80%', padding: 15, borderRadius: 5, borderColor: 'black', borderWidth: 1, paddingVertical: 5, }}>
                        <Dropdown
                            label='Select Category'
                            data={categrylist}
                            dropdownPosition={0}
                            animationDuration={300}
                            containerStyle={{ width: '90%', marginTop: -5 }}
                            // onChangeText={(tocurrency, index) => { this.setState({ tocurrency, selectedIndex: index }); this.gettoken('getprice_det'); this.selecttocurrency(); }}
                        />
                    </View>
                    <View style={{ height: 15, }}></View>
                    <TextInput
                        placeholder="Job Title"
                        style={{ fontSize: 20, borderColor: 'black', borderWidth: 1, paddingVertical: 5, width: '80%', paddingHorizontal: 10, borderRadius: 5 }}
                    >

                    </TextInput>
                    <Textarea style={{ borderWidth: 1, paddingVertical: 5, width: '80%', paddingHorizontal: 10, marginTop: 20, fontSize: 15, borderRadius: 5 }} rowSpan={10} placeholderTextColor={'gray'} placeholder="Job Description" />
                    <View style={{ width: '80%', marginTop: 20, flexDirection: 'row', alignItems: 'center', }}>
                        <TextInput
                            placeholder="Price"
                            style={{ fontSize: 15, borderColor: 'black', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10, width: '50%', borderRadius: 5 }}
                        >
                        </TextInput>
                        <View style={{ width: '50%', padding: 5, marginLeft: 10, marginTop: -10 }}>
                            <Dropdown
                                label='Select Currency'
                                data={convertcurrencies_all}
                                dropdownPosition={0}
                                animationDuration={300}
                                containerStyle={{ width: '90%', marginTop: -5 }}
                                onChangeText={(tocurrency, index) => { this.setState({ tocurrency, selectedIndex: index }); this.gettoken('getprice_det'); this.selecttocurrency(); }}
                                value={this.state.tocurrency}
                            />
                        </View>
                    </View>
                    <GradiantButton
                        textIndo="Publish"
                        onPress={() => {

                        }}
                    />
                    <View style={{height:30,}}></View>
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
                <Header navigation={this.props.navigation}/>
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
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    },

});
