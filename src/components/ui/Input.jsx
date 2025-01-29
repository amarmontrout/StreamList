import React, { useState } from "react";
import Button from "./Button";

const Input = () => {
  const [inputText, setInputText] = useState("");
  const [showText, setShowText] = useState(false);

  const handleChange = (e) => {
    setShowText(false);
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputText);
    setShowText(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          value={inputText}
          placeholder="Enter text..."
        />
        <Button type="submit" text="Submit" />
      </form>
      {showText && <div className="textInput">{inputText}</div>}
    </>
  );
};

export default Input;
