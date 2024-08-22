import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import colors from "tailwindcss/colors";
interface ListItemLinkProps {
  id: string;
  itemTitle: string;
  pathname?: string;
}

export const ListItemLink = ({
  id,
  itemTitle,
  pathname,
}: ListItemLinkProps) => {
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
          className="rounded-lg p-3 py-4 justify-between flex-row items-center bg-slate-700"
        >
          <Text className="font-semibold ml-1 text-slate-50">{itemTitle}</Text>
          <AntDesign name="right" size={24} color={colors.cyan[600]} />
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
};
