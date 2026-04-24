import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Fruit List!!!!</Text>

      <FlatList
        data={[
          { key: 'Orange' },
          { key: 'Banane' },
          { key: 'Pomme' },
          { key: 'Avocat' },
          { key: 'Poire' },
          { key: 'Orange' },
          { key: 'Banane' },
          { key: 'Pomme' },
          { key: 'Avocat' },
          { key: 'Poire' },
          { key: 'Orange' },
          { key: 'Banane' },
          { key: 'Pomme' },
          { key: 'Avocat' },
          { key: 'Poire' },
        ]}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.key}</Text>
        )}
      />

    </View>
  );
};

export default FlatListBasics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    marginVertical: 5,
  },
});