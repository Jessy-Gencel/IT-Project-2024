import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Controller,
  TextInput,
} from "react-native";
import LinearBackground from "../components/LinearBackgroundProfile";
import GradientBackground from "../components/GradientBackground";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePasswordScreen = ({ navigation }) => {


  return (
    <SafeAreaProvider>
        <GradientBackground>
        <SafeAreaView style={{flex:1}}>
            <View style={styles.logoTextContainer}>
                    <Image
                        source={require('../assets/GatewayNoText_Logo.png')}
                        style={styles.logo}
                    />
                <Text style={styles.changePasswordText}>Change password</Text>
            </View>
            <View style={styles.newPassword}>
                    <Text style={styles.inputTitle}>New password:</Text>
                    <Controller
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.email ? { borderColor: "red", borderWidth: 1 } : {},
                                    ]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="..."
                                    autoCapitalize="none"
                                />
                            )}
                        />
                <View style={styles.confirmPassword}>
                    <Text style={styles.inputTitle}>Confirm new password:</Text>
                </View>
                    <Controller
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.password ? { borderColor: "red", borderWidth: 1 } : {},
                                    ]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="..."
                                    autoCapitalize="none"
                                />
                            )}
                        />
                </View>
        </SafeAreaView>
        </GradientBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
    logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 40,
    marginBottom: 20,
    alignSelf: "center",
  },
  welkomText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#353535",
    width: 300,
    textAlign: "center",
    margin: "auto",
    marginBottom: 70,
  },
});

export default ChangePasswordScreen;
