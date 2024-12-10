import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../theme/colors";

const PrimaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: colors.accent,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PrimaryButton;
