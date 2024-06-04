import type { listItem } from "@/lib/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
interface SideBarProps {
  children: React.ReactNode;
  addNewRootChild: (path: number[], newChild: listItem) => void;
}

const SideBar = ({ children, addNewRootChild }: SideBarProps) => {
  const [newItemName, setNewItemName] = useState("");
  return (
    <div className="border-r">
      <div className="flex h-screen max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 gap-3">
          <Input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="New Item"
            className="flex-1"
          />
          <Button
            onClick={() => {
              addNewRootChild([], { name: newItemName, children: [] });
              setNewItemName("");
            }}
            disabled={newItemName.length === 0}
            className="flex items-center"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
        <div className="flex-1">
          <div className="grid items-start px-2 text-sm font-medium lg:px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
