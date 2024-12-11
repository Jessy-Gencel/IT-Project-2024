import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';

const LinkText = ({ url, children }) => {
  // Function to handle the link press
  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Unable to open the link: ${url}`);
      }
    } catch (error) {
      Alert.alert('An error occurred while trying to open the link.');
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.linkText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: '#007BFF', // Blue color
    textDecorationLine: 'underline', // Underscore the text
    fontSize: 16, // Font size for readability
  },
});

export default LinkText;

/* <View style={styles.containerLink}>
      }
      <LinkText url="https://www.youtube.com">Go to YouTube</LinkText>
    </View>



containerLink: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },*/