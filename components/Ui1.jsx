import React from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert
} from 'react-native'

export default class UiExample extends React.Component {

  state = {
    email: '',
    password: ''
  }

  handleEmail = (text) => {
    this.setState({ email: text })
  }

  handlePass = (text) => {
    this.setState({ password: text })
  }

  afficheAlert = (email, pass) => {
    Alert.alert(
      "Informations",
      "Email: " + email + "\nPassword: " + pass,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed")
        }
      ]
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={this.handleEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={this.handlePass}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.afficheAlert(this.state.email, this.state.password)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})