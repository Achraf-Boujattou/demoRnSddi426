import React, { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

function Home() {

  const [counter, setCounter] = useState(0);
  const [msg, setMsg] = useState("I am Home Component!!!");

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const changeMsg = () => {
    setMsg("My state has changed!!!!");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.txt}>{msg}</Text>
      <Text style={styles.txt}>{counter}</Text>

      <View style={styles.view}>
        <Button
          title="Set Counter!!!"
          onPress={incrementCounter}
        />
      </View>

      <View style={styles.view}>
        <Button
          title="Set Message!!!"
          onPress={changeMsg}
        />
      </View>

    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
  },
  txt: {
    fontSize: 25,
    color: 'blue',
    marginBottom: 10,
  },
  view: {
    margin: 5,
    width: '60%',
  },
});