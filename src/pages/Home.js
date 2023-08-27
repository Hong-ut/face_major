import React from "react";
import Upload from "../components/Upload";
import NavBar from "../components/NavBar";
import "../App.css";

const Home = () => {
  return (
    <div className="h-100">
      <NavBar></NavBar>
      <div className="mt-3">
        <h1 className="font-ad custom-pink-text text-center align-middle text-6xl font-bold mb-4">
          FaceMajor
        </h1>
        <h1 className="font-ad text-center align-middle text-3xl font-bold">
        Uncover the Major that Perfectly Aligns with Your Face! 
        </h1>
      </div>
      <div className="container">
        <Upload></Upload>
      </div>
    </div>
  );
};

export default Home;
