import React from "react";

export default function Home() {
  return (
    <div className="page home">
      <div className="home-intro">
        <h1>Welcome!</h1>
        <p>
          Hi! I am <strong>Tabya Kaur Sarao</strong>. I build web apps, enjoy UI design, 
          and solve problems with clean, maintainable code. This portfolio highlights my projects and services.
        </p>
      </div>

      <div className="home-mission">
        <h2>My Mission</h2>
        <p>
          To create accessible, maintainable web applications that delight users 
          and provide meaningful digital experiences.
        </p>
      </div>

      <div className="home-highlight">
        <h2>What I Do</h2>
        <ul>
          <li>Web Application Development</li>
          <li>UI/UX Design & Prototyping</li>
          <li>Clean, Efficient Coding Practices</li>
          <li>Problem Solving & Optimization</li>
        </ul>
      </div>
      <p style={{marginTop: "10px", fontWeight: "bold"}}>
      CI/CD Deployment Test – Updated Successfully!
      </p>
    </div>
  );
}
