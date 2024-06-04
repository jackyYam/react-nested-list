import React, { useState } from "react";
import { Input } from "./ui/input";
import { Pencil, Plus } from "lucide-react";

interface ListItemNameProps {
  name: string;
  level: number;
  handleNameChange: (newName: string) => void;
  addChildren: () => void;
  accordionTriggerRef: React.RefObject<HTMLDivElement>;
}
const ListItemName = ({
  name,
  handleNameChange,
  addChildren,
  accordionTriggerRef,
  level,
}: ListItemNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const changeName = () => {
    setCurrentName(currentName);
    setIsEditing(false);
    handleNameChange(currentName);
  };
  const showAddButton = level < 2;

  return isEditing ? (
    <Input
      type="text"
      value={currentName}
      onChange={(e) => setCurrentName(e.target.value)}
      autoFocus
      onBlur={changeName}
    />
  ) : (
    <div className={"flex items-center justify-between w-full"}>
      <div className="flex items-center gap-3">
        {currentName}
        <Pencil
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
          }}
          className="w-4 h-4"
        />
      </div>
      {showAddButton && (
        <div
          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={(e) => {
            if (
              accordionTriggerRef.current?.getAttribute("data-state") === "open"
            ) {
              e.preventDefault();
            }
            addChildren();
          }}
        >
          <Plus className="w-4 h-4" />
          Add Subitem
        </div>
      )}
    </div>
  );
};

export default ListItemName;
