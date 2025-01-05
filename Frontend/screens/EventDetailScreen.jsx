import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

const EventDetailScreen = ({ navigation }) => {
  // Hardcoded event data
  const event = {
    profilePicture: require("../assets/brent_klein.png"),
    creatorName: "John Doe",
    eventName: "Football Afternoon",
    eventDate: "4/12",
    location: "Behind Block A, Campus KAAI",
    description: "Join us for a fun football afternoon!",
    attendees: 50,
    interested: 120,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={event.profilePicture} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.eventName}>{event.eventName}</Text>
        <Text style={styles.details}>By: {event.creatorName}</Text>
        <Text style={styles.details}>Date: {event.eventDate}</Text>
        <Text style={styles.details}>Location: {event.location}</Text>
        <Text style={styles.description}>{event.description}</Text>
        <Text style={styles.attendees}>Attendees: {event.attendees}</Text>
        <Text style={styles.interested}>Interested: {event.interested}</Text>
      </View>
      <PrimaryButton
        title="Back to Events"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: "90%",
    height: 200,
    borderRadius: 10,
  },
  content: {
    padding: 20,
  },
  eventName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginVertical: 10,
  },
  attendees: {
    fontSize: 14,
    marginVertical: 5,
  },
  interested: {
    fontSize: 14,
    marginVertical: 5,
  },
  backButton: {
    marginVertical: 20,
    alignSelf: "center",
  },
});

export default EventDetailScreen;
