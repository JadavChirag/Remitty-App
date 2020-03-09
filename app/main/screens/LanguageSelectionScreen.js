import React, { Component } from 'react';
import {
    View, Text, ScrollView, Image, StyleSheet, TouchableOpacity
} from 'react-native';
import {
    Content,
    Container
} from 'native-base';
import stringsoflanguages from './stringsoflanguages';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
export default class LanguageSelectionScreen extends Component {
    constructor(props) {
        super(props);
        const lang = [
            { shortform: 'en', longform: 'English' },
            { shortform: 'cn', longform: '中文' },
            { shortform: 'ko', longform: '한국어' },
            // { shortform: 'hi', longform: 'Hindi' },
            // { shortform: 'ma', longform: 'Marathi' },
            // { shortform: 'fr', longform: 'French' },
        ];
        global.lang = lang;
        this.state = {

        }
    }
    settext(value) {
        stringsoflanguages.setLanguage(value);
        this.props.navigation.navigate('Index', { JSON_Clicked_Item: value, });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 60 }}>
                    <Text style={styles.textHeading}>
                        Please Select Preferred Language
                    </Text>
                </View>
                <Image
                    source={{
                        uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/language.png',
                    }}
                    style={styles.img}
                />
                <ScrollView style={{ marginTop: 30, width: '80%' }}>
                    {global.lang.map((item, key) => (
                        <TouchableOpacity
                            onPress={() => this.settext(item.shortform)}
                            style={styles.elementContainer} key={key}>
                            <Text
                                ref={item.shortform}

                                style={styles.text}>
                                {item.longform}
                            </Text>
                            <View style={styles.saparator} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    textHeading: {
        color: '#191919',
        fontSize: 30,
        textAlign: 'center'
    },
    img: {
        width: 64,
        height: 64,
        marginTop: 30
    },
    elementContainer: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
    },
    text: {
        color: '#191919',
        fontSize: 25
    },
    saparator: {
        height: 0.5,
        width: '60%',
        backgroundColor: '#C2C2C2',
        marginTop: 10,
    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});
