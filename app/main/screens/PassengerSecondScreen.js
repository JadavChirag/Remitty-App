import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const avatar = require('../../assets/images/ic_avatarman.png');
const sendcurrencies = [{
    value: 'USD'
}, {
    value: 'GBP'
}, {
    value: 'EUR'
}, {
    value: 'CAD'
}];
const fromcurrencies = ['USD', 'GBP', 'EUR', 'CAD'];

export default class PassengerSecondScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendcurrency: 'USD',
            checkedbidarr: [
                {
                    avatar: avatar,
                    accepted: false,
                    price: 12,
                    title: 'My Ride',
                    text: '3815N 15th Ave Phoenix Arizona',
                },
                {
                    avatar: avatar,
                    accepted: true,
                    price: 12,
                    title: 'Ride Status',
                    text: 'Accepted by Brian',
                    username: 'Brian'
                }
            ],
            bidarr: [
                {
                    avatar: avatar,
                    name: 'Terry',
                    bidamount: 17,
                },
                {
                    avatar: avatar,
                    name: 'Vallery',
                    bidamount: 15,
                },
            ]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: LW,
        height: LH,
        paddingTop: MH,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
