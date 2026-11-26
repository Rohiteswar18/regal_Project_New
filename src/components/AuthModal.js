import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { X, ShieldCheck, Sprout } from "lucide-react";
import "../styles/components/AuthModal.css";
import API_BASE_URL from "../config/api";

export function AuthModal({ onClose, onSuccess }) {
  const [step, setStep] = useState("login"); // login | profile
  const [tempToken, setTempToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    email: "",
    username: "",
    phone: "",
    location: "",
  });

  const completeAuth = () => {
    window.dispatchEvent(new Event("rf-auth-changed"));
    if (onSuccess) {
      onSuccess();
    } else if (onClose) {
      onClose();
    }
  };

  const handleGoogleSuccess = async (res) => {
    try {
      setLoading(true);
      setError("");

      const googleToken = res.credential;

      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });

      const data = await response.json();

      if (!data.needsProfile) {
        localStorage.setItem("token", data.token);
        completeAuth();
        return;
      }

      setTempToken(data.tempToken);
      setProfile((prev) => ({
        ...prev,
        email: data.googleProfile.email,
        username: data.googleProfile.username || "",
      }));
      setStep("profile");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/auth/complete-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tempToken}`,
          },
          body: JSON.stringify({
            username: profile.username,
            phone: profile.phone,
            location: profile.location,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Profile submission failed");
      }

      localStorage.setItem("token", data.token);
      completeAuth();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="auth-brand-head">
          <div className="auth-brand-icon">
            <Sprout size={22} />
          </div>
          <span>Regal Pork Farms LLP</span>
        </div>

        {step === "login" && (
          <>
            <h2>Partner &amp; Buyer Access</h2>
            <p className="auth-subtitle">
              Sign in with Google to access marketplace bookings, cluster listings, and farm analytics.
            </p>

            <div className="google-login-container">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login failed")}
              />
            </div>

            <div className="auth-trust-note">
              <ShieldCheck size={16} />
              <span>Secured partner verification for verified livestock trade</span>
            </div>

            {loading && <p className="loading-text">Signing you in...</p>}
            {error && <p className="error-text">{error}</p>}
          </>
        )}

        {step === "profile" && (
          <>
            <h2>Complete Partner Profile</h2>
            <p className="auth-subtitle">
              Finish setting up your farm or buyer profile to trade on the platform.
            </p>
            {profile.email && (
              <div className="profile-email">{profile.email}</div>
            )}

            <form onSubmit={handleProfileSubmit}>
              <input
                type="text"
                placeholder="Full Name or Farm Name"
                value={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
                required
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="District / State (e.g., Ludhiana, Punjab)"
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Saving Profile..." : "Complete Setup & Continue"}
              </button>
            </form>

            {error && <p className="error-text">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
