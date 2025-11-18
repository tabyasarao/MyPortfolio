// client/src/MainRouter.jsx (FINAL UPDATE - Add Project Detail/Edit Routes)

import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Core Layout
import Home from './core/Home.jsx';
import Menu from './core/Menu.jsx'; 

// Auth and User Components
import Signup from './user/Signup.jsx';
import Signin from './user/Signin.jsx'; 
import Profile from './user/Profile.jsx'; 
import EditProfile from './user/EditProfile.jsx';
import PrivateRoutes from './auth/PrivateRoutes.jsx';

// Project Components
import Projects from './project/Projects.jsx';     
import NewProject from './project/NewProject.jsx'; 
import ProjectDetail from './project/ProjectDetail.jsx'; // 🔑 New: Import ProjectDetail
import EditProject from './project/EditProject.jsx';     // 🔑 New: Import EditProject


const MainRouter = () => {
    return (
        <div>
            <Menu /> 
            
            <Routes>
                {/* -------------------- Public Routes -------------------- */}
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                
                {/* Public Project Routes */}
                <Route path="/projects" element={<Projects />} /> 
                {/* 🔑 New Public Route: Read One Project */}
                <Route path="/project/:projectId" element={<ProjectDetail />} /> 


                {/* -------------------- Protected Routes (Requires signin) -------------------- */}
                <Route element={<PrivateRoutes />}>
                    {/* User Routes */}
                    <Route path="/user/:userId" element={<Profile />} /> 
                    <Route path="/user/edit/:userId" element={<EditProfile />} />
                    
                    {/* Protected Project Routes */}
                    <Route path="/project/new" element={<NewProject />} />
                    {/* 🔑 New Protected Route: Edit/Delete Project */}
                    <Route path="/project/edit/:projectId" element={<EditProject />} />
                </Route>
            </Routes>
        </div>
    );
};

export default MainRouter;