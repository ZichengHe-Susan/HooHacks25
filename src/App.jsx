import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage';
import AddTourPage from './AddTourPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-tour" element={<AddTourPage />} />
      </Routes>
    </Router>
  );
}

export default App;