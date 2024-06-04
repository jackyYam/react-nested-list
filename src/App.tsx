import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";
import type { listItem } from "./lib/types";
import ListItem from "./components/ListItem";
function App() {
  const [listState, setListState] = useState<listItem[]>([
    {
      name: "Item 1",
      children: [
        {
          name: "Item 1.1",
          children: [
            {
              name: "Item 1.1.1",
              children: [],
            },
            {
              name: "Item 1.1.2",
              children: [],
            },
          ],
        },
        {
          name: "Item 1.2",
          children: [],
        },
      ],
    },
    {
      name: "Item 2",
      children: [
        {
          name: "Item 2.1",
          children: [],
        },
        {
          name: "Item 2.2",
          children: [
            {
              name: "Item 2.2.1",
              children: [],
            },
          ],
        },
      ],
    },
  ]);

  const changeName = (
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

  const changeListItemName = (path: number[], newName: string) => {
    setListState((prevState) => changeName(prevState, path, newName));
  };
  const addChild = (
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

  const addListItemChild = (path: number[], newChild: listItem) => {
    setListState((prevState) => {
      if (path.length === 0) {
        return [...prevState, newChild];
      } else {
        return addChild(prevState, path, newChild);
      }
    });
  };

  return (
    <>
      <SideBar addNewRootChild={addListItemChild}>
        {listState.map((item, index) => (
          <ListItem key={`${item.name}-${index}`} item={item} level={0} />
        ))}
      </SideBar>
    </>
  );
}

export default App;
