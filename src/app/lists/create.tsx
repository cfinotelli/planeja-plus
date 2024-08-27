import { useNavigation } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { GoBackButton } from "../_components/go-back-button";
import { HeadingTemplate } from "../_components/heading-template";
import { LinkButton } from "../_components/link-button";
import { Crypto } from "@/lib/crypto";
import { FooterButton } from "../_components/footer-button";
import { useRepoStore } from "@/stories/repo/repo-store";
import { useColorScheme } from "nativewind";
import { cn } from "@/lib/cn";

export default function Page() {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
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
          <Text className="dark:text-slate-50 font-bold text-base">
            Dê um nome a lista:
          </Text>
          <TextInput
            placeholder="Produtos de limpeza do mês"
            onChange={(e) => {
              const { text } = e.nativeEvent;
              setNewList(text);
            }}
            value={newList}
            className={cn(
              colorScheme === "light" && "bg-slate-300",
              "p-3 px-4 dark:bg-slate-700 border-solid rounded-lg dark:text-slate-200 focus:border focus:border-cyan-400"
            )}
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
