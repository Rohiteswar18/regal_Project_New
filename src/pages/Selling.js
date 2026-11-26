import { useEffect, useState } from "react";
import { Store, Lock, Warehouse, Stethoscope, GraduationCap, Network } from "lucide-react";
import CompanyStats from "../components/selling/CompanyStats";
import UserProfile from "../components/selling/UserProfile";
import SellingOptions from "../components/selling/SellingOptions";
import UserListings from "../components/selling/UserListings";
import PriceGuide from "../components/selling/PriceGuide";
import FAQ from "../components/selling/FAQ";
import AddSellingModal from "../components/selling/AddSellingModal";
import { AuthModal } from "../components/AuthModal";
import "../styles/pages/Selling.css";
import API_BASE_URL from "../config/api";

export default function Selling() {
  const [loading, setLoading] = useState(true);
  const [companyStats, setCompanyStats] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState("piglet");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);
      fetchData();
    };

    syncAuth();
    window.addEventListener("rf-auth-changed", syncAuth);
    return () => window.removeEventListener("rf-auth-changed", syncAuth);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const [statsRes, userRes, listingsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/selling/stats`),
        fetch(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/selling/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const statsData = await statsRes.json();
      const userJson = await userRes.json();
      const listingsData = await listingsRes.json();

      setCompanyStats(statsData);
      setUserData(userJson);
      setUserListings(Array.isArray(listingsData) ? listingsData : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSellClick = (type = "piglet") => {
    setSelectedType(type);
    setShowAddModal(true);
  };

  const handleAddSuccess = () => {
    fetchData();
    setShowAddModal(false);
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setIsAuthenticated(true);
    fetchData();
  };

  if (!isAuthenticated) {
    const clusterBenefits = [
      {
        icon: Warehouse,
        title: "Farm Infrastructure & Inputs",
        desc: "Access standardized biosecure shed designs, breeding stock, and balanced feed supply.",
      },
      {
        icon: Stethoscope,
        title: "Veterinary & Technical Support",
        desc: "Routine health audits, vaccination schedules, and ML-assisted anomaly monitoring.",
      },
      {
        icon: GraduationCap,
        title: "Capacity Building & Training",
        desc: "Hands-on workshops for rural farmers and women SHG entrepreneurs.",
      },
      {
        icon: Network,
        title: "Guaranteed Market Linkages",
        desc: "List piglings, breeding units, and processed pork cuts directly to verified buyers.",
      },
    ];

    return (
      <div className="selling-page">
        <div className="rf-page-banner">
          <div className="rf-page-banner-inner">
            <span className="rf-eyebrow rf-eyebrow-gold">
              <Store size={14} />
              Franchise &amp; Cluster Partner Portal
            </span>
            <h1>Seller &amp; Cluster Management</h1>
            <p>
              List your livestock, breeding batches, and processed meat cuts while accessing Regal Pork Farms LLP&apos;s organized supply chain.
            </p>
          </div>
        </div>

        <div className="selling-gate-container">
          <div className="selling-login-card">
            <div className="login-req-icon">
              <Lock size={28} />
            </div>
            <h2>Partner Sign-In Required</h2>
            <p>
              Sign in with your verified Google partner account to create listings, track cluster stats, and manage inventory.
            </p>
            <button
              type="button"
              className="rf-btn-primary"
              onClick={() => setShowAuth(true)}
            >
              Sign In to Partner Portal
            </button>
          </div>

          <div className="selling-benefits-grid">
            {clusterBenefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="selling-benefit-card">
                  <div className="benefit-icon">
                    <Icon size={20} />
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {showAuth && (
          <AuthModal
            onClose={() => setShowAuth(false)}
            onSuccess={handleAuthSuccess}
          />
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="selling-page">
        <div className="rf-page-banner">
          <div className="rf-page-banner-inner">
            <h1>Seller &amp; Cluster Dashboard</h1>
            <p>Loading your cluster listings and live supply chain metrics...</p>
          </div>
        </div>
        <div className="selling-content" style={{ marginTop: "2rem" }}>
          <div className="loading-container" style={{ gridColumn: "1 / -1" }}>
            <div className="loading-spinner"></div>
            <p>Loading your selling dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="selling-page">
      <div className="rf-page-banner">
        <div className="rf-page-banner-inner">
          <span className="rf-eyebrow rf-eyebrow-gold">
            <Store size={14} />
            Franchise &amp; Cluster Partner Portal
          </span>
          <h1>Seller &amp; Cluster Dashboard</h1>
          <p>
            Manage livestock listings, monitor LLP network demand, and connect directly with buyers and processing hubs.
          </p>
        </div>
      </div>

      <div className="selling-content">
        <div className="selling-left">
          <UserProfile user={userData} listings={userListings} />
          <SellingOptions onSellClick={handleSellClick} />
        </div>

        <div className="selling-right">
          <CompanyStats stats={companyStats} />
          <UserListings
            listings={userListings}
            onAddNew={() => handleSellClick("piglet")}
            onRefresh={fetchData}
          />
          <PriceGuide />
          <FAQ />
        </div>
      </div>

      {showAddModal && (
        <AddSellingModal
          type={selectedType}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}
    </div>
  );
}
