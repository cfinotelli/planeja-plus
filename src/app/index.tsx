import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import HeadingTemplate from "./_components/heading-template";
import { ListItemLink } from "./_components/list-item-link";
import { Logo } from "./_components/logo";
import { NavigationTabs } from "./_components/navigation-tabs";
import { HomeLabelList } from "./_components/home-label-list";
import { ReminderItem } from "./_components/reminder-item";
import { isBefore, isToday } from "date-fns";
import { RemindersEmpry } from "./_components/reminders-empty";
import { ListsEmpty } from "./_components/lists-empty";
import { Notifications } from "@/lib/notifications";
import { useRepoStore } from "@/stories/repo-store";
import { ReminderProps } from "@/stories/repo-store.types";
import { useGetLists } from "@/actions/api/get-hooks/use-get-lists";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Page() {
  const { lists, reminders } = useRepoStore((state) => state);

  const todayReminders: ReminderProps[] = useMemo(
    () =>
      reminders.filter(
        (reminder) =>
          isToday(reminder.reminderAt) &&
          !isBefore(reminder.reminderAt, new Date())
      ),
    []
  );

  const { data, isLoading } = useGetLists();

  console.log({ data, isLoading });

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
              <View key={list.id} className="mb-1.5">
                <ListItemLink id={list.id} itemTitle={list.title} />
              </View>
            ))}
          </>
        ) : (
          <ListsEmpty />
        )}

        <HomeLabelList
          title="Meus lembretes de hoje"
          sectionType="lembrete"
          quantity={todayReminders.length}
          isOdd={todayReminders.length !== 1}
        />

        <View className="pb-12">
          {todayReminders.length >= 1 ? (
            <>
              {todayReminders.map((reminder) => (
                <View key={reminder.id} className="mb-1.5">
                  <ReminderItem reminder={reminder} />
                </View>
              ))}
            </>
          ) : (
            <RemindersEmpry localHandler="home" />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
