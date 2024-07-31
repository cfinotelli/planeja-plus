import { ReminderProps } from "../repo-store.types";

export function createReminderHelper(
  reminders: ReminderProps[],
  newReminder: ReminderProps
) {
  const allreadyExists = reminders.find(({ id }) => newReminder.id === id);

  if (!allreadyExists) {
    return [...reminders, newReminder];
  }

  return reminders;
}

export function updateReminderHelper(
  reminders: ReminderProps[],
  reminder: ReminderProps
) {
  return reminders.map((existinReminder) =>
    existinReminder.id === reminder.id ? reminder : existinReminder
  );
}

export function removeReminderHelper(
  reminders: ReminderProps[],
  reminderId: string
) {
  return reminders.filter((reminder) => reminder.id !== reminderId);
}

export function updatedRemindersOnDragHelper(
  oldReminders: ReminderProps[],
  newOrderReminders: ReminderProps[]
) {
  if (newOrderReminders.length <= 0) {
    return oldReminders;
  }
  return newOrderReminders;
}
