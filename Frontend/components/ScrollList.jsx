import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

const ScrollableList = ({ items }) => {
  // Function to render each item in the list
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.listContent} // Apply spacing for all items
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200, // Fixed height for the scrollable list
    margin: 16,
  },
  listContent: {
    paddingVertical: 8, // Padding at the top and bottom of the list
  },
  item: {
    padding: 15,
    marginVertical: 8, // Adds spacing between items
    borderWidth: 1,
    borderColor: '#F7931E', // Orange border
    borderRadius: 8, // Rounded corners
    backgroundColor: '#fff', // Optional: white background for better visibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Adds subtle shadow on Android
  },
});

export default ScrollableList;
