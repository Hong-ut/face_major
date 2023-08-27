import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter as Router
import Home from './pages/Home';
import Loading from './pages/Loading';
import Main from './pages/Main';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2700);
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className="App">
      <Router> {/* Wrap your component with the Router */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
