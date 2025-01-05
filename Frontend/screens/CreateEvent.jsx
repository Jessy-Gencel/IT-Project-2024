import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // You may need to install this library for date picker
import GradientBackground from "../components/GradientBackground"; 
import Header from "../components/DefaultHeader"; // Assuming Header component is in the same directory
import { Ionicons } from "@expo/vector-icons"; 

const GatewaysScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    location: "",
    description: "",
  });

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateConfirm = (date) => {
    setFormData({ ...formData, eventDate: date.toLocaleDateString() });
    setDatePickerVisible(false);
  };

  const handleSubmit = () => {
    // Submit the form (you can handle form submission logic here)
    console.log(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <View style={styles.container}>
      <GradientBackground style={styles.background}>
        <Header showBackArrow={true} notificationCount={5} />
        
        
        <ScrollView style={styles.eventSection} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Create Event</Text>
          
          {/* Form to Create Event */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={formData.eventName}
              onChangeText={(text) => handleInputChange("eventName", text)}
            />
            <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
              <Text style={styles.input}>
                {formData.eventDate ? formData.eventDate : "Select Event Date"}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={formData.location}
              onChangeText={(text) => handleInputChange("location", text)}
            />
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description"
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Create Event</Text>
            </TouchableOpacity>
          </View>

          {/* Date Picker Modal */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisible(false)}
          />
        </ScrollView>
      </GradientBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
    color: "#333",
  },
  background: {
    height: "10%",
  },
  formContainer: {
    marginTop: "20%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  eventSection: {
    marginTop: 20,
    flex: 1,
    width: "100%",
  },
});

export default GatewaysScreen;
