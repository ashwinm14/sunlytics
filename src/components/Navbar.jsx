import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">☀️ Sunlytics</h2>

        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link to="/services" onClick={() => setOpen(false)}>Services</Link></li>
          <li><Link to="/calculator" onClick={() => setOpen(false)}>Calculator</Link></li>
          <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
