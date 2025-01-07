import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Badge from "../components/Badge";
import MessageBubble from "../components/MessageBubble";
import LinearBackground from "../components/GradientBackground";
import axiosInstance from "../services/AxiosConfig";
import { getUserData } from "../services/GetToken";
import socket from "../services/websockets";
import Constants from "expo-constants";
import { useRef } from "react";
import { getAuthTokens, storeSecretStorage } from "../services/GetToken";

const getMessages = async (room) => {
  const response = await axiosInstance.get(
    `${Constants.expoConfig.extra.BASE_URL}/messages/${room}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const sortedMessages = response.data.sort((a, b) => {
    const timestampA = new Date(a.timestamp);
    const timestampB = new Date(b.timestamp);
    return timestampA - timestampB; // This will sort in ascending order (oldest first)
  });

  return sortedMessages;
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

const ChatScreen = ({ navigation, route }) => {
  const { room, chatUserId } = route.params;
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef(null);
  const [chatUserProfile, setChatUserProfile] = useState([]);

  const sendMessage = (room, sender_id, message) => {
    const timestamp = new Date().toISOString();
    socket.emit("send_message", {
      room: room,
      sender_id: sender_id,
      message: message,
      timestamp: timestamp,
    });
    setMessage("");
  };

  useEffect(() => {
    const fetchMessages = async (room) => {
      try {
        const data = await getMessages(room);
        setMessages(data);
      } catch (error) {
        if (error.response.status === 404) {
          console.log("no messages found");
        } else {
          console.error("Error fetching messages:", error);
        }
      }
    };

    const fetchUserId = async () => {
      try {
        const userId = await getUserData("id"); // Retrieve user ID
        setCurrentUserId(userId); // Update state
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    const fetchChatUser = async (chatUserId) => {
      const token = await getUserData("accessToken");
      const refreshToken = await getUserData("refreshToken");
      try {
        const response = await fetch(
          `${Constants.expoConfig.extra.BASE_URL}/auth/profile/${chatUserId}`,
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
        const chatUserData = await getPfp(data);
        setChatUserProfile(chatUserData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages(room);
    fetchUserId();
    fetchChatUser(chatUserId);

    socket.on("new_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("new_message");
      leaveChat();
    };
  }, [room]);

  useEffect(() => {
  }, [messages]);

  function leaveChat() {
    socket.emit("leave_room", { room_id: room });
    setMessages([]);
  }

  return (
    <LinearBackground>
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatSection}
        contentContainerStyle={{ paddingBottom: 0 }}
        onLayout={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
        <View style={styles.header}>
          <Ionicons
            name="chevron-back-outline"
            style={styles.backIcon}
            size={25}
            onPress={() => {
              leaveChat(room);
              navigation.goBack();
            }}
          />
          <Image
            source={
              typeof chatUserProfile.imageUrl === "string"
                ? { uri: chatUserProfile.imageUrl }
                : chatUserProfile.imageUrl
            }
            style={styles.topPfp}
          />
          <Text style={styles.topName}>{`${chatUserProfile.name
            ?.substring(0, 1)
            .toUpperCase()}${chatUserProfile.name?.substring(1)}`}</Text>
        </View>
        <View style={styles.profileShort}>
          <Image
            source={
              typeof chatUserProfile.imageUrl === "string"
                ? { uri: chatUserProfile.imageUrl }
                : chatUserProfile.imageUrl
            }
            style={styles.pfpBig}
          />
          <Text style={styles.pfpName}>{`${chatUserProfile.name
            ?.substring(0, 1)
            .toUpperCase()}${chatUserProfile.name?.substring(1)}`}</Text>
          <Text style={styles.biography}>{chatUserProfile.bio ?? ""}</Text>
        </View>
        {/* <View style={styles.matchSection}>
          <Text style={styles.matchText}>You matched on</Text>
          <View style={styles.badges}>
            <Badge text="Football" />
            <Badge text="Games" />
            <Badge text="Books" />
            <Badge text="Poëzie" />
            <Badge text="MILFs" />
          </View>
        </View> */}

        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((item) => (
            <MessageBubble
              key={item.message_id}
              message={item.message}
              sender={item.sender_id == currentUserId}
            />
          ))
        ) : (
          <Text>No messages available</Text> // Display a fallback message if no messages
        )}
      </ScrollView>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message..."
          value={message}
          onChangeText={setMessage}
        />
        <Ionicons
          onPress={() => sendMessage(room, currentUserId, message)}
          name="send-outline"
          size={24}
          color="#F7931E"
          style={styles.sendIcon}
        />
      </View>
    </LinearBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backIcon: {
    marginRight: 10,
    width: 25,
    height: 25,
  },
  topPfp: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  topName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  menuIcon: {
    marginLeft: "auto",
  },
  profileShort: {
    alignItems: "center",
    marginTop: 20,
  },
  pfpBig: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  pfpName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  biography: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  matchSection: {
    marginTop: 30,
    alignItems: "center",
  },
  matchText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#353535",
    marginBottom: 10,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  chatSection: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FAFAFA",
  },
  sendIcon: {
    marginLeft: 10,
  },
});

export default ChatScreen;
