import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import colors from "../theme/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import Badge from "../components/Badge";
import ProgressBar from "../components/ProgressBar";

const MatchingCard = ({
  name,
  src,
  age,
  interests,
  hobbies,
  games,
  movies,
  books,
  music,
  matchPercentage,
}) => {
  return (
    <View style={styles.card}>
      <Image source={src} style={styles.image} />

      <View style={styles.cardInfo}>
        {/* Name */}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {name}, {age}
          </Text>
        </View>

        {/* Progress Bar */}
        <View>
          <Text>{matchPercentage}%</Text>
          <ProgressBar
            fillWidth={matchPercentage}
            height={15}
            borderRadius={10}
            barColor="#5F63E2"
          />
        </View>

        {/* Badges */}
        {/* Interests */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeTitle}>Interests</Text>
          <View style={styles.badgeList}>
            {interests.map((title,index) => {
              return <Badge key={index} title={title} />;
            })}
          </View>
        </View>
        {/* Hobbies */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeTitle}>Hobbies</Text>
          <View style={styles.badgeList}>
            {interests.map((title,index) => {
              return <Badge key={index} title={title} />;
            })}
          </View>
        </View>
        {/* Books */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeTitle}>Books</Text>
          <View style={styles.badgeList}>
            {interests.map((title,index) => {
              return <Badge key={index} title={title} />;
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  card: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.placeholder,
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: "contain",
  },
  cardInfo: {
    padding: 10,
    gap: 10,
  },
  nameContainer: {},
  name: {
    fontWeight: "medium",
    fontSize: 24,
  },
  badgeList: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 15,
  },
};

export default MatchingCard;
