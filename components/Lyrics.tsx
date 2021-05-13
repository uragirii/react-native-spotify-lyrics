import React from "react";
import { StyleProp, StyleSheet, Text, Animated } from "react-native";

export interface LyricsProps {
  text: { string: string }[];
  style: any;
}

export default function Lyrics({ text, style }: LyricsProps) {
  return (
    <>
      {text.map((t, index) => {
        return (
          <Animated.Text style={[styles.text, style]} key={`${index}_${t}`}>
            {t.string}
          </Animated.Text>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
