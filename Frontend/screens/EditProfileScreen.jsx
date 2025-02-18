import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PrimaryButtonPill from '../components/PrimaryButtonPill';
import TertiaryButon from '../components/TertiaryButton';
import Badge from '../components/Badge';
import axiosInstance from "../services/AxiosConfig";
import { getUserData } from "../services/GetToken";
import Constants from "expo-constants";

// Validation schema using Yup
const schema = yup.object({
  bioText: yup.string().max(500, 'Biography should not exceed 500 characters'),
  interests: yup.object().required('Interests are required'),  // interests should be an object, not an array
});

const EditProfileScreen = ({ route, navigation }) => {
  const { profile, interests } = route.params;
  const [selectedInterests, setSelectedInterests] = useState(interests || {});
  const [newInterestValue, setNewInterestValue] = useState(''); // Local state to capture the input value
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: profile.id,
      bioText: profile.bioText || '',
      interests: selectedInterests, // Pass the default interests object
    },
  });

  useEffect(() => {
    setValue('interests', selectedInterests); // Make sure form is updated with the latest selectedInterests
  }, [selectedInterests, setValue]);

  // Handle adding a new interest value
  const handleAddInterestValue = (trait, value) => {
    const valueToAdd = value ? value.trim() : ''; // Ensure value is a string and trimmed


    if (!valueToAdd) {
      
      return; // Prevent empty value
    }

    // Clone selectedInterests to avoid direct mutation
    const newSelectedInterests = { ...selectedInterests };

    if (!newSelectedInterests[trait]) {
      newSelectedInterests[trait] = []; // Initialize trait array if not exists
    }

    // Add the new value to the interest array

    newSelectedInterests[trait] = [...newSelectedInterests[trait], valueToAdd];


    // Update the state with new selected interests
    setSelectedInterests(newSelectedInterests);

    // Reset the input field
    setNewInterestValue(''); // Reset the input field after adding
  };

  // Handle removing an interest value
  const handleRemoveInterestValue = (trait, value) => {

    const updatedValues = selectedInterests[trait]?.filter(v => v !== value) || [];
    const newSelectedInterests = { ...selectedInterests };

    newSelectedInterests[trait] = updatedValues; // Remove the value from the array


    setSelectedInterests(newSelectedInterests); // Update the state
    setValue('interests', newSelectedInterests); // Update form values
  };

  // Handle form submission (update profile)
  const handleFormSubmit = async (data) => {

    try {
      const accessToken = await getUserData("accessToken");
      const refreshToken = await getUserData("refreshToken");

      const response = await axiosInstance.post(`${Constants.expoConfig.extra.BASE_URL}/auth/profile/edit`, {
        id: data.id,
        bioText: data.bioText,
        traits: data.interests, // Include updated interests
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken,
        }
      });

      Alert.alert('Success', 'Your profile has been updated');
      navigation.goBack(); // Navigate back after success
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'There was an error updating your profile. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.EditProfiletitle}>Edit Profile</Text>

      {/* Bio */}
      <Controller
        control={control}
        name="bioText"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your bio"
            multiline
          />
        )}
      />
      {errors.bioText && <Text style={styles.error}>{errors.bioText.message}</Text>}

      <Text style={styles.subTitle}>Interests</Text>

      {/* Loop through traits and their values */}
      {Object.entries(selectedInterests).map(([trait, values]) => {
        if (trait === "mbti") {
          return null; // Skip "mbti" trait
        }

        return (
          <View key={trait} style={styles.card}>
            <Text style={styles.traitTitle}>{trait}</Text>

            {/* Display badges for each trait */}
            <View style={styles.badgeList}>
              {(Array.isArray(values) ? values : []).map((value, index) => (
                <Badge
                  key={index}
                  title={value}
                  onPress={() => handleRemoveInterestValue(trait, value)}
                  isHighlighted
                  close
                />
              ))}
            </View>

            {/* Input field and Add button for new value */}
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder={`Add a new ${trait}`}
                value={newInterestValue} // Bind to local state
                onChangeText={setNewInterestValue} // Update local state on change
                onSubmitEditing={() => handleAddInterestValue(trait, newInterestValue)}
              />
              <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => {
                  handleAddInterestValue(trait, newInterestValue);
                }}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <PrimaryButtonPill title="Save Changes" onPress={handleSubmit(handleFormSubmit)} />
      <TertiaryButon title="Cancel" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  EditProfiletitle:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    flex: 1,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  traitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  badgeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#007BFF', // Blue color for the button
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditProfileScreen;