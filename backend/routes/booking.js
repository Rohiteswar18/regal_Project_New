const express = require("express");
const Booking = require("../models/Booking");
const Selling = require("../models/Selling");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * ---------------------------------------------------
 * GET AVAILABLE ITEMS FOR BUYING (PUBLIC)
 * ---------------------------------------------------
 * GET /booking/available
 */
router.get("/available", async (req, res) => {
  try {
    const items = await Selling.find({ status: "available" })
      .populate("userId", "username location")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch available items" });
  }
});

/**
 * ---------------------------------------------------
 * CREATE A BOOKING (BUYER)
 * ---------------------------------------------------
 * POST /booking
 */
router.post("/", auth, async (req, res) => {
  try {
    const { sellingId, quantity } = req.body;

    if (!sellingId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const selling = await Selling.findById(sellingId);

    if (!selling || selling.status !== "available") {
      return res.status(400).json({ message: "Item not available" });
    }

    if (quantity > selling.quantity) {
      return res.status(400).json({ message: "Insufficient quantity" });
    }

    const booking = await Booking.create({
      buyerId: req.userId,
      sellingId: selling._id,
      quantity,
      priceAtBooking: selling.price,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to create booking" });
  }
});

/**
 * ---------------------------------------------------
 * BUYER BOOKING HISTORY
 * ---------------------------------------------------
 * GET /booking/my
 */
router.get("/my", auth, async (req, res) => {
  try {
    const history = await Booking.find({ buyerId: req.userId })
      .populate({
        path: "sellingId",
        populate: {
          path: "userId",
          select: "username location",
        },
      })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch booking history" });
  }
});

module.exports = router;
