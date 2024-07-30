import React from "react";
import { ScrollView, SectionList, Text, View } from "react-native";
import HeadingTemplate from "./_components/heading-template";
import { ListItemLink } from "./_components/list-item-link";
import { ListsEmpty } from "./_components/lists-empty";
import { Logo } from "./_components/logo";
import { useRepoStore } from "@/stories/repo-store";
import { ListProps } from "@/stories/repo-store.types";
import { NavigationTabs } from "./_components/navigation-tabs";
import { HomeLabelList } from "./_components/home-label-list";
import { BannerAds } from "./_components/banner-ads";

export default function Page() {
  const { lists } = useRepoStore((state) => state);

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

      <ScrollView className="p-5">
        <HomeLabelList
          title="Minhas Listas"
          sectionType="lista"
          quantity={lists.length}
          isOdd={lists.length !== 1}
        />

        {lists.length >= 1 ? (
          <>
            {lists.map((list) => (
              <View className="mb-1.5">
                <ListItemLink id={list.id} itemTitle={list.title} />
              </View>
            ))}
          </>
        ) : (
          <ListsEmpty />
        )}

        <HomeLabelList
          title="Meus lembretes"
          sectionType="lembrete"
          quantity={lists.length}
          isOdd={lists.length !== 1}
        />

        <View className="pb-12">
          {lists.length >= 1 ? (
            <>
              {lists.map((list) => (
                <View className="mb-1.5">
                  <ListItemLink id={list.id} itemTitle={list.title} />
                </View>
              ))}
            </>
          ) : (
            <ListsEmpty />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
