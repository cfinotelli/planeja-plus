import { Text, View } from "react-native";
import { ReminderItem } from "../../reminder-item";
import { RemindersEmpry } from "../../reminders-empty";
import { ReminderProps } from "@/stories/repo/repo-store.types";
import { isBefore } from "date-fns";

export const BeforeReminders = ({
  reminders,
}: {
  reminders: ReminderProps[];
}) => {
  const memoBeforeReminder = reminders.filter((reminder) =>
    isBefore(reminder.reminderAt, new Date())
  );

  return (
    <>
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
    </>
  );
};
