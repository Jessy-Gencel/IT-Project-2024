import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ImageEditComponent = ({ onUploadSuccess }) => {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to enable permissions to use this feature.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const { uri, base64 } = result.assets[0];
      setImageUri(uri); // Update preview
      onUploadSuccess(base64); // Pass base64 to parent
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <MaterialCommunityIcons name="image" size={24} color="white" />
        <Text style={styles.buttonText}>Change Picture</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  button: {
    backgroundColor: '#5F63E2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: 'white', fontSize: 16, marginLeft: 10 },
  imagePreview: { width: 100, height: 100, borderRadius: 50, marginTop: 10 },
});

export default ImageEditComponent;
