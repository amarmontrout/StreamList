import React from "react";
import "../css/Heading.css"

const Heading = ({ children }) => {
  return (
    <>
      <header>{children}</header>
    </>
  );
};

export default Heading;
