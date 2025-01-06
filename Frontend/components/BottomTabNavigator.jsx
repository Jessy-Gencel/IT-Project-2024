import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GatewaysScreen from "../screens/GatewaysScreen";
import LogInScreen from "../screens/LogInScreen";
import ComponentsScreen from "../screens/ComponentsScreen";
import colors from "../theme/colors";
import ChatScreen from "../screens/ChatScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AccountSetupScreen from "../screens/AccountSetupScreen";
import ChatList from "../screens/ChatList";
import SettingsScreen from "../screens/SettingsScreen";
import JWSTesting from "../screens/JWStokensTest";
import Constants from "expo-constants";
import { getUserData } from "../services/GetToken";
import { useEffect, useState } from "react";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();
const fetchProfile = async () => {
  const userid = await getUserData("id");
  const token = await getUserData("accessToken");
  const refreshToken = await getUserData("refreshToken");
  try {
    const response = await fetch(`${Constants.expoConfig.extra.BASE_URL}/auth/profile/${userid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        "x-refresh-token": refreshToken, // Optionally include refresh token as a custom header
      }
    });
    const data = await response.json();
    console.log(data);
    setProfileData(data);
  }
  catch (error) {
    console.error(error);
  };
};
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          // Define the icon based on the route
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          } else if (route.name === "Gateways") {
            iconName = "calendar-clear-outline";
          } else if (route.name === "Chat") {
            iconName = "chatbubbles-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.placeholder,
        tabBarStyle: {
          height: 90, // Height of navbar
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Gateways" component={GatewaysScreen} />
      <Tab.Screen name="FUN" component={JWSTesting} />
      <Tab.Screen name="Chat" component={ChatList} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ownProfile: true}}/>
      
    </Tab.Navigator>
  );
};


export default BottomTabNavigator;
