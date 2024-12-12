import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Popup from './PopUp'; // Import the Popup component
import CustomSwitch from './SlideSwitch'; // Adjust the path as needed
import SecondaryButtonPill from './SecondaryButtonPill';

const InterestsCard = ({ title, buttonText, id }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((prevState) => !prevState);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const openPopup = () => setIsPopupVisible(true);
  const closePopup = () => setIsPopupVisible(false);

  return (
    <View>
      {/* Card with Title, Switch, and Add Button */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>
          <SecondaryButtonPill 
            title={buttonText} 
            onPress={openPopup} 
            style={styles.smallButton} 
            textStyle={styles.smallButtonText} 
          />
        </View>
        <CustomSwitch />
      </View>
      
      {/* Popup Component */}
      <Popup isVisible={isPopupVisible} onClose={closePopup}>
        {/* Dynamic Content */}
        <Text style={styles.popupText}>Hello! This is a dynamic popup.</Text>
      </Popup>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardContent: {
    top:-25,
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
  popupText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default InterestsCard;
