import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Cpu,
  Thermometer,
  Droplets,
  Wind,
  Activity,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  PackageCheck,
  GraduationCap,
  Warehouse,
  ArrowRight,
  Waves,
} from "lucide-react";
import "../styles/pages/SmartFarm.css";

const CLUSTERS = {
  punjab: {
    id: "punjab",
    name: "Cluster #04 — Ludhiana Hub",
    model: "Franchise Nucleus + 18 Satellite Sheds",
    animals: 1420,
    temp: 23.4,
    humidity: 62,
    nh3: 8.2,
    waterFlow: "11.4 L/pig/day",
    feedDispensed: "2,840 kg/day",
    biosecurity: "Verified • Positive Pressure",
    healthScore: 98.6,
    fcr: "2.48 : 1",
    avgDailyGain: "845 g/day",
    daysToMarket: 164,
    projectedWeight: "116 kg",
    porkPriceNow: 242,
    porkPriceForecast: 256,
    piglingPriceForecast: 5650,
    alerts: [
      {
        level: "ok",
        title: "Shed A2 Thermal Comfort Nominal",
        detail: "Evaporative cooling pad modulation keeping THI within optimal grower band.",
      },
      {
        level: "warn",
        title: "Pen B4 Mild Feed-Intake Dip (-6.2%)",
        detail: "ML early-warning flagged 14 growers for preventive veterinary hydration & electrolyte check.",
      },
    ],
    tempSeries: [22.1, 22.5, 23.0, 23.8, 24.2, 23.9, 23.4, 23.1],
    priceSeries: [228, 232, 235, 239, 242, 247, 252, 256],
  },
  assam: {
    id: "assam",
    name: "Cluster #07 — Kamrup Women SHG",
    model: "Cluster Cooperative • 24 Micro-Farms",
    animals: 980,
    temp: 25.1,
    humidity: 71,
    nh3: 9.4,
    waterFlow: "12.1 L/pig/day",
    feedDispensed: "1,960 kg/day",
    biosecurity: "Verified • Footbath & Quarantine",
    healthScore: 97.4,
    fcr: "2.56 : 1",
    avgDailyGain: "810 g/day",
    daysToMarket: 170,
    projectedWeight: "112 kg",
    porkPriceNow: 268,
    porkPriceForecast: 282,
    piglingPriceForecast: 6100,
    alerts: [
      {
        level: "ok",
        title: "Humid-Zone Ventilation Boost Active",
        detail: "Automated exhaust fans maintaining NH₃ below 10 ppm threshold.",
      },
      {
        level: "ok",
        title: "FMD & Swine Fever Vaccination 100% Complete",
        detail: "Veterinary field team synced digital batch immunity records.",
      },
    ],
    tempSeries: [24.0, 24.4, 25.2, 25.9, 26.1, 25.6, 25.1, 24.8],
    priceSeries: [252, 255, 259, 264, 268, 273, 278, 282],
  },
  maharashtra: {
    id: "maharashtra",
    name: "Cluster #11 — Pune Cold-Chain Hub",
    model: "Integrated Nucleus + Processing Unit",
    animals: 1850,
    temp: 22.8,
    humidity: 58,
    nh3: 7.5,
    waterFlow: "11.8 L/pig/day",
    feedDispensed: "3,720 kg/day",
    biosecurity: "ISO-Aligned Biosecure Zone",
    healthScore: 99.1,
    fcr: "2.42 : 1",
    avgDailyGain: "875 g/day",
    daysToMarket: 159,
    projectedWeight: "118 kg",
    porkPriceNow: 254,
    porkPriceForecast: 269,
    piglingPriceForecast: 5900,
    alerts: [
      {
        level: "ok",
        title: "Batch #MH-114 Ready for Hygienic Processing",
        detail: "ML slaughter-weight window reached (118 kg avg, 58.6% lean yield).",
      },
      {
        level: "ok",
        title: "Cold-Chain Dispatch Chiller at 2.1°C",
        detail: "MAP-packaged primal cuts scheduled for urban retail distribution.",
      },
    ],
    tempSeries: [21.8, 22.0, 22.5, 23.1, 23.4, 23.0, 22.8, 22.4],
    priceSeries: [240, 243, 247, 250, 254, 259, 264, 269],
  },
};

function MiniLineChart({ values, color, unit, labels }) {
  const min = Math.min(...values) - 1;
  const max = Math.max(...values) + 1;
  const width = 460;
  const height = 160;
  const padX = 28;
  const padY = 20;

  const coords = values.map((v, i) => {
    const x = padX + (i / (values.length - 1)) * (width - padX * 2);
    const y =
      height - padY - ((v - min) / (max - min || 1)) * (height - padY * 2);
    return { x, y, v };
  });

  const pathD = coords
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaD = `${pathD} L ${coords[coords.length - 1].x.toFixed(1)} ${
    height - padY
  } L ${coords[0].x.toFixed(1)} ${height - padY} Z`;

  return (
    <div className="rf-svg-chart-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} className="rf-svg-chart">
        <defs>
          <linearGradient id={`grad-${unit}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${unit})`} />
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r="4.5" fill="#FFFFFF" stroke={color} strokeWidth="2.5" />
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#0B1F3A"
            >
              {p.v}
            </text>
            <text
              x={p.x}
              y={height - 4}
              textAnchor="middle"
              fontSize="9.5"
              fill="#64748B"
            >
              {labels[idx]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function SmartFarm() {
  const [selectedClusterId, setSelectedClusterId] = useState("punjab");
  const [activeTab, setActiveTab] = useState("iot");
  const navigate = useNavigate();

  const cluster = CLUSTERS[selectedClusterId];

  return (
    <div className="rf-smart-page">
      {/* Banner */}
      <div className="rf-page-banner">
        <div className="rf-page-banner-inner">
          <span className="rf-eyebrow rf-eyebrow-gold">
            <Cpu size={14} />
            IoT Telemetry &amp; Machine Learning Engine
          </span>
          <h1>Smart Farm &amp; Supply Chain Intelligence</h1>
          <p>
            Continuous IoT shed monitoring paired with ML health diagnostics, productivity forecasting, market price prediction, and cold-chain processing traceability.
          </p>

          <div className="rf-cluster-switcher">
            {Object.values(CLUSTERS).map((c) => (
              <button
                key={c.id}
                type="button"
                className={`rf-cluster-pill ${selectedClusterId === c.id ? "active" : ""}`}
                onClick={() => setSelectedClusterId(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rf-smart-container">
        {/* Cluster Summary Strip */}
        <div className="rf-cluster-overview-bar">
          <div>
            <span className="rf-cluster-model-tag">{cluster.model}</span>
            <h2>{cluster.name}</h2>
          </div>
          <div className="rf-cluster-kpis">
            <div className="rf-ckpi">
              <span>Active Herd</span>
              <strong>{cluster.animals.toLocaleString()} pigs</strong>
            </div>
            <div className="rf-ckpi">
              <span>ML Health Score</span>
              <strong className="emerald">{cluster.healthScore}%</strong>
            </div>
            <div className="rf-ckpi">
              <span>Target FCR</span>
              <strong>{cluster.fcr}</strong>
            </div>
            <div className="rf-ckpi">
              <span>Biosecurity</span>
              <strong>{cluster.biosecurity}</strong>
            </div>
          </div>
        </div>

        {/* Sub-navigation tabs */}
        <div className="rf-smart-tabs">
          <button
            type="button"
            className={`rf-smart-tab ${activeTab === "iot" ? "active" : ""}`}
            onClick={() => setActiveTab("iot")}
          >
            <Cpu size={16} />
            <span>IoT Shed Monitoring</span>
          </button>
          <button
            type="button"
            className={`rf-smart-tab ${activeTab === "ml" ? "active" : ""}`}
            onClick={() => setActiveTab("ml")}
          >
            <Activity size={16} />
            <span>ML Health &amp; Productivity</span>
          </button>
          <button
            type="button"
            className={`rf-smart-tab ${activeTab === "market" ? "active" : ""}`}
            onClick={() => setActiveTab("market")}
          >
            <TrendingUp size={16} />
            <span>Price Forecast &amp; Supply Chain</span>
          </button>
        </div>

        {/* Tab 1: IoT Monitoring */}
        {activeTab === "iot" && (
          <div className="rf-smart-grid">
            <div className="rf-iot-cards">
              <div className="rf-iot-card">
                <div className="rf-iot-card-head">
                  <Thermometer size={19} />
                  <span>Ambient Shed Temperature</span>
                </div>
                <div className="rf-iot-val">{cluster.temp}°C</div>
                <span className="rf-iot-note ok">Automated fan &amp; cooling pad active</span>
              </div>

              <div className="rf-iot-card">
                <div className="rf-iot-card-head">
                  <Droplets size={19} />
                  <span>Relative Humidity</span>
                </div>
                <div className="rf-iot-val">{cluster.humidity}%</div>
                <span className="rf-iot-note ok">Within 55–75% comfort zone</span>
              </div>

              <div className="rf-iot-card">
                <div className="rf-iot-card-head">
                  <Wind size={19} />
                  <span>Ammonia (NH₃) Concentration</span>
                </div>
                <div className="rf-iot-val">{cluster.nh3} ppm</div>
                <span className="rf-iot-note ok">Well below 15 ppm safety cap</span>
              </div>

              <div className="rf-iot-card">
                <div className="rf-iot-card-head">
                  <Waves size={19} />
                  <span>Water &amp; Feed Dispensing</span>
                </div>
                <div className="rf-iot-val">{cluster.waterFlow}</div>
                <span className="rf-iot-note info">Feed load: {cluster.feedDispensed}</span>
              </div>
            </div>

            <div className="rf-chart-panel">
              <div className="rf-panel-head">
                <div>
                  <h3>24-Hour Shed Microclimate Curve (°C)</h3>
                  <p>Real-time IoT sensor telemetry across automated ventilation zones</p>
                </div>
                <span className="rf-panel-badge">Sensor Sync: 30s interval</span>
              </div>
              <MiniLineChart
                values={cluster.tempSeries}
                color="#2563EB"
                unit="temp"
                labels={["00h", "03h", "06h", "09h", "12h", "15h", "18h", "21h"]}
              />
            </div>
          </div>
        )}

        {/* Tab 2: ML Health & Productivity */}
        {activeTab === "ml" && (
          <div className="rf-smart-grid">
            <div className="rf-ml-metrics-card">
              <h3>ML Productivity &amp; Growth Forecast</h3>
              <p>
                Machine learning models combine feed intake, water ratio, and thermal telemetry to predict batch performance.
              </p>

              <div className="rf-ml-stat-list">
                <div className="rf-ml-stat-row">
                  <span>Predicted Avg. Daily Gain</span>
                  <strong>{cluster.avgDailyGain}</strong>
                </div>
                <div className="rf-ml-stat-row">
                  <span>Projected Feed Conversion Ratio</span>
                  <strong>{cluster.fcr}</strong>
                </div>
                <div className="rf-ml-stat-row">
                  <span>Estimated Days to Market</span>
                  <strong>{cluster.daysToMarket} days</strong>
                </div>
                <div className="rf-ml-stat-row">
                  <span>Projected Slaughter Weight</span>
                  <strong>{cluster.projectedWeight}</strong>
                </div>
              </div>
            </div>

            <div className="rf-ml-alerts-card">
              <h3>ML Health Tracking &amp; Veterinary Triggers</h3>
              <p>
                Behavioral &amp; acoustic anomaly detection alerts field veterinarians before clinical symptoms escalate.
              </p>

              <div className="rf-alert-list">
                {cluster.alerts.map((alert) => (
                  <div key={alert.title} className={`rf-alert-box ${alert.level}`}>
                    <div className="rf-alert-icon">
                      {alert.level === "warn" ? (
                        <AlertTriangle size={18} />
                      ) : (
                        <CheckCircle2 size={18} />
                      )}
                    </div>
                    <div>
                      <h4>{alert.title}</h4>
                      <p>{alert.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Price Prediction & Supply Chain */}
        {activeTab === "market" && (
          <div className="rf-smart-grid">
            <div className="rf-chart-panel">
              <div className="rf-panel-head">
                <div>
                  <h3>ML Regional Pork Price Forecast (₹ / kg)</h3>
                  <p>4-week historical &amp; 4-week predicted carcass price trajectory</p>
                </div>
                <span className="rf-panel-badge gold">
                  Forecast: ₹{cluster.porkPriceForecast}/kg
                </span>
              </div>
              <MiniLineChart
                values={cluster.priceSeries}
                color="#D4AF37"
                unit="price"
                labels={["W-4", "W-3", "W-2", "W-1", "Now", "W+1", "W+2", "W+3"]}
              />
              <div className="rf-price-highlights">
                <div>
                  <span>Spot Pork Price</span>
                  <strong>₹{cluster.porkPriceNow}/kg</strong>
                </div>
                <div>
                  <span>30-Day ML Forecast</span>
                  <strong>₹{cluster.porkPriceForecast}/kg</strong>
                </div>
                <div>
                  <span>Projected Pigling Value</span>
                  <strong>₹{cluster.piglingPriceForecast.toLocaleString()}/pc</strong>
                </div>
              </div>
            </div>

            <div className="rf-ml-metrics-card">
              <h3>Franchise, Training &amp; Processing Pipeline</h3>
              <p>
                Integrated operational support turning cluster output into packaged, market-ready pork products.
              </p>
              <div className="rf-pipeline-list">
                <div className="rf-pipeline-item">
                  <Warehouse size={18} />
                  <div>
                    <strong>Turnkey Infrastructure &amp; Inputs</strong>
                    <span>Standardized sheds, feed supply &amp; genetic stock</span>
                  </div>
                </div>
                <div className="rf-pipeline-item">
                  <GraduationCap size={18} />
                  <div>
                    <strong>Capacity Building &amp; Training</strong>
                    <span>Farmer &amp; women SHG certification programs</span>
                  </div>
                </div>
                <div className="rf-pipeline-item">
                  <PackageCheck size={18} />
                  <div>
                    <strong>Slaughtering, Packaging &amp; Cold Chain</strong>
                    <span>Hygienic abattoir processing &amp; retail distribution</span>
                  </div>
                </div>
                <div className="rf-pipeline-item">
                  <ShieldCheck size={18} />
                  <div>
                    <strong>Direct Market Linkages</strong>
                    <span>Assured buyback &amp; online marketplace settlement</span>
                  </div>
                </div>
              </div>

              <div className="rf-smart-cta-row">
                <button
                  type="button"
                  className="rf-btn-primary"
                  onClick={() => navigate("/booking")}
                >
                  <span>Open Marketplace</span>
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  className="rf-btn-gold"
                  onClick={() => navigate("/selling")}
                >
                  <span>Partner / Sell Stock</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
