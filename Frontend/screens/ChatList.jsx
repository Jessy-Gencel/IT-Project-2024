import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import MessageListHeader from "../components/MessageListHeader";
import Ionicons from "react-native-vector-icons/Ionicons";
import socket from "../services/websockets";
import { getUserData } from "../services/GetToken";
import { FlatList } from "react-native";
import axios from "axios";
import axiosInstance from "../services/AxiosConfig";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuthTokens } from "../services/GetToken";

const ChatList = ({ navigation, isUnread, isMuted }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);

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

    const fetchChats = async () => {
      try {
        const userId = await getUserData("id");
        const response = await axiosInstance.get(
          `${Constants.expoConfig.extra.BASE_URL}/messages/user_chats/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        await getPfp(response.data);
        setChatUsers(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  const createRoom = (userId) => {
    const roomId = `room:${Math.min(currentUserId, userId)}:${Math.max(
      currentUserId,
      userId
    )}`;
    socket.emit("join_room", {
      current_user_id: currentUserId,
      match_user_id: userId,
    });
    navigation.navigate("ChatScreen", { room: roomId, chatUserId: userId });
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

        } catch (error) {
          console.error("Error fetching profile picture URL:", error);
        }
      }
    }
  };

  const convertTimeToReadableFormat = (isoDate) => {
    const date = new Date(isoDate);

    const now = new Date();
    const isToday = 
      date.getUTCFullYear() === now.getUTCFullYear() &&
      date.getUTCMonth() === now.getUTCMonth() &&
      date.getUTCDate() === now.getUTCDate();

      if (isToday) {
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");

        return `${hours}:${minutes}`;
      } else {
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const dayOfWeek = daysOfWeek[date.getUTCDay()];

        return dayOfWeek;

      }
  };

  const renderChatCard = ({ item }) => (
    <TouchableOpacity onPress={() => createRoom(item.id)}>
      <View style={styles.chatListContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
        <View style={styles.senderAndMessage}>
          <Text style={styles.sender}>{`${item.name.substring(0, 1).toUpperCase()}${item.name.substring(1)}`}</Text>
          <View style={styles.timeAndMessage}>
            <Text
              numberOfLines={1}
              style={[styles.message, isUnread && styles.messageUnread]}>
              Hello
            </Text>
            <Text style={[styles.time, isUnread && styles.timeUnread]}>
              12:33
            </Text>
          </View>
        </View>
        <View>
          {isMuted ? (
            <Ionicons
              name="notifications-off-outline"
              size={20}
              color="#888"
              style={styles.mutedIcon}
            />
          ) : (
            isUnread && <View style={styles.dot} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MessageListHeader style={styles.MessageListHeader} />
      <Text style={styles.title}>Messages</Text>
      {/* flatlist = lijst van items */}
      <FlatList
        data={chatUsers}
        renderItem={renderChatCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listOfChats}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#FAFAFA",
  },
  chatListContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  senderAndMessage: {
    flex: 1,
    marginLeft: 15,
  },
  sender: {
    fontWeight: "600",
    color: "#353535",
    fontSize: 18,
  },
  message: {
    color: "#353535",
    fontSize: 14,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FBB03B",
    marginLeft: 10,
  },
  messageUnread: {
    fontWeight: "bold",
  },
  timeUnread: {
    fontWeight: "bold",
  },
});
export default ChatList;
