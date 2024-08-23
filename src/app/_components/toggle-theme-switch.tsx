import { useThemeStore } from "@/stories/theme/theme-store";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useCallback, useEffect, useMemo } from "react";
import { Switch } from "react-native";
import colors from "tailwindcss/colors";

export const ToggleThemeSwitch = () => {
  const { colorTheme, setColorTheme } = useThemeStore((state) => state);
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();

  const initialColorScheme = useMemo(() => {
    return colorTheme === null ? "light" : colorTheme;
  }, [colorTheme]);

  useEffect(() => {
    setColorScheme(initialColorScheme);
  }, [initialColorScheme, setColorScheme]);

  const handleToggleColorScheme = useCallback(() => {
    toggleColorScheme();
    setColorTheme(colorScheme === "light" ? "dark" : "light");
  }, [colorScheme, setColorTheme, toggleColorScheme]);

  console.log({ colorTheme, colorScheme });

  return (
    <Switch
      onValueChange={handleToggleColorScheme}
      value={colorScheme === "light"}
      trackColor={{ false: colors.slate[600], true: colors.slate[50] }}
      thumbColor={colorScheme === "light" ? colors.cyan[500] : colors.cyan[600]}
    />
  );
};
