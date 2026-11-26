import { useState } from "react";
import { MapPin, Users, Package, Sparkles, Minus, Plus } from "lucide-react";
import "../../styles/components/BookingCard.css";

function BookingCard({ item, onViewSeller, onBookItem }) {
  const [quantity, setQuantity] = useState(1);
  const [booking, setBooking] = useState(false);

  const getTypeMeta = (type) => {
    switch (type) {
      case "piglet":
      case "pigling":
        return { label: "Piglet / Grower", Icon: Sparkles };
      case "breeding_unit":
      case "batch":
        return { label: "Breeding Unit", Icon: Users };
      case "cutting_piece":
        return { label: "Processed Meat Cut", Icon: Package };
      default:
        return { label: type || "Livestock", Icon: Package };
    }
  };

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
    });
  };

  const handleBook = async () => {
    if (quantity > item.quantity) {
      alert(`Maximum available: ${item.quantity}`);
      return;
    }

    setBooking(true);
    try {
      await onBookItem(item._id, quantity);
      setQuantity(1);
    } finally {
      setBooking(false);
    }
  };

  const { label, Icon } = getTypeMeta(item.pigType);
  const unitText = item.priceUnit || "pc";

  return (
    <div className="booking-card">
      <div className="card-header">
        <div className="type-badge">
          <Icon size={15} />
          <span className="type-name">{label}</span>
        </div>
        <span className="listing-date">Listed {formatDate(item.createdAt)}</span>
      </div>

      <div className="card-content">
        <h3 className="breed-name">{item.breedType}</h3>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Available</span>
            <span className="detail-value">{item.quantity}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Unit Price</span>
            <span className="detail-value">
              {formatPrice(item.price)}/{unitText}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Lot Value</span>
            <span className="detail-value total-price">
              {formatPrice(item.quantity * item.price)}
            </span>
          </div>
        </div>

        {item.description && (
          <p className="item-description">{item.description}</p>
        )}

        <div className="seller-info">
          <div className="seller-avatar">
            {item.userId?.username?.charAt(0).toUpperCase() || "S"}
          </div>
          <div className="seller-details">
            <span className="seller-name">{item.userId?.username || "Cluster Seller"}</span>
            <span className="seller-location">
              <MapPin size={12} />
              <span>{item.userId?.location || "India Cluster"}</span>
            </span>
          </div>
          <button
            type="button"
            className="view-seller-btn"
            onClick={() => onViewSeller(item.userId)}
          >
            Seller Info
          </button>
        </div>
      </div>

      <div className="booking-controls">
        <div className="quantity-control">
          <label>Select Quantity</label>
          <div className="quantity-input">
            <button
              type="button"
              className="qty-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={15} />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.min(item.quantity, Math.max(1, parseInt(e.target.value, 10) || 1))
                )
              }
              min="1"
              max={item.quantity}
            />
            <button
              type="button"
              className="qty-btn"
              onClick={() => setQuantity(Math.min(item.quantity, quantity + 1))}
              disabled={quantity >= item.quantity}
              aria-label="Increase quantity"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>

        <div className="booking-summary">
          <div className="summary-item total">
            <span>Total Payable ({quantity} × {formatPrice(item.price)})</span>
            <span className="booking-total">{formatPrice(item.price * quantity)}</span>
          </div>
        </div>

        <button
          type="button"
          className="book-btn"
          onClick={handleBook}
          disabled={booking}
        >
          {booking ? (
            <>
              <div className="btn-spinner"></div>
              <span>Confirming Booking...</span>
            </>
          ) : (
            <span>Book Stock Now</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default BookingCard;
