import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

interface ProgressBarProps {
  seekTime: Animated.SharedValue<number>;
  songLength: number;
}

export default function ProgressBar({
  seekTime,
  songLength,
}: ProgressBarProps) {
  const progress = useDerivedValue(() => {
    return (seekTime.value / songLength) * 100;
  }, []);

  const progressBarStyles = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[styles.progressBar, progressBarStyles]}
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
