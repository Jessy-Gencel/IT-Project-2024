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
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    }); // Make sure Flask is running on this address
    setSocket(socketInstance);

    // Handle response from Flask
    socketInstance.on('response', (data) => {
      setResponse(data.message);
    });

    // Handle connection errors
    socketInstance.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

    const sendMessage = () => {
        if (socket) {
        socket.emit('send_message', {
            sender_id: 'user1',  // Example sender ID
            recipient_id: 'user2',  // Example recipient ID
            message: message,
        });
        }
    };


  
  return (
    <View style={{ padding: 100 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send Message" onPress={sendMessage} />
      {response && <Text style={{ marginTop: 20 }}>Response: {response}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
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
