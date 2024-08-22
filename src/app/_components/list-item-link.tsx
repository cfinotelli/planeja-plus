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
          className="border border-slate-300 rounded-lg p-2 justify-between flex-row items-center"
        >
          <Text className="font-semibold ml-1">{itemTitle}</Text>
          <AntDesign name="right" size={24} color={colors.cyan[600]} />
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
};
