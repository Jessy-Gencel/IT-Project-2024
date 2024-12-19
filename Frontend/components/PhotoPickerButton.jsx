import React, { useState } from "react";
import { Button, Image, StyleSheet, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Assets } from "../assets"; // Adjust path as necessary

const PhotoPickerButton = () => {
  const [photoUri, setPhotoUri] = useState(null);

  // Directory where we want to store the images in the app's file system
  const assetsDirectory = FileSystem.documentDirectory + "assets/";

  // Create the directory if it doesn't exist
  const createDirectory = async () => {
    try {
      const directoryInfo = await FileSystem.readDirectoryAsync(assetsDirectory);
      if (!directoryInfo) {
        await FileSystem.makeDirectoryAsync(assetsDirectory, {
          intermediates: true,
        });
      }
    } catch (error) {
      console.error("Error creating directory:", error);
    }
  };

  // Function to pick an image and save it to the file system
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.cancelled) {
        const uri = result.uri;
        setPhotoUri(uri);

        // Create directory if it doesn't exist
        await createDirectory();

        // Get the file extension (e.g., .jpg, .png)
        const fileExtension = uri.split(".").pop();
        const fileName = `photo_${new Date().getTime()}.${fileExtension}`;

        try {
          // Copy the image to the app's assets directory
          await FileSystem.copyAsync({
            from: uri,
            to: assetsDirectory + fileName,
          });

          // Store the file path in the Assets map (or elsewhere)
          Assets.set(fileName, assetsDirectory + fileName);

          Alert.alert("Success", "Image stored successfully.");
          console.log("Stored Image at:", assetsDirectory + fileName);
        } catch (error) {
          console.error("Error saving image:", error);
          Alert.alert("Error", "Failed to save image.");
        }
      } else {
        console.log("Image picking was cancelled");
      }
    } else {
      console.log("Permission denied");
      Alert.alert("Permission Denied", "Please grant media library access.");
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
