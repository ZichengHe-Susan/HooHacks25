import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD:src/App.jsx
=======
import Login from './Login';
>>>>>>> main:src/Routes.jsx
import HomePage from './Homepage';
import AddTourPage from './AddTourPage';
import ViewTourPlan from './ViewTourPlan';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD:src/App.jsx
        <Route path="/" element={<HomePage />} />
=======
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
>>>>>>> main:src/Routes.jsx
        <Route path="/add-tour" element={<AddTourPage />} />
        <Route path="/view-tour-plan" element={<ViewTourPlan />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
