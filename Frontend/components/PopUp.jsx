import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const PopupExample = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={styles.container}>
      {/* Button to Open Modal */}
      <TouchableOpacity onPress={openModal} style={styles.openButton}>
        <Text style={styles.openButtonText}>Show Popup</Text>
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal} // Handle back button on Android
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Pressable style={styles.popup} onPress={() => {}}>
            {/* Title */}
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Delete Account</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Entypo name="cross" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Popup Content (Extendable Area) */}
            <View style={styles.popupContent}>
              <Text style={styles.popupMessage}>
                This is a customizable popup. Add your content here.
              </Text>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    padding: 15,
    backgroundColor: '#F7931E',
    borderRadius: 8,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
  },
  popupContent: {
    marginTop: 10,
  },
  popupMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default PopupExample;

/*
<View style={styles.container}>
      <PopupExample />
    </View>
const styles = StyleSheet.create({
  containerPopUp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

    */