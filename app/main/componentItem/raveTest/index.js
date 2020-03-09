import React, { Component, } from 'react'
import { AppRegistry, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Header, Card, CardSection, Input } from './src/components/common'
import PaymentModal from './src/components/PaymentModal'

export class SampleApp extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      amount: null,
      visible: false,
      firstname: null,
      lastname: null,
      email: null
    }

    this.onButtonPress = this.onButtonPress.bind(this)
    this.closePaymentModal = this.closePaymentModal.bind(this)
  }

  onButtonPress() {
    this.setState({ visible: true })
  }
  
  handlePaymentDetails(key, value) {
    this.setState({ [key]: value })
  }

  closePaymentModal() {
    this.setState({ visible: false })
  }
  
  renderCheckoutForm() {
    const { firstname, lastname, email, amount } = this.state
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="First Name"
            value={firstname}
            onChangeText={this.handlePaymentDetails.bind(this, 'firstname')}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="Last Name"
            value={lastname}
            onChangeText={this.handlePaymentDetails.bind(this, 'lastname')}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={this.handlePaymentDetails.bind(this, 'email')}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="Amount"
            value={this.state.amount}
            onChangeText={this.handlePaymentDetails.bind(this, 'amount')}
          />
        </CardSection>        
        <CardSection>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
            <Text style={styles.buttonText}>
              {'PAY'}
            </Text>
          </TouchableOpacity>
        </CardSection>
      </Card>    
    )
  }

  renderPaymentModal() {
    const { visible, firstname, lastname, email, amount } = this.state
    return (
      <PaymentModal
        firstname={firstname}
        lastname={lastname}
        email={email}
        amount={Number(amount)}
        visible={visible}
        title='Sample App Title'
        description='Sample Payment Description'
        PBFPubKey='FLWPUBK_TEST-fc1356183ca31a6b449d32d06aadf597-X'
        txRef='rave-dash-xxx'
        onRequestClose={this.closePaymentModal}
      />    
    )
  }

  render() {
    return (
      <View>
        <Header title={'Rave Payment Gateway'} />
        {this.renderCheckoutForm()}
        {this.renderPaymentModal()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginLeft: 5,
    marginRight: 5
  },
  buttonText: {
    alignSelf: 'center',
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
});

