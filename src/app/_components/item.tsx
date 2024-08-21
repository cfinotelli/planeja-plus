import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { UpdateItemElementArea } from "./update-item-element-area";
import Checkbox from "expo-checkbox";
import { cn } from "@/lib/cn";
import { useRepoStore } from "@/stories/repo-store";
import { ItemProps } from "@/stories/repo-store.types";

interface ItemElementProps {
  item: ItemProps;
  drag?: () => void;
  isActive?: boolean;
}

export const Item = ({ item, drag }: ItemElementProps) => {
  const { updateItem } = useRepoStore((state) => state);
  const [updating, setUpdating] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(() => {
    if (item.isChecked) {
      return item.isChecked;
    }

    return false;
  });

  const handleUpdateOnToogleCheck = () => {
    updateItem({ ...item, isChecked });
  };

  useEffect(() => {
    handleUpdateOnToogleCheck();
  }, [isChecked]);

  return (
    <View className="border border-slate-400 p-2 rounded-md flex-row justify-between items-center">
      {!updating && (
        <TouchableOpacity
          disabled={updating}
          onLongPress={drag}
          activeOpacity={0.7}
          className="mr-1"
        >
          <MaterialIcons
            name="drag-indicator"
            size={16}
            color={updating ? colors.red[300] : colors.slate[400]}
          />
        </TouchableOpacity>
      )}

      {!updating && (
        <View className="border-l border-slate-400 pl-2">
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            className="w-4 h-4"
            color={colors.cyan[600]}
          />
        </View>
      )}

      <View className="flex-1 flex-row justify-between items-center">
        {updating ? (
          <UpdateItemElementArea setUpdating={setUpdating} item={item} />
        ) : (
          <>
            <Text
              className={cn(
                item.isChecked
                  ? "line-through text-slate-600"
                  : "font-bold text-slate-900",
                "pl-2"
              )}
            >
              {item.name}
            </Text>

            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => setUpdating(true)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name="grease-pencil"
                  size={16}
                  color={colors.cyan[600]}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};
