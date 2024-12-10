import React, {useState} from "react";
import {View, Image, TextInput, Text, StyleSheet, Button} from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import styles from '../styles/LogIn';
import PrimaryButtonPill from '../components/PrimaryButtonPill';




const LogInScreen = ({ navigation }) => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    return (
    <SafeAreaProvider>
        <SafeAreaView style={{flex:1}}>
            <View style={styles.logoWelkomContainer}>
                    <Image
                        source={require('../assets/GatewayNoText_Logo.png')}
                        style={styles.logo}
                    />
                <Text style={styles.welkomText}>Welcome back to Gateway!</Text>
            </View>

            <View style={styles.logInContainer}>
                <Text style={styles.logInText} >Log in</Text>

                <View style={styles.schoolEmail}>
                    <Text style={styles.inputTitle}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder = "Email"
                    />
                </View>
                <View style={styles.password}>
                    <Text style={styles.inputTitle}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value = {password}
                        placeholder = "Password"
                    />
                </View>
            </View>
            <View style={styles.logInBtn}>
                <PrimaryButtonPill style={styles.logInBtn}
                    title="Log In"
                />
            </View>

            <View style={styles.otherOptions}>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>Forgot password?</Text>
                    <Text style={styles.link}>Reset password</Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>Don't have an account yet?</Text>
                    <Text style={styles.link}>Register</Text>
                </View>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
    );
}


export default LogInScreen;