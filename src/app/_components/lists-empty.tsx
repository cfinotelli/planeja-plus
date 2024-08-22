import React from "react";
import { Text, View } from "react-native";
import { CreateItemLink } from "./create-item-link";
import { ListIcon } from "@/assets/icons";
import { CreateListLink } from "./create-list-link";
import { useColorScheme } from "nativewind";
import { cn } from "@/lib/cn";

interface ListsEmptyProps {
  listId?: string;
}

export const ListsEmpty = ({ listId }: ListsEmptyProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className={cn(
        colorScheme === "light" && "bg-slate-300",
        "mt-4 space-y-4 items-center justify-center dark:bg-slate-700 rounded-lg p-2 py-4"
      )}
    >
      <ListIcon size={30} />

      {listId && (
        <Text className="text-sm dark:text-slate-50 mb-4">
          Esta lista não contem items, vamos inserir agora?
        </Text>
      )}

      {!listId && (
        <Text className="text-sm dark:text-slate-50 mb-4">
          Você ainda não tem listas criadas, vamos criar uma?
        </Text>
      )}

      {listId && <CreateItemLink listId={listId} />}
      {!listId && <CreateListLink />}
    </View>
  );
};
