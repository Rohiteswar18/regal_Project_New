import { useNavigate } from "react-router-dom";
import {
  Cpu,
  ShoppingBag,
  Users,
  ShieldCheck,
  TrendingUp,
  Wheat,
  ArrowUpRight,
} from "lucide-react";
import "../styles/components/Features.css";

export function Features() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Online Livestock & Inputs Marketplace",
      desc: "Buy and sell verified piglings, breeding units, feed inputs, and processed pork cuts directly with transparent pricing and escrow-grade bookings.",
      icon: ShoppingBag,
      route: "/booking",
      tag: "Commerce",
    },
    {
      title: "IoT Shed Environmental Monitoring",
      desc: "Automated 24/7 telemetry tracking shed temperature, humidity, ammonia levels, feed dispensing, and nipple drinker flow rates.",
      icon: Cpu,
      route: "/smart-farm",
      tag: "IoT Hardware",
    },
    {
      title: "ML Health, Yield & Price Forecasting",
      desc: "Machine learning models detect early herd illness, project batch slaughter weights, and forecast regional market prices.",
      icon: TrendingUp,
      route: "/smart-farm",
      tag: "Machine Learning",
    },
    {
      title: "Franchise & Cluster Farming Models",
      desc: "Turnkey farm infrastructure, capacity-building training programs, and market linkages empowering rural farmers and women SHGs.",
      icon: Users,
      route: "/selling",
      tag: "Clusters",
    },
    {
      title: "Feed Formulation & Veterinary Care",
      desc: "Scientifically balanced phase diets, mineral supplements, water quality standards, and preventive veterinary support.",
      icon: Wheat,
      route: "/nutrients",
      tag: "Nutrition & Vet",
    },
    {
      title: "Hygienic Processing & Cold Chain",
      desc: "Standardized slaughtering, hygienic meat processing, vacuum/MAP packaging, and cold-chain marketing & distribution.",
      icon: ShieldCheck,
      route: "/breeds",
      tag: "Processing",
    },
  ];

  return (
    <section className="features">
      <div className="features-header">
        <span className="rf-eyebrow rf-eyebrow-navy">Platform Capabilities</span>
        <h2 className="features-title">
          Technology &amp; Operations Built for Scale
        </h2>
        <p className="features-subtitle">
          Every module in the Regal Pork Farms LLP ecosystem works together to raise farmer profitability, biosecurity, and meat quality.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="feature-card"
              onClick={() => navigate(feature.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(feature.route);
                }
              }}
            >
              <div className="feature-card-top">
                <div className="feature-icon">
                  <Icon size={22} />
                </div>
                <span className="feature-tag">{feature.tag}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.desc}</p>
              <div className="feature-action">
                <span>Open Module</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
