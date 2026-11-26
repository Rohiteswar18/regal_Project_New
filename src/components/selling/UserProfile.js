import React from "react";
import { Phone, MapPin } from "lucide-react";
import "../../styles/components/UserProfile.css";

function UserProfile({ user, listings }) {
  if (!user) return null;

  const userStats = [
    {
      value: listings?.length || 0,
      label: "Active Listings",
    },
    {
      value: `₹${
        listings
          ?.reduce((sum, item) => sum + item.quantity * item.price, 0)
          .toLocaleString("en-IN") || "0"
      }`,
      label: "Portfolio Value",
    },
  ];

  return (
    <div className="user-profile-card">
      <div className="profile-header">
        <div className="avatar">
          {user.picture ? (
            <img src={user.picture} alt={user.username} />
          ) : (
            <div className="avatar-fallback">
              {user.username?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h3>{user.username}</h3>
          <p className="email">{user.email}</p>
          {user.phone && (
            <p className="phone">
              <Phone size={13} />
              <span>{user.phone}</span>
            </p>
          )}
        </div>
      </div>

      {user.location && (
        <div className="location">
          <MapPin size={14} />
          <span>{user.location}</span>
        </div>
      )}

      <div className="user-stats">
        {userStats.map((stat) => (
          <div key={stat.label} className="user-stat">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
