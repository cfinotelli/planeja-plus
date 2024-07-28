export interface ListProps {
  id: string;
  title: string;
  createdAt: Date;
}

export interface ItemProps {
  id: string;
  name: string;
  listId: string;
  createdAt: Date;
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
}
