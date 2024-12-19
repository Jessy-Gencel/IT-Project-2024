import React, { useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Assets } from "../path/to/Assets";  // Replace with your actual Assets map path

const PhotoPickerButton = () => {
  const [photoUri, setPhotoUri] = useState(null);

  const pickImage = async () => {
    // Request permission to access the device's photo library (if not already granted)
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted) {
      // Open the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
        allowsEditing: false, // Don't allow editing
        quality: 1, // Maximum quality
      });

      if (!result.cancelled) {
        const uri = result.uri;
        setPhotoUri(uri);

        // Store the image in the Assets map
        const imageKey = `image_${new Date().getTime()}`; // Generate a unique key for each image
        Assets.set(imageKey, uri);  // Store the URI in the Assets map
        console.log("Stored Image URI:", uri);
      } else {
        console.log("Image picking was cancelled");
      }
    } else {
      console.log("Permission to access media library was denied");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Image" onPress={pickImage} />
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.imagePreview} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  imagePreview: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default PhotoPickerButton;
