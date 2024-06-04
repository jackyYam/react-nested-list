import React, { useState } from "react";
import { Input } from "./ui/input";
import { Pencil, Plus } from "lucide-react";
import { Button } from "./ui/button";
interface ListItemNameProps {
  name: string;
  handleNameChange: (newName: string) => void;
}
const ListItemName = ({ name }: ListItemNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const changeName = () => {
    setCurrentName(currentName);
    setIsEditing(false);
  };
  return isEditing ? (
    <Input
      type="text"
      value={currentName}
      onChange={(e) => setCurrentName(e.target.value)}
      autoFocus
      onBlur={changeName}
    />
  ) : (
    <div className="flex items-center justify-between">
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
      <Button className="flex items-center gap-3">
        <Plus className="w-4 h-4" />
        Add Subitem
      </Button>
    </div>
  );
};

export default ListItemName;
