import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Popup from './PopUp'; // Import the Popup component
import CustomSwitch from './SlideSwitch'; // Adjust the path as needed
import SecondaryButtonPill from './SecondaryButtonPill';

const InterestsCard = ({ title, buttonText }) => {
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
    backgroundColor: '#fff',
    elevation: 1,
    
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    top:-30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8, // Spacing between title and button
  },
  smallButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    minWidth: 60,
  },
  smallButtonText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  popupText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default InterestsCard;
