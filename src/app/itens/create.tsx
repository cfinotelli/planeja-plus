import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { GoBackButton } from "../_components/go-back-button";
import HeadingTemplate from "../_components/heading-template";
import { LinkButton } from "../_components/link-button";
import { useRepoStore } from "@/stories/repo-store";
import { ItemProps } from "@/stories/repo-store.types";
import { Crypto } from "@/lib/crypto";

export default function Page() {
  const navigation = useNavigation();
  const { listId } = useLocalSearchParams<{ listId?: string }>();

  const { lists, createItem } = useRepoStore((state) => state);
  const [newItem, setNewItem] = useState<ItemProps>({} as ItemProps);

  const currentList = lists.find((list) => list.id === listId);

  const handleGoBack = () => navigation.goBack();

  const handleCreateItem = () => {
    if (!newItem.name || !listId) {
      return;
    }

    if (newItem.name) {
      createItem({
        id: Crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        listId,
        name: newItem.name,
        isChecked: false,
      });

      return handleGoBack();
    }
  };

  if (!listId) {
    return handleGoBack();
  }

  return (
    <View className="flex-1 w-full">
      <HeadingTemplate
        headerChildren={
          <>
            <GoBackButton />

            <Text className="text-base font-bold text-slate-50">
              Criando novo item
            </Text>
          </>
        }
        footerChildren={
          <LinkButton
            pathname="/lists/list"
            id={listId}
            title={`Ver lista: ${currentList?.title}`}
          />
        }
      />

      <View className="flex-1 h-full justify-between p-5">
        <View className="flex-1 justify-start gap-2">
          <View className="space-y-3">
            <Text>Dê um nome ao seu novo item:</Text>
            <TextInput
              placeholder="Produtos de limpeza do mês"
              onChange={(e) => {
                const { text } = e.nativeEvent;
                setNewItem((prev) => {
                  return {
                    ...prev,
                    name: text,
                  };
                });
              }}
              value={newItem.name}
              className="p-1 px-4 border border-slate-400 border-solid rounded-lg"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleCreateItem}
          activeOpacity={0.7}
          className="w-full p-2 rounded-md  bg-slate-700"
        >
          <Text className="text-center text-slate-100 font-semibold text-sm">
            Criar item
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
