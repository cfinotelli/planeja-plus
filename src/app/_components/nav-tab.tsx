import { ListIcon, ClockIcon } from "@/assets/icons";
import { Text, TouchableOpacity } from "react-native";

export const NavTab = ({ label }: { label: "Listas" | "Lembretes" }) => {
  return (
    <TouchableOpacity className="flex-row justify-center items-center space-x-2 p-1 rounded-md flex-1 bg-slate-700">
      {label === "Listas" ? <ListIcon size={24} /> : <ClockIcon size={24} />}
      <Text className="font-bold text-sm capitalize text-slate-100">
        {label}
      </Text>
    </TouchableOpacity>
  );
};
