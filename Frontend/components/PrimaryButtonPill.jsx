import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../theme/colors";

const PrimaryButtonPill = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: colors.accent,
    borderRadius: 50,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        // Shadow for Android
        elevation: 5,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PrimaryButtonPill;
