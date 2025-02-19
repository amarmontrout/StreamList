import React, { useState, useCallback, useMemo } from "react";
import Heading from ".././components/Heading";
import ListItem from "../components/ListItem";
import Input from "../components/ui/Input";
import Footer from "../components/Footer";

const Home = () => {
  const [inputList, setInputList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("streamList")) || [];
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return [];
    }
  });
  const [inputText, setInputText] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editText, setEditText] = useState("");

  const saveToLocalStorage = useCallback((results) => {
    try {
      localStorage.setItem("streamList", JSON.stringify(results));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, []);

  const handleChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!inputText.trim()) return;

      setInputList((prev) => {
        const updatedList = [...prev, inputText.trim()];
        saveToLocalStorage(updatedList);
        return updatedList;
      });
      setInputText("");
    },
    [inputText, saveToLocalStorage]
  );

  const handleDelete = useCallback(
    (item) => {
      setInputList((prev) => {
        const updatedList = prev.filter((entry) => entry !== item);
        saveToLocalStorage(updatedList);
        return updatedList;
      });
    },
    [saveToLocalStorage]
  );

  const handleEdit = useCallback((item) => {
    setEditingItem(item);
    setEditText(item);
  }, []);

  const handleSaveEdit = useCallback(
    (item) => {
      if (!editText.trim()) return;

      setInputList((prevList) => {
        const updatedList = prevList.map((entry) =>
          entry === item ? editText.trim() : entry
        );
        saveToLocalStorage(updatedList);
        return updatedList;
      });
      setEditingItem(null);
    },
    [editText, saveToLocalStorage]
  );

  const renderListItems = useMemo(() => {
    if (inputList.length === 0) {
      return <h3>No movies found. Please add a movie to your list.</h3>;
    }

    return inputList.map((item, index) => (
      <ListItem
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleSaveEdit={handleSaveEdit}
        editingItem={editingItem}
        item={item}
        editText={editText}
        setEditText={setEditText}
        key={`${item}-${index}`} // Better key strategy
      />
    ));
  }, [
    inputList,
    editingItem,
    editText,
    handleDelete,
    handleEdit,
    handleSaveEdit,
  ]);

  return (
    <div className="container">
      <Heading>
        <h1>StreamList</h1>
      </Heading>
      <main>
        <Input
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          inputText={inputText}
        />
        {renderListItems}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
