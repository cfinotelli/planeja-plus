import { ColorSchemeName as DefaultColorSchemeName } from "react-native";

export interface ThemeStoreProps {
  colorTheme: "light" | "dark" | null;
  setColorTheme: (colorTheme: DefaultColorSchemeName) => void;
}
