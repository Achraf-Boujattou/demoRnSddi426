import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

export default class Calcule extends Component {

  state = {
    num1: '',
    num2: '',
    result: ''
  }

  calculate = (operation) => {
    const n1 = parseFloat(this.state.num1)
    const n2 = parseFloat(this.state.num2)

    if (isNaN(n1) || isNaN(n2)) {
      this.setState({ result: 'Invalid input' })
      return
    }

    let res = 0

    if (operation === '+') res = n1 + n2
    if (operation === '-') res = n1 - n2
    if (operation === '*') res = n1 * n2
    if (operation === '/') res = n2 !== 0 ? n1 / n2 : 'Error'

    this.setState({ result: res })
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Calculator 🧮</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter first number"
          placeholderTextColor="#999"
          keyboardType="numeric"
          onChangeText={(text) => this.setState({ num1: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter second number"
          placeholderTextColor="#999"
          keyboardType="numeric"
          onChangeText={(text) => this.setState({ num2: text })}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.calculate('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => this.calculate('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => this.calculate('*')}>
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => this.calculate('/')}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.result}>
          Result: {this.state.result}
        </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    justifyContent: 'center'
  },

  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },

  input: {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20
  },

  button: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 10,
    width: '22%',
    alignItems: 'center',
    elevation: 5
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },

  result: {
    color: '#22c55e',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  }

})