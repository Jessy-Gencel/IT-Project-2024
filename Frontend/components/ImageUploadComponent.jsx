import React, { act, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ImageUploadComponent = ({ onUploadSuccess }) => {
  const [imageUri, setImageUri] = useState(null);
  const [imageMime, setImageMime] = useState(null);
  const [base64, setBase64] = useState(null);
  
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
      includeBase64: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    const uri = result.assets[0]["uri"];  // Replace with the URI of your image
    const base64Image = await uriToBase64(uri);
    if (!result.canceled) {
      setImageUri(uri);  // Save the image URI to the state
      setImageMime(result.assets[0]["mimeType"]);  // Save the image MIME type to the state
      setBase64(base64Image);  // Save the image base64 to the state
    }
  };
  const uriToBase64 = async (uri) => {
    try {
      // Fetch the image as a blob
      const response = await fetch(uri);
      const blob = await response.blob();
  
      // Convert blob to base64
      const base64 = await blobToBase64(blob);
      return base64;
    } catch (error) {
      console.error("Error converting image to base64", error);
    }
  };
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // Remove the "data:image/png;base64," part
      reader.onerror = reject;
      reader.readAsDataURL(blob); // This converts the blob into a base64 string
    });
  };

  // Function to upload the selected image (to the parent component)
  const uploadImage = async () => {
    const base64_image = base64;
    try {
      //const blob = await convertToBlob(uri); // Convert URI to Blob
      //const file = await convertToFile(blob); // Convert Blob to File
      onUploadSuccess(base64_image);  // Send the file to the parent component
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
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
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
