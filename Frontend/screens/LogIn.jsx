import React from "react";
import {View, Image, TextInput, Text, StyleSheet} from "react-native";

const LogInScreen = ({ navigation }) => {
    const [text, onChangeText] = React.useState("");
    return (
    <SafeAreaProvider>
        <SafeAreaView>
            <View style={styles.logoWelkomContainer}>
                <Text>LOGO</Text>
                <Text>Welcome back to Gateway!</Text>
            </View>

            <View style={styles.logInContainer}>
                <Text >Log In</Text>

                <View style={style.schoolEmail}>
                    <Text>School email:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder = "Email"
                    />
                </View>
                <View style={style.passwordEmail}>
                    <Text>Password:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value = {text}
                        placeholder = "Password"
                    />
                </View>
            </View>
            <View style={style.LogInBtn}>
                <Button>
                    title="Log In"
                </Button>
            </View>

            <View style={style.otherOptions}>
            <View style={style.forgotPassword}>
                <Text>Forgot password?</Text>
                <Text>Reset password</Text>
            </View>
            <View style={style.register}>
                <Text>Don't have an account yet?</Text>
                <Text>Register</Text>
            </View>
            </View>
        
        </SafeAreaView>
    </SafeAreaProvider>
    );
}
export default LogInScreen;