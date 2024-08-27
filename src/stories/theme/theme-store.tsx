import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName as DefaultColorSchemeName } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ThemeStoreProps } from "./theme-store.types";

export const useThemeStore = create(
  persist<ThemeStoreProps>(
    (set) => ({
      colorTheme: null,
      setColorTheme: (newColorTheme: DefaultColorSchemeName) =>
        set(() => ({
          colorTheme: newColorTheme,
        })),
    }),
    {
      name: "@planeja-plus/theme",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
