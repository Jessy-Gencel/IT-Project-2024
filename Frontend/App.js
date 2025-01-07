
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import GatewaysScreen from './screens/GatewaysScreen';
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import SplashScreen from "./screens/SplashScreen";
import AccountSetupScreen from './screens/AccountSetupScreen';
import BottomTabNavigator from "./components/BottomTabNavigator";
import LogInScreen from "./screens/LogInScreen";
import HomePage from  "./screens/HomeScreen";
import RegisterScreen from './screens/RegisterScreen';
import CreateEvent from './screens/CreateEvent';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ChatScreen from './screens/ChatScreen';
import EventDetailsScreen from './screens/EventDetailScreen';

global.Buffer = global.Buffer || require("buffer").Buffer;
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="HomeScreen" component={HomePage} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="AccountSetup" component={AccountSetupScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
