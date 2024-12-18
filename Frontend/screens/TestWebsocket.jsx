import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const App = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to Flask WebSocket server
    const socketInstance = io('http://10.2.88.71:5000', {
      transports: ['websocket'], // Use WebSocket transport
      reconnectionAttempts: 5,  // Retry connection 5 times
      reconnectionDelay: 1000,  // 1-second delay between retries
    });

    setSocket(socketInstance);

    // Handle incoming responses from the server
    socketInstance.on('response', (data) => {
      console.log('Server Response:', data);
      setResponse(data.message || 'No message');
    });

    // Handle connection errors
    socketInstance.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      // Emit the 'send_message' event to the server
      socket.emit('send_message', {
        conversation_id: 'conv123', // Example conversation ID
        sender_id: 'user1',        // Example sender ID
        recipient_id: 'user2',     // Example recipient ID
        content: message,          // The actual message content
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send Message" onPress={sendMessage} />
      {response && <Text style={styles.response}>Response: {response}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  response: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});

export default App;
