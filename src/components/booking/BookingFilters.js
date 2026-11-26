import { useState } from "react";
import { RefreshCw, SlidersHorizontal, RotateCcw } from "lucide-react";
import "../../styles/components/BookingFilters.css";

function BookingFilters({ onFiltersChange, onRefresh }) {
  const [filters, setFilters] = useState({
    type: "all",
    breed: "all",
    minPrice: "",
    maxPrice: "",
    location: "all",
    sortBy: "recent",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      type: "all",
      breed: "all",
      minPrice: "",
      maxPrice: "",
      location: "all",
      sortBy: "recent",
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="booking-filters">
      <div className="filters-header">
        <h3>Filter Inventory</h3>
        <div className="header-actions">
          <button type="button" className="refresh-btn" onClick={onRefresh}>
            <RefreshCw size={14} />
            <span>Refresh</span>
          </button>
          <button
            type="button"
            className="advanced-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <SlidersHorizontal size={14} />
            <span>{showAdvanced ? "Less" : "More"}</span>
          </button>
        </div>
      </div>

      <div className="quick-filters">
        <div className="filter-group">
          <label>Category</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="piglet">Piglets &amp; Growers</option>
            <option value="breeding_unit">Breeding Units</option>
            <option value="cutting_piece">Processed Meat Cuts</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Breed Line</label>
          <select
            value={filters.breed}
            onChange={(e) => handleFilterChange("breed", e.target.value)}
          >
            <option value="all">All Breeds</option>
            <option value="Large White">Large White (Yorkshire)</option>
            <option value="Duroc">Duroc</option>
            <option value="Hampshire">Hampshire</option>
            <option value="Landrace">Landrace</option>
            <option value="Berkshire">Berkshire</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort Order</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="quantity-high">Highest Quantity</option>
          </select>
        </div>
      </div>

      {showAdvanced && (
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Min Price (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                min="0"
              />
            </div>

            <div className="filter-group">
              <label>Max Price (₹)</label>
              <input
                type="number"
                placeholder="100000"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                min="0"
              />
            </div>

            <div className="filter-group">
              <label>Cluster Region</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              >
                <option value="all">All Regions</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="Rajasthan">Rajasthan</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="filter-actions">
        <button type="button" className="clear-btn" onClick={clearFilters}>
          <RotateCcw size={14} />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
}

export default BookingFilters;
