import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar';

const HomePopup = ({ 
        isVisible,
        onClose, 
        children,
        age,
        src,
        name,
        matchPercentageHobbies,
        matchPercentageInterest,
        matchPercentageMBTI,
        matchPercentageMusic,
        matchPercentageMovies,
        matchPercentageBooks,
        matchPercentageGames

 }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose} // Handles back button press on Android
    >
        <Image source={src} style={styles.image} />
        <View style={styles.nameContainer}>
                  <Text style={styles.name}>
                    {name}, {age}
                  </Text>
        </View>
    <ProgressBar
            title="Hobbies"
            fillWidth={matchPercentageHobbies} 
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
          />
    <ProgressBar
            title="interests"
            fillWidth={matchPercentageInterest}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
          />
    <ProgressBar
            title="MBTI"
            fillWidth={matchPercentageMBTI}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
            />
    <ProgressBar
            title="Music"
            fillWidth={matchPercentageMusic}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
            />
    <ProgressBar
            title="Movies"
            fillWidth={matchPercentageMovies}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
            />
    <ProgressBar
            title="Books"
            fillWidth={matchPercentageBooks}
            height={20}
            borderRadius={10}
            barColor="#4CAF50"
            />
    <ProgressBar
            title="Games"
            fillWidth={matchPercentageGames}
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
