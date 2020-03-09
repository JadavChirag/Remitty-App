
import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import AppNavigator from './app/main/navigators/navigator';
export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}