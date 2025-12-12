import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Project from "./pages/Projects.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import SignIn from "./pages/Signin.jsx";
import SignUp from "./pages/Signup.jsx";
import SignOut from "./pages/SignOut.jsx";
import Education from "./pages/Education.jsx";

import AdminContacts from "./pages/AdminContacts.jsx";   // <-- add this
import EditEducation from "./pages/EditEducation.jsx";   // <-- add this

import auth from "./auth/auth-helper.js";

function App() {

 
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!auth.isAuthenticated();
  });


  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!auth.isAuthenticated());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
  
      {isAuthenticated && <NavBar />}

      <Routes>

        {/* ---------- AUTH ROUTES ---------- */}

        <Route 
          path="/signin" 
          element={<SignIn onAuth={() => setIsAuthenticated(true)} />} 
        />

        <Route 
          path="/signup" 
          element={<SignUp />}   // ❗ don't authenticate on signup
        />

        <Route
          path="/signout"
          element={<SignOut onSignOut={() => setIsAuthenticated(false)} />}
        />

        {/* ---------- PROTECTED ROUTES ---------- */}

        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} 
        />

        <Route 
          path="/about" 
          element={isAuthenticated ? <About /> : <Navigate to="/signin" />} 
        />

        <Route 
          path="/projects" 
          element={isAuthenticated ? <Project /> : <Navigate to="/signin" />} 
        />

        <Route 
          path="/services" 
          element={isAuthenticated ? <Services /> : <Navigate to="/signin" />} 
        />

        <Route 
          path="/contact" 
          element={isAuthenticated ? <Contact /> : <Navigate to="/signin" />} 
        />

        <Route 
          path="/education" 
          element={isAuthenticated ? <Education /> : <Navigate to="/signin" />} 
        />

        {/* ADMIN + EDIT ROUTES */}

        <Route path="/admin/contacts" element={<AdminContacts />} />


        <Route 
          path="/education/edit/:id" 
          element={isAuthenticated ? <EditEducation /> : <Navigate to="/signin" />} 
        />

      </Routes>
    </Router>
  );
}

export default App;
