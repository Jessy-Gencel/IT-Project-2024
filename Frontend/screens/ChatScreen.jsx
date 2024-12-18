import React from "react";
import { View, Text, StyleSheet, Button, Image, ScrollView, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Badge from "../components/Badge";
import MessageBubble from '../components/MessageBubble';
import LinearBackground from '../components/LinearBackground';
import styles from "../styles/LogIn";

const ChatScreen = ({ navigation }) => {
  const messages = [
    { id: "1", message: "Imperial Nuns Admonished Truffles For Activists Blissfully.", sender: true },
    { id: "2", message: "Insensitive Nutritionists Attacked Turkish Foolish Accordions Bashfully.", sender: false },
    { id: "3", message: "Inexpensive Nude Apollo Tripped Fanged Apollo Busily.", sender: true },
    { id: "4", message: "Iconic Naked Aladdin Tasted Fat Aprons Brashly.", sender: false },
  ];



  return (
    <LinearBackground>
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" style={styles.backIcon}/>
        <Image
          source={require('../assets/brent_klein.png')}
          style={styles.topPfp}
        />
        <Text style={styles.topName}>Brent Devroey</Text>
      </View>
      <View style={styles.profileShort}>
        <Image
          source={require('../assets/brent_groot.png')}
          style={styles.pfpBig}
        />
        <Text style={styles.pfpName}>Brent Devroey</Text>
        <Text style={styles.biography}>Ge moet naar de maan schieten en in de sterren belanden</Text>
      </View>
      <View style={styles.matchSection}>
        <Text style={styles.matchText}>You matched on</Text>
        <View style={styles.badges}>
          <Badge text="Football" />
          <Badge text="Games" />
          <Badge text="Books" />
          <Badge text="Poëzie" />
          <Badge text="MILFs" />
        </View>
      </View>
      <ScrollView style={styles.chatSection} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((item) => (
          <MessageBubble
            key={item.id}
            message={item.message}
            sender={item.sender}
          />
        ))}
      </ScrollView>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Write a message..." />
        <Ionicons name="send-outline" size={24} color="#F7931E" style={styles.sendIcon} />
      </View>
    </View>
</LinearBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backIcon: {
    marginRight: 10,
  },
  topPfp: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  topName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  menuIcon: {
    marginLeft: "auto",
  },
  profileShort: {
    alignItems: "center",
    marginTop: 20,
  },
  pfpBig: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  pfpName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  biography: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  matchSection: {
    marginTop: 30,
    alignItems: "center",
  },
  matchText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#353535",
    marginBottom: 10,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  chatSection: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FAFAFA",
  },
  sendIcon: {
    marginLeft: 10,
  },
});

export default ChatScreen;