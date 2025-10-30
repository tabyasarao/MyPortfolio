import React from "react";

export default function Services(){
 
    const services=[
        {
            title:"Web Development",
            description:"Building responsive and interactive websites using React, HTML, CSS, and Javascript.",
            image:"web development.jpg"
        },
        {
            title: "Mobile App Development",
      description: "Creating cross-platform mobile applications with React Native and Flutter.",
      image: "apps.jpg",
    },
    {
      title: "General Programming",
      description: "Solving problems and building software solutions in Python, Java, and C#.",
      image: "programming.jpg",
    },
    {
      title: "UI/UX Design",
      description: "Designing user-friendly interfaces and experiences for websites and apps.",
      image: "UIUX.jpg",
    },
  ];

  return (
    <div className="page services">
      <h2>My Services</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}