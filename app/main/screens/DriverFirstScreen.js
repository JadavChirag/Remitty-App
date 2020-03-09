import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Alert,
    TextInput,
} from 'react-native';
import {
    Content,
    Icon,
    Textarea,
    CheckBox,
} from 'native-base';
import firebase from 'react-native-firebase';
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
export default class DriverFirstScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource1: null,
            avatarSource2: null,
            avatarSource3: null,
            avatarSource4: null,
            vehiclemark: '',
            vehiclemodel: '',
            vehicleregistration: '',
            vehicleyear: '',
            licenseplatenumber: '',
            driverlicensenumber: '',
            imageurl1: 'https://remittyllc.com/public/images/993439527.png',
            imageurl2: 'https://remittyllc.com/public/images/993439527.png',
            imageurl3: 'https://remittyllc.com/public/images/993439527.png',
            imageurl4: 'https://remittyllc.com/public/images/993439527.png',
            user_id: 26,
            showing_activity: 'none'
        }
    }
    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
            this.onRegionChange(region, region.latitude, region.longitude);
        }, (error) => console.log(error));
    }
    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong,
        })
        this.initialize();
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    initialize = async () => {
        let {user_id} = this.state;
        this.setState({
            user_id: await AsyncStorage.getItem('user_id')!==null?await AsyncStorage.getItem('user_id')!==null:user_id,
            fcmToken: await AsyncStorage.getItem('fcmToken')
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
            vehiclemark,
            vehiclemodel,
            vehicleregistration,
            vehicleyear,
            licenseplatenumber,
            driverlicensenumber,
            user_id,
            lastLong,
            lastLat,
            fcmToken
        } = this.state;
        data = {
            imageurl1: imageurl1,
            imageurl2: imageurl2,
            imageurl3: imageurl3,
            imageurl4: imageurl4,
            vehiclemark: vehiclemark,
            vehiclemodel: vehiclemodel,
            vehicleregistration: vehicleregistration,
            vehicleyear: vehicleyear,
            licenseplatenumber: licenseplatenumber,
            driverlicensenumber: driverlicensenumber,
            user_id: user_id,
            lastLat: lastLat,
            lastLong: lastLong,
            fcmToken: fcmToken
        }
        taxidata = JSON.stringify(data);
        // alert(taxidata)
        // return
        fetch('https://remittyllc.com/save_taxi_data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: taxidata,
        }).then((response) => response.json())
            .then((res => {
                // alert(JSON.stringify(res))
                // return;
                if (res.status == 1) {
                    this.setState({
                        showing_activity: 'none'
                    })
                    Alert.alert(
                        'Taxi Results',
                        res.message,
                        [
                            { text: 'OK', onPress: () => this.props.navigation.navigate('Index') },
                        ],
                        { cancelable: false },
                    );
                }
                else {
                    this.setState({
                        showing_activity: 'none'
                    })
                    alert('Error, Please check Network, or Host data!')
                }
            })
            )
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
                        Become A Driver
                    </Text>
                    <TextInput
                        // value={this.state.fcmToken}
                        onChangeText={(vehiclemark) => this.setState({ vehiclemark })}
                        placeholder="Enter vehicle mark"
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5,
                            width: '80%',
                            alignSelf: 'center',
                            paddingTop: 5,
                            marginTop: 20,
                            fontSize: 20,
                        }}>
                    </TextInput>
                    <TextInput
                        onChangeText={(vehiclemodel) => this.setState({ vehiclemodel })}
                        placeholder="Enter vehicle model"
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5,
                            width: '80%',
                            alignSelf: 'center',
                            paddingTop: 5,
                            marginTop: 20,
                            fontSize: 20,
                        }}>
                    </TextInput>
                    <TextInput
                        onChangeText={(vehicleyear) => this.setState({ vehicleyear })}
                        placeholder="Enter vehicle year"
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5,
                            width: '80%',
                            alignSelf: 'center',
                            paddingTop: 5,
                            marginTop: 20,
                            fontSize: 20,
                        }}>
                    </TextInput>
                    <TextInput
                        onChangeText={(vehicleregistration) => this.setState({ vehicleregistration })}
                        placeholder="Enter vehicle Registration "
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5,
                            width: '80%',
                            alignSelf: 'center',
                            paddingTop: 5,
                            marginTop: 20,
                            fontSize: 20,
                        }}>
                    </TextInput>
                    <TextInput
                        onChangeText={(licenseplatenumber) => this.setState({ licenseplatenumber })}

                        placeholder="Enter license plate number"
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5,
                            width: '80%',
                            alignSelf: 'center',
                            paddingTop: 5,
                            marginTop: 20,
                            fontSize: 20,
                        }}>
                    </TextInput>
                    <TextInput
                        onChangeText={(driverlicensenumber) => this.setState({ driverlicensenumber })}
                        placeholder="Enter driver license number"
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5,
                            width: '80%',
                            alignSelf: 'center',
                            paddingTop: 5,
                            marginTop: 20,
                            fontSize: 20,
                        }}>
                    </TextInput>
                    <View style={{ height: 20, }}></View>
                    <View style={styles.itembuttoncontainer}>
                        <TouchableOpacity onPress={() => this.getImage(1)} style={styles.imagebutton}>
                            <Image source={avatarSource1 == null ? initial : avatarSource1} style={[styles.imagepart, { display: avatarSource1 == null ? 'none' : 'flex' }]} />
                            <View
                                style={[styles.imagepart, { display: avatarSource1 == null ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }]}>
                                <Text style={{ textAlign: 'center', fontSize: 20, }}>
                                    Upload
                                </Text>
                                <Text style={{ textAlign: 'center', fontSize: 20, }}>
                                    Diver license
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.getImage(2)} style={styles.imagebutton}>
                            <Image source={avatarSource2 == null ? initial : avatarSource2} style={[styles.imagepart, { display: avatarSource2 == null ? 'none' : 'flex' }]} />
                            <View
                                style={[styles.imagepart, { display: avatarSource2 == null ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }]}>
                                <Text style={{ textAlign: 'center', fontSize: 20, }}>
                                    Upload
                                </Text>
                                <Text style={{ textAlign: 'center', fontSize: 20, }}>
                                    Insurance card
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itembuttoncontainer}>
                        <TouchableOpacity onPress={() => this.getImage(3)} style={styles.imagebutton}>
                            <Image source={avatarSource3 == null ? initial : avatarSource3} style={[styles.imagepart, { display: avatarSource3 == null ? 'none' : 'flex' }]} />
                            <View
                                style={[styles.imagepart, { display: avatarSource3 == null ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }]}>
                                <Text style={{ textAlign: 'center', fontSize: 20, }}>
                                    Upload
                                </Text>
                                <Text style={{ textAlign: 'center', fontSize: 20, }}>
                                    Registration
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.getImage(4)} style={styles.imagebutton}>
                            <Image source={avatarSource4 == null ? initial : avatarSource4} style={[styles.imagepart, { display: avatarSource4 == null ? 'none' : 'flex' }]} />
                            <View
                                style={[styles.imagepart, { display: avatarSource4 == null ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }]}>
                                <Text style={{ textAlign: 'center', fontSize: 20, }}>
                                    Upload
                                </Text>
                                <Text style={{ textAlign: 'center', fontSize: 20, }}>
                                    Car photos
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 30 }}></View>
                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                        <TouchableOpacity onPress={() => { this.gotoNext(); this.setState({ showing_activity: 'flex' }) }} style={styles.buttonStyle}>
                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                            </ActivityIndicator>
                            <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                Submit
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
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
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
