import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Alert
} from 'react-native';
import {
    Content,
    Icon,
    Textarea,
    CheckBox,
    Container
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import initial from '../../assets/images/ic_initial.png';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class HostSecondScreen extends Component {
    constructor(props) {
        super(props);
        const primaryData = this.props.navigation.getParam('primaryData');
        this.state = {
            primaryData: primaryData,
            avatarSource1: null,
            avatarSource2: null,
            avatarSource3: null,
            avatarSource4: null,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            imageurl1: 'https://remittyllc.com/public/images/993439527.png',
            imageurl2: 'https://remittyllc.com/public/images/993439527.png',
            imageurl3: 'https://remittyllc.com/public/images/993439527.png',
            imageurl4: 'https://remittyllc.com/public/images/993439527.png',
            product_description:'',
        }
    }
    componentDidMount() {
        this.initialize()
    }
    initialize = async () => {
        this.setState({
            firstname: await AsyncStorage.getItem('username'),
            lastname: await AsyncStorage.getItem('lastname'),
            email: await AsyncStorage.getItem('email'),
            phonenum: await AsyncStorage.getItem('phonenum'),
        });
    }
    getImage = (val) => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                switch (val) {
                    case 1:
                        this.setState({
                            avatarSource1: source,
                        });
                        this.uploadImage(source, val)
                        break;
                    case 2:
                        this.setState({
                            avatarSource2: source,
                        });
                        this.uploadImage(source, val)
                        break;
                    case 3:
                        this.setState({
                            avatarSource3: source,
                        });
                        this.uploadImage(source, val)
                        break;
                    case 4:
                        this.setState({
                            avatarSource4: source,
                        });
                        this.uploadImage(source, val)
                        break;
                    default:
                        break;
                }

            }
        });
    }
    uploadImage = async (source, val) => {
        let localUri1 = source.uri;
        let filename1 = localUri1.split('/').pop();
        let formData = new FormData();
        // formData.append("user_id", user_id);
        formData.append('select_file', { uri: localUri1, name: filename1, type: `image/jpg` });
        try {
            await fetch('https://remittyllc.com/image_upload_url', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: formData,
            }).then((response) => response.json())
                .then((res => {
                    switch (val) {
                        case 1:
                            this.setState({
                                imageurl1: res.uploaded_image
                            })
                            break;
                        case 2:
                            this.setState({
                                imageurl2: res.uploaded_image
                            })
                            break;
                        case 3:
                            this.setState({
                                imageurl3: res.uploaded_image
                            })
                            break;
                        case 4:
                            this.setState({
                                imageurl4: res.uploaded_image
                            })
                            break;
                        default:
                            break;
                    }

                })
                ).done();
        }
        catch (e) {
        }
    }
    gotoNext = () => {
        let {
            imageurl1,
            imageurl2,
            imageurl3,
            imageurl4,
            product_description,
            primaryData,
            checked1,
            checked2,
            checked3,
            checked4,
            checked5,
        } = this.state;
        data = {
            imageurl1: imageurl1,
            imageurl2: imageurl2,
            imageurl3: imageurl3,
            imageurl4: imageurl4,
            product_description: product_description,
            wifi: checked1 == true ? true : false,
            freeparking: checked2 == true ? true : false,
            washeranddryer: checked3 == true ? true : false,
            breakfast: checked4 == true ? true : false,
            coolingandheating: checked5 == true ? true : false,
        }
        var secondaryData = Object.assign(primaryData, data);
        // alert(JSON.stringify(secondaryData))
        this.props.navigation.navigate('HostThirdScreen', { secondaryData: secondaryData })
    }
    render() {
        let {
            avatarSource1,
            avatarSource2,
            avatarSource3,
            avatarSource4,
            checked1,
            checked2,
            checked3,
            checked4,
            checked5,
        } = this.state;
        return (
            <View style={styles.container}>
                <Content style={{ width: '100%' }}>
                    <View style={{ height: 20 }}></View>
                    <Text style={styles.titletext}>
                        Upload pictures
                        </Text>
                    <View style={styles.itembuttoncontainer}>
                        <TouchableOpacity onPress={() => this.getImage(1)} style={styles.imagebutton}>
                            <Image source={avatarSource1 == null ? initial : avatarSource1} style={styles.imagepart} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.getImage(2)} style={styles.imagebutton}>
                            <Image source={avatarSource2 == null ? initial : avatarSource2} style={styles.imagepart} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itembuttoncontainer}>
                        <TouchableOpacity onPress={() => this.getImage(3)} style={styles.imagebutton}>
                            <Image source={avatarSource3 == null ? initial : avatarSource3} style={styles.imagepart} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.getImage(4)} style={styles.imagebutton}>
                            <Image source={avatarSource4 == null ? initial : avatarSource4} style={styles.imagepart} />
                        </TouchableOpacity>
                    </View>
                    <Textarea
                        style={{ width: '80%', alignSelf: 'center', marginTop: 20, borderColor: 'gray', borderWidth: 1 }}
                        rowSpan={5} placeholder="Description"
                        onChangeText={(product_description) => this.setState({ product_description })}
                        keyboardType='default' />
                    <View style={{ width: '80%', alignSelf: 'center', marginTop: 20 }}>
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Amenities</Text>
                            <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Check</Text>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Icon name="ios-wifi" type="Ionicons" style={{ fontSize: 25, color: 'black' }} />
                                <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, }}>Wifi</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                <CheckBox color="black" onPress={() => this.setState({ checked1: !this.state.checked1 })} checked={checked1 == true ? true : false} />
                            </View>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Icon name="parking" type="FontAwesome5" style={{ fontSize: 25, color: 'black' }} />
                                <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, }}>Free parking</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                <CheckBox color="black" onPress={() => this.setState({ checked2: !this.state.checked2 })} checked={checked2 == true ? true : false} />
                            </View>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Icon name="water-pump" type="MaterialCommunityIcons" style={{ fontSize: 25, color: 'black' }} />
                                <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, }}>Washer and dryer</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                <CheckBox color="black" onPress={() => this.setState({ checked3: !this.state.checked3 })} checked={checked3 == true ? true : false} />
                            </View>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Icon name="free-breakfast" type="MaterialIcons" style={{ fontSize: 25, color: 'black' }} />
                                <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, }}>Breakfast </Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                <CheckBox color="black" onPress={() => this.setState({ checked4: !this.state.checked4 })} checked={checked4 == true ? true : false} />
                            </View>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Icon name="hot-tub" type="FontAwesome5" style={{ fontSize: 25, color: 'black' }} />
                                <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, }}>Cooling and heating </Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                <CheckBox color="black" onPress={() => this.setState({ checked5: !this.state.checked5 })} checked={checked5 == true ? true : false} />
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 30 }}></View>
                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                        <TouchableOpacity onPress={() => this.gotoNext()} style={styles.buttonStyle}>
                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                            </ActivityIndicator>
                            <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={{ height: 30 }}></View>
                </Content>
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imagebutton: {
        width: 160,
        height: 120,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagepart: {
        width: 158,
        height: 118,
        resizeMode: 'cover'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 15,
        paddingBottom: 15,
    },
    buttonStyle: {
        width: '100%',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 50,
    },
    linearGradient1: {
        width: '70%',
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
    addbtn: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addtext: {
        fontSize: 15,
        paddingTop: 6,
        color: 'black'
    },
    titletext: {
        fontSize: 20,
        padding: 10,
        color: 'black',
        textAlign: 'center',
    },
    addicon: {
        fontSize: 25,
        color: 'rgba(0,0,0,1)',
        paddingTop: 5,
    },
    hori_line: {
        width: '100%',
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 10
    },
    hori_line1: {
        width: '60%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 10,
        alignSelf: 'center',
    },
    itembuttoncontainer: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 10,
        padding: 0,
        borderRadius: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});
