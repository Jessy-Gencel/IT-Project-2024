import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar';

const HomePopup = ({ isVisible, onClose, children }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose} // Handles back button press on Android
    >
    <ProgressBar
            title="Hobbies"
            fillWidth={matchPercentage}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
          />
    <ProgressBar
            title="interests"
            fillWidth={matchPercentage}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
          />
    <ProgressBar
            title="MBTI"
            fillWidth={matchPercentage}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
            />
    <ProgressBar
            title="Music"
            fillWidth={matchPercentage}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
            />
    <ProgressBar
            title="Movies"
            fillWidth={matchPercentage}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
            />
    <ProgressBar
            title="Books"
            fillWidth={matchPercentage}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
            />
    <ProgressBar
            title="Games"
            fillWidth={matchPercentage}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
            />
    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Entypo name="cross" size={24} color="#000" />
    </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({

});

export default Popup;
