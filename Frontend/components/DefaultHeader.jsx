import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const Header = ({ showBackArrow = false, notificationCount = 0 }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Back Arrow */}
      {showBackArrow && (
        <TouchableOpacity style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}

      {/* Logo and App Name */}
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: 'https://via.placeholder.com/40',
          }}
          style={styles.logo}
        />
        <Text style={styles.appName}>Gateway</Text>
      </View>

      {/* Icons on the right */}
      <View style={styles.iconsContainer}>
        {/* Telegram-style Arrow */}
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="paper-plane" size={24} color="black" />
        </TouchableOpacity>

        {/* Notifications Icon */}
        <TouchableOpacity style={styles.notificationIconContainer}>
          <Ionicons name="notifications" size={24} color="black" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Settings Icon */}
        <TouchableOpacity style={styles.iconButton}>
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
  },
  backArrow: {
    marginRight: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
