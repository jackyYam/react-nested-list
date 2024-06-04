import type { listItem } from "./types";

export const initialData: listItem[] = [
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
