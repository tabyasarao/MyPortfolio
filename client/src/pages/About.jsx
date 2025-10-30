import React from 'react';


export default function About() {
    return(
        <div className="page about">
            <h2>About Me</h2>
            {/*Profile picture */}
            <img src="/profilepic.jpg" alt="Profile" className="profile-pic"/>
            {/*Brief bio */}
            <p>Hello! My name is <strong>Tabya Kaur Sarao</strong>. 
            I am a web developer passionate about creating accessible and maintainable web applications.
            I enjoy designing clean user interfaces and solving problems with clean, efficient code.</p>
        <p>
        You can view or download my resume here:{" "}
        <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
          Resume (PDF)
        </a>
        </p>
        </div>
    );
}