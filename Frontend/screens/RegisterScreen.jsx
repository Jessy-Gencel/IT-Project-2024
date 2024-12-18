import React, { useState } from "react";
import { View, Image, TextInput, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import styles from "../styles/LogIn";
import PrimaryButtonPill from "../components/PrimaryButtonPill";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import GradientBackground from "../components/LinearBackground";
import axios from "axios";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter your institution's email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required("Please confirm your password"),
});

const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://10.2.88.210:5000/auth/register",
        {
          email: data.email,
          password: data.password,
        }
      );
      console.log("response", response.data);
      console.log("Form Data:", data);
      navigation.navigate("AccountSetup");
    } catch (error) {
      console.error("Register error:", error);
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred. Please try again.";
    }
  };

  return (
    <SafeAreaProvider>
      <GradientBackground>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.logoWelkomContainer}>
            <Image
              source={require("../assets/GatewayNoText_Logo.png")}
              style={styles.logo}
            />
            <Text style={styles.welkomText}>Welcome to Gateway!</Text>
          </View>

          <View style={styles.logInContainer}>
            <Text style={styles.logInText}>Register</Text>

            {/* Email */}
            <View style={styles.schoolEmail}>
              <Text style={styles.inputTitle}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.email
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />

              {/* Password */}
              <View style={styles.password}>
                <Text style={styles.inputTitle}>Password</Text>
              </View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.password
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Password"
                    secureTextEntry
                  />
                )}
              />

              {/* Confirm Password */}
              <View style={styles.password}>
                <Text style={styles.inputTitle}>Confirm password</Text>
              </View>
              <Controller
                control={control}
                name="confirm_password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.password
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Confirm password"
                    secureTextEntry
                  />
                )}
              />
            </View>
          </View>
          <View style={styles.logInBtn}>
            <PrimaryButtonPill
              style={styles.logInBtn}
              title="Register"
              onPress={[handleSubmit(onSubmit)]}
            />
          </View>

          <View style={styles.otherOptions}>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>Already have an account?</Text>
              <Text style={styles.link}>Log in</Text>
            </View>
          </View>
        </SafeAreaView>
      </GradientBackground>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;
