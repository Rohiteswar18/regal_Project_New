import API_BASE_URL from "../config/api";
import { useEffect, useState } from "react";
import { ShoppingBag, ClipboardList, Lock, Search } from "lucide-react";
import BookingCard from "../components/booking/BookingCard";
import BookingFilters from "../components/booking/BookingFilters";
import BookingHistory from "../components/booking/BookingHistory";
import UserProfileModal from "../components/booking/UserProfileModal";
import { AuthModal } from "../components/AuthModal";
import "../styles/pages/Booking.css";

function normalizePigType(type) {
  if (type === "pigling") return "piglet";
  if (type === "batch") return "breeding_unit";
  return type;
}

function Booking() {
  const [availableItems, setAvailableItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState("available"); // "available" | "history"
  const [bookingHistory, setBookingHistory] = useState([]);
  const [filterResetKey, setFilterResetKey] = useState(0);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    fetchAvailableItems();
    const syncAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    syncAuth();
    window.addEventListener("rf-auth-changed", syncAuth);
    return () => window.removeEventListener("rf-auth-changed", syncAuth);
  }, []);

  useEffect(() => {
    if (viewMode === "history") {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowAuth(true);
        return;
      }
      fetchBookingHistory();
    }
  }, [viewMode]);

  const fetchAvailableItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/booking/available`);
      const data = await response.json();
      const safeData = Array.isArray(data) ? data : [];
      setAvailableItems(safeData);
      setFilteredItems(safeData);
    } catch (error) {
      console.error("Error fetching available items:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingHistory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/booking/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBookingHistory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching booking history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (filters) => {
    let filtered = [...availableItems];

    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(
        (item) => normalizePigType(item.pigType) === normalizePigType(filters.type)
      );
    }

    if (filters.breed && filters.breed !== "all") {
      filtered = filtered.filter((item) =>
        item.breedType?.toLowerCase().includes(filters.breed.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter((item) => item.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((item) => item.price <= Number(filters.maxPrice));
    }

    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter((item) =>
        item.userId?.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "quantity-high":
        filtered.sort((a, b) => b.quantity - a.quantity);
        break;
      case "recent":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  };

  const handleViewSeller = (seller) => {
    if (seller) {
      setSelectedUser(seller);
      setShowProfileModal(true);
    }
  };

  const handleBookItem = async (itemId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowAuth(true);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sellingId: itemId,
          quantity: quantity || 1,
        }),
      });

      if (response.ok) {
        alert("Booking successful!");
        fetchAvailableItems();
        if (viewMode === "history") {
          fetchBookingHistory();
        }
      } else {
        const error = await response.json();
        alert(error.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setIsAuthenticated(true);
    if (viewMode === "history") {
      fetchBookingHistory();
    }
  };

  return (
    <div className="booking-page">
      <div className="rf-page-banner">
        <div className="rf-page-banner-inner">
          <span className="rf-eyebrow rf-eyebrow-gold">
            <ShoppingBag size={14} />
            Direct Livestock &amp; Meat Market Linkages
          </span>
          <h1>Regal Pork Farms Marketplace</h1>
          <p>
            Procure pedigree piglings, breeding batches, and processed cutting pieces directly from verified cluster and franchise farms.
          </p>

          <div className="view-toggle">
            <button
              type="button"
              className={`view-btn ${viewMode === "available" ? "active" : ""}`}
              onClick={() => setViewMode("available")}
            >
              <ShoppingBag size={16} />
              <span>Available Stock</span>
            </button>

            <button
              type="button"
              className={`view-btn ${viewMode === "history" ? "active" : ""}`}
              onClick={() => setViewMode("history")}
            >
              <ClipboardList size={16} />
              <span>My Bookings</span>
            </button>
          </div>
        </div>
      </div>

      <div className="booking-main">
        {viewMode === "available" && (
          <div className="booking-sidebar">
            <BookingFilters
              key={filterResetKey}
              onFiltersChange={handleFiltersChange}
              onRefresh={fetchAvailableItems}
            />
          </div>
        )}

        <div className="booking-content-area">
          {viewMode === "history" && !isAuthenticated ? (
            <div className="login-required">
              <div className="login-req-icon">
                <Lock size={28} />
              </div>
              <h2>Partner Sign-In Required</h2>
              <p>Sign in to view your confirmed livestock and product booking history.</p>
              <button
                type="button"
                className="rf-btn-primary"
                onClick={() => setShowAuth(true)}
              >
                Sign In to Continue
              </button>
            </div>
          ) : loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>
                Loading{" "}
                {viewMode === "available"
                  ? "available marketplace listings"
                  : "your booking history"}
                ...
              </p>
            </div>
          ) : viewMode === "available" ? (
            <>
              <div className="items-count">
                <div>
                  <h3>{filteredItems.length} Verified Listings Available</h3>
                  <p>Live inventory from Regal Pork Farms cluster &amp; partner sellers</p>
                </div>
              </div>

              {filteredItems.length > 0 ? (
                <div className="items-grid">
                  {filteredItems.map((item) => (
                    <BookingCard
                      key={item._id}
                      item={item}
                      onViewSeller={handleViewSeller}
                      onBookItem={handleBookItem}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <Search size={36} />
                  </div>
                  <h3>No matching listings found</h3>
                  <p>Try adjusting your breed, category, or price filters.</p>
                  <button
                    type="button"
                    className="rf-btn-primary"
                    onClick={() => {
                      setFilterResetKey((k) => k + 1);
                      setFilteredItems(availableItems);
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          ) : (
            <BookingHistory
              history={bookingHistory}
              onRefresh={fetchBookingHistory}
              onViewSeller={handleViewSeller}
              onBrowse={() => setViewMode("available")}
            />
          )}
        </div>
      </div>

      {showProfileModal && selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}

export default Booking;
