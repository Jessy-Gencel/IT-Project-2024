import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../components/DefaultHeader"; // Assuming Header component is in the same directory
import EventCardWithSection from "../components/EventCardWithSection"; // Assuming EventCardWithSection is in the same directory
import ProgressBar from "../components/ProgressBar"; // Assuming ProgressBar component is in the same directory
import GradientBackground from "../components/GradientBackground";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButtonPill from "../components/PrimaryButtonPill";
const events = [
  {
    id: "1",
    profilePicture: require("../assets/brent_klein.png"),
    creatorName: "John Doe",
    isGroup: false,
    eventName: "Football Afternoon",
    eventDate: "4/12",
    location: "Behind Block A, Campus KAAI",
    description: "Join us for a fun football afternoon!",
  },
  {
    id: "2",
    profilePicture: require("../assets/brent_klein.png"),
    creatorName: "John Doe",
    isGroup: false,
    eventName: "Football Afternoon",
    eventDate: "4/12",
    location: "Behind Block A, Campus KAAI",
    description:
      "Join us for a fun football afternoon!Join us for a fun football afternoon!Join us for a fun football afternoon!Join us for a fun football afternoon!Join us for a fun football afternoon!",
  },
  {
    id: "3",
    profilePicture: require("../assets/brent_klein.png"),
    creatorName: "John Doe",
    isGroup: false,
    eventName: "Football Afternoon",
    eventDate: "4/12",
    location: "Behind Block A, Campus KAAI",
    description: "Join us for a fun football afternoon!",
  },
  {
    id: "4",
    profilePicture: require("../assets/brent_klein.png"),
    creatorName: "John Doe",
    isGroup: false,
    eventName: "Football Afternoon",
    eventDate: "4/12",
    location: "Behind Block A, Campus KAAI",
    description:
      "Join us for a fun football afternoon!Join us for a fun football afternoon!Join us for a fun football afternoon!Join us for a fun football afternoon!Join us for a fun football afternoon!",
  },
];

const GatewaysScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <GradientBackground style={styles.background}>
        <Header showBackArrow={false} notificationCount={5} />
        <ScrollView
          style={styles.eventSection}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.sectionTitle}>Events</Text>
            <PrimaryButtonPill
              style={styles.eventButton}
              title="Create Event"
              onPress={() => navigation.navigate("CreateEvent")}
            />
          </View>
          {events.map((event) => (
            <EventCardWithSection key={event.id} id={event.id} {...event}  />
          ))}
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
  matchingCard: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  cardText: {
    flex: 1,
    marginLeft: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 70,
  },
  eventSection: {
    marginTop: 20,
    flex: 1,

    width: "95%",
    marginHorizontal: "2.5%",
  },
  progressBarCard: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
  },
  progressBarText: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 12,
    fontWeight: "bold",
    color: "#5F63E2",
  },
  containerHeader: {
    marginBottom: 20,
    flex: 1,
  },
});

export default GatewaysScreen;
