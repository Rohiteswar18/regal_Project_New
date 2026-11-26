import React from "react";
import { Users, TrendingUp, Package, Dna } from "lucide-react";
import "../../styles/components/CompanyStats.css";

function CompanyStats({ stats }) {
  if (!stats) return null;

  const statItems = [
    {
      icon: Users,
      value: `${stats.totalSellers || 0}+`,
      label: "Active Cluster Sellers",
      color: "#2563EB",
    },
    {
      icon: TrendingUp,
      value: `${stats.totalSold || 0}+`,
      label: "Livestock & Cuts Sold",
      color: "#059669",
    },
    {
      icon: Package,
      value: `${stats.totalBatches || 0}+`,
      label: "Active Batches",
      color: "#7C3AED",
    },
    {
      icon: Dna,
      value: `${stats.totalBreeds || 0}+`,
      label: "Registered Breeds",
      color: "#B48A1E",
    },
  ];

  return (
    <div className="sell-company-stats">
      <div className="sell-stats-grid">
        {statItems.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="sell-stat-card">
              <div
                className="sell-stat-icon"
                style={{ backgroundColor: `${stat.color}16`, color: stat.color }}
              >
                <Icon size={20} />
              </div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CompanyStats;
