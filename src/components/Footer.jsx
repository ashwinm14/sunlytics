import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Sunlytics. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#calculator">Calculator</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
