import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Alert, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Assuming `Assets` is an existing map in your project
// If it is not declared globally, you can import it from where it's defined.
import { Assets } from "../assets"; // Update the path as necessary

const PhotoPickerButton = () => {
  const [photoUri, setPhotoUri] = useState(null); // State to keep track of the selected image URI
  const [imageKey, setImageKey] = useState(0); // This helps keep track of the image key for Assets

  // Function to handle image picking
  const pickImage = async () => {
    // Request permission to access the gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your photos to proceed.");
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setPhotoUri(uri); // Save the URI in the state

      // Save the image URI in the Assets map with a unique key
      Assets.set(imageKey, uri);
      setImageKey((prevKey) => prevKey + 1); // Increment the image key for uniqueness

      // Optionally, you can log the Assets to see the stored data
      console.log(Assets);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose a Picture</Text>
      </TouchableOpacity>

      {/* Optionally display the selected image URI */}
      {photoUri && (
        <Text style={styles.selectedImage}>Selected Image URI: {photoUri}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#5F63E2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  selectedImage: {
    marginTop: 20,
    color: "gray",
    fontSize: 14,
  },
});

export default PhotoPickerButton;
