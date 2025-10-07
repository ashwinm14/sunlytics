import React, { useEffect } from "react";
import "./About.css";

export default function About() {
  useEffect(() => {
    const animateItems = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    animateItems.forEach((item) => observer.observe(item));
  }, []);

  return (
    <section className="about" id="about">
      <div className="about-container">
        {/* Text Section */}
        <div className="about-text animate-on-scroll">
          <h2 className="about-title">About Sunlytics</h2>
          <p className="about-subtitle">
            We are pioneers in solar energy solutions, helping homes and businesses 
            adopt clean, efficient, and sustainable energy.
          </p>
          <p className="about-desc">
            At Sunlytics, we combine advanced technology with expert advice to 
            design solar solutions tailored to your needs. From roof mapping and 
            efficiency analysis to installation support, we guide you every step 
            of the way. Join us in creating a brighter, greener future.
          </p>

          <div className="mission-vision">
            <div className="box animate-on-scroll">
              <h3>Our Mission</h3>
              <p>To empower communities with sustainable solar solutions, reducing carbon footprint and energy costs.</p>
            </div>
            <div className="box animate-on-scroll">
              <h3>Our Vision</h3>
              <p>To lead the transition to a clean energy world, making solar energy accessible to everyone.</p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="about-image animate-on-scroll">
          <div className="image-wrapper">
            <img 
              src="public/spanel.jpeg" 
              alt="Solar panels" 
            />
            {/* <img 
              src="public/spanel1.jpeg" 
              alt="Solar panels" 
            /> */}
               <img 
              src="public/spanel2.jpg" 
              alt="Solar panels" 
            />
            <div className="floating-circle"></div>
            <div className="floating-circle small"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
