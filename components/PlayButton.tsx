import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PlayButtonProps {
  isPlaying: boolean;
  onPress: () => void;
}

export default function PlayButton({ isPlaying, onPress }: PlayButtonProps) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Ionicons
        name={isPlaying ? "pause-circle-sharp" : "play-circle"}
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
