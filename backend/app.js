// backend/app.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const sellingRoutes = require("./routes/selling");
const bookingRoutes = require("./routes/booking");

const app = express();

/* ---------------------------------------------------
   CORS CONFIG
   --------------------------------------------------- */
/**
 * In production:
 * - Frontend is served from SAME origin
 * - CORS is NOT needed
 *
 * In development:
 * - Frontend runs on localhost:3000
 */
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? true               // same-origin
      : "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ---------------------------------------------------
   MIDDLEWARE
   --------------------------------------------------- */
app.use(express.json());

/* ---------------------------------------------------
   API ROUTES
   --------------------------------------------------- */
app.use("/auth", authRoutes);

app.get("/buyer/dashboard", auth, (req, res) => {
  res.send("Buyer dashboard");
});

app.get("/seller/dashboard", auth, (req, res) => {
  res.send("Seller dashboard");
});

app.use("/selling", sellingRoutes);
app.use("/booking", bookingRoutes);

/* ---------------------------------------------------
   SERVE REACT BUILD (PRODUCTION)
   --------------------------------------------------- */
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../build");

  app.use(express.static(buildPath));

  // React Router fallback
  app.use((req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

module.exports = app;
