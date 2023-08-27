import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter as Router
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router> {/* Wrap your component with the Router */}
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
