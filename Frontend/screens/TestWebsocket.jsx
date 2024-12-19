import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import io from "socket.io-client";
import Constant from "expo-constants";

const socket = io("http://10.2.88.71:5000");

const TestWebSocket = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessage] = useState([]);
  const [user1Id, setUser1Id] = useState("7");
  const [user2Id, setUser2Id] = useState("42069");

  useEffect(() => {
    // Join the room when component mounts
    socket.emit("join_room", { user1_id: user1Id, user2_id: user2Id });

    // Listen for new messages
    socket.on("new_message", (data) => {
      setChatMessage((prevMessages) => [...prevMessages, data]);
      console.log("New message received:", data);
    });

    return () => {
      socket.off("new_message"); // Clean up the listener
    };
  }, []);

  const sendMessage = () => {
    // Emit message to the backend
    socket.emit("send_message", {
      sender_id: user1Id,
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
        <Text style={ styles.text }>
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
    backgroundColor: "#b81212"
  },
}

export default TestWebSocket;
