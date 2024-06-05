import { listItem } from "@/lib/types";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import ListItemName from "./ListItemName";
import { useRef } from "react";
interface ListItemProps {
  item: listItem;
  level: number;
  pathToSelf: number[];
  changeName: (path: number[], newName: string) => void;
  addChildren: (path: number[], newChild: listItem) => void;
}
const ListItem = ({
  item,
  level,
  pathToSelf,
  changeName,
  addChildren,
}: ListItemProps) => {
  const handleSelfNameChange = (newName: string) => {
    changeName(pathToSelf, newName);
  };
  const accordionTriggerRef = useRef<HTMLDivElement>(null); // Add type annotation to useRef
  const addChildToSelf = () => {
    addChildren(pathToSelf, {
      name: "New Item",
      children: [],
    });
  };
  const accordianValue = pathToSelf.join("-").concat(item.name);
  const contentTestId = `content-${pathToSelf.join("-")}`;
  return (
    <AccordionItem value={accordianValue} ref={accordionTriggerRef}>
      <AccordionTrigger
        className={cn("border border-transparent hover:border-blue-400 pr-3", {
          "pl-3": level === 0,
          "pl-6": level === 1,
          "pl-9": level === 2,
        })}
      >
        <ListItemName
          name={item.name}
          handleNameChange={handleSelfNameChange}
          addChildren={addChildToSelf}
          accordionTriggerRef={accordionTriggerRef}
          level={level}
          path={pathToSelf}
        />
      </AccordionTrigger>
      <AccordionContent data-testid={contentTestId}>
        {item.children.map((child, index) => (
          <ListItem
            key={`${child.name}-${index}`}
            item={child}
            level={level + 1}
            pathToSelf={[...pathToSelf, index]}
            changeName={changeName}
            addChildren={addChildren}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default ListItem;
