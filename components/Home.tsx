import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

function Home({ navigation }: { navigation: any }) {

  // const [counter, setCounter] = useState(0);
  // const [msg, setMsg] = useState("I am Home Component!!!");

  // const incrementCounter = () => {
  //   setCounter(counter + 1);
  // };

  // const changeMsg = () => {
  //   setMsg("My state has changed!!!!");
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Bienvenue dans votre application</Text>
      </View>

      <View style={styles.menuGrid}>
        
        <TouchableOpacity 
          style={[styles.card, { borderLeftColor: '#4CAF50' }]} 
          onPress={() => navigation.navigate('calculs')}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>🧮</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Calculs</Text>
            <Text style={styles.cardSub}>Outils de mathématiques</Text>
          </View>
        </TouchableOpacity>

        {/* SECTION MISE À JOUR : Icône cohérente avec le formulaire de Login */}
        <TouchableOpacity 
          style={[styles.card, { borderLeftColor: '#2196F3' }]} 
          onPress={() => navigation.navigate('ui1')}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>🔐</Text> 
          </View>
          <View>
            <Text style={styles.cardTitle}>Connexion</Text>
            <Text style={styles.cardSub}>Accéder à votre compte</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { borderLeftColor: '#FF9800' }]} 
          onPress={() => navigation.navigate('list')}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>📋</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Liste</Text>
            <Text style={styles.cardSub}>Gestion des données</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { borderLeftColor: '#E91E63' }]} 
          onPress={() => navigation.navigate('media')}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>🖼️</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Images</Text>
            <Text style={styles.cardSub}>Galerie multimédia</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.card, { borderLeftColor: '#00BCD4' }]} 
          onPress={() => navigation.navigate('weather')}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>🌤️</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Météo</Text>
            <Text style={styles.cardSub}>Consulter la météo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { borderLeftColor: '#e94560' }]} 
          onPress={() => navigation.navigate('movies')}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>🎬</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Films</Text>
            <Text style={styles.cardSub}>Rechercher des films</Text>
          </View>
        </TouchableOpacity>
        

      </View>

      {/* <Text style={styles.txt}>{msg}</Text>
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
      </View> */}

    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',
  //   marginTop: 40,
  // },
  // txt: {
  //   fontSize: 25,
  //   color: 'blue',
  //   marginBottom: 10,
  // },
  // view: {
  //   margin: 5,
  //   width: '60%',
  // },

  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    color: '#7A7A7A',
    marginTop: 5,
  },
  menuGrid: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  emoji: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  cardSub: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  container1: {
    margin: 10,
  },
});