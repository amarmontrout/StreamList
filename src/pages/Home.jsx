import React from "react";
import Heading from ".././components/Heading";
import Input from "../components/ui/Input";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="container">
      <Heading>
        <h1>StreamList</h1>
      </Heading>
      <main>
        <Input />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
