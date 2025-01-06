import React, { useState,useEffect } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback, Text,Image,Alert } from 'react-native';
import GradientBackground from '../components/LinearBackgroundProfile'; // Adjust the path as needed
import SwipeableTabs from '../components/SwipeableTabs';  // Import the SwipeableTabs component
import Bio from '../components/ProfileBio';  // Import your Bio component
import Header from '../components/DefaultHeader'; // Adjust path if necessary
import ProfileCard from '../components/ProfileCard'; // Import the ProfileCard component
import EventCard from '../components/Gateway';
import InterestCard from '../components/InterestCard';
import Constants from 'expo-constants';
import {getUserData,storeSecretStorage} from "../services/GetToken";
import axiosInstance from "../services/AxiosConfig";


const eventData = [
  {
    id: 1,
    profilePicture: 'https://via.placeholder.com/150',
    creatorName: 'Sports Club',
    isGroup: true,
    eventName: 'Group Jogging Session',
    eventDate: '5/12',
    location: 'City Park Entrance',
    description: 'Join the club for a morning jogging session! Start your day with a healthy habit and great company.',
  },
  {
    id: 2,
    profilePicture: 'https://via.placeholder.com/150',
    creatorName: 'John Doe',
    isGroup: false,
    eventName: 'Football Afternoon',
    eventDate: '4/12',
    location: 'Behind Block A, Campus KAAI',
    description: 'Join us for a fun football afternoon!',
  },
  {
    id: 3,
    profilePicture: 'https://via.placeholder.com/150',
    creatorName: 'Jane Smith',
    isGroup: false,
    eventName: 'Yoga in the Park',
    eventDate: '6/12',
    location: 'Central Park',
    description: 'Relax and rejuvenate with a peaceful yoga session in the park.',
  },
];

const interestsData = [
  { id: 1, title: 'Interests', buttonText: 'Add a Interest' },
  { id: 2, title: 'Hobbies', buttonText: 'Add a Hobby' },
  { id: 3, title: 'Movies', buttonText: 'Add a Game' },
  { id: 4, title: 'Books', buttonText: 'Add a Book' },
  { id: 5, title: 'Songs', buttonText: 'Add a Song' },
  { id: 6, title: 'Games', buttonText: 'Add a Game' },
];





const Profile = (userData) => {
  return(
    <View>
      <Bio
        name={userData.userData.name}
        age={25}
        pronouns="He/Him"
        bioText="Hello! I love hiking, photography, and coding. Always up for an adventure!"
      />
    </View>
  )
};

const Interests = (userData) => {
  return(
    <ScrollView style={styles.container}>
        {Object.entries(userData.userData.traits).map(([key, values]) => {
          if (key == "mbti"){
            return(null);
          } 

        return (
          <InterestCard
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the trait name
            badges_array={values} // Pass the array of values for the trait
          />
        );
      })}
    </ScrollView>
  )
};

const Gateways = () => {
  
  return(
    <ScrollView>
     {eventData.map((event) => (
        <EventCard
          key={event.id} // Use a unique key for each card
          profilePicture={event.profilePicture}
          creatorName={event.creatorName}
          isGroup={event.isGroup}
          eventName={event.eventName}
          eventDate={event.eventDate}
          location={event.location}
          description={event.description}
        />
      ))}
    </ScrollView>
  )
};


const ProfileScreen = ({route}) => {
  const {ownProfile} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [profileData, setProfileData] = useState({});
  const dismissKeyboard = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
  };
  useEffect(() => {
    if (ownProfile){
      const fetchProfile = async () => {
        const userid = await getUserData("id");
        const accessToken = await getUserData("accessToken");
        const refreshToken = await getUserData("refreshToken");
        try {
          const response = await fetch(`${Constants.expoConfig.extra.BASE_URL}/auth/profile/${userid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken,
              "x-refresh-token": refreshToken, // Optionally include refresh token as a custom header
            }
          });
          const data = await response.json();
          const pfp_get_url = await axiosInstance.get(
            `${Constants.expoConfig.extra.BASE_URL}/auth/pfp/${data.pfp}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-refresh-token": refreshToken,
              },
            }
          );
          data.profilePicture = pfp_get_url.data.file;
          setProfileData(data);
        }
        catch (error) {
          console.error(error);
        }
      };
      fetchProfile();
    }
  }, []);

  const routes = [
    { key: 'profile', title: 'Profile' },
    { key: 'interests', title: 'Interests' },
    { key: 'gateways', title: 'Gateways' },
  ];

  const scenes = {
    profile: Profile,
    interests: Interests,
    gateways: Gateways,
  };
  const handleEditPress = () => {
    navigation.navigate('EditProfile', {
      profile: {
        name: "John Doe",
        age: 25,
        pronouns: "He/Him",
        bioText: "Hello! I love hiking, photography, and coding. Always up for an adventure!",
      },
      interests: interestsData,
      onSave: (updatedProfile, updatedInterests) => {
        // Handle the updated data
        console.log("Updated Profile:", updatedProfile);
        console.log("Updated Interests:", updatedInterests);
  
        // Update the ProfileCard and Interests data
      },
    });
  };

  

    return(
        <View style={styles.container}>
            <GradientBackground>
              <View style={styles.containerHeader}>
                <Header showBackArrow={true} notificationCount={5} />
                {/* Other components go here */}
              </View>
              <ProfileCard
                profilePicture={{uri: profileData.profilePicture}} // Pass the image using require()
                name={profileData.name}
                age={25}
                mbti={profileData.mbti}
                quote="The best way to predict the future is to create it."
                onEditPress={handleEditPress} // Pass the function for button action
              />

            </GradientBackground>
            
            <SwipeableTabs routes={routes} scenes={scenes} userData={profileData}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },containerHeader:{
      
      flex:1,
    }
    
  });

export default ProfileScreen;