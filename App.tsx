import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import Home from './components/Home';
import CustomButton from './components/CustomButton';
import Inputs from './components/Ui1';
import Calcule from './components/Calcule';
// type State = {
//   productCount: number;
// };

export default class App extends React.Component {

  // state = {
  //   msg: 'Hi All',
  //   number: 1,
  // };

  // updateState = () => {
  //   this.setState({
  //     msg: 'Hi Students!!!'
  //   });
  // };

  // render() {
  //   return (
  //     <View style={styles.container}>

  //       <Text style={styles.title}>
  //         {this.state.msg}
  //       </Text>

  //       <Text style={styles.number}>
  //         {this.state.number}
  //       </Text>

  //       <Button
  //         title="SET STATE !!!"
  //         onPress={this.updateState}
  //       />

  //       <Home />

  //     </View>
  //   );
  // }

  //  constructor(props: {}) {
  //   super(props);

  //   this.state = {
  //     productCount: 0
  //   };
  // }

  // addProduct = () => {
  //   this.setState({
  //     productCount: this.state.productCount + 1
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>

        {/* <CustomButton onPress={this.addProduct} />

        <Text>{this.state.productCount}</Text> */}

        {/* <Inputs/> */}
        <Calcule />

          

      </View>
    );
  }

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     color: 'green',
//     fontSize: 35,
//   },
//   number: {
//     fontSize: 20,
//     marginBottom: 10,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});