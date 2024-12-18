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
        <View>
          <Text>
            {name}, {age}
          </Text>
        </View>
        <View style={styles.badgeList}>
          {interests.map((title) => {
            return <Badge title={title} />;
          })}
        </View>
        <Text>{matchPercentage}%</Text>
        <ProgressBar
          fillWidth={matchPercentage}
          height={15}
          borderRadius={10}
          barColor="#5F63E2"
        />
      </View>
    </View>
  );
};

const styles = {
  card: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: "contain",
  },
};

export default MatchingCard;
