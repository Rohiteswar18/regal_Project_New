import React, { useState } from "react";
import { X, Sparkles, Users, Package, AlertCircle } from "lucide-react";
import "../../styles/components/AddSellingModal.css";
import API_BASE_URL from "../../config/api";

function normalizeInitialType(type) {
  if (type === "pigling" || type === "piglet") return "piglet";
  if (type === "batch" || type === "breeding_unit") return "breeding_unit";
  if (type === "cutting" || type === "cutting_piece") return "cutting_piece";
  return "piglet";
}

function AddSellingModal({ type, onClose, onSuccess }) {
  const [form, setForm] = useState({
    pigType: normalizeInitialType(type),
    breedType: "",
    quantity: "",
    price: "",
    priceUnit: "piece",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/selling`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add listing");
      }

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = () => {
    switch (form.pigType) {
      case "piglet":
        return "Piglets / Growers";
      case "breeding_unit":
        return "Breeding Unit";
      case "cutting_piece":
        return "Processed Meat Cuts";
      default:
        return "Livestock";
    }
  };

  return (
    <div className="add-selling-overlay" onClick={onClose}>
      <div className="add-selling-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Sell {getTypeLabel()}</h2>
            <p>Publish verified inventory to the Regal Pork Farms LLP marketplace</p>
          </div>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="add-selling-form">
          <div className="form-group">
            <label>Listing Category</label>
            <div className="type-buttons">
              <button
                type="button"
                className={`type-btn ${form.pigType === "piglet" ? "active" : ""}`}
                onClick={() => setForm({ ...form, pigType: "piglet", priceUnit: "piece" })}
              >
                <Sparkles size={15} />
                <span>Piglet</span>
              </button>
              <button
                type="button"
                className={`type-btn ${form.pigType === "breeding_unit" ? "active" : ""}`}
                onClick={() =>
                  setForm({ ...form, pigType: "breeding_unit", priceUnit: "unit" })
                }
              >
                <Users size={15} />
                <span>Breeding Unit</span>
              </button>
              <button
                type="button"
                className={`type-btn ${form.pigType === "cutting_piece" ? "active" : ""}`}
                onClick={() =>
                  setForm({ ...form, pigType: "cutting_piece", priceUnit: "kg" })
                }
              >
                <Package size={15} />
                <span>Meat Cut</span>
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Breed Line *</label>
              <input
                placeholder="e.g., Large White, Duroc, Landrace"
                value={form.breedType}
                onChange={(e) => setForm({ ...form, breedType: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                placeholder="Number of units"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                required
                min="1"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Unit Price *</label>
              <div className="price-input-group">
                <span className="currency">₹</span>
                <input
                  type="number"
                  placeholder="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                />
                <select
                  value={form.priceUnit}
                  onChange={(e) => setForm({ ...form, priceUnit: e.target.value })}
                >
                  <option value="piece">per piece</option>
                  <option value="kg">per kg</option>
                  <option value="unit">per unit</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Estimated Lot Value</label>
              <div className="total-display">
                <span className="total-amount">
                  ₹
                  {form.quantity && form.price
                    ? (form.quantity * form.price).toLocaleString("en-IN")
                    : "0"}
                </span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Health, Vaccination &amp; Notes (Optional)</label>
            <textarea
              placeholder="Include age, vaccination status, FCR logs, or packaging notes..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="3"
            />
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Publishing..." : "Publish Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSellingModal;
