import { ClockIcon, ListIcon } from "@/assets/icons";
import Entypo from "@expo/vector-icons/Entypo";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export const NavigationTabs = () => {
  return (
    <View className="flex-row flex-1 justify-between items-center space-x-2">
      <Link
        href={{
          pathname: "/lists/all",
        }}
        asChild
      >
        <TouchableOpacity className="flex-row justify-center items-center space-x-2 p-1 rounded-md flex-1 bg-slate-700">
          <ListIcon size={24} />
          <Text className="font-bold text-sm capitalize text-slate-100">
            Listas
          </Text>
        </TouchableOpacity>
      </Link>

      <Link
        href={{
          pathname: "/reminders/all",
        }}
        asChild
      >
        <TouchableOpacity className="flex-row justify-center items-center space-x-2 p-1 rounded-md flex-1 bg-slate-700">
          <ClockIcon size={24} />

          <Text className="font-bold text-sm capitalize text-slate-100">
            Lembretes
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};
