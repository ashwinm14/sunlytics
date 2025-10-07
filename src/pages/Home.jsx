import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      {/* Optional floating shapes */}
      <div className="floating-circle"></div>
      <div className="floating-circle"></div>

      {/* Hero content */}
      <div className="hero">
        <h1 className="hero-title">
          Power Your Future with Solar Energy
        </h1>
        <p className="hero-text">
          Calculate your solar potential, energy savings, and installation size with ease.
        </p>
        <Link to="/calculator" className="hero-btn">
          Get Started
        </Link>
      </div>
    </div>
  );
}
