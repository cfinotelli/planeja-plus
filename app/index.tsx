import React from "react";
import { ScrollView, SectionList, Text, View } from "react-native";
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
      <View className="flex-1 w-full justify-between">
        <View className="justify-start flex-1">
          <View className="h-12 w-full bg-red-500 items-center justify-center">
            <Text className="font-bold text-slate-50">banner</Text>
          </View>

          <ScrollView>
            {sections.map((section) => (
              <View key={section.title} className="p-5">
                <View className="flex-row flex-1 items-center justify-between pb-2 border-b border-slate-400">
                  <Text className="font-bold text-lg capitalize">
                    {section.title}
                  </Text>
                  <Text className="text-sm">
                    {section.data.length || 0}{" "}
                    {section.title === "Minhas listas" ? "lista" : "lembrete"}
                    {section.data.length !== 1 && `s`}
                  </Text>
                </View>

                <View className="mt-2">
                  {section.data.map((sectionArrayItem) => (
                    <View key={sectionArrayItem.id} className="mb-2">
                      {section.title === "Minhas listas" && (
                        <ListItemLink
                          id={sectionArrayItem.id}
                          itemTitle={sectionArrayItem.title}
                        />
                      )}

                      {section.title === "Meus lembretes" && (
                        <ListItemLink
                          id={sectionArrayItem.id}
                          itemTitle={sectionArrayItem.title}
                        />
                      )}
                    </View>
                  ))}
                </View>

                {section.title === "Minhas listas" &&
                  section.data.length === 0 && <ListsEmpty />}

                {section.title === "Meus lembretes" &&
                  section.data.length === 0 && <ListsEmpty />}
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="h-12 w-full bg-red-500 items-center justify-center">
          <Text className="font-bold text-slate-50">banner</Text>
        </View>
      </View>
    </View>
  );
}
