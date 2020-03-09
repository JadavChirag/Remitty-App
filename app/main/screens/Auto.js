/*This is an example of AutoComplete Input/ AutoSuggestion Input*/
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import all the components we are going to use.
import Autocomplete from 'react-native-autocomplete-input';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import ContactsWrapper from 'react-native-contacts-wrapper';
//import Autocomplete component
 
const API = 'https://swapi.co/api';
//Demo base API to get the data for the Autocomplete suggestion
class App extends Component {
  constructor(props) {
    super(props);
    //Initialization of state
    //films will contain the array of suggestion
    //query will have the input from the autocomplete input
    this.state = {
      films: [],
      query: '',
      contact:''
    };
  }
  componentDidMount() {
    //First method to be called after components mount
    //fetch the data from the server for the suggestion
    fetch(`${API}/films/`)
      .then(res => res.json())
      .then(json => {
        const { results: films } = json;
        this.setState({ films });
        //setting the data in the films state
      });
  }
      onButtonPressed() {
        alert('fsdkjfsdlkjf');
        ContactsWrapper.getContact()
        .then((contact) => {
        alert(JSON.stringify(contact));
            // Replace this code
            this.setState({query:contact.phone});
        })
        .catch((error) => {
            console.log("ERROR CODE: ", error.code);
            console.log("ERROR MESSAGE: ", error.message);
        });
    }
  findFilm(query) {
    //method called everytime when we change the value of the input
    if (query === '') {
      //if the query is null then return blank
      return [];
    }
 
    const { films } = this.state;
    //making a case insensitive regular expression to get similar value from the film json
    const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered film array according the query from the input
    return films.filter(film => film.title.search(regex) >= 0);
  }
 
  render() {
    // const { query } = this.state;
    // const films = this.findFilm(query);
    // const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
 
    return (
      <View style = {styles.container}>
                <TouchableOpacity onPress = {this.onButtonPressed}>
                    <View style = {styles.buttonWrapper}>
                        <Text style = {styles.buttonText}>Open Contact</Text>
                    </View>
                </TouchableOpacity>
                        <Text style = {styles.buttonText}>{this.state.query}</Text>
                        <Header navigation={this.props.navigation}/>
            </View>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    width: LW,
    height: LH,
    paddingTop: MH,
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
export default App;