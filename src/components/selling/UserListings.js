import React from "react";
import { RefreshCw, Plus, Inbox, Sparkles, Users, Package } from "lucide-react";
import "../../styles/components/UserListings.css";

function UserListings({ listings, onAddNew, onRefresh }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTypeInfo = (type) => {
    switch (type) {
      case "piglet":
      case "pigling":
        return { label: "Piglet", Icon: Sparkles };
      case "breeding_unit":
      case "batch":
        return { label: "Breeding Unit", Icon: Users };
      case "cutting_piece":
        return { label: "Meat Cut", Icon: Package };
      default:
        return { label: type || "Listing", Icon: Package };
    }
  };

  if (!listings || listings.length === 0) {
    return (
      <div className="listings-card empty">
        <h3>Your Listings</h3>
        <div className="empty-state">
          <div className="empty-icon">
            <Inbox size={32} />
          </div>
          <h4>No Active Listings</h4>
          <p>Publish your first livestock batch or processed cut to start receiving bookings.</p>
          <button type="button" className="rf-btn-primary" onClick={onAddNew}>
            <Plus size={16} />
            <span>Create First Listing</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="listings-card">
      <div className="listings-header">
        <h3>Your Listings ({listings.length})</h3>
        <div className="header-actions">
          <button type="button" className="refresh-btn" onClick={onRefresh}>
            <RefreshCw size={14} />
            <span>Refresh</span>
          </button>
          <button type="button" className="add-btn" onClick={onAddNew}>
            <Plus size={14} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="listings-table">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Breed Line</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => {
              const { label, Icon } = getTypeInfo(listing.pigType);
              return (
                <tr key={listing._id}>
                  <td>
                    <div className="type-cell">
                      <Icon size={15} />
                      <span>{label}</span>
                    </div>
                  </td>
                  <td>{listing.breedType}</td>
                  <td>{listing.quantity}</td>
                  <td>{formatPrice(listing.price)}</td>
                  <td>
                    <span className={`status-badge ${listing.status}`}>
                      {listing.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserListings;
