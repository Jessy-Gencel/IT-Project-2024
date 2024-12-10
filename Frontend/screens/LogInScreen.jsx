import React, {useState} from "react";
import {View, Image, TextInput, Text, StyleSheet, Button} from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import styles from '../styles/LogIn';




const LogInScreen = ({ navigation }) => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    return (
    <SafeAreaProvider>
        <SafeAreaView style={{flex:1}}>
            <View style={styles.logoWelkomContainer}>
                    <Image 
                        source={require('../assets/logo1.svg')} // Adjust path
                        style={styles.logo}
                    />
                <Text>Welcome back to Gateway!</Text>
            </View>

            <View style={styles.logInContainer}>
                <Text style={styles.logInText} >Log in</Text>

                <View style={styles.schoolEmail}>
                    <Text style={styles.inputTitle}>School email:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder = "Email"
                    />
                </View>
                <View style={styles.password}>
                    <Text styles={styles.inputTitle}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value = {password}
                        placeholder = "Password"
                    />
                </View>
            </View>
            <View style={styles.LogInBtn}>
                <Button
                    title="Log In"
                />
            </View>

            <View style={styles.otherOptions}>
                <View style={styles.forgotPassword}>
                    <Text>Forgot password?</Text>
                    <Text>Reset password</Text>
                </View>
                <View style={styles.register}>
                    <Text>Don't have an account yet?</Text>
                    <Text>Register</Text>
                </View>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
    );
}


export default LogInScreen;