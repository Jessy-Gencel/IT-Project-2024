import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ fillWidth, height = 40, borderRadius = 25, barColor = '#F7931E' }) => {
  const validatedFillWidth = Math.min(Math.max(fillWidth, 0), 100); // Ensure the fill width is between 0 and 100

  return (
    <View
      style={[
        styles.container,
        {
          height: height, // Dynamic height
          borderRadius: borderRadius, // Dynamic border radius
        },
      ]}
    >
      <View
        style={[
          styles.filledBar,
          {
            width: `${validatedFillWidth}%`, // Dynamic width based on fillWidth prop
            backgroundColor: barColor, // Dynamic fill color
            borderRadius: borderRadius, // Match container border radius
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%', // Full width of the container
    borderWidth: 1,
    borderColor: 'lightgrey', // Light grey border
    backgroundColor: '#F0F0F0', // Light grey background for the unfilled portion
    overflow: 'hidden', // Ensures rounded corners
  },
  filledBar: {
    height: '100%', // Fill the full height of the container
  },
});

export default ProgressBar;

/* 
Example Usage:

const App = () => {
  return (
    <View style={styles.containerProgressBar}>
      <ProgressBar fillWidth={56} height={20} borderRadius={10} barColor="#4CAF50" />
      <ProgressBar fillWidth={75} height={30} borderRadius={15} barColor="#2196F3" />
    </View>
  );
};

const styles = StyleSheet.create({
  containerProgressBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
*/
