import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import colors from "tailwindcss/colors";
interface ListItemLink {
  id: string;
  itemTitle: string;
  pathname?: string;
  drag?: () => void;
  isActive?: boolean;
}

export const ListItemLink = ({
  id,
  itemTitle,
  pathname = "lists/list",
  drag,
  isActive,
}: ListItemLink) => {
  return (
    <Animated.View>
      <Link
        disabled={isActive}
        href={{
          pathname,
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
          <View className="flex-row items-center">
            {drag && (
              <TouchableOpacity onLongPress={drag} activeOpacity={0.7}>
                <MaterialIcons
                  name="drag-indicator"
                  size={16}
                  color={colors.slate[400]}
                />
              </TouchableOpacity>
            )}
            <Text className="font-semibold">{itemTitle}</Text>
          </View>
          <AntDesign name="right" size={24} color={colors.cyan[500]} />
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
};
