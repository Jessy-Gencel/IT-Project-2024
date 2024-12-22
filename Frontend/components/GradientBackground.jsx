import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient colors={["#F7931E", "#FFFFFF"]} style={styles.container} start={{ x:0, y:0 }} end={{ x:0, y:0.5 }} locations={[0, 0.5]}>
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default GradientBackground;
