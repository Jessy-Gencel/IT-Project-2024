import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import PrimaryButtonPill from "../components/PrimaryButtonPill";
import SecondaryButton from "../components/SecondaryButton";
import SecondaryButtonPill from "../components/SecondaryButtonPill";
import TertiaryButton from "../components/TertiaryButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ComponentsScreen = ({ navigation }) => {
    const handleButton = () => {
        console.log("Nigel");
    }

    return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
            <PrimaryButton title="Primary Button" onPress={handleButton} />
            <PrimaryButtonPill title="Primary Button Pill" onPress={handleButton} />
            <SecondaryButton title="Secondary Button" onPress={handleButton} />
            <SecondaryButtonPill title="Secondary Button Pill" onPress={handleButton} />
            <TertiaryButton title="Tertiary Button" onPress={handleButton} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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


export default ComponentsScreen;
