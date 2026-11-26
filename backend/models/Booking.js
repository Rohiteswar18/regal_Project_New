const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sellingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Selling",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    priceAtBooking: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
