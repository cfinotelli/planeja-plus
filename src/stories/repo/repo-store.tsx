import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  createListHelper,
  updateListHelper,
  removeListHelper,
  updatedListsOnDragHelper,
} from "./helpers/lists-repo.helpers";
import {
  ItemProps,
  ListProps,
  ReminderProps,
  RepoStateProps,
} from "./repo-store.types";
import {
  createItemHelper,
  updateItemHelper,
  removeItemHelper,
  updatedItemsOnDragHelper,
} from "./helpers/items-repo.helpers";
import {
  createReminderHelper,
  removeReminderHelper,
  updatedRemindersOnDragHelper,
  updateReminderHelper,
} from "./helpers/reminders-repo.helpers";

export const useRepoStore = create(
  persist<RepoStateProps>(
    (set) => ({
      items: [],
      createItem: (item: ItemProps) =>
        set((state) => ({
          items: createItemHelper(state.items, item),
        })),
      updateItem: (item: ItemProps) => {
        set((state) => ({
          items: updateItemHelper(state.items, item),
        }));
      },
      removeItem: (itemId: string) =>
        set((state) => ({
          items: removeItemHelper(state.items, itemId),
        })),
      updatedItemsOnDrag: (currentItems: ItemProps[]) =>
        set((state) => ({
          items: updatedItemsOnDragHelper(state.items, currentItems),
        })),

      lists: [],
      createList: (list: ListProps) =>
        set((state) => ({
          lists: createListHelper(state.lists, list),
        })),
      updateList: (list: ListProps) => {
        set((state) => ({
          lists: updateListHelper(state.lists, list),
        }));
      },
      removeList: (listId: string) =>
        set((state) => ({
          lists: removeListHelper(state.lists, listId),
          items: state.items.filter((item) => item.listId !== listId),
        })),
      updatedListsOnDrag: (currentLists: ListProps[]) =>
        set((state) => ({
          lists: updatedListsOnDragHelper(state.lists, currentLists),
        })),

      reminders: [],
      createReminder: (reminder: ReminderProps) =>
        set((state) => ({
          reminders: createReminderHelper(state.reminders, reminder),
        })),
      updateReminder: (reminder: ReminderProps) => {
        set((state) => ({
          reminders: updateReminderHelper(state.reminders, reminder),
        }));
      },
      removeReminder: (reminderId: string) =>
        set((state) => ({
          reminders: removeReminderHelper(state.reminders, reminderId),
        })),
      updatedRemindersOnDrag: (currentReminders: ReminderProps[]) =>
        set((state) => ({
          reminders: updatedRemindersOnDragHelper(
            state.reminders,
            currentReminders
          ),
        })),
    }),
    {
      name: "@planeja-plus",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
