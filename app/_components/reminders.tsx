import { useRepoStore } from "@/stories/repo-store";
import { ReminderProps } from "@/stories/repo-store.types";
import { Text } from "react-native";
import DraggableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import { ReminderItem } from "./reminder-item";
import { RemindersEmpry } from "./reminders-empty";
import { isBefore } from "date-fns";

export const Reminders = () => {
  const { reminders, updatedRemindersOnDrag } = useRepoStore((state) => state);

  const handleDragEnd =
    ({ data }: DragEndParams<ReminderProps>) =>
    () =>
      updatedRemindersOnDrag(data);

  const memoBeforeReminder = reminders.filter((reminder) =>
    isBefore(reminder.reminderAt, new Date())
  );

  const memoAfterReminder = reminders.filter(
    (reminder) => !isBefore(reminder.reminderAt, new Date())
  );

  return (
    <>
      <Text className="pt-3 pb-2 pl-5 text-bold text-xl">Meus Lembretes</Text>

      <DraggableFlatList
        className="p-5 pt-0"
        data={memoAfterReminder}
        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        keyExtractor={(item) => item.id}
        onDragEnd={handleDragEnd}
        renderItem={({ item, drag, isActive }) => (
          <ReminderItem reminder={item} drag={drag} isActive={isActive} />
        )}
        ListEmptyComponent={() => (
          <RemindersEmpry localHandler="remindersList" />
        )}
      />

      <Text className="pt-3 pb-2 pl-5 text-bold text-xl">
        Lembretes antigos
      </Text>

      <DraggableFlatList
        className="p-5 pt-0"
        data={memoBeforeReminder}
        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        keyExtractor={(item) => item.id}
        onDragEnd={handleDragEnd}
        renderItem={({ item, drag, isActive }) => (
          <ReminderItem reminder={item} drag={drag} isActive={isActive} />
        )}
        ListEmptyComponent={() => (
          <RemindersEmpry localHandler="remindersList" />
        )}
      />
    </>
  );
};
