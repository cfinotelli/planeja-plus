import { useNavigation } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { GoBackButton } from "../_components/go-back-button";
import HeadingTemplate from "../_components/heading-template";
import { LinkButton } from "../_components/link-button";
import { useRepoStore } from "@/stories/repo-store";
import { Crypto } from "@/lib/crypto";
import { FooterButton } from "../_components/footer-button";

export default function Page() {
  const navigation = useNavigation();
  const { createList } = useRepoStore((state) => state);
  const [newList, setNewList] = useState<string>("");

  const handleGoBack = () => navigation.goBack();

  function handleCreateNewList() {
    if (!newList) {
      return;
    }

    if (newList) {
      createList({
        id: Crypto.randomUUID(),
        title: newList,
        createdAt: new Date().toISOString(),
      });

      return handleGoBack();
    }
  }

  return (
    <View className="flex-1 w-full">
      <HeadingTemplate
        headerChildren={
          <>
            <GoBackButton />

            <Text className="text-base font-bold text-slate-50">
              Criar nova Lista
            </Text>
          </>
        }
        footerChildren={
          <LinkButton pathname="/lists/all" title="Ver minhas listas" />
        }
      />

      <View className="flex-1 h-full justify-between p-5">
        <View className="space-y-3">
          <Text className="text-slate-50">Dê um nome a lista:</Text>
          <TextInput
            placeholder="Produtos de limpeza do mês"
            onChange={(e) => {
              const { text } = e.nativeEvent;
              setNewList(text);
            }}
            value={newList}
            className="p-3 px-4 bg-slate-700 border-solid rounded-lg text-slate-200 placeholder-slate-300 focus:border focus:border-cyan-400"
          />
        </View>

        <FooterButton
          available={!!newList}
          title="Criar lista"
          onPress={handleCreateNewList}
        />
      </View>
    </View>
  );
}
