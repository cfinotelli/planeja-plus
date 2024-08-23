import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName as DefaultColorSchemeName } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ThemeStoreProps {
  colorTheme: "light" | "dark" | null;
  setColorTheme: (colorTheme: DefaultColorSchemeName) => void;
}

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
