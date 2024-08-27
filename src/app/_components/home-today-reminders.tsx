import { ReminderProps } from "@/stories/repo/repo-store.types";
import { HomeLabelList } from "./home-label-list";
import { useMemo } from "react";
import { isToday, isBefore } from "date-fns";
import { View } from "react-native";
import { ReminderItem } from "./reminder-item";
import { RemindersEmpry } from "./reminders-empty";
import { useRepoStore } from "@/stories/repo/repo-store";

export const HomeTodayReminders = () => {
  const { reminders } = useRepoStore((state) => state);
  const todayReminders: ReminderProps[] = useMemo(
    () =>
      reminders.filter(
        (reminder) =>
          isToday(reminder.reminderAt) &&
          !isBefore(reminder.reminderAt, new Date())
      ),
    [reminders]
  );

  return (
    <>
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
    </>
  );
};
