import React, {useState} from "react";
import {View, Image, TextInput, Text, StyleSheet, Button} from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import styles from '../styles/LogIn';
import PrimaryButtonPill from '../components/PrimaryButtonPill';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import GradientBackground from "../components/LinearBackground";
import Constants from 'expo-constants';
import * as SecureStore from "expo-secure-store"; // Secure storage library
import {getToken} from "../services/GetToken";



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

const LogInScreen = ({ navigation }) => {

    const {control, handleSubmit, formState: { errors },} = useForm({
        resolver: yupResolver(schema),
    });

    const storeToken = async (key, value) => {
        try {
          await SecureStore.setItemAsync(key, value);
          console.log(`${key} stored successfully`);
        } catch (error) {
          console.error(`Error storing ${key}:`, error);
        }
      };

    const onSubmit = async (data) => {
        try{
            const response = await axios.post("http://10.2.88.190:5000/auth/login", {
                email: data.email,
                password: data.password,
            });
            const { access_token: accessToken, refresh_token: refreshToken } = response.data;
            await storeToken("accessToken", accessToken);
            await storeToken("refreshToken", refreshToken);
            access = await getToken("accessToken");
            refresh = await getToken("refreshToken");

            console.log(access);
            console.log(refresh);

            navigation.navigate('HomeScreen');
            console.log("login succesfull !")

        } catch(error){
            console.error("Login error:", error);
            const errorMessage = 
                error.response && error.response.data
                ? error.response.data.message
                : "An error occurred. Please try again.";
            Alert.alert("Login Failed", errorMessage);
        }
    };

    return (
    <SafeAreaProvider>
        <GradientBackground>
        <SafeAreaView style={{flex:1}}>
            <View style={styles.logoWelkomContainer}>
                    <Image
                        source={require('../assets/GatewayNoText_Logo.png')}
                        style={styles.logo}
                    />
                <Text style={styles.welkomText}>Welcome back to Gateway!</Text>
            </View>

            <View style={styles.logInContainer}>
                <Text style={styles.logInText} >Log in</Text>

                <View style={styles.schoolEmail}>
                    <Text style={styles.inputTitle}>Email:</Text>
                    <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.email ? { borderColor: "red", borderWidth: 1 } : {},
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
                <View style={styles.password}>
                    <Text style={styles.inputTitle}>Password:</Text>
                </View>
                    <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.password ? { borderColor: "red", borderWidth: 1 } : {},
                                    ]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Password"
                                    secureTextEntry
                                />
                            )}
                        />
                </View>
            </View>
            <View style={styles.logInBtn}>
                <PrimaryButtonPill style={styles.logInBtn}
                    title="Log In"
                    onPress={handleSubmit(onSubmit)} /* deleted the [] around handlesubmit check whether it broke anything */
                />
            </View>

            <View style={styles.otherOptions}>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>Forgot password?</Text>
                    <Text style={styles.link}>Reset password</Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>Don't have an account yet?</Text>
                    <Text style={styles.link}>Register</Text>
                </View>
            </View>
        </SafeAreaView>
        </GradientBackground>
    </SafeAreaProvider>
    );
}


export default LogInScreen;