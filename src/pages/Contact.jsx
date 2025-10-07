import React, { useEffect } from "react";
import "./Contact.css";

export default function Contact() {
  useEffect(() => {
    const items = document.querySelectorAll(".animate-on-scroll");
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
    items.forEach((item) => observer.observe(item));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted! We'll get back to you soon.");
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-header animate-on-scroll">
          <h2>Contact Us</h2>
          <p>Have questions? Send us a message and we'll get back to you.</p>
        </div>

        <div className="contact-content">
          <form className="contact-form animate-on-scroll" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="Subject" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="contact-btn">Send Message</button>
          </form>

          <div className="contact-info animate-on-scroll">
            <h3>Get in Touch</h3>
            <p><strong>Email:</strong> support@sunlytics.com</p>
            <p><strong>Phone:</strong> +123-456-7890</p>
            <p><strong>Address:</strong> London, England</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
