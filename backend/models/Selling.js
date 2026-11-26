const mongoose = require("mongoose");

const sellingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pigType: {
      type: String,
      enum: ["piglet", "breeding_unit", "cutting_piece"],
      required: true,
    },

    breedType: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    priceUnit: {
      type: String,
      enum: ["piece", "kg", "unit"],
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["available", "sold", "closed"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Selling", sellingSchema);
