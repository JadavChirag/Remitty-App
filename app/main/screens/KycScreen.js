import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import {
    Content,
    Container,
    Icon
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import initial from '../../assets/images/ic_initial.png';
import stringsoflanguages from './stringsoflanguages';
const options = {
    title: 'Select Avatar',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'rajareact',
    },
};

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            showme: true,
            user_id: 0,
            firstname: '',
            nameProof: '',
            addressProof: '',
            nameProofstatus: 0,
            addressProofstatus: 0
        }
        try {
            this.gettoken('profile_details');
        }
        catch (e) {
            alert(e)
        }
    }
    componentDidMount() {
        this.initialize();
    }
    initialize = async () => {
        this.setState({
            user_id: await AsyncStorage.getItem('user_id')
        })
    }

    gettoken = (name) => {
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
                        if (name == 'submitKYC') {
                            this.submitKYC(res.token);
                        }
                        if (name == 'profile_details') {
                            this.profile_details(res.token);
                        }
                    } else {
                        // alert(JSON.stringify(res));
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }
    }

    profile_details = (token) => {
        try {
            var String_1 = "col_";
            var String_2 = this.state.selectfield;
            var String_3 = "_wallet";
            var selectfield = String_1.concat(String_2, String_3);
            fetch(Constant.req_url + "profile_details", {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    selectfield: 'col_bal',
                    token: token
                }),
            }).then((response) => response.json())
                .then((res => {
                    console.log(res);
                    if (res.status) {
                        this.setState({ firstname: res.result['firstname'], nameProofstatus: res.result.nameProofstatus, addressProofstatus: res.result.addressProofstatus, });
                        this.setState({ showme: false })
                    }
                    else {
                        alert(JSON.stringify(res));
                        this.setState({ showme: false })
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }
    }

    submitKYC = (token) => {
        const data = new FormData();


        data.append('user_id', this.state.user_id);
        data.append('token', token);


        data.append('nameProof', {
            uri: this.state.nameProof.uri,
            type: this.state.nameProof.type,
            name: this.state.nameProof.fileName,
            data: this.state.nameProof.data
        });

        data.append('addressProof', {
            uri: this.state.addressProof.uri,
            type: this.state.addressProof.type,
            name: this.state.addressProof.fileName,
            data: this.state.addressProof.data
        });

        try {
            fetch(Constant.req_url + "submitKYC", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data,
            }).then((response) => response.json())
                .then((res => {
                    // alert(JSON.stringify(res)); return false;
                    this.setState({
                        showme: false
                    })
                    if (res.status) {
                        alert(res.message);
                    }
                    else {
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }
    }

    nameImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({ nameProof: response });
            }

        });
    }

    addressImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({ addressProof: response });
            }

        });
    }
    render() {
        let { avatarSource } = this.state;

        if (this.state.nameProofstatus == 1 && this.state.addressProofstatus == 1) {
            var button =

                <Text style={[styles.buttonText1, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                        {stringsoflanguages.Verified}
                            </Text>

        }
        else if (this.state.nameProofstatus == 2 && this.state.addressProofstatus == 2) {
            var button =

                <Text style={[styles.buttonText1, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                        {stringsoflanguages.Pending}
                            </Text>

        }
        else if (this.state.nameProofstatus == 3 && this.state.addressProofstatus == 3) {
            var button =

                <Text style={[styles.buttonText1, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                        {stringsoflanguages.Rejected}
                            </Text>

        }
        else {
            var button = <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                <TouchableOpacity onPress={() => { this.gettoken('submitKYC') }} style={styles.buttonStyle}>
                    <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                    </ActivityIndicator>

                    <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                        {stringsoflanguages.Submit}
                            </Text>
                </TouchableOpacity>
            </LinearGradient>
        }
        return (
            <View style={styles.container}>
                <Content style={{ width: '100%' }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
                    {stringsoflanguages.Verificationpage}
                    </Text>
                    <View style={[styles.itembuttoncontainer,
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }]}>
                        {this.state.avatarSource}
                        <TouchableOpacity onPress={() => this.addressImage()} style={styles.imagebutton}>
                            <Image source={this.state.avatarSource == null ? initial : this.state.avatarSource} style={styles.imagepart} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itembuttoncontainer}>
                        <Text style={styles.titletext1}>
                            {stringsoflanguages.Addressproof}
                        </Text>
                    </View>
                    <View style={styles.hori_line1}></View>

                    <View style={[styles.itembuttoncontainer,
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }]}>
                        {this.state.avatarSource}
                        <TouchableOpacity onPress={() => this.nameImage()} style={styles.imagebutton}>
                            <Image source={this.state.avatarSource == null ? initial : this.state.avatarSource} style={styles.imagepart} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itembuttoncontainer}>
                        <Text style={styles.titletext1}>
                            {stringsoflanguages.Nameproof}
                        </Text>
                    </View>
                    <View style={styles.hori_line1}></View>
                    {button}

                    <View style={{ height: 30 }}></View>
                </Content>
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imagebutton: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagepart: {
        width: 98,
        height: 98,
        borderRadius: 98 / 2,
        resizeMode: 'cover'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 15,
        paddingBottom: 15,
    },

    buttonText1: {
        fontSize: 15,
        fontWeight: 'bold',
        justifyContent: 'center',

        alignSelf: 'center',
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
        width: '50%',
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
    titletext1: {
        fontSize: 10,
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
        justifyContent: 'space-between'
    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});
