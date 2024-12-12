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
import interests from "../config/interests";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

const AccountSetupScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedValue, setSelectedValue] = useState("");
  const stepsCount = 5;
  const [formData, setFormData] = useState({
    id: "12345",
    mbti: "",
    interests: [],
    hobbies: [],
    games: [],
    movies: [],
    books: [],
    music: [],
  });

  // Schema's
  const hobbiesSchema = yup.object({
    hobby: yup
      .array()
      .of(yup.string().required("Please provide at least 3 hobbies"))
      .min(3, "Please provide at least 3 hobbies")
      .required("Please provide at least 3 hobbies"),
  });

  const interestsSchema = yup.object({
    interest: yup
      .array()
      .of(
        yup
          .string()
          .required("Please provide at least 3 interests.")
          .oneOf(interests, "Please select a valid interest.")
      )
      .min(3, "Please provide at least 3 interests.")
      .required("Please provide at least 3 interests."),
  });

  const favoritesSchema = yup.object({
    games: yup
      .array()
      .of(yup.string().required("Each game should be a string"))
      .nullable(),
    movies: yup
      .array()
      .of(yup.string().required("Each movie should be a string"))
      .nullable(),
    books: yup
      .array()
      .of(yup.string().required("Each book should be a string"))
      .nullable(),
    music: yup
      .array()
      .of(yup.string().required("Each song or artist should be a string"))
      .nullable(),
  });

  const mbtiSchema = yup.object({
    mbti: yup.string().required("Please enter your MBTI"),
  });

  const schema = yup.object({
    hobbies: hobbiesSchema,
    interests: interestsSchema,
    favorites: favoritesSchema,
    mbti: mbtiSchema,
  });

  // Form Handlers
  const {
    register: registerHobbies,
    handleSubmit: handleSubmitHobbies,
    formState: { errors: errorsHobbies },
  } = useForm({
    resolver: yupResolver(hobbiesSchema),
  });

  const {
    register: registerInterests,
    handleSubmit: handleSubmitInterests,
    formState: { errors: errorsInterests },
  } = useForm({
    resolver: yupResolver(interestsSchema),
  });

  const {
    register: registerFavorites,
    handleSubmit: handleSubmitFavorites,
    formState: { errors: errorsFavorites },
  } = useForm({
    resolver: yupResolver(favoritesSchema),
  });

  const {
    register: registerMbti,
    handleSubmit: handleSubmitMbti,
    formState: { errors: errorsMbti },
  } = useForm({
    resolver: yupResolver(mbtiSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submissions
  const onSubmitHobbies = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      hobbies: data.hobbies,
    }));
    nextStep();
  };

  const onSubmitInterests = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      interests: data.interests,
    }));
    nextStep();
  };

  const onSubmitFavorites = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      favorites: data.favorites,
    }));
    nextStep();
  };

  const onSubmitMbti = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      mbti: data.mbti,
    }));
    nextStep();
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://localhost:5000/auth/createProfile",
        formData
      );
      console.log("Data submitted successfully: ", response.data);
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

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

  // Check what handler to use
  const currentHandler = () => {
    switch (currentStep) {
      case 1:
        handleSubmit(handleSubmitHobbies)();
        break;
      case 2:
        handleSubmit(handleSubmitInterests)();
        break;
      case 3:
        handleSubmit(handleSubmitFavorites)();
        break;
      case 4:
        handleSubmit(handleSubmitMbti)();
        break;
      case 5:
        handleSubmit(handleSubmit)();
      default:
        break;
    }
  };

  // Screen
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

        {/* Validate */}
        {currentStep < stepsCount && (
          <View style={styles.btnPrimary}>
            <PrimaryButtonPill title="Continue" onPress={nextStep} />
          </View>
        )}

        {/* Submit */}
        {currentStep == stepsCount && (
          <View style={styles.btnPrimary}>
            <PrimaryButtonPill
              title="Complete Setup"
              onPress={handleSubmit(onSubmit)}
            />
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
