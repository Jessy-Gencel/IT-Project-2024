import React, { use, useEffect, useState } from "react";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import GradientBackground from "../components/GradientBackground";
import Header from "../components/DefaultHeader";
import { Ionicons } from "@expo/vector-icons";
import { getUserData } from "../services/GetToken";
import axiosInstance from "../services/AxiosConfig";
import Constants from "expo-constants";

const GatewaysScreen = ({ navigation }) => {
  const [presets, setPresets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    location: "",
    description: "",
    badges: {
      interests: [],
      books: [],
      games: [],
      movies: [],
      music: [],
      hobbies: [],
    },
  });

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateConfirm = (date) => {
    setFormData({ ...formData, eventDate: date.toLocaleDateString() });
    setDatePickerVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const userId = await getUserData("id");
      let organizerFirstName = await getUserData("first_name");
      let organizerLastName = await getUserData("last_name");
      organizerFirstName =
        organizerFirstName.substring(0, 1).toUpperCase() +
        organizerFirstName.substring(1);
      organizerLastName =
        organizerLastName.substring(0, 1).toUpperCase() +
        organizerLastName.substring(1);
      const organizerFullName = organizerFirstName + " " + organizerLastName;
      const eventData = {
        ...formData,
        organizer: userId,
        organizerFullName: organizerFullName,
      };

      const response = await axiosInstance.post(
        `${Constants.expoConfig.extra.BASE_URL}/events`,
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Event created successfully!");
        alert("Event created successfully!");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event!");
    }
    console.log(eventData);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    const fetchPresets = async () => {
      try {
        const response = await axiosInstance.get(
          `${Constants.expoConfig.extra.BASE_URL}/preset/get`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setPresets(response.data);
        } else {
          console.error("Failed to fetch presets:", response.status);
        }
      } catch (error) {
        console.error("Error fetching presets:", error);
      }
    };
    fetchPresets();
  }, []);

  const filterPresets = () => {
    const searchLower = searchText.toLowerCase();

    const uniquePresets = presets
      .flatMap((category) => category[Object.keys(category)[0]])
      .filter((preset) => preset.toLowerCase().includes(searchLower));

    return [...new Set(uniquePresets)];
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  // TODO: Fix issue with assigning preset to the correct category
  // Problem: Some presets belong to multiple categories (e.g., "Horror" is in books, movies, and games).
  // Currently, the preset is only added to one of the categories found.
  // It's unclear which category the user intended to add the preset to.
  // Potential Solution: Provide a way for the user to specify the category, or handle duplicates more intelligently.
  const handleBadgeChange = (preset) => {
    const updatedBadges = { ...formData.badges };

    const categoryKey = Object.keys(updatedBadges).find((key) =>
      presets.some((category) => category[key]?.includes(preset))
    );

    if (!categoryKey) {
      console.error("Preset not found in any category");
      return;
    }

    if (updatedBadges[categoryKey].includes(preset)) {
      updatedBadges[categoryKey] = updatedBadges[categoryKey].filter(
        (badge) => badge !== preset
      );
    } else {
      updatedBadges[categoryKey].push(preset);
    }

    setFormData({ ...formData, badges: updatedBadges });
  };

  return (
    <View style={styles.container}>
      <GradientBackground style={styles.background}>
        <Header showBackArrow={true} notificationCount={5} />

        <ScrollView
          style={styles.eventSection}
          showsVerticalScrollIndicator={false}
        >
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

            {/* Display selected badges */}
            <View style={styles.selectedBadgesContainer}>
              <Text style={styles.selectedBadgesTitle}>Selected Badges:</Text>
              {Object.keys(formData.badges).map(
                (category) =>
                  formData.badges[category].length > 0 && (
                    <View key={category} style={styles.badgeCategory}>
                      <Text style={styles.badgeCategoryTitle}>{category}:</Text>
                      <View style={styles.badgeList}>
                        {formData.badges[category].map((badge, index) => (
                          <View key={index} style={styles.badgeItem}>
                            <Text>{badge}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )
              )}
            </View>

            {/* Display matching presets */}
            <View style={styles.presetList}>
              {filterPresets().slice(0, 5).map((preset, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleBadgeChange(preset)}
                  style={styles.presetItem}
                >
                  <Text>{preset}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Search bar for filtering presets */}
            <TextInput
              style={styles.input}
              placeholder="Search presets"
              value={searchText}
              onChangeText={handleSearchChange}
            />
            
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}
            >
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
  presetList: {
    marginTop: 10,
  },
  presetItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedBadgesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  badgeCategory: {
    marginBottom: 10,
  },
  badgeCategoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  badgeList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badgeItem: {
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
});

export default GatewaysScreen;
