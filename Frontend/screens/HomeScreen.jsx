import React,{useEffect,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity, 
} from "react-native";
import MatchingCard from '../components/MatchingCard';
import Header from "../components/DefaultHeader"; // Assuming Header component is in the same directory
import EventCardWithSection from "../components/EventCardWithSection"; // Assuming EventCardWithSection is in the same directory
import ProgressBar from "../components/ProgressBar"; // Assuming ProgressBar component is in the same directory
import GradientBackground from "../components/GradientBackground";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../services/AxiosConfig";
import { getAuthTokens } from "../services/GetToken";
import Constants from "expo-constants";

const getHomeMatches = async () => {
  try {
    const { accessToken,refreshToken } = await getAuthTokens();
    const response = await axiosInstance.get(`${Constants.expoConfig.extra.BASE_URL}/vector/getHomeMatches`,{
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include access token in the Authorization
        "x-refresh-token": refreshToken, // Optionally include refresh token as a custom header
      },
    });
    console.log("Home Matches:", response.data);
    return response.data;   // Return the data if needed elsewh
  } catch (error) {
    console.error(
      "Error fetching home matches:",
      error.response?.data || error.message
    );
    throw error; // Optionally re-throw to handle errors in the calling code
  }
};

const HomePage = () => {
  
 
  const [matchingProfiles, setMatchingProfiles] = useState([]);

  // Fetch matching profiles when component mounts
  useEffect(() => {
    const fetchMatchingProfiles = async () => {
      try {
        const data = await getHomeMatches(); // Fetch data from API
        setMatchingProfiles(data); // Set the fetched data in state
      } catch (error) {
        console.error("Error fetching matching profiles:", error);
      }
    };

    fetchMatchingProfiles(); // Fetch data
  }, []);

  const events = [
    {
      id: '1',
      profilePicture: require('../assets/brent_klein.png'),
      creatorName: 'John Doe',
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
      id: '3',
      profilePicture: require('../assets/brent_klein.png'),
      creatorName: 'John Doe',
      isGroup: false,
      eventName: "Football Afternoon",
      eventDate: "4/12",
      location: "Behind Block A, Campus KAAI",
      description: "Join us for a fun football afternoon!",
    },
    {
      id: '4',
      profilePicture: require('../assets/brent_klein.png'),
      creatorName: 'John Doe',
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
    <ScrollView style={styles.container}>
      <GradientBackground style={styles.background}>
        {/* Header */}
        <Header showBackArrow={false} notificationCount={5} />
        {/* Matching Section */}
        <MatchingCard name="Brent" age={19} src={require('../assets/gabimaru.jpg')} matchPercentage={69} interests={["Skiing", "Bears"]} />
        <View style={styles.matchingSection}>
          <Text style={styles.sectionTitle}>Matching</Text>
          {/* Explicit height for the FlatList */}
          <View style={{ height: 300 }}>
            <FlatList
              data={matchingProfiles} // This is now dynamic data fetched from the backend
              keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} // Disable scrolling
              renderItem={({ item }) => (
              <View style={styles.matchingCard}>
                <View style={styles.cardContent}>
                <Image
                  source={
                  typeof item.profilePicture === "string"
                    ? { uri: item.profilePicture }
                    : item.profilePicture
                  }
                  style={styles.pfp}
                />
                <View style={styles.cardText}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <View style={styles.progressBarCard}>
                  <Text style={styles.progressBarText}>
                    {item.match_score}%
                  </Text>
                  <ProgressBar
                    fillWidth={item.match_score}
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
          scrollEnabled={false}>
          <Text style={styles.sectionTitle}>Events</Text>
          {events.map((event) => (
            <EventCardWithSection key={event.id} {...event} />
          ))}
        </ScrollView>
      </GradientBackground>
    </ScrollView>
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
  pfp: {
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
