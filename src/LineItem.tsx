import { FaTrashAlt } from "react-icons/fa";
import { Item } from "./types/item";

export default function LineItem({
  item,
  handleCheck,
  handleDelete,
}: {
  item: Item;
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
}) {
  return (
    <li className="flex flex-grow bg-slate-300 mb-2 p-2 w-full justify-between">
      <input
        className="size-6"
        type="checkbox"
        checked={item.checked}
        onChange={() => handleCheck(item.id)}
      />
      <label
        className={`${item.checked ? "line-through" : ""}`}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        className="text-blue-400 hover:text-red-600"
        role="button"
        size={30}
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
}
