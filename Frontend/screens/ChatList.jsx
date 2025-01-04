import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import MessageListHeader from "../components/MessageListHeader";
import Ionicons from "react-native-vector-icons/Ionicons";
import socket from "../services/websockets";
import { getUserData } from "../services/GetToken";
import { FlatList } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const ChatList = ({ navigation, isUnread, isMuted }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await getUserData("id");
        console.log("Fetched User ID:", userId); // Debug log
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log("Fetching chat users..."); // Debug log

        const response = await axios.get(`${Constants.expoConfig.extra.BASE_URL}/auth/users`);
        console.log("Fetched Chat Users Response:", response.data); // Debug log

        // Set the chatUsers to the users array in the response
        setChatUsers(response.data.users); // Updated to use `users` key
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  const handleCardPress = (id) => {
    console.log("Card ID:", id);
  };

  const createRoom = (userId) => {
    const roomId = `room:${Math.min(currentUserId, userId)}:${Math.max(currentUserId, userId)}`;
    console.log("roomId: ", roomId);
    socket.emit("join_room", {
      current_user_id: currentUserId,
      match_user_id: userId,
    });
    navigation.navigate('Chat', { room: roomId});
  };

  const renderChatCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleCardPress(item.id)}>
      <View style={styles.chatListContainer}>
        <Image source={require("../assets/brent_klein.png")} style={styles.avatar} />
        <View style={styles.senderAndMessage}>
          <Text style={styles.sender}>{`${item.first_name} ${item.last_name}`}</Text>
          <View style={styles.timeAndMessage}>
            <Text numberOfLines={1} style={[styles.message, isUnread && styles.messageUnread]}>
              Hardcoded Message
            </Text>
            <Text style={[styles.time, isUnread && styles.timeUnread]}>12:33</Text>
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
      <FlatList
        data={chatUsers}
        renderItem={renderChatCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listOfChats}
      />
      <Button
        onPress={() => createRoom(1)}
        title="Create Room with User 1"
        disabled={!currentUserId}
      />
      <Button
        onPress={() => createRoom(2)}
        title="Create Room with User 2"
        disabled={!currentUserId}
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

