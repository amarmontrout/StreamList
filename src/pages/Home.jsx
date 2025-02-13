import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Heading from ".././components/Heading";
import ListItem from "../components/ListItem";
import Input from "../components/ui/Input";
import Footer from "../components/Footer";

const Home = () => {
  const [inputList, setInputList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    setInputList(JSON.parse(localStorage.getItem("streamList")) || []);
  }, []);

  const saveToLocalStorage = (results) => {
    localStorage.setItem("streamList", JSON.stringify(results));
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputList((prev) => {
      const updatedList = [...prev, inputText];
      saveToLocalStorage(updatedList);
      return updatedList;
    });
    setInputText("");
  };

  const handleDelete = (item) => {
    setInputList((prev) => {
      const updatedList = prev.filter((entry) => entry !== item);
      saveToLocalStorage(updatedList);
      return updatedList;
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditText(item);
  };

  const handleSaveEdit = (item) => {
    setInputList((prevList) => {
      const updatedList = prevList.map((entry) =>
        entry === item ? editText : entry
      );
      saveToLocalStorage(updatedList);
      return updatedList;
    });
    setEditingItem(null);
  };

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
        {inputList.length === 0 ? (
          <h3>No movies found. Please add a movie to your list.</h3>
        ) : (
          inputList.map((item) => {
            return (
              <ListItem
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleSaveEdit={handleSaveEdit}
                editingItem={editingItem}
                item={item}
                editText={editText}
                setEditText={setEditText}
                key={uuidv4()}
              />
            );
          })
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
