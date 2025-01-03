import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback, Text,Image,Alert } from 'react-native';
import GradientBackground from '../components/LinearBackgroundProfile'; // Adjust the path as needed
import SwipeableTabsTest from '../components/SwipeableTabsTest';  // Import the SwipeableTabs component
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

  const ProfileScreenTest = ({ navigation }) => {
    const [currentSection, setCurrentSection] = useState(1);

    const handleEditPress = () => {
        Alert.alert("Edit Profile", "This button would normally navigate to the Edit Profile screen.");
      };
    
    return(
    <View style={styles.container}>
        <GradientBackground>
          <View style={styles.containerHeader}>
            <Header showBackArrow={true} notificationCount={5} />
          </View>
          <ProfileCard
            profilePicture={require('../assets/brent_klein.png')}
            name="John Doe"
            age={25}
            mbti="INTJ"
            quote="The best way to predict the future is to create it."
            onEditPress={handleEditPress}
          />
        </GradientBackground>
        <SwipeableTabsTest currentSection = {1} />
    </View>
    )
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    containerHeader:{
      flex:1,
    }
    
  });

export default ProfileScreenTest;