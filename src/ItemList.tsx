import { Item } from "./types/item";
import LineItem from "./LineItem";

export default function ItemList({
  items,
  handleCheck,
  handleDelete,
}: {
  items: Item[];
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
}) {
  return (
    <ul>
      {items.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
