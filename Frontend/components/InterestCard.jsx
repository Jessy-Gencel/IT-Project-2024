import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Popup from './PopUp'; // Import the Popup component
import CustomSwitch from './SlideSwitch'; // Custom Switch component
import SecondaryButtonPill from './SecondaryButtonPill';
import InputField from './InputField'; // Input Field component
import Badge from "./Badge"; // Badge component

const InterestsCard = ({ title, buttonText, id, badges_array }) => {
  const [isEnabled, setIsEnabled] = useState(false); // Switch state
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup state
  const [inputValue, setInputValue] = useState(""); // State for input value
  const [badges, setBadges] = useState(badges_array); // Array to store badges
  
  // Toggle Switch
  const toggleSwitch = () => setIsEnabled((prevState) => !prevState);
  
  // Open Popup
  const openPopup = () => setIsPopupVisible(true);
  
  // Close Popup
  const closePopup = () => setIsPopupVisible(false);
  
  // Handle Add Badge
  const handleAddBadge = () => {
    if (inputValue.trim() !== "") {
      setBadges((prevBadges) => [...prevBadges, inputValue]);
      setInputValue(""); // Clear input after adding
      closePopup(); // Close popup after adding badge
    }
  };

  return (
    <View>
      {/* Card Layout */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          {/* Title and Button */}
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      {/* Badges Container */}
      <View style={styles.badgeContainer}>
        {badges.map((badge, index) => (
          <View key={index} style={styles.badgeWrapper}>
            <Badge title={badge} isHighlighted />
          </View>
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    
    backgroundColor: '#fff',
    borderColor:'grey',
    borderTopWidth: 1,
    
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 15, // Spacing between title and button
  },
  smallButton: {
    paddingHorizontal: 8, // Reduced padding
    paddingVertical: 4,  // Reduced vertical padding
    backgroundColor: '#007BFF',
    borderRadius: 6,    // Adjusted border radius
    minWidth: 50,       // Reduced minimum width
  },
  smallButtonText: {
    fontSize: 10, // Smaller font size
    color: '#fff',
    textAlign: 'center',
  },
  badgeContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, // Space between badges
  },
  badgeWrapper: {
    marginBottom: 10, // Space between rows
    width: '30%', // Ensures 3 badges per row
  },
  popupText: {
    fontSize: 16,
    textAlign: 'center',
  },
  addButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyPopup: {
    padding: 20,
  },
  inputPopup: {
    padding: 20,
  },
});

export default InterestsCard;