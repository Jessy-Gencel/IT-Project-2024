import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import GatewaysScreen from './screens/GatewaysScreen';
import Test from './screens/Test';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              // Define the icon based on the route
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              } else if (route.name === 'Gateways') {
                iconName = 'medical-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false, // Hide the header
            tabBarActiveTintColor: 'tomato', // Active tab color
            tabBarInactiveTintColor: 'gray', // Inactive tab color
            tabBarStyle: {
              backgroundColor: '#FFFFFF', // Use the surface color from the theme
              borderTopWidth: 1, // Border on top of navbar
              borderTopColor: '#ccc', // Border color
              height: 60, // Height of navbar
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Gateways" component={GatewaysScreen} />
          <Tab.Screen name="test" component={Test} />

        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );
}
