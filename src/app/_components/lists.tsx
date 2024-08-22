import { useRepoStore } from "@/stories/repo-store";
import React from "react";
import { ScrollView, Text, View } from "react-native";

import { ListItemLink } from "./list-item-link";
import { ListsEmpty } from "./lists-empty";

export const Lists = () => {
  const { lists } = useRepoStore((state) => state);

  return (
    <>
      <Text className="pt-3 pb-2 pl-5 text-bold text-xl">Minhas listas</Text>

      <ScrollView className="p-2">
        {lists.length >= 1 ? (
          lists.map((list) => (
            <View key={list.id} className="mb-2">
              <ListItemLink id={list.id} itemTitle={list.title} />
            </View>
          ))
        ) : (
          <ListsEmpty />
        )}
      </ScrollView>
    </>
  );
};
