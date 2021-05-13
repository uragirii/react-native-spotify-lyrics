import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Button,
  Easing,
  Image,
  useWindowDimensions,
} from "react-native";
import Lyrics from "./components/Lyrics";
import PlayButton from "./components/PlayButton";
import ProgressBar from "./components/ProgressBar";
import LyricsData from "./lyricsData.json";

// in miliseconds
const SONG_LENGTH = 191000;
const SONG_BG_COLOR = "#D63A12";
const DARK_LYRICS_COLOR = "#772E0E";
const ALBUM_ART =
  "https://i.scdn.co/image/ab67616d00001e02764ac25ee0d41190d513475a";

export default function App() {
  const seekTime = useRef(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = useState(false);
  const { height } = useWindowDimensions();

  const startPlaying = () => {
    Animated.timing(seekTime, {
      toValue: SONG_LENGTH,
      duration: SONG_LENGTH,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
    setIsPlaying(true);
  };

  const stopPlaying = () => {
    seekTime.stopAnimation();
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.songDetailsContainer}>
        <Image
          source={{ uri: ALBUM_ART }}
          style={{
            height: 0.1 * height,
            width: 0.1 * height,
          }}
        />
        <Button title="Start" onPress={() => {}}>
          Start
        </Button>
      </View>
      <ScrollView
        style={styles.scrollvView}
        showsVerticalScrollIndicator={false}
      >
        {LyricsData.lyrics.lines.map((line) => {
          return (
            <Lyrics
              text={line.words}
              style={{
                color: seekTime.interpolate({
                  inputRange: [line.time, line.time + 100],
                  outputRange: [DARK_LYRICS_COLOR, "white"],
                  extrapolate: "clamp",
                }),
              }}
              key={`${line.time}_${line.words.join("_")}`}
            />
          );
        })}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <ProgressBar seekTime={seekTime} songLength={SONG_LENGTH} />
        <View style={styles.buttonContainer}>
          <PlayButton
            isPlaying={isPlaying}
            onPress={() => {
              if (isPlaying) {
                stopPlaying();
              } else {
                startPlaying();
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SONG_BG_COLOR,
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
  },
  scrollvView: {
    backgroundColor: SONG_BG_COLOR,
    width: "100%",
    paddingHorizontal: "5%",
  },
  songDetailsContainer: {
    height: "20%",
    padding: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  bottomContainer: {
    height: "20%",
    padding: "5%",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flex: 1,
  },
});
