import { useRepoStore } from "@/stories/repo-store";
import { ItemProps } from "@/stories/repo-store.types";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { ConfirmationModal } from "./confirmation-modal";

export const UpdateItemElementArea = ({
  item,
  setUpdating,
}: {
  item: ItemProps;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updateItem, removeItem } = useRepoStore((state) => state);
  const [itemUpdated, setItemUpdated] = useState<ItemProps>(item);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleConfirmUpdate = () => {
    updateItem({
      ...item,
      name: itemUpdated.name,
    });
    setUpdating(false);
  };

  const handleDeleteItem = () => {
    removeItem(item.id);
    setUpdating(false);
    setModalVisible(false);
  };

  return (
    <View className="flex-row justify-between items-center flex-1">
      <TouchableOpacity className="mr-3" onPress={() => setModalVisible(true)}>
        <EvilIcons name="trash" size={22} color={colors.red[400]} />
      </TouchableOpacity>

      <TextInput
        className="px-2 flex-1 rounded-md bg-slate-300 text-slate-950 mr-2 h-full"
        value={itemUpdated.name}
        onChange={(e) => {
          const value = e.nativeEvent.text;

          setItemUpdated((prev) => {
            return {
              ...prev,
              name: value,
            };
          });
        }}
      />

      <TouchableOpacity className="ml-5 mr-1" onPress={handleConfirmUpdate}>
        <FontAwesome5 name="check" size={14} color={colors.green[400]} />
      </TouchableOpacity>

      <ConfirmationModal
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onAccept={handleDeleteItem}
      />
    </View>
  );
};
