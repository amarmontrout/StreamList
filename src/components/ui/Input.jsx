import React from "react";
import Button from "./Button";

const Input = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <input
          onChange={props.handleChange}
          type="text"
          value={props.inputText}
          placeholder="Enter movie..."
        />
        <Button type="submit" />
      </form>
    </>
  );
};

export default Input;
