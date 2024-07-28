import { ListProps, ItemProps } from "../repo-store";

export function createListHelper(lists: ListProps[], newList: ListProps) {
  const allreadyExists =
    lists.find(({ id }) => newList.id === id) ||
    lists.find(({ title }) => newList.title.includes(title));

  if (!allreadyExists) {
    return [...lists, newList];
  }

  return lists;
}

export function removeListHelper(lists: ListProps[], listId: string) {
  return lists.filter((list) => list.id !== listId);
}

export function createItemHelper(items: ItemProps[], newItem: ItemProps) {
  const allreadyExists = items.find(({ id }) => newItem.id === id);

  if (!allreadyExists) {
    return [...items, newItem];
  }

  return items;
}

export function removeItemHelper(items: ItemProps[], itemId: string) {
  return items.filter((item) => item.id !== itemId);
}

export function updateItemHelper(items: ItemProps[], item: ItemProps) {
  return items.map((existingItem) =>
    existingItem.id === item.id ? item : existingItem
  );
}

export function updateListHelper(lists: ListProps[], list: ListProps) {
  return lists.map((existingItem) =>
    existingItem.id === list.id ? list : existingItem
  );
}
