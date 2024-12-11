import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ChatScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/brent_klein.png')}
        style={styles.logo}
      />
      <Text>Brent Devroey</Text>

    </View>


  
  );
};
export default ChatScreen;
