import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Popup = ({ isVisible, onClose, children }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose} // Handles back button press on Android
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.popup} onPress={() => {}}>
          {/* Popup Header with Close Button */}
          <View style={styles.popupHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Entypo name="cross" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Popup Content */}
          <View style={styles.popupContent}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent gray background
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    minWidth: 300,
    maxWidth: '90%',
    minHeight: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    padding: 5,
  },
  popupContent: {
    marginTop: 10,
  },
});

export default Popup;
