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
import GradientBackground from "../components/LinearBackground";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../services/AxiosConfig";

const response = axiosInstance.get("/vector/");
console.log(response);



const HomePage = () => {
  
  const matchingProfiles = [
    {
      id: "1",
      name: "Alice",
      progress: 70,
      profilePicture: require("../assets/brent_klein.png"),
    },
    {
      id: "2",
      name: "Bob",
      progress: 85,
      profilePicture: require("../assets/brent_klein.png"),
    },
    {
      id: "3",
      name: "Charlie",
      progress: 60,
      profilePicture: require("../assets/brent_klein.png"),
    },
    {
      id: "4",
      name: "Diana",
      progress: 90,
      profilePicture: require("../assets/brent_klein.png"),
    },
    {
      id: "5",
      name: "Eve",
      progress: 75,
      profilePicture: require("../assets/brent_klein.png"),
    },
  ];

  const events = [
    {
      id: "2",
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
      id: "2",
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
    // Add 3 more events if needed.
  ];

  return (
    <View style={styles.container}>
      <GradientBackground style={styles.background}>
        {/* Header */}
        <Header showBackArrow={false} notificationCount={5} />

        {/* Matching Section */}

        <View style={styles.matchingSection}>
          <Text style={styles.sectionTitle}>Matching</Text>
          <View style={{ height: 300 }}>
            {" "}
            {/* Explicit height for the FlatList */}
            <FlatList
              data={matchingProfiles}
              keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true} // Allow nested scrolling inside ScrollView
              renderItem={({ item }) => (
                <View style={styles.matchingCard}>
                  <View style={styles.cardContent}>
                    <Image
                      source={
                        typeof item.profilePicture === "string"
                          ? { uri: item.profilePicture }
                          : item.profilePicture
                      }
                      style={styles.profilePicture}
                    />

                    <View style={styles.cardText}>
                      <Text style={styles.cardName}>{item.name}</Text>
                      <View style={styles.progressBarCard}>
                        <Text style={styles.progressBarText}>
                          {item.progress}%
                        </Text>
                        <ProgressBar
                          fillWidth={item.progress}
                          height={15}
                          borderRadius={10}
                          barColor="#5F63E2"
                        />
                      </View>
                    </View>
                    <View style={styles.cardActions}>
                      <TouchableOpacity>
                        <Ionicons
                          name="chatbubble-ellipses"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Ionicons
                          name="information-circle-outline"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

        {/* Event Section */}
        <ScrollView
          style={styles.eventSection}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Events</Text>
          {events.map((event) => (
            <EventCardWithSection key={event.id} {...event} />
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
  matchingSection: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 30,
    marginTop: 30,
    Height: 300, // Ensures FlatList doesn't grow beyond this height
  },
  matchingList: {
    Height: 300,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
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
    left: -12,
    width: "110%",
    backgroundColor: "#fff",
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
});

export default HomePage;
