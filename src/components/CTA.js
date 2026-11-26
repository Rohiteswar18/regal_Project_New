import { useNavigate } from "react-router-dom";
import { ArrowRight, Store, ShoppingBag } from "lucide-react";
import "../styles/components/CTA.css";

export function CTA() {
  const navigate = useNavigate();

  return (
    <section className="cta">
      <div className="cta-content">
        <span className="cta-eyebrow">Join the Organized Pork &amp; Livestock Network</span>
        <h2 className="cta-title">
          Scale Your Farm Cluster or Source Traceable Pork Supply
        </h2>
        <p className="cta-description">
          Whether you are setting up a franchise piggery cluster, looking for veterinary &amp; feed support, or procuring certified livestock and packaged pork—start directly on our platform.
        </p>
        <div className="cta-buttons">
          <button
            type="button"
            className="cta-btn-primary"
            onClick={() => navigate("/selling")}
          >
            <Store size={17} />
            <span>Launch Seller &amp; Cluster Portal</span>
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className="cta-btn-secondary"
            onClick={() => navigate("/booking")}
          >
            <ShoppingBag size={17} />
            <span>Browse Live Marketplace</span>
          </button>
        </div>
      </div>
    </section>
  );
}
