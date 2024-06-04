import { listItem } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import ListItemName from "./ListItemName";
interface ListItemProps {
  item: listItem;
  level: number;
  pathToSelf: number[];
  changeName: (path: number[], newName: string) => void;
  addChildren: (path: number[], newChildren: listItem[]) => void;
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
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={item.name}
        className={cn({
          "pl-2": level === 1,
          "pl-4": level === 2,
        })}
      >
        <AccordionTrigger>
          <ListItemName name={item.name} />
        </AccordionTrigger>
        <AccordionContent>
          {item.children.map((child, index) => (
            <ListItem
              key={`${child.name}-${index}`}
              item={child}
              level={level + 1}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ListItem;
