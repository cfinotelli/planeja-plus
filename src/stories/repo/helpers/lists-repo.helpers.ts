import { ListProps } from "../repo-store.types";

export function createListHelper(lists: ListProps[], newList: ListProps) {
  const allreadyExists =
    lists.find(({ id }) => newList.id === id) ||
    lists.find(({ title }) => newList.title.includes(title));

  if (!allreadyExists) {
    return [...lists, newList];
  }

  return lists;
}

export function updateListHelper(lists: ListProps[], list: ListProps) {
  return lists.map((existingItem) =>
    existingItem.id === list.id ? list : existingItem
  );
}

export function removeListHelper(lists: ListProps[], listId: string) {
  return lists.filter((list) => list.id !== listId);
}

export function updatedListsOnDragHelper(
  oldLists: ListProps[],
  newOrderLists: ListProps[]
) {
  if (newOrderLists.length <= 0) {
    return oldLists;
  }
  return newOrderLists;
}
