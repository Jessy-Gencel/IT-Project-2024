import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GatewaysScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is the Gateways Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default GatewaysScreen;
