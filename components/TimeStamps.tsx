import React, { useEffect, useState } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

interface TimeStampsProps {
  seekTime: Animated.Value;
  /**
   * Total Time in SECONDS
   */
  totalTime: number;
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

// This is component is created seperatly so that other components dont re-render
export default function TimeStamps({ seekTime, totalTime }: TimeStampsProps) {
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const setSecond = ({ value }: { value: number }) => {
    const second = Math.floor(value / 1000);
    if (second > currentSeconds) {
      setCurrentSeconds(second);
    }
  };

  useEffect(() => {
    const id = seekTime.addListener(setSecond);
    return () => {
      seekTime.removeListener(id);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${secondToMinute(
        currentSeconds
      )}:${formattedSeconds(currentSeconds)}`}</Text>
      <Text style={styles.text}>{`${secondToMinute(
        totalTime
      )}:${formattedSeconds(totalTime)}`}</Text>
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
