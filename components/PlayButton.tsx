import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { runOnJS, useDerivedValue } from "react-native-reanimated";

interface PlayButtonProps {
  isPlaying: Animated.SharedValue<boolean>;
  onPress: () => void;
}

export default function PlayButton({ isPlaying, onPress }: PlayButtonProps) {
  const [showPause, setShowPause] = useState(false);

  const togglePause = (value: boolean) => {
    setShowPause(value);
  };

  // To change the button we need to render the component again
  useDerivedValue(() => {
    runOnJS(togglePause)(isPlaying.value);
  });

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Ionicons
        name={showPause ? "pause-circle-sharp" : "play-circle"}
        size={70}
        color="white"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
});
