import { Users, Cpu, Activity, ShieldCheck } from "lucide-react";
import "../styles/components/Stats.css";

export function Stats() {
  const data = [
    {
      value: "500+",
      label: "Cluster & Franchise Farmers Empowered",
      sub: "Training, infrastructure & assured market linkages",
      icon: Users,
    },
    {
      value: "24/7",
      label: "IoT-Enabled Shed Telemetry",
      sub: "Climate, ammonia, water & automated feed sensors",
      icon: Cpu,
    },
    {
      value: "ML-Driven",
      label: "Health & Price Forecasting",
      sub: "Predictive herd diagnostics & market timing",
      icon: Activity,
    },
    {
      value: "100%",
      label: "Farm-to-Fork Traceability",
      sub: "Hygienic slaughtering, packaging & cold-chain delivery",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="home-stats">
      <div className="home-stats-container">
        {data.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="home-stat-card">
              <div className="home-stat-icon">
                <Icon size={24} />
              </div>
              <h3 className="home-stat-value">{item.value}</h3>
              <p className="home-stat-label">{item.label}</p>
              <span className="home-stat-sub">{item.sub}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
