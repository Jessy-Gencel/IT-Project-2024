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
import GradientBackground from "../components/LinearBackground";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../services/AxiosConfig";
import {getToken} from "../services/GetToken";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import PrimaryButtonPill from "../components/PrimaryButtonPill";
import axios from "axios";
import { Alert } from "react-native";



const JWSTesting = () => {

    const onSubmit = async (data) => {
        
        try{
            const accessToken = await getToken("accessToken");
            const refreshToken = await getToken("refreshToken");
            console.log("accessToken", accessToken);

            const response = await axios.get(
                "http://10.2.88.190:5000/auth/users",
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`, // Include access token in the Authorization header
                    "x-refresh-token": refreshToken, // Optionally include refresh token as a custom header
                  },
                }
              );
            console.log("response", response.data);

            
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
