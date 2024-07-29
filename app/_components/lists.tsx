import { useRepoStore } from "@/stories/repo-store";
import { ListProps } from "@/stories/repo-store.types";
import React, { useRef } from "react";
import { Text } from "react-native";
import DraggableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import { ListsEmpty } from "./lists-empty";
import { ListItemLink } from "./list-item-link";

export const Lists = () => {
  const ref = useRef(null);
  const { lists, updatedListsOnDrag } = useRepoStore((state) => state);

  const handleDragEnd =
    ({ data }: DragEndParams<ListProps>) =>
    () =>
      updatedListsOnDrag(data);

  return (
    <>
      <Text className="pt-3 pb-2 pl-5 text-bold text-xl">Minhas listas</Text>

      <DraggableFlatList
        ref={ref}
        className="p-5 pt-0"
        data={lists}
        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        keyExtractor={(item) => item.id}
        onDragEnd={handleDragEnd}
        renderItem={({ item, drag, isActive }) => (
          <ListItemLink
            id={item.id}
            itemTitle={item.title}
            drag={drag}
            isActive={isActive}
          />
        )}
        ListEmptyComponent={() => <ListsEmpty />}
      />
    </>
  );
};
