/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const indexItembutton = ({textIndo, onPress}) => {
  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <TouchableOpacity onPress={() => onPress()}>
        <Text
          style={{marginLeft: 17, marginTop: 0, color: 'black', fontSize: 18}}>
          {textIndo}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default indexItembutton;
