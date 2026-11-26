import { Link } from "react-router-dom";
import {
  Sprout,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import "../styles/components/Footer.css";

export function Footer() {
  return (
    <footer className="rf-footer">
      <div className="rf-footer-container">
        <div className="rf-footer-brand-col">
          <div className="rf-footer-logo">
            <div className="rf-footer-logo-icon">
              <Sprout size={20} />
            </div>
            <div>
              <h3 className="rf-footer-logo-text">Regal Pork Farms LLP</h3>
              <span className="rf-footer-tagline">
                Organized • Tech-Enabled • Sustainable
              </span>
            </div>
          </div>
          <p className="rf-footer-description">
            Building India&apos;s organized livestock supply chain across scientific pig farming, genetic improvement, franchise clusters, IoT monitoring, ML analytics, and hygienic meat processing.
          </p>
          <div className="rf-footer-badges">
            <span className="rf-footer-pill">
              <Cpu size={13} /> IoT + ML Enabled
            </span>
            <span className="rf-footer-pill">
              <ShieldCheck size={13} /> Traceable Supply Chain
            </span>
          </div>
        </div>

        <div className="rf-footer-col">
          <h4 className="rf-footer-title">Platform</h4>
          <ul className="rf-footer-links">
            <li>
              <Link to="/booking" className="rf-footer-link">
                <span>Online Marketplace</span>
                <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/selling" className="rf-footer-link">
                <span>Seller &amp; Cluster Portal</span>
                <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/smart-farm" className="rf-footer-link">
                <span>IoT &amp; ML Intelligence</span>
                <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/breeds" className="rf-footer-link">
                <span>Genetics &amp; Breeds</span>
                <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/nutrients" className="rf-footer-link">
                <span>Feed &amp; Veterinary Care</span>
                <ArrowUpRight size={14} />
              </Link>
            </li>
          </ul>
        </div>

        <div className="rf-footer-col">
          <h4 className="rf-footer-title">LLP Operations</h4>
          <ul className="rf-footer-list">
            <li>Pig Farming &amp; Genetic Improvement</li>
            <li>Farm Infrastructure &amp; Feed Supply</li>
            <li>Veterinary &amp; Technical Advisory</li>
            <li>Franchise &amp; Cluster Farming Models</li>
            <li>Training &amp; Market Linkages</li>
            <li>Processing, Packaging &amp; Cold Chain</li>
          </ul>
        </div>

        <div className="rf-footer-col">
          <h4 className="rf-footer-title">Contact LLP Desk</h4>
          <ul className="rf-footer-contact">
            <li className="rf-footer-contact-item">
              <Phone size={16} className="rf-footer-contact-icon" />
              <span>+91 98765 43210</span>
            </li>
            <li className="rf-footer-contact-item">
              <Mail size={16} className="rf-footer-contact-icon" />
              <span>info@regalporkfarms.com</span>
            </li>
            <li className="rf-footer-contact-item">
              <MapPin size={16} className="rf-footer-contact-icon" />
              <span>Agri-Cluster Hubs across India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="rf-footer-bottom">
        <p className="rf-footer-copyright">
          © {new Date().getFullYear()} Regal Pork Farms LLP. All rights reserved.
        </p>
        <div className="rf-footer-bottom-links">
          <Link to="/smart-farm">IoT Telemetry</Link>
          <Link to="/breeds">Breeding Standards</Link>
          <Link to="/nutrients">Feed Formulations</Link>
        </div>
      </div>
    </footer>
  );
}
