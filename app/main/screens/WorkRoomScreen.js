import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
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
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class WorkRoomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaleAnimationDialog: false,
        }
    }
    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('FreelancerScreen')
                        }}
                        style={styles.linearGradient11}
                    >
                        <LinearGradient
                            colors={["#800080", "#800080"]}
                            style={styles.buttonStyle11}
                        >
                            <Text style={styles.buttonText11}>I want to work</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <GradiantButton
                        textIndo="I want to Hire"
                        onPress={() => {
                            this.props.navigation.navigate('EmployeerScreen')
                        }}
                    />
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
                <Header navigation={this.props.navigation}/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle11: {
        alignSelf: 'center',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
    },
    linearGradient11: {
        alignSelf: 'center',
        width: '45%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
    },
    buttonText11: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        width: '100%'
    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        justifyContent:'center',
    },
    title: {
        fontWeight: "600",
        fontSize: 24,
        color: 'black',
        marginTop: 15

    },

});
