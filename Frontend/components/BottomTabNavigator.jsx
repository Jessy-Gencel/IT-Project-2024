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
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Components" component={ComponentsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="AccountSetup" component={AccountSetupScreen} />
      
    </Tab.Navigator>
  );
};


export default BottomTabNavigator;
