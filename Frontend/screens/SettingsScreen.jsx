import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "../theme/colors";
import LinearBackground from "../components/LinearBackgroundProfile";
import SecondaryButtonPill from "../components/SecondaryButtonPill";

const SettingsScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => console.log("Logged out!") },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => console.log("Account deleted!") },
      ]
    );
  };

  return (
    <LinearBackground>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>LOGO</Text>
        </View>
        <Text style={styles.title}>Gateway</Text>
      </View>

        <ScrollView>
        {/* Main Content */}
        <Text style={styles.sectionTitle}>SETTINGS</Text>

        {/* App Preferences */}
        <View style={styles.section}>
            <Text style={styles.sectionSubtitle}>App preferences</Text>
            <SecondaryButtonPill
            title = {
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Theme</Text>
                    <View style={styles.switch}>
                        <Text style={styles.switchText}>dark</Text>
                        <Switch
                        value={isDarkMode}
                        onValueChange={(value) => setIsDarkMode(value)}
                        />
                        <Text style={styles.switchText}>light</Text>
                    </View>
                </View>
            }
            />
            <SecondaryButtonPill
            title= {
                <View style = {styles.systemLanguage}>
                    <Text style={styles.optionText}>System language</Text>
                    <Text style={styles.optionValue}>English</Text>
                </View>
            }
            />
            
        </View>


        {/* Notification Settings */}
        <Text style={styles.sectionSubtitle}>Notification settings</Text>
        <SecondaryButtonPill
            title={
              <Text style={styles.optionText}>
                Change message notification preferences
              </Text>
            }
          />
          <SecondaryButtonPill
            title={
              <Text style={styles.optionText}>
                Change gateway notification preferences
              </Text>
            }
          />

        {/* Privacy Settings */}
        <Text style={styles.sectionSubtitle}>Privacy settings</Text>
        <SecondaryButtonPill
            title={<Text style={styles.optionText}>Block list</Text>}
          />
          <SecondaryButtonPill
            title={
              <Text style={styles.optionText}>Data sharing preferences</Text>
            }
          />

        {/* Account Settings */}
        <Text style={styles.sectionSubtitle}>Account settings</Text>
        <SecondaryButtonPill
            title={<Text style={styles.optionText}>Profile settings</Text>}
          />
          <SecondaryButtonPill
            title={<Text style={styles.optionText}>Change password</Text>}
          />

        {/* Actions */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
        >
            <Text style={styles.deleteText}>Delete account</Text>
        </TouchableOpacity>
        </ScrollView>
    </View>
    </LinearBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  logoContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
  },
  logo: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  sectionTitle: {
    fontWeight: 800,
    color: '#353535',
    alignSelf: 'center',
    fontSize: 24,
    padding: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 8,
    color: '#353535',
    
  },
  theme: {
    backgroundColor: 'red',
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%',
    
  },
  switchLabel: {
    fontSize: 16,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    fontSize: 14,
    marginHorizontal: 4,
  },
  systemLanguage: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  optionText: {
    fontSize: 16,
  },
  optionValue: {
    fontSize: 14,
    color: colors.grayDark,
  },
  logoutButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    marginTop: 16,
  },
  logoutText: {
    fontSize: 16,
    color: colors.primary,
    textAlign: "center",
  },
  deleteButton: {
    padding: 12,
    backgroundColor: colors.error,
    borderRadius: 8,
    marginTop: 8,
  },
  deleteText: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
  },
});

export default SettingsScreen;
