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
import TestScreen from "../screens/Test";

const Tab = createBottomTabNavigator();

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
          backgroundColor: "#ffffff", // Use the surface color from the theme
          borderTopWidth: 1, // Border on top of navbar
          borderTopColor: "#ccc", // Border color
          height: 60, // Height of navbar
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Gateways" component={GatewaysScreen} />
      <Tab.Screen name="LogIn" component={LogInScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Components" component={ComponentsScreen} />
      <Tab.Screen name="Test" component={TestScreen} />
    </Tab.Navigator>
  );
};


export default BottomTabNavigator;
