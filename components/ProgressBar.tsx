import React from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  seekTime: Animated.Value;
  songLength: number;
}

export default function ProgressBar({
  seekTime,
  songLength,
}: ProgressBarProps) {
  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: seekTime.interpolate({
              inputRange: [0, songLength],
              outputRange: ["0%", "100%"],
              easing: Easing.linear,
            }),
          },
        ]}
      ></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    position: "relative",
    borderRadius: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: "white",
    borderRadius: 2,
  },
});
