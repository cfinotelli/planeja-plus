import { CalendarIcon, ClockIcon } from "@/assets/icons";
import { View, TouchableOpacity, Text } from "react-native";

export const DateSelectModeTabs = ({
  handleShowMode,
}: {
  handleShowMode: (mode: "date" | "time") => void;
}) => (
  <View className="flex-row gap-1">
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleShowMode("date")}
      className="flex-1 justify-center items-center border border-slate-400 rounded-md p-1"
    >
      <View className="flex-row items-center justify-center">
        <CalendarIcon size={18} />
        <Text className="font-bold text-slate-800 ml-1">Selecionar data</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleShowMode("time")}
      className="flex-1 justify-center items-center border border-slate-400 rounded-md p-1"
    >
      <View className="flex-row items-center justify-center">
        <ClockIcon size={18} />

        <Text className="font-bold text-slate-800 ml-1">
          Selecionar horário
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);
