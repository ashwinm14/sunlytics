import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services"; // <-- import your Services page
import Calculator from "./pages/Calculator";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      {/* Navbar is always visible */}
      <Navbar />

      {/* Routes will render the page components based on URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} /> 
        <Route path="/calculator" element={<Calculator />} /> 
        <Route path="/contact" element={<Contact />} />
      </Routes> 

      {/* Footer is always visible */}
      <Footer />
    </Router>
  );
}

export default App;
