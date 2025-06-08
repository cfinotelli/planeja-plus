import { View } from "react-native";
import { TouchModeTab } from "./touch-mode-tab";

export const DateSelectModeTabs = ({
  handleShowMode,
}: {
  handleShowMode: (mode: "date" | "time") => void;
}) => {

  return (
    <View className="flex-row mt-3">
      <TouchModeTab
        pressFn={() => handleShowMode("date")}
        label="Selecionar data"
      />

      <View className="w-2" />

      <TouchModeTab
        pressFn={() => handleShowMode("time")}
        label="Selecionar horário"
      />
    </View>
  );
};
