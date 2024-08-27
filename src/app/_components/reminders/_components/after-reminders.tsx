import { Text, View } from "react-native";
import { ReminderItem } from "../../reminder-item";
import { RemindersEmpry } from "../../reminders-empty";
import { isBefore } from "date-fns";
import { ReminderProps } from "@/stories/repo/repo-store.types";

export const AfterReminders = ({
  reminders,
}: {
  reminders: ReminderProps[];
}) => {
  const memoAfterReminder = reminders.filter(
    (reminder) => !isBefore(reminder.reminderAt, new Date())
  );

  return (
    <>
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
    </>
  );
};
