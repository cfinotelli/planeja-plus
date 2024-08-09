import { useRepoStore } from "@/stories/repo-store";
import { ReminderProps } from "@/stories/repo-store.types";
import { useRef } from "react";
import { Text } from "react-native";
import DraggableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import { ReminderItem } from "./reminder-item";
import { RemindersEmpry } from "./reminders-empty";

export const Reminders = () => {
  const ref = useRef(null);
  const { reminders, updatedRemindersOnDrag } = useRepoStore((state) => state);

  const handleDragEnd =
    ({ data }: DragEndParams<ReminderProps>) =>
    () =>
      updatedRemindersOnDrag(data);

  return (
    <>
      <Text className="pt-3 pb-2 pl-5 text-bold text-xl">Meus Lembretes</Text>

      <DraggableFlatList
        ref={ref}
        className="p-5 pt-0"
        data={reminders}
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
