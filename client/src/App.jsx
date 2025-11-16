import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all components
import Home from './pages/Home'; // Assuming you have a Home page
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import EducationList from './pages/EducationList'; // The READ/VIEW component
import NewEducation from './pages/NewEducation'; // The CREATE component
// You will need an EditEducation component later for UPDATE

// Import the route protection wrappers
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

const App = () => (
  <Router>
    <Routes>
      {/* 1. Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/education" element={<EducationList />} /> {/* VIEW is public */}

      {/* 2. Admin Protected Routes (for CUD operations) */}
      <Route element={<AdminRoute />}>
        <Route path="/education/new" element={<NewEducation />} /> {/* CREATE */}
        {/* Placeholder for Edit/Update (U) - you will create this component */}
        <Route path="/education/edit/:educationId" element={<div>Edit Education Form (To be Implemented)</div>} /> 
        
        {/* Add Contact and Project Admin routes here later */}
      </Route>

      {/* 3. General Private Routes (for future Profile/Dashboard) */}
      <Route element={<PrivateRoute />}>
        {/* Example: A user's profile dashboard */}
        <Route path="/dashboard" element={<div>User Dashboard (To be Implemented)</div>} />
      </Route>

    </Routes>
  </Router>
);

export default App;