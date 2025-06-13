import { ClockIcon } from "@/assets/icons";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";

export const TouchModeTab = ({
  pressFn,
  label,
}: {
  pressFn: (event: GestureResponderEvent) => void;
  label: string;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={pressFn}
      className="bg-slate-300 flex-1 justify-center items-center rounded-md p-1"
    >
      <View className="flex-row items-center justify-center">
        <ClockIcon size={18} />

        <Text className="font-bold ml-1">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
