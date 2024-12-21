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
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

//weghalen van een hobby badge moet nog gebeuren 
//pas op het einde alles doorsturen naar backend via axios
//validatie moet nog gebeuren

const AccountSetupScreen = ({ navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const stepsCount = 5;
  const [formData, setFormData] = useState({
    id: "12345", //id wordt opgehaald maar nu hardcoded
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
    hobbies: yup
    .array()
    .of(
      yup
      .string()
      .required("Please provide at least 3 hobbies")
    )
    .min(3, "Please provide at least 3 hobbies")
    .required("Please provide at least 3 hobbies")
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hobbies: [],
      interests: [],
      favorites: {
        games: [],
        movies: [],
        books: [],
        music: [],
      },
      mbti: "",
    },
  });

  const nextStep = async () => { //moet validatie bij toegevoegd worde
    const isValid = await trigger();
    if (isValid && currentStep < stepsCount) {
      setCurrentStep(currentStep + 1);
    }

    //triggered een validatie afhankelijk van op welke step je zit
    let validationSchema;
    switch (currentStep){
      case 1:
        validationSchema = hobbiesSchema;
        break;
      case 2:
        validationSchema = interestsSchema;
        break;
      case 3:
        // favorites is een issue wnt je moet eigenlijk zorgen dat je 1 field kan invullen en de rest ni
        validationSchema = favoritesSchema;
        break;
      case 4:
        validationSchema = mbtiSchema;
        break;
      default:
        validationSchema = null; 
        // voor step 5 moet er ook geen apart validatieschema zijn omdat 
        //da gwn alles submit dus default is null
    }

    //error messages voor als de form niet gevalideerd wordt
    // in deze code doen? of gwn in schema's? -> valt nog te bezien

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

  const addItem = (field) => {
    console.log(inputValue);
    if (inputValue.trim()) {
        const currentValues = getValues(field);
        console.log(getValues(field));
        const updatedValues = [...currentValues, inputValue.trim()];
        console.log('Adding item:', updatedValues);
        setValue(field, updatedValues);
        setInputValue(""); // Clear the input field
    }
}

  const removeItem = (field, index) => {
    const currentValues = getValues(field);
    const updatedValues = currentValues.filter((_, i) => i !== index);
    setValue(field, updatedValues);
  }


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
                name="hobbies"
                render={({ field: {onBlur } }) => (
                  <TextInput
                    style={[
                      loginStyles.input,
                      errors.hobbies
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setInputValue}
                    value={inputValue}
                    placeholder="Hobby"
                    placeholderTextColor={colors.placeholder}
                    onSubmitEditing={() => addItem("hobbies")}
                  />
                )}
              />
               {errors.hobbies && <Text style={{ color: 'red' }}>{errors.hobbies.message}</Text>}
            </View>
            <View style={[styles.badgeList, styles.alignLeft]}>
              {getValues("hobbies")?.map((hobby, index) => (
                    <Badge
                    key={index}
                    title={hobby}
                    isHighlighted
                    onPress={() => removeItem("hobbies", index)}
                  />
                ))}
            </View>
          </>
        )}

        {/* Step 2 */}
        {currentStep == 2 && (
          // bij het invoegen van een interesse zal een lijst te zien worden
          <>
            <View style={styles.alignLeft}>
              <Text style={styles.titleMedium}>What are your interests?</Text>  
              <Text style={styles.subtitle}>Add at least 3.</Text>

              <Controller
                control={control}
                name="interests"
                render={({ field: {onBlur, inputValue } }) => (
                  <TextInput
                    style={[
                      loginStyles.input,
                      errors.interests
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setInputValue}
                    value={inputValue}
                    placeholder="Interest"
                    placeholderTextColor={colors.placeholder}
                    onSubmitEditing={() => addItem("interests")}
                  />
                )}
              />
            </View>
            <View style={[styles.badgeList, styles.alignLeft]}>
            {formData.interests.map((interests, index) => (
                  <Badge
                    key={index}
                    title={interests}
                    isHighlighted
                  />
                ))}
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
                  render={({ field: {onBlur, value } }) => (
                    <TextInput
                      style={[
                        loginStyles.input,
                        errors.movies
                          ? { borderColor: "red", borderWidth: 1 }
                          : {},
                      ]}
                      onBlur={onBlur}
                      onChangeText={setInputValue}
                      value={value}
                      placeholder="Enter a movie"
                      placeholderTextColor={colors.placeholder}
                      onSubmitEditing={() => addItem("movies")}
                    />
                  )}
                />
              </View>
              <View style={[styles.badgeList, styles.alignLeft]}>
                {formData.movies.map((movies, index) => (
                    <Badge
                      key={index}
                      title={movies}
                      isHighlighted
                    />
                  ))}
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
                  render={({ field: {onBlur, value } }) => (
                    <TextInput
                      style={[
                        loginStyles.input,
                        errors.music
                          ? { borderColor: "red", borderWidth: 1 }
                          : {},
                      ]}
                      onBlur={onBlur}
                      onChangeText={setInputValue}
                      value={inputValue}
                      placeholder="Enter a song or artist"
                      placeholderTextColor={colors.placeholder}
                      onSubmitEditing={() => addItem("music")}
                    />
                  )}
                />
              </View>
              <View style={[styles.badgeList, styles.alignLeft]}>
              {formData.music.map((music, index) => (
                  <Badge
                    key={index}
                    title={music}
                    isHighlighted
                  />
                ))}
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
                  render={({ field: {onBlur, value } }) => (
                    <TextInput
                      style={[
                        loginStyles.input,
                        errors.games
                          ? { borderColor: "red", borderWidth: 1 }
                          : {},
                      ]}
                      onBlur={onBlur}
                      onChangeText={setInputValue}
                      value={value}
                      placeholder="Enter a game"
                      placeholderTextColor={colors.placeholder}
                      onSubmitEditing={() => addItem("games")}
                    />
                  )}
                />
              </View>
              <View style={[styles.badgeList, styles.alignLeft]}>
              {formData.games.map((games, index) => (
                  <Badge
                    key={index}
                    title={games}
                    isHighlighted
                  />
                ))}
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
                  render={({ field: {onBlur, value } }) => (
                    <TextInput
                      style={[
                        loginStyles.input,
                        errors.books
                          ? { borderColor: "red", borderWidth: 1 }
                          : {},
                      ]}
                      onBlur={onBlur}
                      onChangeText={setInputValue}
                      value={value}
                      placeholder="Enter a game"
                      placeholderTextColor={colors.placeholder}
                      onSubmitEditing={() => addItem("books")}
                    />
                  )}
                />
              </View>
              <View style={[styles.badgeList, styles.alignLeft]}>
              {formData.books.map((books, index) => (
                  <Badge
                    key={index}
                    title={books}
                    isHighlighted
                  />
                ))}
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
            <PrimaryButtonPill title="Continue" onPress={handleSubmit(nextStep)} />
          </View>
        )}

        {/* Submit */} 
        {/* routen naar home momenteel -> is later voor sturen naar backend */}
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
        {/* mag niet getoond worden bij laatste stap */}
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
