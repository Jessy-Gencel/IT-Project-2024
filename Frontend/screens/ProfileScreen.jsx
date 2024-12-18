import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback, Text,Image,Alert } from 'react-native';
import GradientBackground from '../components/LinearBackgroundProfile'; // Adjust the path as needed
import SwipeableTabs from '../components/SwipeableTabs';  // Import the SwipeableTabs component
import Bio from '../components/ProfileBio';  // Import your Bio component
import Header from '../components/DefaultHeader'; // Adjust path if necessary
import ProfileCard from '../components/ProfileCard'; // Import the ProfileCard component
import EventCard from '../components/Gateway';
import InterestCard from '../components/InterestCard';

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
];



const Profile = () => {
  return(
    <View>
      <Bio
        name="John Doe"
        age={25}
        pronouns="He/Him"
        bioText="Hello! I love hiking, photography, and coding. Always up for an adventure!"
      />
    </View>
  )
};

const Interests = () => {
  return(
    <ScrollView style={styles.container}>
      {interestsData.map((item) => (
        <InterestCard
          key={item.id}
          title={item.title}
          buttonText={item.buttonText} // Pass buttonText to display in the popup
        />
      ))}
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

const ProfileScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dismissKeyboard = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
  };

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
    Alert.alert("Edit Profile", "This button would normally navigate to the Edit Profile screen.");
    // Replace the Alert with your navigation or function to go to another screen when ready
  };

    return(
        <View style={styles.container}>
            <GradientBackground>
            <View style={styles.containerHeader}>
            <Header showBackArrow={true} notificationCount={5} />
            {/* Other components go here */}
          </View>
          <ProfileCard
            profilePicture={require('../assets/brent_klein.png')} // Pass the image using require()
            name="John Doe"
            age={25}
            mbti="INTJ"
            quote="The best way to predict the future is to create it."
            onEditPress={handleEditPress} // Pass the function for button action
          />

            </GradientBackground>
            
            <SwipeableTabs routes={routes} scenes={scenes} />
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