import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      {/* Fixed Background */}
      <LinearGradient
        colors={['#F7931E', '#FFFFFF']}
        locations={[0, 1]} // Stops gradient halfway
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    zIndex: -1, // Pushes the gradient behind the content
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
});

export default GradientBackground;
