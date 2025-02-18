import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import styles from "../styles/LogIn";
import PrimaryButtonPill from "../components/PrimaryButtonPill";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import GradientBackground from "../components/GradientBackground";
import axios from "axios";
import Constants from "expo-constants";
import { getUserData, storeSecretStorage } from "../services/GetToken";
import encrypt from "../services/EncryptionService";
import { ScrollView } from "react-native-gesture-handler";

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
    .oneOf([yup.ref("password"), null], "Passwords must match")
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
      const encryptedPassword = encrypt(data.password);

      const response = await axios.post(
        `${Constants.expoConfig.extra.BASE_URL}/auth/register`,
        {
          email: data.email,
          password: encryptedPassword,
        }
      );
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        id: userId,
      } = response.data;
      await storeSecretStorage("accessToken", accessToken);
      await storeSecretStorage("refreshToken", refreshToken);
      await storeSecretStorage("id", userId);
      const access = await getUserData("accessToken");
      const refresh = await getUserData("refreshToken");
      const id = await getUserData("id");
      navigation.navigate("AccountSetup", { idRegister: id });
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
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
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
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View style={styles.otherOptions}>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                <Text style={styles.link}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        </SafeAreaView>
      </GradientBackground>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;
