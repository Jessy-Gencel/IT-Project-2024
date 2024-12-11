import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import StepCounter from "../components/StepCounter";
import colors from "../theme/colors";
import Badge from "../components/Badge";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import loginStyles from "../styles/LogIn";
import PrimaryButtonPill from "../components/PrimaryButtonPill";

const AccountSetupScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const stepsCount = 4;

  const schema = yup.object({
    email: yup
      .string()
      .email("Enter your institution's email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const nextStep = () => {
    if (currentStep < stepsCount) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo-main.png")} style={styles.logo} />
      <Text style={styles.title}>
        Hi, Nils!{"\n"}Let's set up your account.
      </Text>
      <StepCounter stepsCount={stepsCount} currentStep={currentStep} />
      <View style={styles.alignLeft}>
        <Text style={styles.titleMedium}>What are your hobbies?</Text>
        <Text style={styles.subtitle}>Add at least 3.</Text>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                loginStyles.input,
                errors.password ? { borderColor: "red", borderWidth: 1 } : {},
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              placeholderTextColor={colors.placeholder}
              secureTextEntry
            />
          )}
        />
      </View>
      <View style={[styles.badgeList, styles.alignLeft]}>
        <Badge title="Gym" isHighlighted />
        <Badge title="Opera" />
      </View>

      {currentStep < stepsCount && (
        <View style={styles.btnPrimary}>
          <PrimaryButtonPill title="Continue" onPress={nextStep} />
        </View>
      )}

      <Text>
        Step {currentStep} of {stepsCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    gap: 10,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  alignLeft: {
    alignSelf: "flex-start",
    paddingHorizontal: 25,
  },
  titleMedium: {
    fontSize: 20,
    fontWeight: "medium",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "light",
    color: colors.placeholder,
    marginLeft: 5,
    marginBottom: 10,
  },
  badgeList: {
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 5,
  },
  btnPrimary: {
    marginTop: 50,
  },
});

export default AccountSetupScreen;
