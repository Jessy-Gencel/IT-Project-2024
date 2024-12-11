import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import StepCounter from "../components/StepCounter";

const AccountSetupScreen = ({ navigation }) => {
  return (
    <StepCounter stepsCount={4} currentStep={3} />
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

export default AccountSetupScreen;
