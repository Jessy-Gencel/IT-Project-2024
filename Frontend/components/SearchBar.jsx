import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText, placeholder, onBlur }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search'}
        placeholderTextColor="#999"
        onBlur={onBlur} // Called when the TextInput loses focus
      />
      <Ionicons name="search" size={20} color="#999" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 5,
    color: '#333',
  },
  icon: {
    marginLeft: 10,
  },
});

export default SearchBar;

/*const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.containerSearchBar}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search here..."
          onBlur={() => console.log('Search Bar Lost Focus')} // Optional, for additional actions
        />
      </View>
    </TouchableWithoutFeedback>
    
  );
};

const styles = StyleSheet.create({
  containerSearchBar: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});*/ 