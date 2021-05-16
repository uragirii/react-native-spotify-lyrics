import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Text,
  Easing,
  Image,
  useWindowDimensions,
  PixelRatio,
} from "react-native";
import Lyrics from "../components/Lyrics";
import PlayButton from "../components/PlayButton";
import ProgressBar from "../components/ProgressBar";
import TimeStamps from "../components/TimeStamps";
import LyricsData from "../lyricsData.json";
// in miliseconds
const SONG_LENGTH = 191000;
const SONG_BG_COLOR = "#D63A12";
const DARK_LYRICS_COLOR = "#772E0E";
const ALBUM_ART =
  "https://i.scdn.co/image/ab67616d00001e02764ac25ee0d41190d513475a";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function LyricsPage() {
  const seekTime = useRef(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = useState(false);
  const { height, width } = useWindowDimensions();
  const scrollValue = useRef(new Animated.Value(0)).current;
  const [heights, setHeights] = useState<number[]>(
    new Array(LyricsData.lyrics.lines.length).fill(0)
  );
  const [progress, setProgress] = useState(0);

  const startPlaying = () => {
    const seekTimeAnimation = Animated.timing(seekTime, {
      toValue: SONG_LENGTH,
      duration: SONG_LENGTH,
      useNativeDriver: false,
      easing: Easing.linear,
    });
    let prevTime = 0;

    const animations: Animated.CompositeAnimation[] = [];

    for (let index = 0; index < LyricsData.lyrics.lines.length; index++) {
      const { time } = LyricsData.lyrics.lines[index];
      // Animation should start 100ms before the actual time and end in 100ms
      // Delay of each animation = (time- prevTime)-100
      const delay = time - prevTime - 100;
      console.log(`Index ${index} ==> ${-heights[index]} with delay ${delay}`);
      const animation = Animated.timing(scrollValue, {
        toValue: -heights[index],
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false,
      });

      animations.push(animation);
    }
    const scrollValueAnimation = Animated.sequence(animations);
    Animated.parallel([seekTimeAnimation, scrollValueAnimation]).start();
    setIsPlaying(true);
  };
  // Function to stop song from playing
  const stopPlaying = () => {
    seekTime.stopAnimation();
    setIsPlaying(false);
  };

  useEffect(() => {
    const id = seekTime.addListener(({ value }) => {
      if (!isPlaying) {
        setProgress(value);
      }
    });
    return () => {
      seekTime.removeListener(id);
    };
  }, []);

  useEffect(() => {
    // Check if all the heights are greater than zero or else quit early;
    for (let i = 0; i < heights.length; ++i) {
      if (heights[i] === 0) {
        return;
      }
    }
    console.log("Ready");
  }, [heights]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.songDetailsContainer}>
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}
        >
          <Image
            source={{ uri: ALBUM_ART }}
            style={{
              height: 0.12 * height,
              width: 0.12 * height,
            }}
          />
        </View>
        <View style={styles.songNameContainer}>
          <Text style={styles.songName}>Save Your Tears (with ...</Text>
          <Text style={styles.songAuthor}>The Weeknd</Text>
        </View>
      </View>
      <AnimatedLinearGradient
        colors={[SONG_BG_COLOR, "transparent"]}
        style={[
          styles.topGradientStyle,
          {
            opacity: scrollValue.interpolate({
              inputRange: [0, 5],
              outputRange: [0, 1],
              extrapolate: "clamp",
              easing: Easing.linear,
            }),
          },
        ]}
      />
      <Animated.ScrollView
        style={styles.scrollvView}
        overScrollMode={"never"}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: scrollValue,
              },
            ],
          }}
        >
          {LyricsData.lyrics.lines.map((line, index) => {
            return (
              <View
                key={`${line.time}_${line.words.join("_")}`}
                onLayout={(event) => {
                  const { height: layoutHeight } = event.nativeEvent.layout;
                  setHeights((prevHeights) => {
                    if (
                      !prevHeights[index] ||
                      prevHeights[index] !== layoutHeight
                    ) {
                      prevHeights[index] = layoutHeight;
                      return [...prevHeights];
                    } else {
                      return prevHeights;
                    }
                  });
                }}
              >
                <Lyrics
                  text={line.words}
                  style={{
                    color: seekTime.interpolate({
                      inputRange: [line.time, line.time + 100],
                      outputRange: [DARK_LYRICS_COLOR, "white"],
                      extrapolate: "clamp",
                    }),
                  }}
                />
              </View>
            );
          })}
          <View style={{ height: 0.3 * height }} />
        </Animated.View>
      </Animated.ScrollView>
      <LinearGradient
        colors={["transparent", SONG_BG_COLOR]}
        style={styles.bottomGradientStyle}
      />
      <View style={styles.bottomContainer}>
        <ProgressBar seekTime={seekTime} songLength={SONG_LENGTH} />
        <TimeStamps
          seekTime={seekTime}
          totalTime={Math.floor(SONG_LENGTH / 1000)}
        />
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
  songNameContainer: {
    marginLeft: "5%",
    display: "flex",
  },
  songAuthor: {
    color: "white",
    paddingTop: 10,
    fontFamily: "Gotham-Book",
  },
  songName: {
    color: "white",
    fontFamily: "Gotham-Medium",
    fontSize: 18,
  },
  bottomGradientStyle: {
    height: "7%",
    position: "absolute",
    left: "5%",
    right: "5%",
    top: "76%",
  },
  topGradientStyle: {
    height: "7%",
    position: "absolute",
    left: "5%",
    right: "5%",
    top: "22%",
    zIndex: 2,
  },
});
