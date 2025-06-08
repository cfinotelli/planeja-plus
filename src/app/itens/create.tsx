import { Crypto } from "@/lib/crypto";
import { useRepoStore } from "@/stories/repo/repo-store";
import { ItemProps } from "@/stories/repo/repo-store.types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { FooterButton } from "../_components/footer-button";
import { GoBackButton } from "../_components/go-back-button";
import { HeadingTemplate } from "../_components/heading-template";
import { LinkButton } from "../_components/link-button";

export default function Page() {
  const navigation = useNavigation();
  const { listId } = useLocalSearchParams<{ listId?: string }>();

  const { lists, createItem } = useRepoStore((state) => state);
  const [newItem, setNewItem] = useState<ItemProps>({} as ItemProps);

  const currentList = lists.find((list) => list.id === listId);

  const handleGoBack = () => navigation.goBack();

  const createItemEnable = newItem.name !== undefined && listId !== undefined;

  const handleCreateItem = () => {
    if (!createItemEnable) {
      return;
    }

    if (newItem.name && listId) {
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

            <Text className="text-base font-bold text-slate-700">
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
            <Text className="font-bold text-base">
              Dê um nome ao seu novo item:
            </Text>
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
              className="bg-slate-300 p-3 px-4 border-solid rounded-lg focus:border focus:border-cyan-400"
            />
          </View>
        </View>

        <FooterButton
          available={createItemEnable}
          title="Criar item"
          onPress={handleCreateItem}
        />
      </View>
    </View>
  );
}
