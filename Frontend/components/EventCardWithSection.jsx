import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from "react-native";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const EventCardWithSection = ({
  profilePicture,
  creatorName,
  isGroup, // Indicates if the event is created by a group
  eventName,
  eventDate,
  location,
  description,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Status");

  const options = [
    {
      label: "Going",
      value: "going",
      icon: <Ionicons name="checkmark-circle" size={18} color="green" />,
      color: "#4CAF50", // Green for Going
    },
    {
      label: "Not Interested",
      value: "notInterested",
      icon: <MaterialCommunityIcons name="close-circle" size={18} color="red" />,
      color: "#F44336", // Red for Not Interested
    },
    {
      label: "Interested",
      value: "interested",
      icon: <MaterialCommunityIcons name="heart-circle" size={18} color="orange" />,
      color: "#FF9800", // Orange for Interested
    },
  ];

  const handleSelect = (option) => {
    setSelectedOption(option.label);
    setDropdownVisible(false);
  };

  // Check if the description is longer than 20 words
  const descriptionWords = description.split(" ");
  const isDescriptionLong = descriptionWords.length > 20;

  return (
    <View style={styles.card}>
      {/* Left Section: Event Info */}
      <View style={styles.leftSection}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={
                typeof profilePicture === "string"
                  ? { uri: profilePicture }
                  : profilePicture
              }
              style={styles.profilePicture}
            />
            <View style={styles.nameWrapper}>
              {isGroup ? (
                <MaterialIcons name="shield" size={18} color="#000" />
              ) : null}
              <Text
                style={[
                  styles.creatorName,
                  { marginLeft: isGroup ? 5 : 0 },
                ]}
              >
                {creatorName}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.eventName}>{eventName}</Text>

        <View style={styles.eventDetails}>
          <View style={styles.eventDetailItem}>
            <Feather name="calendar" size={18} color="#666" />
            <Text style={styles.eventDetailText}>{eventDate}</Text>
          </View>
          <View style={[styles.eventDetailItem, styles.locationItem]}>
            <Feather name="map-pin" size={18} color="#666" />
            <Text style={styles.eventDetailText}>{location}</Text>
          </View>
        </View>

        <Text style={styles.description}>
          {showFullDescription || !isDescriptionLong
            ? description
            : descriptionWords.slice(0, 20).join(" ") + "..."}
        </Text>

        {isDescriptionLong && (
          <TouchableOpacity
            onPress={() => setShowFullDescription(!showFullDescription)}
            style={styles.showMoreButton}
          >
            <Text style={styles.showMoreText}>
              {showFullDescription ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Vertical Divider */}
      <View style={styles.divider}></View>

      {/* Right Section: Dropdown Picker */}
      <View style={styles.rightSection}>
        <Image
          source={
            typeof profilePicture === "string"
              ? { uri: profilePicture }
              : profilePicture
          }
          style={styles.eventImage}
        />
        <TouchableOpacity
          style={[
            styles.dropdownButton,
            { backgroundColor: options.find((opt) => opt.label === selectedOption)?.color || "#F7931E" },
          ]}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedOption}
          </Text>
        </TouchableOpacity>

        <Modal visible={dropdownVisible} transparent={true} animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionContainer}
                    onPress={() => handleSelect(item)}
                  >
                    {item.icon}
                    <Text style={styles.optionText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  leftSection: {
    flex: 1,
    paddingRight: 15,
  },
  rightSection: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  creatorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  eventDetailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
    flexWrap: "wrap", // This allows the location to wrap
  },
  locationItem: {
    marginLeft: 20,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  showMoreButton: {
    alignSelf: "flex-end",
    marginTop: 5,
  },
  showMoreText: {
    fontSize: 14,
    color: "#007BFF",
  },
  divider: {
    width: 1,
    marginHorizontal: 10,
    backgroundColor: "#ddd",
    height: "90%",
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 5,
  },
  dropdownButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  dropdownButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    width: "80%",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default EventCardWithSection;
