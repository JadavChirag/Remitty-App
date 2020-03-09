/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import { Icon,Container,Content } from "native-base";
import GradiantButton from "../componentItem/gradiantButton";
import LinearGradient from "react-native-linear-gradient";
import LineChart from "react-native-responsive-linechart";
import searchicon from "../../assets/images/ic_search.png";
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const data = [6, 8, 6, 12, 20, 12];
const xLabels = ["FEB", "ARP", "JUN", "AUG", "OCT", "DEC"];

const config = {
  line: {
    visible: true,
    strokeWidth: 2,
    strokeColor: "#00ff00",
    gradientFrom: "#10ac84",
    gradientFromOpacity: 1,
    gradientTo: "#10ac84",
    gradientToOpacity: 0.4
  },
  area: {
    visible: false
  },
  yAxis: {
    visible: false,
    labelColor: "#54a0ff"
  },
  xAxis: {
    visible: true,
    labelFontSize: 12,
    labelColor: "#777"
  },
  grid: { visible: false },
  insetY: 10,
  insetX: 10
};
export default class StockSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [6, 8, 6, 12, 20, 12],
      chartButtons: [
        {
          id: 0,
          title: "Portfolio",
          buttonstyle: styles.activeButton,
          textStyle: styles.activeText
        },

        {
          id: 1,
          title: "Watchlist",
          buttonstyle: styles.inactiveButton,
          textStyle: styles.inactiveText
        }
      ],
      chartLabel: "1 Day"
    };
  }
  changeChartData = val => {
    let { chartButtons } = this.state;
    chartButtons.map((item, index) => {
      if (val == index) {
        (item.buttonstyle = styles.activeButton),
          (item.textStyle = styles.activeText);
      } else {
        (item.buttonstyle = styles.inactiveButton),
          (item.textStyle = styles.inactiveText);
      }
    });
    switch (val) {
      case 0:
        this.setState({
          chartButtons: chartButtons,
          chartData: [21, 7, 1, 6, 8, 6, 12, 20, 12],
          chartLabel: "1 Day"
        });
        break;
      case 1:
        this.setState({
          chartButtons: chartButtons,
          chartData: [1, 6, 8, 6, 12, 10, 12],
          chartLabel: "1 Week"
        });
        break;
      default:
        break;
    }
  };
  buttonGruop = () => {
    let { chartButtons } = this.state;
    return (
      <View style={styles.buttonContainer}>
        {chartButtons.map((item, index) => {
          return (
            <TouchableOpacity
              style={item.buttonstyle}
              key={item.id}
              onPress={() => this.changeChartData(item.id)}
            >
              <Text style={item.textStyle}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  hideMenu = () => {
    this._menu.hide();
  };
  showMenu = () => {
    this._menu.show();
  };
  render() {
    let { chartData, chartLabel } = this.state;
    return (
      <View style={styles.container}>
        {/* <View style={styles.buttonContainer1}>{this.buttonGruop()}</View> */}

        <View style={[styles.itemcontainer, { marginTop: 10 }]}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 0,
              width: "85%",
              alignSelf: "center"
            }}
          >
            <Icon
              name="ios-search"
              type="Ionicons"
              style={{
                fontSize: 20,
                color: "rgba(0,255,0,0.7)",
                marginTop: 23
              }}
            />
            <TextInput
              style={[
                styles.periodType,
                { color: "#fe03a2", fontSize: 15, marginLeft: 20 }
              ]}
              placeholder="Search Stock"
              placeholderTextColor="rgba(0,255,0,0.7)"
            />
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "rgba(0,255,191,1)",
              width: "90%",
              alignSelf: "center"
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: "90%",
            alignSelf: "center",
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={[styles.buttonText12, { color: '#fe02a2' }]}>FB</Text>
            <Text style={[styles.buttonText13, { color: "rgba(0,255,191,1)" }]}>Facebook</Text>
          </View>
          <View style={{ flexDirection: "row", width: '45%', justifyContent: 'space-between' }}>
            <View style={{}}>
              <Text style={styles.buttonText12}>150.35</Text>
              <Text style={[styles.buttonText13, { color: '#fe02a2' }]}>+1.40(+0.92%)</Text>
            </View>
            <TouchableOpacity style={{}}>
              <Text style={[styles.buttonText14, { marginTop: 10, color: 'rgba(255,255,255,1)' }]}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "rgba(0,255,191,1)",
            width: "90%",
            alignSelf: "center"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: "90%",
            alignSelf: "center",
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={[styles.buttonText12, { color: '#fe02a2' }]}>MSFT</Text>
            <Text style={[styles.buttonText13, { color: "rgba(0,255,191,1)" }]}>Microsoft corperation</Text>
          </View>
          <View style={{ flexDirection: "row", width: '45%', justifyContent: 'space-between' }}>
            <View style={{}}>
              <Text style={styles.buttonText12}>106.08</Text>
              <Text style={[styles.buttonText13, { color: '#fe02a2' }]}>+0.16(+0.15%)</Text>
            </View>
            <TouchableOpacity style={{}}>
              <Text style={[styles.buttonText14, { marginTop: 10, color: 'rgba(255,255,255,1)' }]}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "rgba(0,255,191,1)",
            width: "90%",
            alignSelf: "center"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: "90%",
            alignSelf: "center",
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={[styles.buttonText12, { color: '#fe02a2' }]}>PYPL</Text>
            <Text style={[styles.buttonText13, { color: "rgba(0,255,191,1)" }]}>Paypal</Text>
          </View>
          <View style={{ flexDirection: "row", width: '45%', justifyContent: 'space-between' }}>
            <View style={{}}>
              <Text style={styles.buttonText12}>86.00</Text>
              <Text style={[styles.buttonText13, { color: '#fe02a2' }]}>+1.44(+0.70%)</Text>
            </View>
            <TouchableOpacity style={{}}>
              <Text style={[styles.buttonText14, { marginTop: 10, color: 'rgba(255,255,255,1)' }]}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "rgba(0,255,191,1)",
            width: "90%",
            alignSelf: "center"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: "90%",
            alignSelf: "center",
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={[styles.buttonText12, { color: '#fe02a2' }]}>BOCH</Text>
            <Text style={[styles.buttonText13, { color: "rgba(0,255,191,1)" }]}>Bank of Commerce Holding</Text>
          </View>
          <View style={{ flexDirection: "row", width: '45%', justifyContent: 'space-between' }}>
            <View style={{}}>
              <Text style={styles.buttonText12}>10.39</Text>
              <Text style={[styles.buttonText13, { color: '#ff0000' }]}>-0.04(-0.38%)</Text>
            </View>
            <TouchableOpacity style={{}}>
              <Text style={[styles.buttonText14, { marginTop: 10, color: 'rgba(255,255,255,1)' }]}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "rgba(0,255,191,1)",
            width: "90%",
            alignSelf: "center"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: "90%",
            alignSelf: "center",
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={[styles.buttonText12, { color: '#fe02a2' }]}>BKSC</Text>
            <Text style={[styles.buttonText13, { color: "rgba(0,255,191,1)" }]}>Bank of South Carolina Corp</Text>
          </View>
          <View style={{ flexDirection: "row", width: '45%', justifyContent: 'space-between' }}>
            <View style={{}}>
              <Text style={styles.buttonText12}>18.95</Text>
              <Text style={[styles.buttonText13, { color: '#fe02a2' }]}>+0.20(+1.07%)</Text>
            </View>
            <TouchableOpacity style={{}}>
              <Text style={[styles.buttonText14, { marginTop: 10, color: 'rgba(255,255,255,1)' }]}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "rgba(0,255,191,1)",
            width: "90%",
            alignSelf: "center"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: "90%",
            alignSelf: "center",
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={[styles.buttonText12, { color: '#fe02a2' }]}>OZK</Text>
            <Text style={[styles.buttonText13, { color: "rgba(0,255,191,1)" }]}>Bank of OZK</Text>
          </View>
          <View style={{ flexDirection: "row", width: '45%', justifyContent: 'space-between' }}>
            <View style={{}}>
              <Text style={styles.buttonText12}>28.05</Text>
              <Text style={[styles.buttonText13, { color: '#ff0000' }]}>-0.65(-2.26%)</Text>
            </View>
            <TouchableOpacity style={{}}>
              <Text style={[styles.buttonText14, { marginTop: 10, color: 'rgba(255,255,255,1)' }]}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "rgba(0,255,191,1)",
            width: "90%",
            alignSelf: "center"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: "90%",
            alignSelf: "center",
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={[styles.buttonText12, { color: '#fe02a2' }]}>CCB</Text>
            <Text style={[styles.buttonText13, { color: "rgba(0,255,191,1)" }]}>Coastal Financial Corp</Text>
          </View>
          <View style={{ flexDirection: "row", width: '45%', justifyContent: 'space-between' }}>
            <View style={{}}>
              <Text style={styles.buttonText12}>15.25</Text>
              <Text style={[styles.buttonText13, { color: '#ff0000' }]}>-0.050(-0.33%)</Text>
            </View>
            <TouchableOpacity style={{}}>
              <Text style={[styles.buttonText14, { marginTop: 10, color: 'rgba(255,255,255,1)' }]}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "rgba(0,255,191,1)",
            width: "90%",
            alignSelf: "center"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: "90%",
            alignSelf: "center",
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={[styles.buttonText12, { color: '#fe02a2' }]}>AMZN</Text>
            <Text style={[styles.buttonText13, { color: "rgba(0,255,191,1)" }]}>Amazon.com.Inc</Text>
          </View>
          <View style={{ flexDirection: "row", width: '45%', justifyContent: 'space-between' }}>
            <View style={{}}>
              <Text style={styles.buttonText12}>1997.84</Text>
              <Text style={[styles.buttonText13, { color: '#ff0000' }]}>-12.06(-0.60%)</Text>
            </View>
            <TouchableOpacity style={{}}>
              <Text style={[styles.buttonText14, { marginTop: 10, color: 'rgba(255,255,255,1)' }]}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "rgba(0,255,191,1)",
            width: "90%",
            alignSelf: "center"
          }}
        />
        <Header navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemcontainer: {
    width: "100%"
  },
  buttonText12: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00ff00",
    // textAlign: "center"
  },
  buttonText13: {
    fontSize: 15,
    color: "white",
    // textAlign: "center",
    marginTop: 5
  },
  buttonText14: {
    fontSize: 15,
    marginTop: 5,
    backgroundColor:'#fe02a2',
    padding:5,
  },
  menucontainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: -190,
    marginTop: -55
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  buttonContainer1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30
  },
  activeButton: {
    borderColor: "rgba(0,255,191,1)",
    borderWidth: 2,
    paddingLeft: 25,
    paddingRight: 25
  },
  inactiveButton: {
    borderColor: "rgba(0,255,191,1)",
    borderWidth: 2,
    paddingLeft: 25,
    paddingRight: 25
  },
  activeText: {
    color: "#00ff00",
    fontWeight: "bold",
    padding: 10,
    fontSize: 15,
    paddingLeft: 25,
    paddingRight: 25
  },
  inactiveText: {
    color: "#fe02a2",
    padding: 10,
    fontSize: 15,
    paddingLeft: 25,
    paddingRight: 25
  },
  container: {
    width: LW,
    height: LH,
    paddingTop: MH,
    alignItems: "center",
    backgroundColor: "#000000",
    // paddingHorizontal:20
  },
  containersub: {
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  containerChart: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    width: "90%",
    height: 400,
    paddingHorizontal: 15,
    elevation: 5,
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    marginTop: 20,
    borderWidth: 1,
    // borderColor: "rgba(240,240,240,0.8)",
    backgroundColor: "#000000"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  linearGradient: {
    width: "100%",
    height: 40,
    justifyContent: "center"
  },
  title: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 18,
    color: "#00ff00"
  },
  periodType: {
    fontWeight: "400",
    fontSize: 20,
    color: "black",
    marginTop: 10,
    marginHorizontal: 3,
    textAlign: "center"
  },
  periodType1: {
    fontWeight: "400",
    fontSize: 14,
    color: "gray",
    marginTop: 10,
    marginHorizontal: 10,
    textAlign: "center"
  },
  buttonStyle11: {
    alignSelf: "center",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    height: 40,
    justifyContent: "center"
  },
  linearGradient11: {
    alignSelf: "center",
    width: "45%",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginHorizontal: 5,
    marginTop: 30
  },
  buttonText11: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  }
});
