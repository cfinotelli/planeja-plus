import { useRepoStore } from "@/stories/repo-store";
import { ReminderProps } from "@/stories/repo-store.types";
import { FlatList, ScrollView, Text, View } from "react-native";
import DraggableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import { ReminderItem } from "./reminder-item";
import { RemindersEmpry } from "./reminders-empty";
import { isBefore } from "date-fns";
import React from "react";

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
      <Text className="pt-3 pb-2 pl-5 text-bold text-xl">Meus Lembretes</Text>

      {memoAfterReminder.length >= 1 ? (
        memoAfterReminder.map((reminder) => (
          <View className="m-2" key={reminder.id}>
            <ReminderItem reminder={reminder} key={reminder.id} />
          </View>
        ))
      ) : (
        <View className="mb-2 mx-2">
          <RemindersEmpry localHandler="remindersList" />
        </View>
      )}

      {memoBeforeReminder.length > 0 && (
        <>
          <Text className="pt-3 pb-2 pl-5 text-bold text-xl">
            Lembretes antigos
          </Text>

          {memoBeforeReminder.length >= 1 ? (
            memoBeforeReminder.map((reminder) => (
              <View className="mb-2 mx-2" key={reminder.id}>
                <ReminderItem reminder={reminder} key={reminder.id} />
              </View>
            ))
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
