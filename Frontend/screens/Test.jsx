import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard,
  TouchableWithoutFeedback, Text,
  FlatList,} from 'react-native';
import EventCard from '../components/Gateway'; // Adjust the path accordingly
import SearchBar from '../components/SearchBar'; // Adjust the path accordingly
import ProgressBar from '../components/ProgressBar'; // Adjust the path accordingly
import PopupExample from '../components/PopUp'; // Adjust the path accordingly
import LinkText from '../components/Link';
import ScrollableList from '../components/ScrollList'; // Adjust the path if necessary
import MessageBubble from '../components/MessageBubble';
import Header from '../components/DefaultHeader'; // Adjust path if necessary
import MessageListHeader from '../components/MessageListHeader'; // Adjust path accordingly
import GradientBackground from '../components/LinearBackground'; // Adjust the path as needed


const App = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
  
  };
  const exampleItems = Array.from({ length: 15 }, (_, i) => ({
    id: String(i),
    title: `Item ${i + 1}`,
  }));

  return (
  
    

    
          <ScrollView style={styles.scrollViewStyle}>
            <GradientBackground>
<View style={styles.spaceInBetween}></View> 

<View style={styles.containerHeader}>
      <Header showBackArrow={true} notificationCount={5} />
      {/* Other components go here */}
    </View>
<View style={styles.spaceInBetween}></View> 


      <MessageListHeader/>
      {/* Your message list or other content goes here */}
    
    <View style={styles.spaceInBetween}></View> 
    <View contentContainerStyle={styles.containerGateway}>
          <EventCard
      profilePicture="https://via.placeholder.com/150"
      creatorName="Sports Club"
      isGroup={true} // This adds the shield icon
      eventName="Group Jogging Session"
      eventDate="5/12"
      location="City Park Entrance"
      description="Join the club for a morning jogging session! Start your day with a healthy habit and great company.Join the club for a morning jogging session! Start your day with a healthy habit and great company.Join the club for a morning jogging session! Start your day with a healthy habit and great company.Join the club for a morning jogging session! Start your day with a healthy habit and great company."
    />


    <EventCard
      profilePicture="https://via.placeholder.com/150"
      creatorName="John Doe"
      isGroup={false} // Indicates this is a user
      eventName="Football Afternoon"
      eventDate="4/12"
      location="Behind Block A, Campus KAAI"
      description="Join us for a fun football afternoon!"
    />
    </View>
    <View style={styles.spaceInBetween}></View>
    <View style={styles.containerPopUp}>
      <PopupExample />
    </View>
    <View style={styles.spaceInBetween}></View>
    <View style={styles.ProgressBar}>
      <ProgressBar fillWidth={80} />
      </View>
      <View style={styles.spaceInBetween}></View>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.containerSearchBar}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search here..."
          onBlur={() => console.log('Search Bar Lost Focus')} // Optional, for additional actions
        />
      </View>
    </TouchableWithoutFeedback>
    <View style={styles.spaceInBetween}></View>
    <View style={styles.containerLink}>
      {/* Example Link */}
      <LinkText url="https://www.youtube.com">Go to YouTube</LinkText>
    </View>

    <View style={styles.spaceInBetween}></View>


    <ScrollableList items={exampleItems} />

    <View style={styles.spaceInBetween}></View>

    <View style={styles.container}>
      {/* Receiver's Message with Profile Picture */}
      <MessageBubble
        message="Hi there! How are you?"
        sender={false}
        profilePicture="https://via.placeholder.com/150"
      />

      {/* Sender's Message */}
      <MessageBubble
        message="I'm doing great, thanks! What about you?"
        sender={true}
      />

      {/* Another Received Message */}
      <MessageBubble
        message="I'm good too, thanks for asking!I'm good too, thanks for asking!I'm good too, thanks for asking!I'm good too, thanks for asking!I'm good too, thanks for asking!I'm good too, thanks for asking!"
        sender={false}
        profilePicture="https://via.placeholder.com/150"
      />
    </View>

    <View style={styles.spaceInBetween}></View>

    
    <View style={styles.spaceInBetween}></View>

    </GradientBackground>
          </ScrollView>
          

    
    
    
  );
  

  
};

const styles = StyleSheet.create({
  containerGateway: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  containerProgressbar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  containerSearchbar: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  containerPopUp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceInBetween:{
    padding: 50,
  },
  containerLink: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScrollList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMessageBubble: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Optional background for the chat area
    padding: 10,
  },
  containerHeader: {
    flex: 1,
    
  },
  
  
});

export default App;



