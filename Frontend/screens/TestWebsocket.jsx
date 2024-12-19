import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import io from "socket.io-client";
import { IP_ADDRESS_SERVER } from "@env";
import { getUserData } from "../services/GetToken";

const socket = io(`http://${IP_ADDRESS_SERVER}:5000`);

const TestWebSocket = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [user2Id, setUser2Id] = useState("42069");

  useEffect(() => {
    // Fetch the current user's ID when the component mounts
    const fetchUserId = async () => {
      try {
        const userId = await getUserData("id"); // Retrieve user ID
        setCurrentUserId(userId); // Update state
        socket.emit("join_room", {
          user1_id: currentUserId,
          user2_id: user2Id,
        });
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId(); // Call the async function

    // Join the room when component mounts

    // Listen for new messages
    socket.on("new_message", (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      socket.off("new_message");
    };
  }, []);

  const sendMessage = () => {
    // Emit message to the backend
    socket.emit("send_message", {
      sender_id: currentUserId,
      recipient_id: user2Id,
      message: message,
    });

    // Clear the input
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={sendMessage} />
      {/* {chatMessages.map((msg) => ( */}
      <Text style={styles.text}>
        {chatMessages}
        {/* {msg.sender_id}: {msg.message} */}
      </Text>
      {/* ))} */}
    </View>
  );
};

const styles = {
  container: {
    marginTop: 50,
  },
  text: {
    backgroundColor: "#b81212",
  },
};

export default TestWebSocket;
