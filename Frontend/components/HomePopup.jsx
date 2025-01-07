import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";

const HomePopup = ({
  isVisible,
  onClose,
  src,
  name,
  matchPercentages,
}) => {
  if (matchPercentages && src) {
    return (
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose} // Handles back button press on Android
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Image
                source={typeof src === "string" ? { uri: src } : src}
                style={styles.image}
              />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.matchInfo}>
                  {matchPercentages["hobby"]}% hobby match
                </Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Entypo name="cross" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
              {Object.entries(matchPercentages).map(([category, value]) => (
                <View key={category} style={styles.matchItem}>
                  <Text style={styles.matchTitle}>{category}</Text>
                  <View style={styles.progressBar}>
                    <View style={styles.progressBarContainer}>
                      <ProgressBar
                        title={category}
                        fillWidth={value}
                        height={20}
                        borderRadius={10}
                        barColor="#F7931E"
                      />
                    </View>
                    <Text style={styles.progressPercentage}>{value}%</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: "contain",
    borderRadius: 100,
    marginRight: 15,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  matchInfo: {
    fontSize: 14,
    color: "#666",
  },
  matchItem: {
    marginBottom: 15,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    width: 250,
  },
  progressBarContainer: {
    flex: 1,
  },
  progressPercentage: {
    color: "#F7931E",
    fontWeight: "700",
    marginLeft: 0,
  },
});

export default HomePopup;
