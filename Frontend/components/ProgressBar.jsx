import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ fillWidth }) => {
  const validatedFillWidth = Math.min(Math.max(fillWidth, 0), 100); // Ensure the fill width is between 0 and 100

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.filledBar,
          { width: `${validatedFillWidth}%` }, // Dynamic width based on fillWidth prop
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40, // Height of the progress bar
    width: '100%', // Full width of the container
    borderWidth: 1,
    borderColor: 'lightgrey', // Light grey border
    borderRadius: 25, // Rounded corners
    backgroundColor: '#F0F0F0', // Light grey background for the unfilled portion
    overflow: 'hidden', // Ensures rounded corners
  },
  filledBar: {
    height: '100%', // Fill the full height of the container
    backgroundColor: '#F7931E', // The fill color (Orange)
    borderRadius: 25, // Match the rounded corners
  },
});

export default ProgressBar;
/* 
const App = () => {
  return (
    <View style={styles.ProgressBar}>
      <ProgressBar fillWidth={56} />
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


