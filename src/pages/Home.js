import React from "react";
import Upload from "../components/Upload";
import NavBar from "../components/NavBar";
import "../App.css";

const Home = () => {

  return (
    <div className="h-100">
      <NavBar></NavBar>
      <div className="mt-3 flex flex-col items-center text-center">
        <h1 className="font-ad custom-pink-text text-center align-middle text-6xl font-bold mb-4 hover:text-red-400 cursor-default">
          FaceMajor
        </h1>
        <h1 className="font-ad text-center align-middle text-3xl font-bold hover:text-orange-300 cursor-default">
          Discover Your Ideal Major Through Facial Analysis with AI
        </h1>
      </div>

      <div className="mt-8">
        <h1 className="mb-2 font-ad text-2xl">Select Your Gender</h1>
        <input type="checkbox" id="gender" />
        <label for="gender">
          <span class="knob">
            <i></i>
          </span>
        </label>
      </div>
      <div className="container">
        <Upload></Upload>
      </div>
    </div>
  );
};

export default Home;
