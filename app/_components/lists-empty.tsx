import React from "react";
import { Text, View } from "react-native";
import { CreateListLink } from "./create-list-link";

export const ListsEmpty = () => {
  return (
    <View className="mt-4 space-y-2 border border-slate-300 rounded-lg p-2">
      <Text className="text-sm text-slate-800 font-semibold">Que pena! 😥</Text>
      <Text className="text-sm text-slate-600 mb-4">
        Você ainda não tem listas criadas, vamos criar uma?
      </Text>

      <CreateListLink />
    </View>
  );
};
