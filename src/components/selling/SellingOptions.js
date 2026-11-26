import React from "react";
import { Sparkles, Users, Package, Plus } from "lucide-react";
import "../../styles/components/SellingOptions.css";

function SellingOptions({ onSellClick }) {
  const options = [
    {
      type: "piglet",
      icon: Sparkles,
      title: "Sell Piglets / Growers",
      price: "₹4,000 – ₹7,000",
      description: "Young weaned stock (3–6 months)",
    },
    {
      type: "breeding_unit",
      icon: Users,
      title: "Sell Breeding Unit",
      price: "₹3.5L + taxes",
      description: "10 Female + 1 Male genetic batch",
    },
    {
      type: "cutting_piece",
      icon: Package,
      title: "Sell Processed Meat Cuts",
      price: "₹200 – ₹300/kg",
      description: "Hygienic chilled & packaged cuts",
    },
  ];

  return (
    <div className="selling-options-card">
      <h3>Create New Listing</h3>
      <p className="subtitle">Publish stock directly to marketplace buyers</p>

      <div className="options-grid">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.type}
              type="button"
              className="sell-option"
              onClick={() => onSellClick(option.type)}
            >
              <div className="option-icon">
                <Icon size={20} />
              </div>
              <div className="option-content">
                <h4>{option.title}</h4>
                <p className="option-price">{option.price}</p>
                <p className="option-desc">{option.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="custom-listing-btn"
        onClick={() => onSellClick("piglet")}
      >
        <Plus size={16} />
        <span>Create Custom Listing</span>
      </button>
    </div>
  );
}

export default SellingOptions;
