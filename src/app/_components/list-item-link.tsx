import { cn } from "@/lib/cn";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import colors from "tailwindcss/colors";
interface ListItemLinkProps {
  id: string;
  itemTitle: string;
}

export const ListItemLink = ({ id, itemTitle }: ListItemLinkProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <Animated.View>
      <Link
        href={{
          pathname: "/lists/list",
          params: {
            id,
          },
        }}
        asChild
      >
        <TouchableOpacity
          key={id}
          activeOpacity={0.7}
          className={cn(
            colorScheme === "light" && "bg-slate-300",
            "rounded-lg p-3 py-4 justify-between flex-row items-center dark:bg-slate-700"
          )}
        >
          <Text className="font-semibold ml-1 dark:text-slate-50">
            {itemTitle}
          </Text>
          <AntDesign name="right" size={24} color={colors.cyan[600]} />
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
};
