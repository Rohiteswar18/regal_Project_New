import React from "react";
import { IndianRupee, Sparkles, Users, Package } from "lucide-react";
import "../../styles/components/PriceGuide.css";

function PriceGuide() {
  const priceItems = [
    {
      icon: Sparkles,
      title: "Piglets / Growers",
      price: "₹4,000 – ₹7,000",
      description: "Per animal (3–6 months, vaccinated)",
    },
    {
      icon: Users,
      title: "Breeding Unit",
      price: "₹3.5L + taxes",
      description: "10 Female + 1 Male certified nucleus set",
    },
    {
      icon: Package,
      title: "Processed Pork Cuts",
      price: "₹200 – ₹300/kg",
      description: "Hygienic chilled & MAP-packaged cuts",
    },
  ];

  return (
    <div className="price-guide-card">
      <div className="price-guide-head">
        <IndianRupee size={18} />
        <h3>LLP Reference Price Guide</h3>
      </div>
      <div className="price-guide-grid">
        {priceItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="price-item">
              <div className="price-icon">
                <Icon size={20} />
              </div>
              <div className="price-content">
                <h4>{item.title}</h4>
                <p className="price-amount">{item.price}</p>
                <p className="price-desc">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PriceGuide;
