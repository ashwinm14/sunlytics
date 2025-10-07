import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Calculator.css";

// Cities with sunlight hours and unit cost
const indianCities = [
  { name: "Delhi", pincode: "110001", sunlightHours: 5, unitCost: 6 },
  { name: "Mumbai", pincode: "400001", sunlightHours: 5.5, unitCost: 7 },
  { name: "Bangalore", pincode: "560001", sunlightHours: 5.2, unitCost: 6.5 },
  { name: "Chennai", pincode: "600001", sunlightHours: 5.3, unitCost: 6.8 },
  { name: "Kolkata", pincode: "700001", sunlightHours: 4.8, unitCost: 6 },
  { name: "Hyderabad", pincode: "500001", sunlightHours: 5.1, unitCost: 6.2 },
  { name: "Pune", pincode: "411001", sunlightHours: 5, unitCost: 6 },
  { name: "Ahmedabad", pincode: "380001", sunlightHours: 5.4, unitCost: 6 },
  { name: "Jaipur", pincode: "302001", sunlightHours: 5.2, unitCost: 6 },
  { name: "Lucknow", pincode: "226001", sunlightHours: 4.9, unitCost: 6 },
];

export default function Calculator() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    pincode: "",
    consumption: "",
    roofType: "",
    roofSlope: "",
    roofDirection: "",
    rooftopLength: "",
    rooftopWidth: "",
    availableSpace: "",
    shading: "no",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "city") {
      const cityObj = indianCities.find((c) => c.name === value);
      if (cityObj) setFormData({ ...formData, city: value, pincode: cityObj.pincode });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCity = indianCities.find(c => c.name === formData.city);

    const solarPanelEfficiency = 0.8;
    const sunlightHoursPerDay = selectedCity?.sunlightHours || 5;
    const costPerKW = 70000;
    const panelAreaPerKW = 10;
    const unitCost = selectedCity?.unitCost || 6;

    const monthlyConsumption = parseFloat(formData.consumption);
    const dailyConsumption = monthlyConsumption / 30;

    const requiredKW = dailyConsumption / (sunlightHoursPerDay * solarPanelEfficiency);
    const availableArea = parseFloat(
      formData.availableSpace || formData.rooftopLength * formData.rooftopWidth
    );
    const maxKWByArea = availableArea / panelAreaPerKW;
    const feasibleKW = Math.min(requiredKW, maxKWByArea);

    const estimatedCost = feasibleKW * costPerKW;
    const monthlySavings = monthlyConsumption * unitCost;
    const annualSavings = monthlySavings * 12;
    const efficiencyPercent = ((feasibleKW / requiredKW) * 100).toFixed(2);
    const profit5Years = (annualSavings * 5 - estimatedCost).toLocaleString();

    let panelType = "Standard Mono-crystalline";
    if (availableArea < 20 || formData.shading === "yes") panelType = "High-efficiency Mono-crystalline";
    else if (formData.roofType === "flat" && availableArea > 40) panelType = "Poly-crystalline (cost-effective)";

    let suggestedRoof = "Flat / Sloped suitable";
    if (formData.roofType === "flat" && formData.roofSlope <= 10) suggestedRoof = "Flat Roof is optimal";
    else if (formData.roofType === "sloped") suggestedRoof = "Sloped Roof with south-facing orientation is optimal";

    const placementReasons = [];
    if (formData.shading === "yes") placementReasons.push("Avoid shaded areas; use high-efficiency panels in shaded spots.");
    if (formData.roofType === "flat") placementReasons.push("Install panels on flat roof with tilt angle ~20–30° facing south for maximum output.");
    if (formData.roofType === "sloped") {
      if (formData.roofDirection) placementReasons.push(`Mount panels on sloped roof facing ${formData.roofDirection} for optimal sunlight.`);
      else placementReasons.push("Mount panels on sloped roof facing south for best results.");
    }
    if (availableArea < 15) placementReasons.push("Limited roof space; consider high-efficiency compact panels.");
    if (feasibleKW < requiredKW) placementReasons.push("Feasible capacity is lower than required; expect partial offset of consumption.");
    const panelPlacement = placementReasons.join(" ");

    const result = {
      ...formData,
      requiredKW: requiredKW.toFixed(2),
      feasibleKW: feasibleKW.toFixed(2),
      estimatedCost: estimatedCost.toLocaleString(),
      monthlySavings: monthlySavings.toLocaleString(),
      efficiencyPercent,
      profit5Years,
      suggestedRoof,
      panelType,
      panelPlacement,
    };

    console.log("✅ Solar Calculation Result:", result);
    generatePDF(result);
  };

  const generatePDF = (data) => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor("#FFB400");
    doc.text("☀️ Sunlytics Solar Report", 14, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor("#000");
    doc.text(`Customer Name: ${data.name}`, 14, 30);
    if (data.city) doc.text(`City: ${data.city}`, 14, 38);
    if (data.pincode) doc.text(`Pincode: ${data.pincode}`, 14, 46);
    doc.text("Personalized solar energy estimation report:", 14, 54);

    autoTable(doc, {
      startY: 60,
      head: [["Parameter", "Value"]],
      body: [
        ["Required Capacity (kW)", data.requiredKW],
        ["Feasible Capacity (kW)", data.feasibleKW],
        ["Estimated Installation Cost (₹)", data.estimatedCost],
        ["Estimated Monthly Savings (₹)", data.monthlySavings],
        ["System Efficiency (%)", data.efficiencyPercent],
        ["Estimated 5-Year Profit (₹)", data.profit5Years],
        ["Most Suitable Roof", data.suggestedRoof],
        ["Recommended Solar Panel Type", data.panelType],
        ["Recommended Panel Placement", data.panelPlacement],
      ],
      headStyles: { fillColor: "#FFB400", textColor: 0, fontStyle: "bold" },
      bodyStyles: { textColor: 20 },
      alternateRowStyles: { fillColor: "#FFF3CC" },
      styles: { fontSize: 12, cellPadding: 4 },
    });

    const y = doc.lastAutoTable.finalY + 15;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(14);
    doc.setTextColor("#555");
    doc.text("Thank you for using Sunlytics!", 14, y);

    doc.save("Sunlytics_Solar_Report.pdf");
  };

  return (
    <section className="calculator" id="calculator">
      <div className="calculator-container">
        <h2 className="calculator-title">Solar Calculator</h2>
        <p className="calculator-subtitle">
          Estimate your solar panel requirements based on your roof and energy usage
        </p>

        <form className="calculator-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
          </div>

          <div className="form-group">
            <label>Select City</label>
            <select name="city" value={formData.city} onChange={handleChange} required>
              <option value="">Select City</option>
              {indianCities.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Average Monthly Electricity Consumption (kWh)</label>
            <input type="number" name="consumption" value={formData.consumption} onChange={handleChange} placeholder="e.g., 350" required />
          </div>

          <div className="form-group">
            <label>Roof Type</label>
            <select name="roofType" value={formData.roofType} onChange={handleChange} required>
              <option value="">Select Roof Type</option>
              <option value="flat">Flat Roof</option>
              <option value="sloped">Sloped Roof</option>
              <option value="shed">Shed Roof</option>
              <option value="gabled">Gabled Roof</option>
            </select>
          </div>

          {formData.roofType === "sloped" && (
            <div className="form-group roof-details">
              <label>Roof Slope (in degrees)</label>
              <input type="number" name="roofSlope" value={formData.roofSlope} onChange={handleChange} placeholder="e.g., 30" />
              <label>Roof Direction</label>
              <select name="roofDirection" value={formData.roofDirection} onChange={handleChange}>
                <option value="">Select Direction</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </select>
            </div>
          )}

          <div className="form-group rooftop-dimensions">
            <label>Rooftop Dimensions (meters)</label>
            <div className="dimension-inputs">
              <input type="number" name="rooftopLength" value={formData.rooftopLength} onChange={handleChange} placeholder="Length" required />
              <input type="number" name="rooftopWidth" value={formData.rooftopWidth} onChange={handleChange} placeholder="Width" required />
            </div>
          </div>

          <div className="form-group">
            <label>Available Space for Panels (sq.m)</label>
            <input type="number" name="availableSpace" value={formData.availableSpace} onChange={handleChange} placeholder="e.g., 50" />
          </div>

          <div className="form-group">
            <label>Presence of Shading Objects</label>
            <select name="shading" value={formData.shading} onChange={handleChange}>
              <option value="no">No</option>
              <option value="partial">Partial</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          <button type="submit" className="calculator-btn">Calculate</button>
        </form>
      </div>
    </section>
  );
}
