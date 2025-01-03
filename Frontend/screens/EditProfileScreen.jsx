import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button } from 'react-native';
import GradientBackground from '../components/LinearBackgroundProfile'; // Gradient background component

const EditProfileScreen = ({ navigation }) => {
  // Temporary states for UI (Replace these with fetched data later)
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState('25');
  const [pronouns, setPronouns] = useState('He/Him');
  const [bio, setBio] = useState('Hello! I love hiking, photography, and coding. Always up for an adventure!');
  const [interests, setInterests] = useState([
    { id: 1, title: 'Hobbies', text: 'Hiking, Photography' },
    { id: 2, title: 'Movies', text: 'Inception, The Matrix' },
    { id: 3, title: 'Books', text: '1984, The Alchemist' },
    { id: 4, title: 'Songs', text: 'Imagine, Bohemian Rhapsody' },
  ]);

  const handleCancel = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Enter your age"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pronouns</Text>
            <TextInput
              style={styles.input}
              value={pronouns}
              onChangeText={setPronouns}
              placeholder="Enter your pronouns"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself"
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          {interests.map((item) => (
            <View key={item.id} style={styles.inputGroup}>
              <Text style={styles.label}>{item.title}</Text>
              <TextInput
                style={styles.input}
                value={item.text}
                onChangeText={(text) => {
                  const updatedInterests = interests.map((interest) =>
                    interest.id === item.id ? { ...interest, text } : interest
                  );
                  setInterests(updatedInterests);
                }}
                placeholder={`Enter your ${item.title}`}
              />
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleCancel} color="#FF5C5C" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5F63E2',
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default EditProfileScreen;
