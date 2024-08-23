import { CalendarIcon, ClockIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";
import { useColorScheme } from "nativewind";
import { View, TouchableOpacity, Text } from "react-native";

export const DateSelectModeTabs = ({
  handleShowMode,
}: {
  handleShowMode: (mode: "date" | "time") => void;
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row gap-1 mt-2">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleShowMode("date")}
        className={cn(
          colorScheme === "light" && "bg-slate-300",
          "flex-1 justify-center items-center dark:bg-slate-700 rounded-md p-1"
        )}
      >
        <View className="flex-row items-center justify-center">
          <CalendarIcon size={18} />
          <Text className="font-bold dark:text-slate-50 ml-1">
            Selecionar data
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleShowMode("time")}
        className={cn(
          colorScheme === "light" && "bg-slate-300",
          "flex-1 justify-center items-center dark:bg-slate-700 rounded-md p-1"
        )}
      >
        <View className="flex-row items-center justify-center">
          <ClockIcon size={18} />

          <Text className="font-bold dark:text-slate-50 ml-1">
            Selecionar horário
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
