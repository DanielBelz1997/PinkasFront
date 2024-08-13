import { FormEvent, useState, useEffect } from "react";

import Header from "./Header";
import SearchItem from "./SearchItem";
import Content from "./Content";
import Footer from "./Footer";

import { Task } from "./types/item";
import AddItem from "./AddItem";

import "./index.css";

function App() {
  const [items, setItems] = useState<Task[] | []>(
    JSON.parse(localStorage.getItem("shopping list") || "[]")
  );
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  // every render
  console.log("before useEffect");

  // runs at every render! give it dependency!
  // its asynchronous`
  useEffect(() => {
    localStorage.setItem("shopping list", JSON.stringify(items));
    // [] => only at load time
    // [items] => only when item state changes
  }, [items]);

  // every render
  console.log("after useEffect");

  const addItem = (item: Task["item"]) => {
    if (Array.isArray(items)) {
      const id = items?.length ? items[items.length - 1].id + 1 : 1;
      const myNewItem = { id, checked: false, item };
      const listItems = items ? [...items, myNewItem] : [myNewItem];
      setItems(listItems);
    } else {
      const id = 1;
      const myNewItem = { id, checked: false, item };
      setItems([myNewItem]);
    }
  };

  const handleCheck = (id: Task["id"]) => {
    const listItems = items?.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    if (listItems) setItems(listItems);
  };

  const handleDelete = (id: Task["id"]) => {
    const listItems = items?.filter((item) => item.id !== id);
    if (listItems) setItems(listItems);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newItem) return;
    // add new Item
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full max-w-lg m-auto border border-red-500">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        items={items?.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items?.length} />
    </div>
  );
}

export default App;
