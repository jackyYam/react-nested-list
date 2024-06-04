import { changeName, addChild } from "./helpers";

describe("changeName", () => {
  it("changes the name of the item at the given path", () => {
    const list = [
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
            ],
          },
        ],
      },
      {
        name: "Item 2",
        children: [],
      },
    ];
    const path = [0, 0];
    const newName = "New Name";
    const changedList = changeName(list, path, newName);
    expect(changedList[0].children[0].name).toBe(newName);
  });
});

describe("addChild", () => {
  it("adds a child to the item at the given path", () => {
    const list = [
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
            ],
          },
        ],
      },
      {
        name: "Item 2",
        children: [],
      },
    ];
    const path = [0, 0];
    const newChild = {
      name: "New Child",
      children: [],
    };
    const changedList = addChild(list, path, newChild);
    expect(changedList[0].children[0].children.length).toBe(2);
    expect(changedList[0].children[0].children[1].name).toBe("New Child");
  });
});
