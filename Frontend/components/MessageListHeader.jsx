import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import axiosInstance from "../services/AxiosConfig";
import { getUserData } from "../services/GetToken";
import Constants from "expo-constants";
import { getAuthTokens } from "../services/GetToken";

const MessageListHeader = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUserProfile, setCurrentUserProfile] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await getUserData("id");
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      const fetchCurrentUser = async () => {
        const token = await getUserData("accessToken");
        const refreshToken = await getUserData("refreshToken");
        try {
          const response = await fetch(
            `${Constants.expoConfig.extra.BASE_URL}/auth/profile/${currentUserId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
                "x-refresh-token": refreshToken, // Optionally include refresh token as a custom header
              },
            }
          );
          const data = await response.json();
          const currentUserData = await getPfp(data);
          setCurrentUserProfile(currentUserData);
        } catch (error) {
          console.error("MessageListHeader error: ", error);
        }
      };

      const getPfp = async (data) => {
        const { accessToken, refreshToken } = await getAuthTokens();
        if ("pfp" in data) {
          try {
            // Make the Axios request to get the image URL from the backend
            const response = await axiosInstance.get(
              `${Constants.expoConfig.extra.BASE_URL}/auth/pfp/${data.pfp}`,
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
            data.imageUrl = firebaseUrl;

            return data;
          } catch (error) {
            console.error("Error fetching profile picture URL:", error);
          }
        }
      };
      fetchCurrentUser(currentUserId);
    }
  }, [currentUserId]);

  return (
    <View style={styles.headerContainer}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={
            typeof currentUserProfile.imageUrl === "string"
              ? { uri: currentUserProfile.imageUrl }
              : currentUserProfile.imageUrl
          }
          style={styles.logo}
        />
      </View>

      {/* Search Bar in the Middle */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search messages..."
        />
      </View>

      {/* New Chat Button
      <TouchableOpacity style={styles.newChatButton}>
        <Ionicons name="chatbubbles-outline" size={24} color="black" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 50,
  },
  logoContainer: {
    marginRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  newChatButton: {
    padding: 10,
  },
});

export default MessageListHeader;
