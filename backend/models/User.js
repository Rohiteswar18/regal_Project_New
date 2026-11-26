const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true },

    email: { type: String, required: true },
    username: { type: String, required: true },

    phone: { type: String },
    location: { type: String },

    picture: String,

    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);