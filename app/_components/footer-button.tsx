import { BlockIcon, CheckIcon } from "@/assets/icons";
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
      "items-center justify-center w-full p-2 rounded-md flex-row"
    )}
  >
    <Text className="uppercase text-center text-slate-100 font-semibold text-sm mr-1">
      {title}
    </Text>
    {available ? <CheckIcon size={14} /> : <BlockIcon size={14} />}
  </TouchableOpacity>
);
