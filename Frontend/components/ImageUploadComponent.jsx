import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ImageUploadComponent = ({ onUploadSuccess }) => {
  const [image, setImage] = useState(null);

  // Request permission to access media library
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
    }
  };

  // Select image from the device's photo gallery
  const pickImage = async () => {
    await requestPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);  // Save the image URI to the state
    }
  };

  // Convert the image to a Blob and send it to the parent component
  const convertToBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob(); // Convert URI to Blob
    return blob;
  };

  // Function to upload the selected image (to the parent component)
  const uploadImage = async () => {
    const uri = image;

    if (!uri) {
      alert("Please select an image first!");
      return;
    }

    try {
      const blob = await convertToBlob(uri); // Convert URI to Blob
      onUploadSuccess(blob);  // Send the Blob to the parent component
    } catch (error) {
      alert('Error processing the image: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <MaterialCommunityIcons name="image" size={24} color="white" />
        <Text style={styles.buttonText}>Pick a Profile Picture</Text>
      </TouchableOpacity>

      {/* Display selected image preview */}
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.uploadText}>Upload Image</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#5F63E2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#5F63E2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  uploadText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ImageUploadComponent;
