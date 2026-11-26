import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dna,
  Warehouse,
  Stethoscope,
  Network,
  Cpu,
  PackageCheck,
  ArrowRight,
  Check,
} from "lucide-react";
import "../styles/components/Ecosystem.css";

const PILLARS = [
  {
    id: "genetics",
    tab: "Breeding & Genetics",
    badge: "Pillar 01",
    icon: Dna,
    title: "Scientific Pig Farming & Genetic Improvement",
    summary:
      "Structured breeding programs leveraging Large White Yorkshire, Landrace, Duroc, and high-efficiency crossbred lines to maximize litter size, feed conversion, and lean meat yield.",
    deliverables: [
      "Pedigree-tracked breeding stock & artificial insemination support",
      "FCR optimization targeting 2.5:1 across grower-finisher phases",
      "Disease-resilient bloodlines selected for Indian agro-climates",
    ],
    metricLabel: "Target Avg. Litter Size",
    metricValue: "11.4 Piglets",
    ctaLabel: "Explore Breeds & Growth Data",
    ctaRoute: "/breeds",
  },
  {
    id: "infrastructure",
    tab: "Infra & Feed Supply",
    badge: "Pillar 02",
    icon: Warehouse,
    title: "Farm Infrastructure & Balanced Animal Feed",
    summary:
      "Turnkey biosecure piggery shed engineering alongside stage-specific, nutrient-calibrated starter, grower, finisher, and sow feed supply.",
    deliverables: [
      "Modular climate-ventilated shed blueprints & automated drinker lines",
      "Phase-formulated maize-soy-amino acid feeds with mycotoxin control",
      "Farm input procurement integrated directly into the online platform",
    ],
    metricLabel: "Feed Cost Optimization",
    metricValue: "14% Savings",
    ctaLabel: "View Feed & Nutrition System",
    ctaRoute: "/nutrients",
  },
  {
    id: "veterinary",
    tab: "Veterinary & Support",
    badge: "Pillar 03",
    icon: Stethoscope,
    title: "Veterinary Care & Technical Field Advisory",
    summary:
      "Proactive herd health governance with scheduled vaccination calendars, biosecurity audits, and rapid veterinary intervention across every partner farm.",
    deliverables: [
      "Preventive immunization & deworming schedules per growth stage",
      "On-call veterinary diagnostics for nutritional & infectious risks",
      "Water quality & sanitation compliance monitoring",
    ],
    metricLabel: "Herd Survival Rate",
    metricValue: "96.8%",
    ctaLabel: "Review Health & Care Protocols",
    ctaRoute: "/nutrients",
  },
  {
    id: "franchise",
    tab: "Franchise & Clusters",
    badge: "Pillar 04",
    icon: Network,
    title: "Franchise Clusters, Training & Market Linkages",
    summary:
      "Empowering rural farmers, FPOs, and women-led SHGs via hub-and-spoke cluster farming, hands-on capacity building, and guaranteed buyback linkages.",
    deliverables: [
      "Standardized franchise & cluster-based piggery operating playbooks",
      "Practical capacity-building workshops on scientific husbandry",
      "Direct digital & contract market linkages eliminating middlemen",
    ],
    metricLabel: "Cluster Network Goal",
    metricValue: "500+ Farmers",
    ctaLabel: "Open Partner & Seller Portal",
    ctaRoute: "/selling",
  },
  {
    id: "iot-ml",
    tab: "IoT & ML Analytics",
    badge: "Pillar 05",
    icon: Cpu,
    title: "IoT Monitoring & Machine Learning Forecasting",
    summary:
      "Continuous environmental and behavioral sensing combined with ML models for early sickness detection, weight-gain forecasting, and dynamic market price prediction.",
    deliverables: [
      "Real-time shed temperature, humidity, NH₃ & water-flow telemetry",
      "ML health tracking for thermal stress & feed-intake anomalies",
      "Productivity & regional market price prediction engines",
    ],
    metricLabel: "Anomaly Lead Time",
    metricValue: "48 Hours Early",
    ctaLabel: "Launch IoT & ML Intelligence",
    ctaRoute: "/smart-farm",
  },
  {
    id: "processing",
    tab: "Processing & Retail",
    badge: "Pillar 06",
    icon: PackageCheck,
    title: "Slaughtering, Processing, Packaging & Distribution",
    summary:
      "Hygienic abattoir operations, primal cutting, vacuum/MAP cold-chain packaging, and B2B/B2C marketing to complete an organized, sustainable supply chain.",
    deliverables: [
      "Hygienic processing & blast-chilled primal cut standardization",
      "Tamper-evident vacuum & modified-atmosphere retail packaging",
      "Cold-chain logistics linking clusters to institutional & retail buyers",
    ],
    metricLabel: "Cold-Chain Integrity",
    metricValue: "0°C – 4°C",
    ctaLabel: "Browse Marketplace Stock",
    ctaRoute: "/booking",
  },
];

export function Ecosystem() {
  const [activeId, setActiveId] = useState(PILLARS[0].id);
  const navigate = useNavigate();

  const current = PILLARS.find((p) => p.id === activeId) || PILLARS[0];
  const CurrentIcon = current.icon;

  return (
    <section className="rf-ecosystem">
      <div className="rf-container">
        <div className="rf-ecosystem-head">
          <span className="rf-eyebrow rf-eyebrow-gold">
            Integrated LLP Value Chain
          </span>
          <h2>Six Pillars Powering a Modern Livestock Economy</h2>
          <p>
            Explore how Regal Pork Farms LLP connects genetics, infrastructure, farmer clusters, IoT/ML intelligence, and hygienic meat processing into one unified platform.
          </p>
        </div>

        {/* Selector Tabs */}
        <div className="rf-eco-tabs" role="tablist" aria-label="LLP Value Chain Pillars">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = pillar.id === activeId;
            return (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`rf-eco-tab ${isActive ? "active" : ""}`}
                onClick={() => setActiveId(pillar.id)}
              >
                <Icon size={17} />
                <span>{pillar.tab}</span>
              </button>
            );
          })}
        </div>

        {/* Detail Showcase */}
        <div className="rf-eco-panel">
          <div className="rf-eco-panel-main">
            <div className="rf-eco-panel-meta">
              <span className="rf-eco-badge">{current.badge}</span>
              <div className="rf-eco-metric-pill">
                <span>{current.metricLabel}:</span>
                <strong>{current.metricValue}</strong>
              </div>
            </div>

            <div className="rf-eco-title-row">
              <div className="rf-eco-icon-box">
                <CurrentIcon size={26} />
              </div>
              <h3>{current.title}</h3>
            </div>

            <p className="rf-eco-summary">{current.summary}</p>

            <ul className="rf-eco-deliverables">
              {current.deliverables.map((item) => (
                <li key={item}>
                  <span className="rf-eco-check">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="rf-btn-primary"
              onClick={() => navigate(current.ctaRoute)}
            >
              <span>{current.ctaLabel}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="rf-eco-chain-visual">
            <div className="rf-eco-chain-title">Supply Chain Flow</div>
            <div className="rf-eco-chain-steps">
              {PILLARS.map((step, idx) => {
                const StepIcon = step.icon;
                const isSelected = step.id === activeId;
                return (
                  <button
                    key={step.id}
                    type="button"
                    className={`rf-eco-chain-node ${isSelected ? "selected" : ""}`}
                    onClick={() => setActiveId(step.id)}
                  >
                    <div className="rf-eco-node-num">0{idx + 1}</div>
                    <div className="rf-eco-node-icon">
                      <StepIcon size={16} />
                    </div>
                    <div className="rf-eco-node-text">
                      <strong>{step.tab}</strong>
                      <span>{step.metricValue}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
