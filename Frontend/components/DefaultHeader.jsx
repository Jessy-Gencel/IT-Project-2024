import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import LogoWrapper from './Logo';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Header = ({ showBackArrow = false, notificationCount = 0 }) => {
  const navigation = useNavigation(); // Access the navigation prop using the hook

  return (
    <View style={styles.headerContainer}>
      {/* Back Arrow */}
      {showBackArrow && (
        <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}

      {/* Logo and App Name */}
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <LogoWrapper 
          logoSource={require('../assets/GatewayNoText_Logo.png')} 
          width={50} 
          height={50} 
        />
        </TouchableOpacity>
      </View>

      {/* Icons on the right */}
      <View style={styles.iconsContainer}>
        {/* Telegram-style Arrow */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('Chat')} // Navigate to 'Chat' screen
        >
          <Ionicons name="paper-plane" size={24} color="black" />
        </TouchableOpacity>

        {/* Notifications Icon */}
        <TouchableOpacity 
          style={styles.notificationIconContainer} 
          onPress={() => navigation.navigate('Home')} // Navigate to 'Settings' screen
        >
          <Ionicons name="notifications" size={24} color="black" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Settings Icon */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('Settings')} // Navigate to 'Home' screen
        >
          <FontAwesome name="gear" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 40,
  },
  backArrow: {
    marginRight: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  notificationIconContainer: {
    position: 'relative',
    marginHorizontal: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#F7931E',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Header;
