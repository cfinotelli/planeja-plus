import { ItemProps } from "../repo-store.types";

export function createItemHelper(items: ItemProps[], newItem: ItemProps) {
  const allreadyExists = items.find(({ id }) => newItem.id === id);

  if (!allreadyExists) {
    return [...items, newItem];
  }

  return items;
}

export function updateItemHelper(items: ItemProps[], item: ItemProps) {
  return items.map((existingItem) =>
    existingItem.id === item.id ? item : existingItem
  );
}

export function removeItemHelper(items: ItemProps[], itemId: string) {
  return items.filter((item) => item.id !== itemId);
}

export function updatedItemsOnDragHelper(
  oldItems: ItemProps[],
  newOrderItems: ItemProps[]
) {
  if (newOrderItems.length <= 0) {
    return oldItems;
  }
  return newOrderItems;
}
