import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  createItemHelper,
  updateItemHelper,
  removeItemHelper,
  createListHelper,
  updateListHelper,
  removeListHelper,
} from "./helpers/repo-store.helpers";
import { StateProps, ItemProps, ListProps } from "./repo-store.types";

export const useRepoStore = create(
  persist<StateProps>(
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
        set({
          items: currentItems,
        }),

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
        set({
          lists: currentLists,
        }),
    }),
    {
      name: "@planeja-plus",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
