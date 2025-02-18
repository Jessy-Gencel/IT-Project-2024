import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../components/DefaultHeader"; // Assuming Header component is in the same directory
import EventCardWithSection from "../components/EventCardWithSection"; // Assuming EventCardWithSection is in the same directory
import ProgressBar from "../components/ProgressBar"; // Assuming ProgressBar component is in the same directory
import GradientBackground from "../components/GradientBackground";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../services/AxiosConfig";
import {getToken} from "../services/GetToken";
import PrimaryButtonPill from "../components/PrimaryButtonPill";
import axios from "axios";
import { Alert } from "react-native";
import Constants from 'expo-constants';




const JWSTesting = () => {

    const onSubmit = async (data) => {
        
        try{
            const accessToken = await getToken("accessToken");
            const refreshToken = await getToken("refreshToken");
            const response = await axios.get(
                `${Constants.expoConfig.extra.BASE_URL}/auth/users`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`, // Include access token in the Authorization header
                    "x-refresh-token": refreshToken, // Optionally include refresh token as a custom header
                  },
                }
              );

            
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
    <View style={styles.container}>
      <GradientBackground style={styles.background}>
        
        
      <PrimaryButtonPill style={styles.logInBtn}
                    title="Log In"
                    onPress={onSubmit}
                />
                  
      </GradientBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});

export default JWSTesting;
