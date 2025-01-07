import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import MatchingCard from "../components/MatchingCard";
import Header from "../components/DefaultHeader"; // Assuming Header component is in the same directory
import EventCardWithSection from "../components/EventCardWithSection"; // Assuming EventCardWithSection is in the same directory
import ProgressBar from "../components/ProgressBar"; // Assuming ProgressBar component is in the same directory
import GradientBackground from "../components/GradientBackground";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../services/AxiosConfig";
import { getAuthTokens, storeSecretStorage } from "../services/GetToken";
import Constants from "expo-constants";
import PrimaryButton from "../components/Badge";
import PrimaryButtonPill from "../components/PrimaryButtonPill";
import socket from "../services/websockets";
import { getUserData } from "../services/GetToken";
import HomePopup from "../components/HomePopup";

const getHomeMatches = async () => {
  try {
    const { accessToken, refreshToken } = await getAuthTokens();
    const response = await axiosInstance.get(
      `${Constants.expoConfig.extra.BASE_URL}/vector/getHomeMatches`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`, // Include access token in the Authorization
          "x-refresh-token": refreshToken, // Optionally include refresh token as a custom header
        },
      }
    );
    console.log("Home Matches:", response.data);
    storeMatchIds(response.data);
    return response.data; // Return the data if needed elsewh
  } catch (error) {
    console.error(
      "Error fetching home matches:",
      error.response?.data || error.message
    );
    throw error; // Optionally re-throw to handle errors in the calling code
  }
};
const storeMatchIds = async (data) => {
  const ids = data.map((match) => match.id);
  try {
    await storeSecretStorage("match_ids", JSON.stringify(ids));
    console.log("Match ids stored successfully:", ids);
  } catch (error) {
    console.error("Error storing match ids:", error);
  }
};

const getPfp = async (data) => {
  const { accessToken, refreshToken } = await getAuthTokens();

  for (const match of data) {
    if ("pfp" in match) {
      try {
        // Make the Axios request to get the image URL from the backend
        const response = await axiosInstance.get(
          `${Constants.expoConfig.extra.BASE_URL}/auth/pfp/${match.pfp}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "x-refresh-token": refreshToken,
            },
          }
        );

        // Get the Firebase URL from the response data
        const firebaseUrl = response.data.file;

        // Store the URL in the match object or wherever you need it
        match.imageUrl = firebaseUrl;

        console.log("Firebase URL received:", firebaseUrl);
      } catch (error) {
        console.error("Error fetching profile picture URL:", error);
      }
    }
  }
};

const HomePage = ({ navigation }) => {
  const [matchingProfiles, setMatchingProfiles] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [popupData, setPopupData] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  // Fetch matching profiles when component mounts
  useEffect(() => {
    const fetchMatchingProfiles = async () => {
      try {
        const data = await getHomeMatches(); // Fetch data from API
        await getPfp(data);
        console.log("Matching profiles:", data);
        setMatchingProfiles(data); // Set the fetched data in state
      } catch (error) {
        console.error("Error fetching matching profiles:", error);
      }
    };

    const fetchUserId = async () => {
      try {
        const userId = await getUserData("id");
        console.log("Fetched User ID:", userId); // id van andere user ophalen om zo navigeren naar juiste chatscreen
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
    fetchMatchingProfiles(); // Fetch data
  }, []);

  const createRoom = (userId) => {
    const roomId = `room:${Math.min(currentUserId, userId)}:${Math.max(
      currentUserId,
      userId
    )}`;
    console.log("roomId: ", roomId);
    socket.emit("join_room", {
      current_user_id: currentUserId,
      match_user_id: userId,
    });
    navigation.navigate("ChatScreen", { room: roomId, chatUserId: userId });
  };

  const homePopUp = async (userId) => {
    const { accessToken, refreshToken } = await getAuthTokens();
    const ids = { "current_user_id": currentUserId, "other_user_id": userId };

    try {
    const response = await axiosInstance.post(
      `${Constants.expoConfig.extra.BASE_URL}/vector/getMatchesWithSpecificUser`,
      ids,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken,
        },
      }
    );
    const data = response.data;
    console.log("Popup data:", data);
    setSelectedMatchId(userId);
    setPopupData(data);
    setPopupVisible(true); 
    console.log("matching profiles:", matchingProfiles);

  }catch (error) {
    console.error("Error fetching popup data:", error);
  }
  };

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
    // Add 3 more events if needed.
  ];

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <GradientBackground style={styles.background}>
        {/* Header */}
        <Header showBackArrow={false} notificationCount={5} />

        <View style={styles.matchingSection}>
          <Text style={styles.sectionTitle}>Matching</Text>
          {/* Match Profiles */}
          <ScrollView
            style={styles.matchingScroll}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            {matchingProfiles.map((item, index) => (
              <View key={`${item.id}-${index}`} style={styles.matchingCard}>
                <View style={styles.cardContent}>
                  <Image
                    source={
                      typeof item.imageUrl === "string"
                        ? { uri: item.imageUrl }
                        : item.imageUrl
                    }
                    style={styles.pfp}
                  />
                  <View style={styles.cardText}>
                    <Text style={styles.cardName}>{`${item.name.substring(0, 1).toUpperCase()}${item.name.substring(1)}`}</Text>
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
                      <View style={styles.badgeContainer}>
                        {item.traits &&
                          Object.keys(item.traits)
                            .slice(0, 3)
                            .map((traitKey, index) => {
                              const traitValue = item.traits[traitKey]?.[0]; // Get the first value of the array
                              return (
                                traitValue && ( // Render the badge only if there's a value
                                  <PrimaryButton
                                    key={index}
                                    title={traitValue} // Use the first value as the badge text
                                    isHighlighted={true}
                                    close={false}
                                  />
                                )
                              );
                            })}
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity onPress={() => createRoom(item.id)}>
                      <Ionicons
                        name="chatbubble-ellipses"
                        size={25}
                        color="black"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => homePopUp(item.id, index)}>
                      <Ionicons
                        name="information-circle-outline"
                        size={25}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <HomePopup
          isVisible={isPopupVisible}
          onClose={() => setPopupVisible(false)} // Close the popup
          matchPercentages={popupData[0]}
          src={matchingProfiles.find((profile) => profile.id == selectedMatchId)?.imageUrl}
        />

        {/* Event Section */}
        <View style={styles.eventSection}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.sectionTitle}>Events</Text>
            <PrimaryButtonPill
              style={styles.eventButton}
              title="Create Event"
              onPress={() => navigation.navigate("CreateEvent")}
            />
          </View>

          {events.map((event) => (
            <EventCardWithSection key={event.id} {...event} />
          ))}
        </View>
      </GradientBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  matchingSection: {
    marginTop: 30,
    marginHorizontal: 10,
    paddingBottom: "20%",
  },
  matchingScroll: {
    maxHeight: 500, // Optional: Limit the height for better layout
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 13,

    color: "#333",
  },
  matchingCard: {
    width: "95%",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
    marginLeft: "2.5%",
    borderWidth: 1,
    borderColor: "#ddd",
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
    marginHorizontal: 10,
    marginTop: 30,
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
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow badges to wrap if they exceed available space
    marginTop: 30,
    right: "70%",
    gap: 10, // Spacing between badges
  },
});

export default HomePage;
