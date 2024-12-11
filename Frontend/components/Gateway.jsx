import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';

const EventCard = ({
  profilePicture,
  creatorName,
  isGroup, // Indicates if the event is created by a group
  eventName,
  eventDate,
  location,
  description,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Check if the description is longer than 20 words
  const descriptionWords = description.split(' ');
  const isDescriptionLong = descriptionWords.length > 20;

  return (
    <View style={styles.card}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          <View style={styles.nameWrapper}>
            {isGroup ? (
              <MaterialIcons name="shield" size={18} color="#000" />
            ) : null} {/* No Icon for Users */}
            <Text style={[styles.creatorName, { marginLeft: isGroup ? 5 : 0 }]}>
              {creatorName}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={24} color="black" /> {/* Horizontal Dots */}
        </TouchableOpacity>
      </View>

      {/* Event Name */}
      <Text style={styles.eventName}>{eventName}</Text>

      {/* Event Date and Location */}
      <View style={styles.eventDetails}>
        <View style={styles.eventDetailItem}>
          <Feather name="calendar" size={18} color="#666" />
          <Text style={styles.eventDetailText}>{eventDate}</Text>
        </View>
        <View style={[styles.eventDetailItem, styles.locationItem]}>
          <Feather name="map-pin" size={18} color="#666" />
          <Text style={styles.eventDetailText}>{location}</Text>
        </View>
      </View>

      {/* Event Description */}
      <Text style={styles.description}>
        {showFullDescription || !isDescriptionLong
          ? description
          : descriptionWords.slice(0, 20).join(' ') + '...'}
      </Text>

      {/* Show More Button */}
      {isDescriptionLong && (
        <TouchableOpacity
          onPress={() => setShowFullDescription(!showFullDescription)}
          style={styles.showMoreButton}
        >
          <Text style={styles.showMoreText}>
            {showFullDescription ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorName: {
    fontSize: 16, // Reverted to smaller size
    fontWeight: 'bold',
  },
  eventName: {
    fontSize: 18, // Reverted to smaller size
    fontWeight: 'bold',
    marginBottom: 5, // Restored compact spacing
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10, // Restored compact spacing
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailText: {
    fontSize: 14, // Reverted to smaller size
    color: '#666',
    marginLeft: 5,
  },
  locationItem: {
    marginLeft: 20, // Restored compact spacing between date and location
  },
  description: {
    fontSize: 14, // Reverted to smaller size
    color: '#333',
  },
  showMoreButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  showMoreText: {
    fontSize: 14,
    color: '#007BFF',
  },
});


export default EventCard;

/*<ScrollView contentContainerStyle={styles.containerGateway}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerGateway: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});*/
