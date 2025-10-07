import React, { useEffect } from "react";
import "./Services.css";

const servicesData = [
  { icon: "🏠", title: "Smart Roof Mapping", description: "Scan and map roofs for optimal solar placement." },
  { icon: "⚡", title: "Accurate Efficiency Estimation", description: "Quickly estimate solar panel efficiency." },
  { icon: "💰", title: "Sustainable & Cost-Effective", description: "Affordable solutions with maximum savings." },
  { icon: "📊", title: "Ease of Understanding", description: "Clear insights and easy-to-read reports." },
];

export default function Services() {
  useEffect(() => {
    const items = document.querySelectorAll(".service-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((item) => observer.observe(item));
  }, []);

  return (
    <section className="services" id="services">
      <h2 className="services-title">Why choose</h2>
      <span className="services-subtitle">Sunlytics?</span>

      <div className="services-container services-list">
        {servicesData.map((service, index) => (
          <div className="service-item" key={index}>
            <div className="service-icon-wrapper">
              <div className="service-icon">{service.icon}</div>
            </div>
            <div className="service-text">
              <h3 className="service-name" tabIndex={0} role="button" aria-expanded="false">
                {service.title}
              </h3>
              <p className="service-desc">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
