import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../theme/colors";

const SecondaryButton = ({ title, onPress }) => {
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
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.textBlack,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SecondaryButton;
