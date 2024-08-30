import { useColorScheme } from "nativewind";
import { View } from "react-native";
import { TouchModeTab } from "./touch-mode-tab";

export const DateSelectModeTabs = ({
  handleShowMode,
}: {
  handleShowMode: (mode: "date" | "time") => void;
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row mt-3">
      <TouchModeTab
        pressFn={() => handleShowMode("date")}
        colorScheme={colorScheme}
        label="Selecionar data"
      />

      <View className="w-2" />

      <TouchModeTab
        pressFn={() => handleShowMode("time")}
        colorScheme={colorScheme}
        label="Selecionar horário"
      />
    </View>
  );
};
