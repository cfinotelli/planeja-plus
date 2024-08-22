import { cn } from "@/lib/cn";
import { Text, View } from "react-native";

interface HomeLabelListProps {
  title: string;
  sectionType: "lista" | "lembrete";
  isOdd: boolean;
  quantity: number;
}

export const HomeLabelList = ({
  isOdd,
  quantity,
  sectionType,
  title,
}: HomeLabelListProps) => {
  return (
    <View
      className={cn(
        sectionType === "lembrete" && "mt-3",
        "flex-row flex-1 items-center justify-between pb-2 border-b border-slate-300 mb-3"
      )}
    >
      <Text className="font-bold text-lg capitalize text-slate-50">
        {title}
      </Text>
      <Text className="text-sm text-slate-300">
        {quantity} {sectionType}
        {isOdd && `s`}
      </Text>
    </View>
  );
};
