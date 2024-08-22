import { ScrollView, Text, View } from "react-native";

import { ReminderItem } from "./reminder-item";
import { RemindersEmpry } from "./reminders-empty";
import { isBefore } from "date-fns";
import React from "react";
import { useRepoStore } from "@/stories/repo/repo-store";

export const Reminders = () => {
  const { reminders } = useRepoStore((state) => state);

  const memoBeforeReminder = reminders.filter((reminder) =>
    isBefore(reminder.reminderAt, new Date())
  );

  const memoAfterReminder = reminders.filter(
    (reminder) => !isBefore(reminder.reminderAt, new Date())
  );

  return (
    <ScrollView>
      <Text className="pt-3 pb-2 pl-5 text-bold text-xl dark:text-slate-50">
        Meus Lembretes
      </Text>

      {memoAfterReminder.length >= 1 ? (
        <View className="p-2 pb-6 px-4 gap-2">
          {memoAfterReminder.map((reminder) => (
            <View key={reminder.id}>
              <ReminderItem reminder={reminder} key={reminder.id} />
            </View>
          ))}
        </View>
      ) : (
        <View className="mb-2 px-4">
          <RemindersEmpry localHandler="remindersList" />
        </View>
      )}

      {memoBeforeReminder.length > 0 && (
        <>
          <Text className="pt-3 pb-2 pl-5 text-bold text-xl dark:text-slate-50">
            Lembretes antigos
          </Text>

          {memoBeforeReminder.length >= 1 ? (
            <View className="p-2 pb-6 px-4 gap-2">
              {memoBeforeReminder.map((reminder) => (
                <View key={reminder.id}>
                  <ReminderItem reminder={reminder} key={reminder.id} />
                </View>
              ))}
            </View>
          ) : (
            <View className="mb-2 mx-2">
              <RemindersEmpry localHandler="remindersList" />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};
