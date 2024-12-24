import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import MessageListHeader from "../components/MessageListHeader";
import Ionicons from "react-native-vector-icons/Ionicons";
import io from "socket.io-client";
import { IP_ADDRESS_SERVER } from "@env";
import { getUserData } from "../services/GetToken";

const socket = io(`http://${IP_ADDRESS_SERVER}:5000`);

const ChatList = ({ navigation, isUnread, isMuted }) => {
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Fetch the current user's ID when the component mounts
    const fetchUserId = async () => {
      try {
        const userId = await getUserData("id"); // Retrieve user ID
        setCurrentUserId(userId); // Update state
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId(); // Call the async function
  }, []);

  const createRoom = (userId) => {
    socket.emit("join_room", {
      current_user_id: currentUserId,
      match_user_id: userId,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <MessageListHeader style={styles.MessageListHeader} />
        <Text style={styles.title}>Messages</Text>
        <View style={styles.listOfChats}>
          <View style={styles.chatListContainer}>
            <Image source={require("../assets/brent_klein.png")} />
            <View style={styles.senderAndMessage}>
              <Text style={styles.sender}>Brent Devroey</Text>
              <View style={styles.timeAndMessage}>
                <Text
                  numberOfLines={1}
                  style={[styles.message, isUnread && styles.messageUnread]}>
                  Waar zijn jullie? Ik sta aan aula 1
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
          <View style={styles.chatListContainer}>
            <Image source={require("../assets/brent_klein.png")} />
            <View style={styles.senderAndMessage}>
              <Text style={styles.sender}>Brent Devroey</Text>
              <View style={styles.timeAndMessage}>
                <Text numberOfLines={1} style={styles.message}>
                  Waar zijn jullie? Ik sta aan aula 1
                </Text>
                <Text>12:33</Text>
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
        </View>
      </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#FAFAFA",
  },
  chatListContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  senderAndMessage: {
    flexDirection: "column",
    alignSelf: "center",
    marginBottom: 20,
    marginLeft: 15,
    marginTop: 20,
  },
  title: {
    fontWeight: 800,
    color: "#353535",
    fontSize: 18,
    marginBottom: 10,
  },
  sender: {
    fontWeight: 230,
    color: "#353535",
    fontSize: 20,
    marginBottom: 5,
  },
  message: {
    color: "#353535",
    fontSize: 14,
    width: 160,
  },
  timeAndMessage: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    gap: 20,
    fontWeight: "bold",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#FBB03B",
    marginHorizontal: 5,
    alignSelf: "center",
    marginLeft: 30,
  },

  //unread message

  messageUnread: {
    fontWeight: "bold",
  },
  timeUnread: {
    fontWeight: "bold",
  },
});
export default ChatList;
