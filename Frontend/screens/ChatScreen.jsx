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
import { IP_ADDRESS_SERVER } from "@env";
import axiosInstance from "../services/AxiosConfig";
import { getUserData } from "../services/GetToken";

const getMessages = async (room) => {
  const response = await axiosInstance.get(
    `http://${IP_ADDRESS_SERVER}:5000/messages/${room}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  console.log("response: ", response.data);

  const sortedMessages = response.data.sort((a, b) => {
    const timestampA = new Date(a.messages.timestamp);
    const timestampB = new Date(b.messages.timestamp);
    return timestampA - timestampB; // This will sort in ascending order (oldest first)
  });
  
  return sortedMessages;
};

const ChatScreen = ({ navigation, route }) => {
  const { room } = route.params;
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchMessages = async (room) => {
      try {
        const data = await getMessages(room);
        setMessages(data);
        console.log("data: ", data);
      } catch (error) {
        console.error("Error fetching messages:", error);
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

    fetchMessages(room);
    fetchUserId();
  }, []);

  useEffect(() => {
    console.log("Updated messages: ", messages);
  }, [messages]);

  return (
    <LinearBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="chevron-back-outline" style={styles.backIcon} />
          <Image
            source={require("../assets/brent_klein.png")}
            style={styles.topPfp}
          />
          <Text style={styles.topName}>Brent Devroey</Text>
        </View>
        <View style={styles.profileShort}>
          <Image
            source={require("../assets/brent_groot.png")}
            style={styles.pfpBig}
          />
          <Text style={styles.pfpName}>Brent Devroey</Text>
          <Text style={styles.biography}>
            Ge moet naar de maan schieten en in de sterren belanden
          </Text>
        </View>
        <View style={styles.matchSection}>
          <Text style={styles.matchText}>You matched on</Text>
          <View style={styles.badges}>
            <Badge text="Football" />
            <Badge text="Games" />
            <Badge text="Books" />
            <Badge text="Poëzie" />
            <Badge text="MILFs" />
          </View>
        </View>
        <View
          style={styles.chatSection}
          contentContainerStyle={{ paddingBottom: 20 }}>
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((item) => (
              <MessageBubble
                key={item.messages.message_id}
                message={item.messages.message}
                sender={item.messages.sender_id == currentUserId}
              />
            ))
          ) : (
            <Text>No messages available</Text> // Display a fallback message if no messages
          )}
        </View>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Write a message..." />
          <Ionicons
            name="send-outline"
            size={24}
            color="#F7931E"
            style={styles.sendIcon}
          />
        </View>
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
