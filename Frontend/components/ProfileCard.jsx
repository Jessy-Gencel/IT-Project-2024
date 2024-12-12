import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


import PrimaryButton from './PrimaryButton';

const ProfileCard = ({ profilePicture, name, age, mbti, quote, onEditPress }) => {
  return (
    <View style={styles.card}>
       <Image 
        source={{ uri: profilePicture }} // Handle both local and remote images
        style={styles.profileImage} 
      />
      
      <View style={styles.cardContent}>
        <Text style={styles.name}>
          {name}, {age}
        </Text>
        <Text style={styles.mbti}>{mbti}</Text>
        <Text style={styles.quote}>"{quote}"</Text>
        
        {/* Edit Profile Button */}
        <View style={styles.editbutton}>
        <PrimaryButton  title="Edit Profile" onPress={onEditPress} />
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    
    top:-25,
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    top:-10,
    width: 110,
    height: 110,
    borderRadius: 60,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  mbti: {
    fontSize: 18,
    color: '#888',
    marginVertical: 5,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    marginVertical: 5,
  }, editbutton:{
    marginTop:20,
  }
  
});

export default ProfileCard;
