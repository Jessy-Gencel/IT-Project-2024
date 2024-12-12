import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import StepCounter from "../components/StepCounter";
import colors from "../theme/colors";
import Badge from "../components/Badge";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import loginStyles from "../styles/LogIn";
import PrimaryButtonPill from "../components/PrimaryButtonPill";
import TertiaryButon from "../components/TertiaryButton";
import mbti from "../config/mbti";
import RNPickerSelect from "react-native-picker-select";

const AccountSetupScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedValue, setSelectedValue] = useState("");
  const stepsCount = 4;

  const schema = yup.object({
    email: yup
      .string()
      .email("Enter your institution's email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const nextStep = () => {
    if (currentStep < stepsCount) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipStep = () => {
    if (!(currentStep + 1 > stepsCount)) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo-main.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>
          Hi, Nils!{"\n"}Let's set up your account.
        </Text>
        <StepCounter stepsCount={stepsCount} currentStep={currentStep} />
        {/* Step 1 */}
        {currentStep == 1 && (
          <>
            <View style={styles.alignLeft}>
              <Text style={styles.titleMedium}>What are your hobbies?</Text>
              <Text style={styles.subtitle}>Add at least 3.</Text>

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      loginStyles.input,
                      errors.password
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Hobby"
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry
                  />
                )}
              />
            </View>
            <View style={[styles.badgeList, styles.alignLeft]}>
              <Badge title="Gym" isHighlighted />
              <Badge title="Opera" />
            </View>
          </>
        )}

        {/* Step 2 */}
        {currentStep == 2 && (
          <>
            <View style={styles.alignLeft}>
              <Text style={styles.titleMedium}>What are your interests?</Text>
              <Text style={styles.subtitle}>Add at least 3.</Text>

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      loginStyles.input,
                      errors.password
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Interest"
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry
                  />
                )}
              />
            </View>
            <View style={[styles.badgeList, styles.alignLeft]}>
              <Badge title="Investing" isHighlighted />
              <Badge title="MILFs" />
            </View>
          </>
        )}

        {/* Step 3 */}
        {currentStep == 3 && (
          <View styles={styles.step3Container}>
            {/* Movies */}
            <View style={styles.step3Wrapper}>
              <View style={styles.alignLeft}>
                <Text style={styles.titleMedium}>
                  Do you have any favorite movies?
                </Text>

                <Controller
                  control={control}
                  name="movies"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[
                        loginStyles.input,
                        errors.password
                          ? { borderColor: "red", borderWidth: 1 }
                          : {},
                      ]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter a movie"
                      placeholderTextColor={colors.placeholder}
                    />
                  )}
                />
              </View>
              <View style={[styles.badgeList, styles.alignLeft]}>
                <Badge title="Interstellar" isHighlighted />
                <Badge title="The Godfather" />
              </View>
            </View>

            {/* Music */}
            <View style={styles.step3Wrapper}>
              <View style={styles.alignLeft}>
                <Text style={styles.titleMedium}>
                  Do you have any favorite songs or artists?
                </Text>

                <Controller
                  control={control}
                  name="music"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[
                        loginStyles.input,
                        errors.password
                          ? { borderColor: "red", borderWidth: 1 }
                          : {},
                      ]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter a song or artist"
                      placeholderTextColor={colors.placeholder}
                    />
                  )}
                />
              </View>
              <View style={[styles.badgeList, styles.alignLeft]}>
                <Badge title="Unlike Pluto" isHighlighted />
                <Badge title="Purple Rain" />
              </View>
            </View>

            {/* Games */}
            <View style={styles.step3Wrapper}>
              <View style={styles.alignLeft}>
                <Text style={styles.titleMedium}>
                  Do you have any favorite games?
                </Text>

                <Controller
                  control={control}
                  name="games"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[
                        loginStyles.input,
                        errors.password
                          ? { borderColor: "red", borderWidth: 1 }
                          : {},
                      ]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter a game"
                      placeholderTextColor={colors.placeholder}
                    />
                  )}
                />
              </View>
              <View style={[styles.badgeList, styles.alignLeft]}>
                <Badge title="Elden Ring" isHighlighted />
                <Badge title="Mass Effect" />
              </View>
            </View>

            {/* Books */}
            <View style={styles.step3Wrapper}>
              <View style={styles.alignLeft}>
                <Text style={styles.titleMedium}>
                  Do you have any favorite books?
                </Text>

                <Controller
                  control={control}
                  name="books"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[
                        loginStyles.input,
                        errors.password
                          ? { borderColor: "red", borderWidth: 1 }
                          : {},
                      ]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter a game"
                      placeholderTextColor={colors.placeholder}
                    />
                  )}
                />
              </View>
              <View style={[styles.badgeList, styles.alignLeft]}>
                <Badge title="Sun Tzu: The Art of War" isHighlighted />
                <Badge title="The Circle" />
              </View>
            </View>
          </View>
        )}

        {/* Step 4 */}
        {currentStep == 4 && (
          <>
            <View style={styles.alignLeft}>
              <Text style={styles.titleMedium}>What is your MBTI?</Text>
            </View>

            <RNPickerSelect
              onValueChange={(value) => setSelectedValue(value)}
              items={mbti}
            />

            <View style={styles.questionContainer}>
              <Text style={styles.question}>Don't know your MBTI?</Text>
              <View>
                <Text>Do the </Text>
                <Text style={styles.link}>16personalities test</Text>
                <Text>to find out!</Text>
              </View>
            </View>
          </>
        )}

        {/* Next Step */}
        {currentStep < stepsCount && (
          <View style={styles.btnPrimary}>
            <PrimaryButtonPill title="Continue" onPress={nextStep} />
          </View>
        )}

        {/* Complete Setup */}
        {currentStep == stepsCount && (
          <View style={styles.btnPrimary}>
            <PrimaryButtonPill title="Complete Setup" onPress={nextStep} />
          </View>
        )}

        {/* Back */}
        {currentStep > 1 && (
          <View>
            <TertiaryButon title="< Back" onPress={previousStep} />
          </View>
        )}

        {/* Skip Step */}
        <View>
          <TertiaryButon title="Skip >" onPress={skipStep} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    gap: 10,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  alignLeft: {
    alignSelf: "flex-start",
    paddingHorizontal: 25,
  },
  titleMedium: {
    fontSize: 20,
    fontWeight: "medium",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "light",
    color: colors.placeholder,
    marginLeft: 5,
    marginBottom: 10,
  },
  badgeList: {
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 5,
  },
  btnPrimary: {
    marginTop: 50,
  },
  step3Container: {
    flex: 1,
    flexDirection: "column",
    gap: 15,
  },
  step3Wrapper: {
    marginTop: 15,
  },
});

export default AccountSetupScreen;
