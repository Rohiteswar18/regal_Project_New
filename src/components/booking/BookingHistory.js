import { RefreshCw, ClipboardList, Sparkles, Users, Package } from "lucide-react";
import "../../styles/components/BookingHistory.css";

function BookingHistory({ history, onRefresh, onViewSeller, onBrowse }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeInfo = (type) => {
    if (type === "piglet" || type === "pigling") {
      return { label: "Piglet", Icon: Sparkles };
    }
    if (type === "breeding_unit" || type === "batch") {
      return { label: "Breeding Unit", Icon: Users };
    }
    return { label: "Meat Cut", Icon: Package };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#059669";
      case "pending":
        return "#D97706";
      case "cancelled":
        return "#DC2626";
      default:
        return "#64748B";
    }
  };

  if (!history || history.length === 0) {
    return (
      <div className="history-empty">
        <div className="empty-icon">
          <ClipboardList size={34} />
        </div>
        <h3>No Bookings Yet</h3>
        <p>You haven&apos;t placed any livestock or meat cut bookings yet.</p>
        <button
          type="button"
          className="rf-btn-primary"
          onClick={onBrowse || (() => window.location.reload())}
        >
          Browse Marketplace Stock
        </button>
      </div>
    );
  }

  return (
    <div className="booking-history">
      <div className="history-header">
        <h3>Your Booking History ({history.length})</h3>
        <button type="button" className="refresh-history-btn" onClick={onRefresh}>
          <RefreshCw size={14} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Breed</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Seller</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((booking) => {
              const { label, Icon } = getTypeInfo(booking.sellingId?.pigType);
              return (
                <tr key={booking._id}>
                  <td>
                    <div className="item-cell">
                      <Icon size={15} />
                      <span>{label}</span>
                    </div>
                  </td>
                  <td>{booking.sellingId?.breedType || "N/A"}</td>
                  <td>{booking.quantity}</td>
                  <td>{formatPrice(booking.priceAtBooking)}</td>
                  <td>
                    <div className="seller-cell">
                      <span>{booking.sellingId?.userId?.username || "Seller"}</span>
                      <button
                        type="button"
                        className="view-seller-link"
                        onClick={() => onViewSeller(booking.sellingId?.userId)}
                      >
                        View
                      </button>
                    </div>
                  </td>
                  <td>{formatDate(booking.createdAt)}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: `${getStatusColor(booking.status)}18`,
                        color: getStatusColor(booking.status),
                      }}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="history-summary">
        <div className="summary-item">
          <span>Total Orders</span>
          <strong>{history.length}</strong>
        </div>
        <div className="summary-item">
          <span>Total Value</span>
          <strong className="total-amount">
            {formatPrice(
              history.reduce((sum, b) => sum + b.quantity * b.priceAtBooking, 0)
            )}
          </strong>
        </div>
        <div className="summary-item">
          <span>Pending</span>
          <strong>{history.filter((b) => b.status === "pending").length}</strong>
        </div>
        <div className="summary-item">
          <span>Confirmed</span>
          <strong>{history.filter((b) => b.status === "confirmed").length}</strong>
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;
