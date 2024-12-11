import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const ChatScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faAngleLeft} />
      <Image
        source={require('../assets/brent_klein.png')}
        style={styles.logo}
      />
      <Text>Brent Devroey</Text>

    </View>


  
  );
};

export default ChatScreen;
