import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const MyView = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return (
    <View {...this.props} style={style}>
      { children }
      
    </View>
  );
};

MyView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ])),
  ]).isRequired,
  style: View.propTypes.style,
  hide: PropTypes.bool,
};

export default MyView;
