import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Cpu,
  Activity,
  TrendingUp,
  ShieldCheck,
  Dna,
  Thermometer,
  Droplets,
  Sparkles,
} from "lucide-react";
import "../styles/components/Hero.css";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="rf-hero">
      <div className="rf-hero-grid-bg" aria-hidden="true" />
      <div className="rf-hero-container">
        {/* Left Copy */}
        <div className="rf-hero-copy">
          <div className="rf-hero-badge">
            <Sparkles size={14} />
            <span>Organized • Tech-Enabled • Sustainable Supply Chain</span>
          </div>

          <h1 className="rf-hero-title">
            Regal Pork Farms{" "}
            <span className="rf-hero-gold">LLP</span>
          </h1>

          <p className="rf-hero-description">
            Building India&apos;s end-to-end modern piggery ecosystem—uniting scientific breeding, genetic improvement, turnkey infrastructure, feed &amp; veterinary care, franchise clusters, IoT &amp; ML intelligence, and hygienic pork processing.
          </p>

          <div className="rf-hero-actions">
            <button
              type="button"
              className="rf-hero-btn-primary"
              onClick={() => navigate("/booking")}
            >
              <span>Explore Marketplace</span>
              <ArrowRight size={17} />
            </button>
            <button
              type="button"
              className="rf-hero-btn-secondary"
              onClick={() => navigate("/selling")}
            >
              <span>Sell Stock &amp; Partner</span>
            </button>
            <button
              type="button"
              className="rf-hero-btn-ghost"
              onClick={() => navigate("/smart-farm")}
            >
              <Cpu size={16} />
              <span>IoT &amp; ML Lab</span>
            </button>
          </div>

          <div className="rf-hero-trust-row">
            <div className="rf-trust-chip">
              <Dna size={15} />
              <span>Genetic Improvement</span>
            </div>
            <div className="rf-trust-chip">
              <Activity size={15} />
              <span>ML Health &amp; Price Forecasting</span>
            </div>
            <div className="rf-trust-chip">
              <ShieldCheck size={15} />
              <span>Processed &amp; Packaged Cold Chain</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Smart Telemetry & Supply Chain Card */}
        <div className="rf-hero-panel">
          <div className="rf-telemetry-card">
            <div className="rf-telemetry-head">
              <div>
                <span className="rf-live-pill">
                  <span className="rf-live-dot" />
                  LIVE CLUSTER TELEMETRY
                </span>
                <h3>Cluster Hub #04 — Shed A2</h3>
              </div>
              <button
                type="button"
                className="rf-telemetry-link"
                onClick={() => navigate("/smart-farm")}
              >
                Full Dashboard →
              </button>
            </div>

            <div className="rf-sensor-grid">
              <div className="rf-sensor-box">
                <div className="rf-sensor-label">
                  <Thermometer size={14} />
                  <span>Ambient Temp</span>
                </div>
                <div className="rf-sensor-value">23.4°C</div>
                <span className="rf-sensor-status ok">Optimal Zone</span>
              </div>

              <div className="rf-sensor-box">
                <div className="rf-sensor-label">
                  <Droplets size={14} />
                  <span>Humidity</span>
                </div>
                <div className="rf-sensor-value">62%</div>
                <span className="rf-sensor-status ok">Balanced</span>
              </div>

              <div className="rf-sensor-box">
                <div className="rf-sensor-label">
                  <Activity size={14} />
                  <span>ML Herd Health</span>
                </div>
                <div className="rf-sensor-value">98.6%</div>
                <span className="rf-sensor-status ok">Zero Anomalies</span>
              </div>

              <div className="rf-sensor-box">
                <div className="rf-sensor-label">
                  <TrendingUp size={14} />
                  <span>ML Pork Index</span>
                </div>
                <div className="rf-sensor-value">₹248/kg</div>
                <span className="rf-sensor-status up">+4.2% 14d Forecast</span>
              </div>
            </div>

            <div className="rf-supply-strip">
              <div className="rf-supply-strip-head">
                <span>Supply Chain Pipeline</span>
                <strong>Batch #RPF-209 • 110 Growers</strong>
              </div>
              <div className="rf-supply-steps">
                <span className="done">Genetics</span>
                <span className="done">Feed &amp; Vet</span>
                <span className="active">IoT Grow-Out</span>
                <span>Processing</span>
                <span>Cold-Chain Sale</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
