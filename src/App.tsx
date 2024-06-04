import SideBar from "./components/SideBar";
import { useState } from "react";
import type { listItem } from "./lib/types";
import ListItem from "./components/ListItem";
import { Accordion } from "./components/ui/accordion";
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
    <div className="flex">
      <SideBar addNewRootChild={addListItemChild}>
        <Accordion type="multiple">
          {listState.map((item, index) => (
            <ListItem
              key={`${item.name}-${index}`}
              item={item}
              level={0}
              pathToSelf={[index]}
              changeName={changeListItemName}
              addChildren={addListItemChild}
            />
          ))}
        </Accordion>
      </SideBar>
      <div className="p-10 pt-3 hidden md:block md:w-full lg:w-[50%] h-screen overflow-y-auto">
        <div className="h-11">
          <h1 className="text-2xl font-bold">Component State</h1>
        </div>
        <pre className="bg-slate-800 p-5">
          <code className="text-white">
            {JSON.stringify(listState, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default App;
