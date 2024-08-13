import ItemList from "./ItemList";
import { Task } from "./types/item";

export default function Content({
  items,
  handleCheck,
  handleDelete,
}: {
  items: Task[] | undefined;
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
}) {
  return (
    <main className="w-full flex flex-col flex-grow justify-start overflow-y-auto text-center">
      {items?.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p className="mt-8">Your list is empty</p>
      )}
    </main>
  );
}
