import React from 'react';
import { Text, Image, StyleSheet, ScrollView } from 'react-native';
import Video from 'react-native-video';

const MediaComponent = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* IMAGE LOCALE */}
      <Text style={styles.title}>Local Image</Text>
      <Image
        source={require('../assets/images/mosqueHassanII.jpg')}
        style={styles.img}
        resizeMode="contain"
      />

      {/* IMAGE INTERNET */}
      <Text style={styles.title}>Online Image!!!</Text>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.img}
        resizeMode="contain"
      />

      {/* VIDEO */}
      <Text style={styles.title}>Video</Text>
      <Video
        source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
        paused={true}
      />

      {/* AUDIO */}
      <Text style={styles.title}>Audio</Text>
      <Video
        source={{ uri: 'https://www.w3schools.com/html/horse.mp3' }}
        controls={true}
        style={styles.audio}
        paused={true}
      />

    </ScrollView>
  );
};

export default MediaComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  img: {
    marginVertical: 15,
    width: 350,
    height: 200,
  },
  video: {
    width: 350,
    height: 200,
    marginVertical: 20,
  },
  audio: {
    width: 300,
    height: 60,
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
  },
});