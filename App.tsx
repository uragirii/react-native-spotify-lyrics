import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
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
import ProgressBar from "./components/ProgressBar";
import LyricsData from "./lyricsData.json";

// in miliseconds
const SONG_LENGTH = 191000;
const SONG_BG_COLOR = "#D63A12";
const DARK_LYRICS_COLOR = "#772E0E";
const ALBUM_ART =
  "https://i.scdn.co/image/ab67616d00001e02764ac25ee0d41190d513475a";

export default function App() {
  const seekTime = useRef(new Animated.Value(10000)).current;
  const { height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
