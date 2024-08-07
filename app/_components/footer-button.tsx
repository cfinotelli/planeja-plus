import { cn } from "@/lib/cn";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

export const FooterButton = ({
  title,
  onPress,
  available,
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  available: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={!available}
    activeOpacity={0.7}
    className={cn(
      available ? "bg-cyan-600" : "bg-slate-700",
      "w-full p-2 rounded-md"
    )}
  >
    <Text className="uppercase text-center text-slate-100 font-semibold text-sm">
      {title}
    </Text>
  </TouchableOpacity>
);
