import type { listItem } from "./types";
export const changeName = (
  list: listItem[],
  path: number[],
  newName: string
): listItem[] => {
  return list.map((item, index) => {
    if (index === path[0]) {
      if (path.length === 1) {
        return { ...item, name: newName };
      } else if (item.children) {
        return {
          ...item,
          children: changeName(item.children, path.slice(1), newName),
        };
      }
    }
    return item;
  });
};

export const addChild = (
  list: listItem[],
  path: number[],
  newChild: listItem
): listItem[] => {
  return list.map((item, index) => {
    if (index === path[0]) {
      if (path.length === 1) {
        return { ...item, children: [...(item.children || []), newChild] };
      } else if (item.children) {
        return {
          ...item,
          children: addChild(item.children, path.slice(1), newChild),
        };
      }
    }
    return item;
  });
};
