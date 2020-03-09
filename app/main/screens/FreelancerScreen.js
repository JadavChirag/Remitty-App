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
    Item,
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
export default class FreelancerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaleAnimationDialog: false,
            data: [
                {
                    title: 'Great App',
                    description: 'I want to make great app based on react native.if you are expert, please help me.',
                    price: 45,
                },
                {
                    title: 'Expert App',
                    description: 'you will work for me want to make great app based on react native.if you are expert, please help me.',
                    price: 155,
                }
            ]
        }
    }
    render() {
        let { data } = this.state;
        return (
            <Container>
                <View style={styles.container}>
                    <View style={{ height: 20 }}></View>
                    <View style={{ width: '80%', padding: 15, borderRadius: 5, borderColor: 'black', borderWidth: 1, paddingVertical: 5, }}>
                        <Dropdown
                            label='Select Category'
                            data={categrylist}
                            dropdownPosition={0}
                            animationDuration={300}
                            containerStyle={{ width: '90%', marginTop: -5 }}
                            onChangeText={(tocurrency, index) => { this.setState({ tocurrency, selectedIndex: index }); this.gettoken('getprice_det'); this.selecttocurrency(); }}
                        />
                    </View>
                    <View>
                        {
                            data.map((item, key) => (
                                <View key={key} style={{
                                    backgroundColor: 'white',
                                    elevation: 10,
                                    marginTop: 15,
                                    alignItems: 'center',
                                    width: '80%',
                                    padding: 10,
                                    borderRadius: 5
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: 250,
                                        alignItems: 'center',
                                    }}>
                                        <Text></Text>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            color: 'green',

                                        }}>{item.title}</Text>
                                        <Text style={{
                                            fontSize: 15,
                                            textDecorationLine: 'underline',
                                            color: 'red',
                                        }}>{"Price:  $" + item.price}</Text>
                                    </View>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 15,
                                        marginTop: 5,
                                    }}>{item.description}</Text>
                                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity style={{
                                            backgroundColor: 'green',
                                            borderRadius: 5,
                                            width: 60,
                                        }}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: 15,
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                paddingVertical: 5,
                                            }}>
                                                Chat
                                            </Text>
                                        </TouchableOpacity>
                                        <View style={{ width: 15 }}></View>
                                        <TouchableOpacity style={{
                                            backgroundColor: 'red',
                                            borderRadius: 5,
                                            width: 60,
                                        }}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: 15,
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                paddingVertical: 5,
                                            }}>
                                                Award
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    <View style={[styles.containerSub, { flexDirection: 'row', marginTop: 40, }]}>

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
        backgroundColor: '#ffffff',

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
