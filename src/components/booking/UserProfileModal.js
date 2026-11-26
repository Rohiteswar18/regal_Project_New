import { X, Mail, MapPin, ShieldCheck, MessageSquare } from "lucide-react";
import "../../styles/components/UserProfileModal.css";

function UserProfileModal({ user, onClose }) {
  if (!user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Active Partner";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Active Partner";
    }
  };

  return (
    <div className="user-profile-overlay" onClick={onClose}>
      <div className="user-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Verified Partner Profile</h2>
            <p>Cluster &amp; Seller Information</p>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="profile-section">
          <div className="profile-header">
            <div className="avatar-large">
              {user.picture ? (
                <img src={user.picture} alt={user.username} />
              ) : (
                <div className="avatar-fallback-large">
                  {user.username?.charAt(0).toUpperCase() || "S"}
                </div>
              )}
            </div>
            <div className="profile-main">
              <h3>{user.username || "Partner Seller"}</h3>
              {user.email && (
                <div className="profile-email">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
              )}
              {user.location && (
                <div className="profile-location">
                  <MapPin size={14} />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="info-section">
          <h4>Verification &amp; Metadata</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Partner Name</span>
              <span className="info-value">{user.username || "Partner"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">{user.location || "India"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since</span>
              <span className="info-value">{formatDate(user.createdAt)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Verification</span>
              <span className="info-value status-verified">
                <ShieldCheck size={14} /> Verified
              </span>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <div className="contact-note">
            <MessageSquare size={16} />
            <p>
              Bookings placed through the Regal Pork Farms LLP marketplace include verified logistics coordination and escrow protection.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="rf-btn-primary w-100" onClick={onClose}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileModal;
