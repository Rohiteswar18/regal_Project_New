import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingBag,
  Store,
  Cpu,
  Dna,
  Wheat,
  Home,
  LogOut,
  ArrowRight,
  Sprout,
} from "lucide-react";
import "../styles/components/Navbar.css";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const syncUserFromToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({
        name: payload.username || "Partner",
        email: payload.email,
        initial: (payload.username || "P").charAt(0).toUpperCase(),
      });
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  useEffect(() => {
    syncUserFromToken();
    const handleAuthChange = () => syncUserFromToken();
    window.addEventListener("rf-auth-changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("rf-auth-changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [syncUserFromToken]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("rf-auth-changed"));
    setUser(null);
    navigate("/");
    closeMobileMenu();
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/booking", label: "Marketplace", icon: ShoppingBag },
    { path: "/selling", label: "Sell & Cluster", icon: Store },
    { path: "/smart-farm", label: "IoT & ML", icon: Cpu },
    { path: "/breeds", label: "Breeds", icon: Dna },
    { path: "/nutrients", label: "Feed & Care", icon: Wheat },
  ];

  return (
    <>
      <nav className={`rf-navbar ${scrolled ? "rf-navbar-scrolled" : ""}`}>
        <div className="rf-navbar-inner">
          {/* Brand */}
          <button
            type="button"
            className="rf-brand"
            onClick={() => handleNavigation("/")}
          >
            <div className="rf-brand-mark">
              <Sprout size={20} strokeWidth={2.4} />
            </div>
            <div className="rf-brand-copy">
              <span className="rf-brand-name">Regal Pork Farms</span>
              <span className="rf-brand-sub">LLP • Smart Livestock Supply Chain</span>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="rf-nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  className={`rf-nav-link ${isActive ? "active" : ""}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Auth / CTA */}
          <div className="rf-nav-actions">
            {user ? (
              <div className="rf-user-pill">
                <div className="rf-user-avatar">{user.initial}</div>
                <span className="rf-user-name">{user.name}</span>
                <button
                  type="button"
                  className="rf-logout-btn"
                  onClick={handleLogout}
                  title="Sign out"
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="rf-get-started-btn"
                onClick={() => setShowAuth(true)}
              >
                <span>Partner Sign In</span>
                <ArrowRight size={15} />
              </button>
            )}

            <button
              type="button"
              className="rf-mobile-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMenuOpen && (
          <div className="rf-mobile-backdrop" onClick={closeMobileMenu}>
            <div
              className="rf-mobile-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rf-mobile-drawer-head">
                <div className="rf-brand">
                  <div className="rf-brand-mark">
                    <Sprout size={18} />
                  </div>
                  <span className="rf-brand-name">Regal Pork Farms LLP</span>
                </div>
                <button
                  type="button"
                  className="rf-mobile-close"
                  onClick={closeMobileMenu}
                  aria-label="Close navigation menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="rf-mobile-nav-list">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      type="button"
                      className={`rf-mobile-nav-link ${isActive ? "active" : ""}`}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="rf-mobile-footer">
                {user ? (
                  <div className="rf-mobile-user">
                    <div className="rf-user-avatar">{user.initial}</div>
                    <div className="rf-mobile-user-info">
                      <strong>{user.name}</strong>
                      <span>{user.email || "Verified Partner"}</span>
                    </div>
                    <button
                      type="button"
                      className="rf-logout-btn"
                      onClick={handleLogout}
                    >
                      <LogOut size={15} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="rf-get-started-btn w-100 justify-content-center"
                    onClick={() => {
                      setShowAuth(true);
                      closeMobileMenu();
                    }}
                  >
                    <span>Partner Sign In</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => {
            syncUserFromToken();
            setShowAuth(false);
          }}
        />
      )}
    </>
  );
}
