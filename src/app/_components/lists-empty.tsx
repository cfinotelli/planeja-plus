import React from "react";
import { Text, View } from "react-native";
import { CreateItemLink } from "./create-item-link";
import { ListIcon } from "@/assets/icons";
import { CreateListLink } from "./create-list-link";

interface ListsEmptyProps {
  listId?: string;
}

export const ListsEmpty = ({ listId }: ListsEmptyProps) => {
  return (
    <View className="mt-4 space-y-4 items-center justify-center border border-slate-300 rounded-lg p-2">
      <ListIcon size={30} />

      {listId && (
        <Text className="text-sm text-slate-600 mb-4">
          Esta lista não contem items, vamos inserir agora?
        </Text>
      )}

      {!listId && (
        <Text className="text-sm text-slate-600 mb-4">
          Você ainda não tem listas criadas, vamos criar uma?
        </Text>
      )}

      {listId && <CreateItemLink listId={listId} />}
      {!listId && <CreateListLink />}
    </View>
  );
};
