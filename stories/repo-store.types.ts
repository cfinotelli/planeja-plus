export interface ListProps {
  id: string;
  title: string;
  createdAt: string;
}

export interface ItemProps {
  id: string;
  name: string;
  listId: string;
  createdAt: string;
  isChecked: boolean;
}

export interface ReminderProps {
  id: string;
  label: string;
  reminderAt: string;
}

export interface StateProps {
  items: ItemProps[];
  createItem: (item: ItemProps) => void;
  updateItem: (item: ItemProps) => void;
  removeItem: (itemId: string) => void;
  updatedItemsOnDrag: (items: ItemProps[]) => void;

  lists: ListProps[];
  createList: (list: ListProps) => void;
  updateList: (list: ListProps) => void;
  removeList: (listId: string) => void;
  updatedListsOnDrag: (lists: ListProps[]) => void;

  reminders: ReminderProps[];
  createReminder: (reminder: ReminderProps) => void;
  updateReminder: (reminder: ReminderProps) => void;
  removeReminder: (reminderId: string) => void;
  updatedRemindersOnDrag: (reminder: ReminderProps[]) => void;
}
