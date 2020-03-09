import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import PubNubReact from 'pubnub-react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform,
  Keyboard
} from 'react-native';

import Constant from "@common/Constant"; 
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight

type Props = {
  name?: string,
};
import profileicon from '../../assets/images/profileicon.png';
class Chat extends React.Component<Props> {


  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({ publishKey: 'pub-c-519132f2-0839-4a00-8b0a-169767871210', subscribeKey: 'sub-c-e74aaaee-dc1c-11e9-a6c8-3e57a349bb32' });
    this.pubnub.init(this);

    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }


  state = {
    messages: [],
    chatHeight: LH-MH
  };

  initialize = async () => {
    this.setState({
      user_id:await AsyncStorage.getItem('user_id'),
      username:await AsyncStorage.getItem('username'),
    })
  }
  componentWillMount() {
    this.setState({
      messages: [],
    });

    this.pubnub.subscribe({ channels: ['channel1'], withPresence: true });
  
    this.pubnub.getMessage("channel1", m => {
      console.log(m,'ghfhgfhgfhgfhfhfhfgfhg');
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, m["message"]),
      }));
    });
    
    this.pubnub.getStatus((st) => {
      console.log(st);
      // this.pubnub.publish({ message: {
      //     _id: 1,
      //     text: "Hello developer",
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: "React Native",
      //       avatar: "https://placeimg.com/140/140/any",
      //     },
      //   }, channel: 'channel1' });
    });


  }
  componentWillUnmount() {
    // this.pubnub.unsubscribe({ channels: ['channel1'] });
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );

    this.initialize();
    this.pubnub.history(
      { channel: "channel1", count: 15 },
      (status, res) => {
        let newmessage = [];
        // alert(JSON.stringify(res))
        res.messages.forEach(function(element, index) {
          newmessage[index] = element.entry[0];
        });

        this.setState(previousState => ({
          messages: GiftedChat.append(
            previousState.messages,
            newmessage
          )
        }));
      }
    );
  }

  _keyboardDidShow(e) {
    console.log('-- height: ',LH - e.endCoordinates.height - MH);
    var h = LH - e.endCoordinates.height - MH + 5;
    this.setState({
      chatHeight: h
    })
  }

  _keyboardDidHide(e) {    
    var h = LH - MH;
    console.log('-- height: ', h);
    this.setState({
      chatHeight: h
    })
  }

  randomid = () => {
    return Math.floor(Math.random() * 100);
  };
  onSend(messages = []) {
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }));
    console.log('tesfsdjflsjdflsdj',messages);

    this.pubnub.publish({
      message: messages,
      channel: "channel1",
    });

  }
  render() {
    return (
      <View style={{flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user_id,
            name:this.state.username
          }}
        />
        <View style={{position: 'absolute', width: '100%', height: 80, left: 0, bottom:  this.state.chatHeight, backgroundColor: '#f00'}}>
          <View
            style={{
              position: 'absolute',
              height: 60,
              width: 60,
              top: Platform.OS === 'ios' ? 0 : 20,
              left: 0,
              alignItem: 'center',
              justifyContent: 'center',
              paddingLeft: 15
            }}>
            <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
              <Image
                source={require('../../assets/images/backbutton.png')}
                style={{
                  width: 18,
                  height: 12,
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItem: 'center',
              justifyContent: 'center',
              width: '100%',
              flexDirection: 'row',
              marginTop: Platform.OS === 'ios' ? 0 : 20,
              paddingTop: 10,
            }}>
              <Image
                source={require('../../assets/images/titlelogo.png')}
                style={{
                  marginTop: 5,
                  width: 35,
                  height: 35,
                  resizeMode: 'contain'
                }}
              />
          </View>
        </View>
        
      </View>
      
    );
  }

}

export default Chat;