import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from './SearchBar'; // Make sure the path is correct

const MessageListHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.headerContainer}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: 'https://via.placeholder.com/40',
          }}
          style={styles.logo}
        />
      </View>

      {/* Search Bar in the Middle */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search messages..."
        />
      </View>

      {/* New Chat Button */}
      <TouchableOpacity style={styles.newChatButton}>
        <Ionicons name="chatbubbles-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  logoContainer: {
    marginRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  newChatButton: {
    padding: 10,
  },
});

export default MessageListHeader;
