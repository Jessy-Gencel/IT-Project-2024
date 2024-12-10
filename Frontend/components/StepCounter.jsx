import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

const StepCounter = ({ currentStep, stepsCount }) => {
  const stepsArray = Array.from({ length: stepsCount }, (_, i) => i + 1);
  return (
    <View style={styles.stepsContainer}>
      {stepsArray.map((step, index) => {
        const isActive = step <= currentStep; // Determine if step is active
        const isCompleted = step < currentStep; // Determine if step is completed
        const isLast = index === stepsArray.length - 1; // Determine if it's the last step

        return (
          <View style={styles.stepContainer} key={index}>
            {/* Step circle */}
            <View
              style={[
                styles.circle,
                isActive && styles.activeCircle,
                isCompleted && styles.completedCircle,
              ]}
            >
              <Text style={styles.circleText}>{step}</Text>
            </View>
            {!isLast && (
              <View
                style={[
                  styles.line,
                  isActive && styles.activeLine,
                  isCompleted && styles.completedLine,
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  activeCircle: {
    opacity: 1,
  },
  completedCircle: {
    opacity: 1,
  },
  circleText: {
    color: colors.textWhite,
    fontWeight: "bold",
  },
  line: {
    width: 40,
    height: 5,
    backgroundColor: colors.accent,
    opacity: 0.5,

  },
  activeLine: {
    opacity: 0.5,
  },
  completedLine: {
    opacity: 1,
  },
});

export default StepCounter;
