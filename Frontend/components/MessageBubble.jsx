import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MessageBubble = ({ message, sender, profilePicture }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        sender ? styles.senderContainer : styles.receiverContainer,
      ]}
    >
      {/* Profile picture for received messages */}
      {!sender && profilePicture && (
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      )}

      {/* Message bubble */}
      <View
        style={[
          styles.bubble,
          sender ? styles.senderBubble : styles.receiverBubble,
        ]}
      >
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  senderContainer: {
    justifyContent: 'flex-end',
  },
  receiverContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  senderBubble: {
    backgroundColor: '#F7931E', // Orange for sender
    alignSelf: 'flex-end',
  },
  receiverBubble: {
    backgroundColor: '#fff', // White for receiver
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 22,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20, // Makes it circular
  },
});

export default MessageBubble;
