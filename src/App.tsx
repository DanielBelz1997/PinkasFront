import { FormEvent, useState, useEffect } from "react";

import Header from "./Header";
import SearchItem from "./SearchItem";
import Content from "./Content";
import Footer from "./Footer";
import { apiRequest } from "./apiRequest";

import { Task } from "./types/item";
import AddItem from "./AddItem";

import "./index.css";

function App() {
  const [items, setItems] = useState<Task[] | []>([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // without react-query. only activated at load time
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/task`);
        if (!res.ok) throw Error(`does not receive expected data`);
        const listItems = await res.json();
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const addItem = async (item: Task["item"]) => {
    if (Array.isArray(items)) {
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const myNewItem = { id, checked: false, item };
      const listItems = items ? [...items, myNewItem] : [myNewItem];
      setItems(listItems);

      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myNewItem),
      };

      const result = await apiRequest(
        `${import.meta.env.VITE_API_URL}/task`,
        postOptions
      );

      if (result) setFetchError(result);
    } else {
      const myNewItem = { id: 1, checked: false, item };
      setItems([myNewItem]);

      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myNewItem),
      };

      const result = await apiRequest(
        `${import.meta.env.VITE_API_URL}/task`,
        postOptions
      );

      if (result) setFetchError(result);
    }
  };

  const handleCheck = async (id: Task["id"]) => {
    const listItems = items?.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };

    const result = await apiRequest(
      `${import.meta.env.VITE_API_URL}/task/${id}`,
      updateOptions
    );

    if (result) setFetchError(result);

    if (listItems) setItems(listItems);
  };

  const handleDelete = async (id: Task["id"]) => {
    console.log(items);
    const listItems = items?.filter((item) => item.id !== id);
    console.log(listItems);

    const reqUrl = `${import.meta.env.VITE_API_URL}/task/${id}`;
    const deleteOptions = { method: "DELETE" };
    const result = await apiRequest(reqUrl, deleteOptions);

    if (result) setFetchError(result);
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
      <main className="w-full flex flex-col flex-grow justify-start overflow-y-auto text-center">
        {isLoading && <p>Loading Tasks...</p>}
        {fetchError && <p className="text-red-600">{`Error: ${fetchError}`}</p>}
        {!fetchError && (
          <Content
            items={items?.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items?.length} />
    </div>
  );
}

export default App;
