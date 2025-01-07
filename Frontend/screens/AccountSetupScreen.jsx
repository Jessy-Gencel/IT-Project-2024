import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import Constants from "expo-constants";
import StepCounter from "../components/StepCounter";
import Badge from "../components/Badge";
import PrimaryButtonPill from "../components/PrimaryButtonPill";
import TertiaryButon from "../components/TertiaryButton";
import ImageUploadComponent from "../components/ImageUploadComponent"; // Image upload component
// Import the MBTI and interests data from your configuration
import mbti from "../config/mbti";
import interests from "../config/interests";
import { getUserData } from "../services/GetToken";
import axiosInstance from "../services/AxiosConfig";

//weghalen van een hobby badge moet nog gebeuren
//pas op het einde alles doorsturen naar backend via axios
//validatie moet nog gebeuren
// Define validation schemas using Yup
const hobbiesSchema = yup
  .array()
  .of(yup.string().required("Please provide at least 3 hobbies"))
  .min(3, "Please provide at least 3 hobbies");

const interestsSchema = yup
  .array()
  .of(yup.string().required("Please provide at least 3 interests."))
  .min(3, "Please provide at least 3 interests.");

const favoritesSchema = yup.object({
  games: yup
    .array()
    .of(yup.string().required("Each game should be a string"))
    .default([]),
  movies: yup
    .array()
    .of(yup.string().required("Each movie should be a string"))
    .default([]),
  books: yup
    .array()
    .of(yup.string().required("Each book should be a string"))
    .default([]),
  music: yup
    .array()
    .of(yup.string().required("Each song or artist should be a string"))
    .default([]),
});

const mbtiSchema = yup.string({
  mbti: yup.string().required("Please select your MBTI"), // Expecting a string value here
});

const biographySchema = yup
  .string()
  .max(500, "Biography should not exceed 500 characters");

const schema = yup.object({
  hobbies: hobbiesSchema,
  interests: interestsSchema,
  favorites: favoritesSchema,
  mbti: mbtiSchema,
  biography: biographySchema,
});

const AccountSetupScreen = ({ navigation, route }) => {
  const [inputValue, setInputValue] = useState("");
  //following is needed bc otherwise you're simultaneously typing in
  // the same input field for all the different fields
  const [moviesInput, setMoviesInput] = useState("");
  const [musicInput, setMusicInput] = useState("");
  const [gamesInput, setGamesInput] = useState("");
  const [booksInput, setBooksInput] = useState("");
  const {idRegister} = route.params;
  const [userProfile, setUserProfile] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const stepsCount = 5;
  const [formData, setFormData] = useState({
    id: idRegister,
    mbti: "", // Default to the first MBTI type
    interests: [],
    hobbies: [],
    games: [],
    movies: [],
    books: [],
    music: [],
    biography: "",
  });
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    const getUserName = async () => {
      const token = await getUserData("accessToken");
      const refreshToken = await getUserData("refreshToken");
      try {
        console.log("idRegister", idRegister);
        const response = await axiosInstance.get(
          `${Constants.expoConfig.extra.BASE_URL}/auth/users/${idRegister}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
              "x-refresh-token": refreshToken, // Optionally include refresh token as a custom header
            },
          }
        );

        const data = response.data;
        console.log("User profile data:", data);
  
        setUserProfile(data);
        
      } catch (error) {
        console.error(error);
      }
    };
    getUserName();
  }, []);

  const handleUploadSuccess = async (base64) => {
    console.log("File uploaded successfully:", base64);
    setBase64Image(base64);
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
      biography: "",
    },
  });

  const nextStep = async () => {
    const stepFields = {
      1: ["hobbies"],
      2: ["interests"],
      3: [
        "favorites.games",
        "favorites.movies",
        "favorites.books",
        "favorites.music",
      ],
      4: ["mbti"],
    };
    console.log("Current step:", currentStep);
    console.log("formData:", formData["hobbies"]);
    const fieldsToValidate = stepFields[currentStep];
    console.log("Fields to validate:", fieldsToValidate);
    const isValid = await trigger(fieldsToValidate);
    console.log("Validation result:", isValid);

    if (isValid) {
      if (currentStep < stepsCount) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } else {
      console.log("Validation failed:", errors);
    }
  };

  const addIdToFormData = (newId) => {
    console.log("Adding ID to form data:", newId);
    setFormData((prevFormData) => ({
      ...prevFormData, // Spread the previous state
      id: newId, // Update only the id
    }));
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

  const addItem = (field, value) => {
    console.log("Adding item:", value);
    if (value.trim()) {
      if (field === "interests" && !interests.includes(value.trim())) {
        alert("Please select a valid interest from the predefined list.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      
      if(currentStep == 3){
        setValue(`favorites.${field}`, [...getValues(`favorites.${field}`), value.trim()]);
        console.log("value", value);
      }else{
        setValue(field, [...getValues(field), value]);

      }

      console.log("value", value);
    }
  };



  const removeItem = (field, index) => {
    const updatedField = field.includes("favorites.")
      ? `favorites.${field.split('.')[1]}`
      : field;
  
    const newValues = formData[updatedField].filter((_, i) => i !== index);
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [updatedField]: newValues,
    }));
  
    setValue(updatedField, newValues);
  };

  const handleFormSubmit = async () => {
    console.log("Form data submitted:", formData);
    const formattedData = new FormData();
    formattedData.append("data", JSON.stringify(formData));
    formattedData.append("pfp", base64Image);
    console.log("Form data after appending pfp:", formattedData);

    try {
      const response = await axios.post(
        `${Constants.expoConfig.extra.BASE_URL}/auth/createProfile`,
        formattedData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for multipart
          },
        }
      );

      console.log("Form data submitted successfully:", response.data);
      navigation.navigate("Home"); // Navigate to another screen upon success
    } catch (error) {
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
          Hi,  {`${userProfile["first_name"]?.substring(0, 1).toUpperCase()}${userProfile["first_name"]?.substring(1)}`}!{"\n"}Let's set up your account.
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
                render={({ field: { onBlur } }) => (
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
                    onSubmitEditing={() => {
                      addItem("hobbies", inputValue)
                      setInputValue("")}}
                  />
                )}
              />
              {errors.hobbies && (
                <Text style={{ color: "red" }}>{errors.hobbies.message}</Text>
              )}
            </View>
            <View style={styles.badgeList}>
              {formData.hobbies.map((hobby, index) => (
                <Badge
                  key={index}
                  title={hobby}
                  isHighlighted
                  onPress={() => removeItem("hobbies", index)}
                  close={true}
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
                render={({ field: { onBlur } }) => (
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
                    onSubmitEditing={() => {
                      addItem("interests", inputValue)
                      setInputValue("")}}
                  />
                )}
              />
              {errors.interests && (
                <Text style={{ color: "red" }}>{errors.interests.message}</Text>
              )}
            </View>
            <View style={styles.badgeList}>
              {formData.interests.map((interest, index) => (
                <Badge
                  key={index}
                  title={interest}
                  isHighlighted
                  onPress={() => removeItem("interests", index)}
                  close={true}
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
                render={({ field: { onBlur, } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.books
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setMoviesInput}
                    value={moviesInput}
                    placeholder="Enter a movie"
                    placeholderTextColor="gray"
                    onSubmitEditing={() => {
                      addItem("movies", moviesInput);
                      setMoviesInput("");
                    }}
                    close={true}
                  />
                )}
              />
              {errors.movies && (
                <Text style={{ color: "red" }}>{errors.movies.message}</Text>
              )}
              <View style={styles.badgeList}>
                {formData.movies.map((movie, index) => (
                  <Badge
                    key={index}
                    title={movie}
                    isHighlighted
                    onPress={() => removeItem("movies", index)}
                    close={true}
                  />
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
                      errors.music
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setMusicInput}
                    value={musicInput}
                    placeholder="Enter a song or artist"
                    placeholderTextColor="gray"
                    onSubmitEditing={() => {
                      addItem("music", musicInput);
                      setMusicInput(""); // Clear the input field
                    }}
                    
                  />
                )}
              />
              {errors.music && (
                <Text style={{ color: "red" }}>{errors.music.message}</Text>
              )}
              <View style={styles.badgeList}>
                {formData.music.map((music, index) => (
                  <Badge
                    key={index}
                    title={music}
                    isHighlighted
                    onPress={() => removeItem("music", index)}
                    close={true}
                  />
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
                      errors.games
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setGamesInput}
                    value={gamesInput}
                    placeholder="Enter a game"
                    placeholderTextColor="gray"
                    onSubmitEditing={() => {
                      addItem("games", gamesInput)
                      setGamesInput("")}}
                    
                  />
                )}
              />
              {errors.games && (
                <Text style={{ color: "red" }}>{errors.games.message}</Text>
              )}
              <View style={styles.badgeList}>
                {formData.games.map((game, index) => (
                  <Badge
                  key={index}
                  title={game}
                  isHighlighted
                  onPress={() => removeItem("games", index)}
                  close={true}
                />
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
                      errors.books
                        ? { borderColor: "red", borderWidth: 1 }
                        : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={setBooksInput}
                    value={booksInput}
                    placeholder="Enter a book"
                    placeholderTextColor="gray"
                    onSubmitEditing={() =>{
                      addItem("books", booksInput)
                      setBooksInput("")}
                    }                    
                  />
                )}
              />
              {errors.books && (
                <Text style={{ color: "red" }}>{errors.books.message}</Text>
              )}
              <View style={styles.badgeList}>
                {formData.books.map((books, index) => (
                  <Badge
                    key={index}
                    title={books}
                    isHighlighted
                    onPress={() => removeItem("books", index)}
                    close={true}
                  />
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
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, mbti: value }))
                }
                items={mbti.map((type) => ({
                  label: type,
                  value: type,
                }))}
              />
            </View>
          </>
        )}

        {/* Step 5: Overview of all Data */}
        {currentStep == stepsCount && (
          <>
            <Text style={styles.titleMedium}>Overview</Text>
            <Text style={styles.subtitle}>
              Please confirm all your information below.
            </Text>

            <Text style={styles.input}>
              Hobbies: {formData.hobbies.join(", ")}
            </Text>
            <Text style={styles.input}>
              Interests: {formData.interests.join(", ")}
            </Text>
            <Text style={styles.input}>
              Movies: {formData.movies.join(", ")}
            </Text>
            <Text style={styles.input}>Music: {formData.music.join(", ")}</Text>
            <Text style={styles.input}>Games: {formData.games.join(", ")}</Text>
            <Text style={styles.input}>Books: {formData.books.join(", ")}</Text>
            <Text style={styles.input}>MBTI: {formData.mbti}</Text>

            <Text style={styles.titleMedium}>Biography</Text>
            <Controller
              control={control}
              name="biography"
              render={({ field: { onBlur } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors.biography
                      ? { borderColor: "red", borderWidth: 1 }
                      : {},
                  ]}
                  onBlur={onBlur}
                  onChangeText={setInputValue}
                  value={inputValue}
                  placeholder="Write a short biography"
                  placeholderTextColor="gray"
                  multiline
                />
              )}
            />
            {errors.biography && (
              <Text style={{ color: "red" }}>{errors.biography.message}</Text>
            )}

            <ImageUploadComponent onUploadSuccess={handleUploadSuccess} />

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
