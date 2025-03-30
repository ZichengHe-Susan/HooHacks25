import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import HomePage from './Homepage';
import AddTourPage from './AddTourPage';
import ViewTourPlan from './ViewTourPlan';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/add-tour" element={<AddTourPage />} />
        <Route path="/view-tour-plan" element={<ViewTourPlan />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
