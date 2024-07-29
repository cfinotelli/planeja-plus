import React from "react";
import { SectionList, Text, View } from "react-native";
import HeadingTemplate from "./_components/heading-template";
import { ListItemLink } from "./_components/list-item-link";
import { ListsEmpty } from "./_components/lists-empty";
import { Logo } from "./_components/logo";
import { useRepoStore } from "@/stories/repo-store";
import { ListProps } from "@/stories/repo-store.types";
import { NavigationTabs } from "./_components/navigation-tabs";

export default function Page() {
  const { lists } = useRepoStore((state) => state);

  const sections: Array<{
    title: "Minhas listas" | "Meus lembretes";
    data: ListProps[];
  }> = [
    {
      title: "Minhas listas",
      data: lists,
    },

    {
      title: "Meus lembretes",
      data: [],
    },
  ];

  return (
    <View className="flex-1 w-full">
      <HeadingTemplate
        headerChildren={
          <View className="flex-row space-x-1 items-center">
            <Logo />
          </View>
        }
        footerChildren={<NavigationTabs />}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        className="flex-1 p-4"
        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title, data } }) => (
          <>
            <View className="flex-row flex-1 items-center justify-between pb-2 border-b border-slate-400">
              <Text className="font-bold text-lg capitalize">{title}</Text>
              <Text className="text-sm">
                {data.length ?? 0} lista{data.length !== 1 && `s`}
              </Text>
            </View>

            {title === "Minhas listas" && data.length === 0 && <ListsEmpty />}
            {title === "Meus lembretes" && data.length === 0 && <ListsEmpty />}
          </>
        )}
        renderItem={({ item, section: { title } }) => (
          <>
            {title === "Minhas listas" && (
              <ListItemLink id={item.id} itemTitle={item.title} />
            )}

            {title === "Meus lembretes" && (
              <ListItemLink id={item.id} itemTitle={item.title} />
            )}
          </>
        )}
      />
    </View>
  );
}
