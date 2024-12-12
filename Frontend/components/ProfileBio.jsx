import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bio = ({ name, age, pronouns, bioText }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bio</Text>
      
      <View style={styles.bioContent}>
        <Text style={styles.bioText}>
          <Text style={styles.boldText}>Name:</Text> {name} ({age})
        </Text>
        <Text style={styles.bioText}>
          <Text style={styles.boldText}>Pronouns:</Text> {pronouns}
        </Text>
        <Text style={styles.bioText}>
          <Text style={styles.boldText}>Bio:</Text> {bioText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    
    padding: 20,
    margin: 10,
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioContent: {
    marginTop: 10,
  },
  bioText: {
    fontSize: 16,
    marginVertical: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Bio;
