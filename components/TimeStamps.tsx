import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { runOnJS, useDerivedValue } from "react-native-reanimated";
import { SONG_LENGTH } from "../constants";

interface TimeStampsProps {
  seekTime: Animated.SharedValue<number>;
}

const secondToMinute = (seconds: number) => {
  return Math.floor(seconds / 60);
};

const formattedSeconds = (seconds: number) => {
  const onlySeconds = seconds % 60;
  if (onlySeconds < 10) {
    return `${0}${onlySeconds}`;
  }
  return onlySeconds;
};

const TotalTime = Math.floor(SONG_LENGTH / 1000);

// This is component is created seperatly so that other components dont re-render
export default function TimeStamps({ seekTime }: TimeStampsProps) {
  const [currentTime, setCurrentTime] = useState(0);

  const setCorrectTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds !== currentTime) {
      setCurrentTime(seconds);
    }
  };

  useDerivedValue(() => {
    runOnJS(setCorrectTime)(seekTime.value);
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={styles.text}>{`${secondToMinute(
        seekTime.value / 1000
      )}:${formattedSeconds(
        Math.floor(seekTime.value / 1000)
      )}`}</Animated.Text>
      <Text style={styles.text}>{`${secondToMinute(
        TotalTime
      )}:${formattedSeconds(TotalTime)}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  text: {
    color: "white",
    fontSize: 13,
    opacity: 0.5,
    fontFamily: "Gotham-Book",
  },
});
