import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import AddTourPage from './AddTourPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add-tour" element={<AddTourPage />} />
      </Routes>
    </Router>
  );
}

export default App;