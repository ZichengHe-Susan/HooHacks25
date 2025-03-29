import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage';
import AddTourPage from './AddTourPage';
import ViewTourPlan from './ViewTourPlan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-tour" element={<AddTourPage />} />
        <Route path="/view-tour-plan" element={<ViewTourPlan />} />
      </Routes>
    </Router>
  );
}

export default App;