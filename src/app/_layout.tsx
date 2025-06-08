import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View
      className={`flex-1 dark:bg-slate-800 ${Platform.OS === "ios" ? "!pt-0" : ""}`}
    >
      <StatusBar
        style="auto"
        translucent
        hideTransitionAnimation="fade"
        backgroundColor="transparent"
      />
      <GestureHandlerRootView className="flex-1 items-center justify-center">
        <Slot />
      </GestureHandlerRootView>
    </View>
  );
}
