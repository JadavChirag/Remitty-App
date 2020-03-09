import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    PermissionsAndroid,
    FlatList,
    Alert
} from 'react-native';
import {
    Content,
    Icon,
    ListItem,
    Left,
    Thumbnail,
    Right,
    Body,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../images/Images';
import ImagePicker from 'react-native-image-picker';
import initial from '../../assets/images/ic_initial.png';
import Contacts from 'react-native-contacts';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const options = {
    title: 'Select Avatar',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phonenum: '',
            contacts: [],
            filterContacts: [],
        }
        this.requestReadContactPermission();
    }
    async requestReadContactPermission() {
        try {
            // PermissionsAndroid.request(
            //     PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            //     {
            //         'title': 'Contacts',
            //         'message': 'This app would like to view your contacts.'
            //     }
            // ).then(() => {
            //     Contacts.getAll((err, contacts) => {
            //         if (err === 'denied') {
            //             // error
            //         } else {
            //             this.setState({
            //                 contacts: contacts,
            //                 filterContacts: contacts
            //             })
            //         }
            //     })
            // })
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                    title: 'GET CONTACTS',
                    message: 'need access to get contacts'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //alert('READ_SMS permissions granted', granted);

                Contacts.getAll((err, contacts) => {
                    if (err) {
                        throw err;
                    }
                    // contacts returned
                    this.setState({
                        contacts: contacts,
                        filterContacts: contacts
                    })
                })

            } else {
                alert('READ_CONTACTS permissions denied');
            }
        } catch (err) {

            alert(err);
        }
    }
    _onTextDidChange = async (text) => {
        let searchText = text.replace(/[^0-9a-z-A-Z ]/g, '').toLowerCase();// trim is not remove all spaces so use replace(/ /g, '')
        let data = this.state.contacts.filter(l => {
            //filter given name
            let filter = l.givenName ? l.givenName.toLowerCase().match(searchText) : null;
            if (filter != null) {
                return filter
            }
            //filter family name
            filter = l.familyName ? l.familyName.toLowerCase().match(searchText) : null;
            if (filter != null) {
                return filter
            }
            //filter full name
            let fullName = '';
            if (l.familyName != null && l.givenName != null) {
                fullName = (l.givenName + l.familyName).replace(/ /g, '').toLowerCase();

            }
            filter = fullName.match(searchText);
            if (filter != null) {
                return filter
            }
            //filter email 1
            filter = l.emailAddresses[0] ? l.emailAddresses[0].email.replace(/ /g, '').match(searchText) : null;
            if (filter != null) {
                return filter
            }
            //filter email 2
            filter = l.emailAddresses[1] ? l.emailAddresses[1].email.replace(/ /g, '').match(searchText) : null;
            if (filter != null) {
                return filter
            }
            //filter phone number 1
            filter = l.phoneNumbers[0] ? l.phoneNumbers[0].number.replace(/ /g, '').match(searchText) : null;
            if (filter != null) {
                return filter
            }
            //filter phone number 2
            filter = l.phoneNumbers[1] ? l.phoneNumbers[1].number.replace(/ /g, '').match(searchText) : null;
            if (filter != null) {
                return filter
            }
            //filter phone number 3
            filter = l.phoneNumbers[2] ? l.phoneNumbers[2].number.replace(/ /g, '').match(searchText) : null;
            if (filter != null) {
                return filter
            }
            //filter phone number 4
            filter = l.phoneNumbers[3] ? l.phoneNumbers[3].number.replace(/ /g, '').match(searchText) : null;
            if (filter != null) {
                return filter
            }
            return null
        });
        this.setState({
            filterContacts: data,
            search: text
        });

    };

    _onTextClear = () => {
        this.setState({ search: '' });
    };
    // _listHeaderComponent = () => {
    //     return (
    //         <View>
    //             <SearchBar
    //                 round
    //                 lightTheme
    //                 containerStyle={{ backgroundColor: '#FFFFFF' }}
    //                 onChangeText={this._onTextDidChange}
    //                 onClear={this._onTextClear}
    //                 placeholder='Name, email, phone number...'
    //                 autoCorrect={false}
    //                 value={this.state.search}
    //             />
    //             {this.state.suggestedBlockHidden === false && this.renderSuggestBlock()}
    //         </View>
    //     )
    // };
    componentDidMount() {
        this.initialize();
        this._handleAppStateChange();
    }
    _handleAppStateChange = () => {
        Contacts.getAll((err, contacts) => {
            if (err) {
                throw err;
            }
            // contacts returned
            this.setState({
                contacts: contacts,
                filterContacts: contacts
            })
        })
    };
    initialize = async () => {
        this.setState({
            firstname: await AsyncStorage.getItem('username'),
            lastname: await AsyncStorage.getItem('lastname'),
            email: await AsyncStorage.getItem('email'),
            phonenum: await AsyncStorage.getItem('phonenum'),
        });
    }
    getImage = () => {
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
                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    actionOnRow(item) {

        if (item.phoneNumbers[0] == null) {
            return;
        }
        Alert.alert(
            'Invite Friend!',
            'Are you sure to send invite to ' + item.phoneNumbers[0].number.replace(/\s/g, '').replace('+', '').replace(/-/g, '') + "?",
            [
                {
                    text: 'No',
                    onPress: () => { console.log('OK Pressed'); return; },
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => { this.confirmSMS(item) } },
            ],
            { cancelable: false },
        );
    }
    confirmSMS = (val) => {
        let { firstname, lastname, email, phonenum } = this.state;

        fetch('https://rest.nexmo.com/sms/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: '705d7e8b',
                api_secret: 'zfmAPyzeIgo4QoLw',
                to: val.phoneNumbers[0].number.replace(/\s/g, '').replace('+', '').replace(/-/g, ''),
                // to:'15204063923 ',
                // from: phonenum,
                from: '12404892305',
                text: 'http://remittyllc.com/',
            })
            ,
        }).then((response) => response.json())
            .then((res => {
                alert(JSON.stringify(res));
            })
            ).catch((error) => {
                alert(JSON.stringify(error))
            });
    }
    renderItems = ({ item }) => (
        <View style={styles.flatview}>
            <ListItem avatar noBorder button={true} onPress={() => this.actionOnRow(item)}>
                <Left>
                    <Thumbnail source={(item.thumbnailPath) ? { uri: item.thumbnailPath } : images.default_avatar} />
                </Left>
                <Body>
                    <Text >{(item.givenName && item.familyName) ? item.familyName + ' ' + item.givenName : item.givenName ? item.givenName : item.familyName ? item.familyName : ''}</Text>
                    <Text note>{item.phoneNumbers[0] ? item.phoneNumbers[0].number : ''}</Text>
                </Body>
                <Right>
                </Right>
            </ListItem>
        </View>
    );
    render() {
        let {
            firstname,
            lastname,
            email,
            phonenum
        } = this.state;
        return (
            <View style={styles.container}>
                <Content style={{ width: '100%' }}>
                    <FlatList
                        data={this.state.filterContacts}
                        // ListHeaderComponent={this._listHeaderComponent}
                        renderItem={this.renderItems}
                        keyExtractor={(item) => item.rawContactId}
                    // refreshing={this.state.flag}
                    />
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
        marginTop: 25,
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
