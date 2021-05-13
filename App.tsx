import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import LyricsPage from "./pages/LyricsPage";

export default function App() {
  const [fontloaded] = useFonts({
    "Gotham-Book": require("./assets/fonts/Gotham-Book.otf"),
    "Gotham-Light": require("./assets/fonts/Gotham-Light.otf"),
    "Gotham-Medium": require("./assets/fonts/Gotham-Medium.otf"),
  });

  if (!fontloaded) {
    return <AppLoading />;
  } else {
    return <LyricsPage />;
  }
}
