import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Project from "./pages/Projects.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import SignIn from "./pages/Signin.jsx";
import SignUp from "./pages/Signup.jsx";
import SignOut from "./pages/Signout.jsx";
import Education from "./pages/Education.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {/* Only show NavBar if authenticated */}
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route 
          path="/signin" 
          element={<SignIn onAuth={() => setIsAuthenticated(true)} />} 
        />
        <Route 
          path="/signup" 
          element={<SignUp onAuth={() => setIsAuthenticated(true)} />} 
        />
        <Route 
          path="/signout"
          element={<SignOut onSignOut={() => setIsAuthenticated(false)} />}
        />
        {/* Protected routes */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/signin" />} />
        <Route path="/projects" element={isAuthenticated ? <Project /> : <Navigate to="/signin" />} />
        <Route path="/services" element={isAuthenticated ? <Services /> : <Navigate to="/signin" />} />
        <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/signin" />} />
        <Route path="/education" element={isAuthenticated ? <Education /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
