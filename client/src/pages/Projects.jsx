import React from 'react';

export default function Projects() {
    return(
        <div className="page projects">
            <h2>My Projects</h2>
             
        {/*Project 1 */}
        <div className="project-card">
            <img src="/webdevelopment.png" alt="Project 1" className="project-image"/>
        <h3>Derma AI</h3>
        <p>
            <strong>Role:</strong>UI & System Documentation<br />
            <strong>Description</strong> Designed an AI-powered skincare app, focusing on user interface development and documenting system requirements for seamless functionality.
        </p>
        </div>
        {/*Project 2 */}
        <div className="project-card">
            <img src="/UNIX.png" alt="Project 2" className="project-image"/>
            <h3>Unix Networking Project</h3>
            <p>
                <strong>Role:</strong>System Integration <br />
                <strong>Description</strong>Connected multiple virtual machines (VMs) to simulate network environments and practiced system administration and inter VM communication.
            </p>
        </div>
        {/*Project 3 */}
        <div className="project-card">
            <img src="/database.png" alt="Project 3" className="project-image"/>
            <h3>SQL Database Management</h3>
            <p>
                <strong>Role:</strong>Database Developer <br />
                <strong>Description:</strong>Generated and managed a SQL database for an application, implementing tables, relationships, and queries to support data-driven functionalities.
            </p>
        </div>
        </div>
    );
}