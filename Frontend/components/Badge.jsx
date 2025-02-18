import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const PrimaryButton = ({ title, isHighlighted, onPress, close }) => {
  return (
    <View style={[styles.container, isHighlighted && styles.highlighted]}>
      <Text style={isHighlighted ? styles.titleHighlighted : styles.title}>{title}</Text>
      
      {/* Conditionally render the close button if the 'close' prop is true */}
      {close && (
        <TouchableOpacity style={styles.closeButton} onPress={onPress}>
          <Ionicons
            name="close"
            size={16}
            color={colors.textBlack}
            style={isHighlighted ? styles.titleHighlighted : styles.title}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.placeholder,
    gap: 3,
  },
  title: {
    color: colors.textBlack,
    opacity: 0.7,
  },
  titleHighlighted: {
    color: colors.textBlack,
    opacity: 1,
  },
  closeButton: {
    marginLeft: 5, // Optional: Adjust spacing for close button
  },
  highlighted: {
    borderWidth: 1.5,
    borderColor: colors.accent,
    opacity: 1,
  },
});

export default PrimaryButton;
