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
    <div className="border-r w-full md:w-[40%] lg:w-[50%]">
      <div className="flex h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 gap-3">
          <Input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="New Root Item"
            className="flex-1"
          />
          <Button
            onClick={() => {
              addNewRootChild([], { name: newItemName, children: [] });
              setNewItemName("");
            }}
            disabled={newItemName.length === 0}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="grid items-start text-sm font-medium ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
