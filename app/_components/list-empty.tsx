import React from "react";
import { Text, View } from "react-native";
import { CreateItemLink } from "./create-item-link";

interface ListEmptyProps {
  listId: string;
}

export const ListEmpty = ({ listId }: ListEmptyProps) => {
  return (
    <View className="mt-4 space-y-2 border border-slate-300 rounded-lg p-2">
      <Text className="text-sm text-slate-800 font-semibold">Que pena! 😥</Text>
      <Text className="text-sm text-slate-600">
        Esta lista não contem items, vamos inserir algum?
      </Text>

      <CreateItemLink listId={listId} />
    </View>
  );
};
