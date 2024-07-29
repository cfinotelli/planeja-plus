import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { ItemProps } from "@/stories/repo-store.types";
import { UpdateItemElementArea } from "./update-item-element-area";

interface ItemElementProps {
  item: ItemProps;
  drag?: () => void;
  isActive?: boolean;
}

export const Item = ({ item, drag }: ItemElementProps) => {
  const [updating, setUpdating] = useState<boolean>(false);

  return (
    <View className="border border-slate-400 p-2 rounded-md flex-row justify-between items-center">
      {!updating && (
        <TouchableOpacity
          disabled={updating}
          onLongPress={drag}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name="drag-indicator"
            size={16}
            color={updating ? colors.red[300] : colors.slate[400]}
          />
        </TouchableOpacity>
      )}

      <View className="flex-1 flex-row justify-between items-center">
        {updating ? (
          <UpdateItemElementArea setUpdating={setUpdating} item={item} />
        ) : (
          <>
            <Text className="pl-2">{item.name}</Text>

            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => setUpdating(true)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name="grease-pencil"
                  size={16}
                  color={colors.blue[600]}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};
