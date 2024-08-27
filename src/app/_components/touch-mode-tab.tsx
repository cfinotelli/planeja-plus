import { ClockIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";
import { Text } from "react-native";
import { GestureResponderEvent, TouchableOpacity, View } from "react-native";

export const TouchModeTab = ({
  pressFn,
  colorScheme,
  label,
}: {
  pressFn: (event: GestureResponderEvent) => void;
  colorScheme: "light" | "dark";
  label: string;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={pressFn}
      className={cn(
        colorScheme === "light" && "bg-slate-300",
        "flex-1 justify-center items-center dark:bg-slate-700 rounded-md p-1"
      )}
    >
      <View className="flex-row items-center justify-center">
        <ClockIcon size={18} />

        <Text className="font-bold dark:text-slate-50 ml-1">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
