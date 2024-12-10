import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import colors from "../theme/colors";

const SplashScreen = ({ navigation }) => {
  const dotColor1 = useState(new Animated.Value(0))[0];
  const dotColor2 = useState(new Animated.Value(0))[0];
  const dotColor3 = useState(new Animated.Value(0))[0];
  const animationFadeInDuration = 300;
  const animationFadeOutDuration = 50;
  const loadingTimer = 5000;

  useEffect(() => {
    const timer = setTimeout(() => {
        navigation.replace('Main');
    }, loadingTimer)
    return () => clearTimeout(timer);
}, [navigation]);

  useEffect(() => {
    // Animate loading dots
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          // Animate 1st dot
          Animated.timing(dotColor1, {
            toValue: 1,
            duration: animationFadeInDuration,
            useNativeDriver: false,
          }),
          // Reset 1st dot and animate 2nd dot
          Animated.timing(dotColor1, {
            toValue: 0,
            duration: animationFadeOutDuration,
            useNativeDriver: false,
          }),
          Animated.timing(dotColor2, {
            toValue: 1,
            duration: animationFadeInDuration,
            useNativeDriver: false,
          }),
          // Reset 2nd dot and animate 3rd dot
          Animated.timing(dotColor2, {
            toValue: 0,
            duration: animationFadeOutDuration,
            useNativeDriver: false,
          }),
          Animated.timing(dotColor3, {
            toValue: 1,
            duration: animationFadeInDuration,
            useNativeDriver: false,
          }),
          // Reset 3rd dot
          Animated.timing(dotColor3, {
            toValue: 0,
            duration: animationFadeOutDuration,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    animateDots();
  }, [dotColor1, dotColor2, dotColor3]);

  const interpolateColor = (dotColor) => {
    return dotColor.interpolate({
      inputRange: [0, 1],
      outputRange: ["#D9D9D9", "#F7931E"],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo-main.png")} style={styles.logo} />
      <Text style={styles.text}>Gateway</Text>
      <View style={styles.loadingContainer}>
        <Animated.View
          style={[styles.dot, { backgroundColor: interpolateColor(dotColor1) }]}
        />
        <Animated.View
          style={[styles.dot, { backgroundColor: interpolateColor(dotColor2) }]}
        />
        <Animated.View
          style={[styles.dot, { backgroundColor: interpolateColor(dotColor3) }]}
        />
      </View>
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
  logo: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  text: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: 500,
    color: colors.textBlack,
    textShadowColor: "#ccc",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  loadingContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
});

export default SplashScreen;
