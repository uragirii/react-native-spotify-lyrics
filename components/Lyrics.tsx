import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { DARK_LYRICS_COLOR, SONG_BG_COLOR } from "../constants";

export interface LyricsProps {
  data: {
    time: number;
    words: {
      string: string;
    }[];
  };
  seekTime: Animated.SharedValue<number>;
}

export default function Lyrics({ data, seekTime }: LyricsProps) {
  const lyricsColor = useDerivedValue(() => {
    if (seekTime.value < data.time - 100 || seekTime.value === 0) {
      return DARK_LYRICS_COLOR;
    } else if (seekTime.value < data.time) {
      return withTiming("white", {
        duration: 100,
      });
    } else {
      return "white";
    }
  });
  const lyricsStyle = useAnimatedStyle(() => {
    return {
      color: lyricsColor.value,
    };
  }, []);

  return (
    <>
      {data.words.map((t, index) => {
        return (
          <Animated.Text
            style={[styles.text, lyricsStyle]}
            key={`${index}_${t}`}
          >
            {t.string}
          </Animated.Text>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontFamily: "Gotham-Medium",
    paddingBottom: 5,
  },
});
