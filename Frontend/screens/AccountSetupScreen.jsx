import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import Constants from "expo-constants";
import StepCounter from "../components/StepCounter";
import Badge from "../components/Badge";
import PrimaryButtonPill from "../components/PrimaryButtonPill";
import TertiaryButon from "../components/TertiaryButton";
import ImageUploadComponent from '../components/ImageUploadComponent'; // Image upload component
// Import the MBTI and interests data from your configuration
import mbti from "../config/mbti";
import interests from "../config/interests";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

//weghalen van een hobby badge moet nog gebeuren 
//pas op het einde alles doorsturen naar backend via axios
//validatie moet nog gebeuren

const AccountSetupScreen = ({ navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const stepsCount = 5;
  const [formData, setFormData] = useState({
    id: "12345", // id is hardcoded here for now
    mbti: "",  // Default to the first MBTI type
    interests: [],
    hobbies: [],
    games: [],
    movies: [],
    books: [],
    music: [],
  });

  const handleUploadSuccess = (blob) => {
    console.log("File uploaded successfully:", blob);
    setFormData((prev) => ({ ...prev, profilePicture: blob }));
  };

  // Form handling using React Hook Form
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

  const nextStep = async () => {
    const stepFields = {
      1: ["hobbies"],
      2: ["interests"],
      3: ["favorites.games", "favorites.movies", "favorites.books", "favorites.music"],
      4: ["mbti"],
    };

    const fieldsToValidate = stepFields[currentStep];
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep < stepsCount) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } else {
      console.log("Validation failed:", errors);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipStep = () => {
    if (currentStep + 1 <= stepsCount) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate("Home");
    }
  };

  const addItem = (field) => {
    if (inputValue.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], inputValue.trim()],
      }));
      setValue(field, formData[field]);
      setInputValue(""); // Clear input field after submission
    }
  };

  const removeItem = (field, index) => {
    const currentValues = getValues(field);
    const updatedValues = currentValues.filter((_, i) => i !== index);
    setValue(field, updatedValues);
  };
 
  const handleFormSubmit = async () => {
    dataToSend.append("mbti", formData.mbti);  // Store the MBTI as a string

      

    // Append the profile picture (if available)
    if (formData.profilePicture) {
      dataToSend.append("profilePicture", formData.profilePicture, "profile.jpg");  // "profile.jpg" is just a placeholder
    }

    // Send data to backend using Axios
    try {
      const response = await axios.post(`${Constants.expoConfig.extra.BASE_URL}/auth/createProfile`, dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Form data submitted successfully:", response.data);
      navigation.navigate("Home"); // Navigate to the home screen or another screen upon success
    } catch (error) {
      console.log(error)
      console.error("Error submitting form data:", error);
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
                name="hobbies"
                render={({ field: {onBlur } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.hobbies
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setInputValue}
                    value={inputValue}
                    placeholder="Hobby"
                    placeholderTextColor="gray"
                    onSubmitEditing={() => addItem("hobbies")}
                  />
                )}
              />
              {errors.hobbies && <Text style={{ color: 'red' }}>{errors.hobbies.message}</Text>}
            </View>
            <View style={styles.badgeList}>
              {formData.hobbies.map((hobby, index) => (
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
          <>
            <View style={styles.alignLeft}>
              <Text style={styles.titleMedium}>What are your interests?</Text>
              <Text style={styles.subtitle}>Add at least 3.</Text>

              <Controller
                control={control}
                name="interests"
                render={({ field: {onBlur} }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.interests
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setInputValue}
                    value={inputValue}
                    placeholder="Interest"
                    placeholderTextColor="gray"
                    onSubmitEditing={() => addItem("interests")}
                  />
                )}
              />
              {errors.interests && <Text style={{ color: 'red' }}>{errors.interests.message}</Text>}
            </View>
            <View style={styles.badgeList}>
              {formData.interests.map((interest, index) => (
                <Badge
                  key={index}
                  title={interest}
                  isHighlighted
                />
              ))}
            </View>
          </>
        )}

        {/* Step 3: Favorites (Movies, Music, Games, Books) */}
        {currentStep == 3 && (
          <>
            <View style={styles.step3Wrapper}>
              <Text style={styles.titleMedium}>Favorite Movies</Text>
              <Controller
                control={control}
                name="movies"
                render={({ field: { onBlur } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.movies ? { borderColor: "red", borderWidth: 1 } : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setInputValue}
                    value={inputValue}
                    placeholder="Enter a movie"
                    placeholderTextColor="gray"
                    onSubmitEditing={() => addItem("movies")}
                  />
                )}
              />
              {errors.movies && <Text style={{ color: "red" }}>{errors.movies.message}</Text>}
              <View style={styles.badgeList}>
                {formData.movies.map((movie, index) => (
                  <Badge key={index} title={movie} isHighlighted />
                ))}
              </View>
            </View>

            {/* Music */}
            <View style={styles.step3Wrapper}>
              <Text style={styles.titleMedium}>Favorite Music</Text>
              <Controller
                control={control}
                name="music"
                render={({ field: { onBlur } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.music ? { borderColor: "red", borderWidth: 1 } : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setInputValue}
                    value={inputValue}
                    placeholder="Enter a song or artist"
                    placeholderTextColor="gray"
                    onSubmitEditing={() => addItem("music")}
                  />
                )}
              />
              {errors.music && <Text style={{ color: "red" }}>{errors.music.message}</Text>}
              <View style={styles.badgeList}>
                {formData.music.map((music, index) => (
                  <Badge key={index} title={music} isHighlighted />
                ))}
              </View>
            </View>

            {/* Games */}
            <View style={styles.step3Wrapper}>
              <Text style={styles.titleMedium}>Favorite Games</Text>
              <Controller
                control={control}
                name="games"
                render={({ field: { onBlur } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.games ? { borderColor: "red", borderWidth: 1 } : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setInputValue}
                    value={inputValue}
                    placeholder="Enter a game"
                    placeholderTextColor="gray"
                    onSubmitEditing={() => addItem("games")}
                  />
                )}
              />
              {errors.games && <Text style={{ color: "red" }}>{errors.games.message}</Text>}
              <View style={styles.badgeList}>
                {formData.games.map((game, index) => (
                  <Badge key={index} title={game} isHighlighted />
                ))}
              </View>
            </View>

            {/* Books */}
            <View style={styles.step3Wrapper}>
              <Text style={styles.titleMedium}>Favorite Books</Text>
              <Controller
                control={control}
                name="books"
                render={({ field: { onBlur } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.books ? { borderColor: "red", borderWidth: 1 } : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setInputValue}
                    value={inputValue}
                    placeholder="Enter a book"
                    placeholderTextColor="gray"
                    onSubmitEditing={() => addItem("books")}
                  />
                )}
              />
              {errors.books && <Text style={{ color: "red" }}>{errors.books.message}</Text>}
              <View style={styles.badgeList}>
                {formData.books.map((book, index) => (
                  <Badge key={index} title={book} isHighlighted />
                ))}
              </View>
            </View>
          </>
        )}

        {currentStep == 4 && (
          <>
            <View style={styles.alignLeft}>
              <Text style={styles.titleMedium}>What's your MBTI?</Text>
              
              {/* Debugging: Log the mbti data */}
              {console.log(mbti)} 
      
              <RNPickerSelect
                onValueChange={
                  (value) => setFormData((prev) => ({ ...prev, mbti: value }))
                }
                items={mbti.map((type) => ({
                    label: type,
                    value: type,
                  })
                )}
              />
                
              
              


            </View>
          </>
        )}

        {/* Step 5: Overview of all Data */}
        {currentStep == stepsCount && (
          <>
            <Text style={styles.titleMedium}>Overview</Text>
            <Text style={styles.subtitle}>Please confirm all your information below.</Text>

            <Text style={styles.input}>Hobbies: {formData.hobbies.join(", ")}</Text>
            <Text style={styles.input}>Interests: {formData.interests.join(", ")}</Text>
            <Text style={styles.input}>Movies: {formData.movies.join(", ")}</Text>
            <Text style={styles.input}>Music: {formData.music.join(", ")}</Text>
            <Text style={styles.input}>Games: {formData.games.join(", ")}</Text>
            <Text style={styles.input}>Books: {formData.books.join(", ")}</Text>
            <Text style={styles.input}>MBTI: {formData.mbti}</Text>

            <ImageUploadComponent
              onUploadSuccess={handleUploadSuccess}
            />

            <PrimaryButtonPill title="Submit" onPress={handleFormSubmit} />
          </>
        )}

        {/* Step Navigation */}
        <View style={styles.stepNavigation}>
          <PrimaryButtonPill title="Next" onPress={nextStep} />
          <TertiaryButon title="Skip" onPress={skipStep} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    gap: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  titleMedium: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 20,
  },
  alignLeft: {
    alignItems: "flex-start",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  badgeList: {
    flexWrap: "wrap",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  step3Wrapper: {
    marginBottom: 20,
  },
  stepNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default AccountSetupScreen;
