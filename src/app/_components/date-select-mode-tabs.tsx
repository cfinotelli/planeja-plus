import { CalendarIcon, ClockIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";
import { useColorScheme } from "nativewind";
import {
  View,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from "react-native";
import { TouchModeTab } from "./touch-mode-tab";

export const DateSelectModeTabs = ({
  handleShowMode,
}: {
  handleShowMode: (mode: "date" | "time") => void;
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row gap-1 mt-2">
      <TouchModeTab
        pressFn={() => handleShowMode("date")}
        colorScheme={colorScheme}
        label="Selecionar data"
      />

      <TouchModeTab
        pressFn={() => handleShowMode("time")}
        colorScheme={colorScheme}
        label="Selecionar horário"
      />
    </View>
  );
};
