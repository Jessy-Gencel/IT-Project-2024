import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LogoWrapper = ({ logoSource, width = 120, height = 120 }) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image source={typeof logoSource === 'string' ? { uri: logoSource } : logoSource} // Handle both local and remote images
      style={[styles.logo, { width: width - 10, height: height - 10 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 1000, // Fully rounded corners for a circular appearance
    alignItems: 'center', // Center logo horizontally
    justifyContent: 'center', // Center logo vertically
    shadowColor: '#000', // Subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
    marginRight:5,
  },
  logo: {
    borderRadius: 1000, // Ensure the logo is circular
  },
});

export default LogoWrapper;
