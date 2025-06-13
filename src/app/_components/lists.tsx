import React from "react";
import { ScrollView, Text, View } from "react-native";

import { useRepoStore } from "@/stories/repo/repo-store";
import { ListItemLink } from "./list-item-link";
import { ListsEmpty } from "./lists-empty";

export const Lists = () => {
  const { lists } = useRepoStore((state) => state);

  return (
    <>
      <Text className="pt-3 pb-3 pl-5 font-bold text-xl">
        Minhas listas
      </Text>

      <ScrollView>
        <View className="px-2 pb-6 gap-2">
          {lists.length >= 1 ? (
            lists.map((list) => (
              <View key={list.id}>
                <ListItemLink id={list.id} itemTitle={list.title} />
              </View>
            ))
          ) : (
            <View>
              <ListsEmpty />
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};
