import React, { Component } from 'react';
import {
    View, Text, ScrollView, Image, StyleSheet
} from 'react-native';
import {
    Content,
} from 'native-base';
import stringsoflanguages from './stringsoflanguages';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class ContentScreen extends Component {
    constructor(props) {
        super(props);
        const lang = [
            { shortform: 'hi', longform: 'Hindi' },
            { shortform: 'ma', longform: 'Marathi' },
            { shortform: 'en', longform: 'English' },
            { shortform: 'fr', longform: 'French' },
        ];
        global.lang = lang;
        this.state = {

        }
    }
    componentDidMount() {
        var that = this;
        var heading = '';
        if (this.props.navigation.state.params.JSON_Clicked_Item == 'hi') {
            heading = 'Selected Language Hindi';
        } else if (
            this.props.navigation.state.params.JSON_Clicked_Item == 'ma'
        ) {
            heading = 'Selected Language Marathi';
        } else if (
            this.props.navigation.state.params.JSON_Clicked_Item == 'en'
        ) {
            heading = 'Selected Language English';
        } else if (
            this.props.navigation.state.params.JSON_Clicked_Item == 'fr'
        ) {
            heading = 'Selected Language French';
        }
        that.props.navigation.setParams({
            Title: heading,
        });
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.text}> {stringsoflanguages.first}</Text>
                <Text style={styles.text}> {stringsoflanguages.second} </Text>
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        width: LW,
        height: LH,
        paddingTop: MH,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    text: {
        color: '#191919',
        fontSize: 25,
        marginTop: 15
    },
});
