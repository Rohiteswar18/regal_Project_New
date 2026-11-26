const express = require("express");
const Selling = require("../models/Selling");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const {
      pigType,
      breedType,
      quantity,
      price,
      priceUnit,
      description,
    } = req.body;

    if (!pigType || !breedType || !quantity || !price || !priceUnit) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const selling = await Selling.create({
      userId: req.userId,
      pigType,
      breedType,
      quantity,
      price,
      priceUnit,
      description,
    });

    res.status(201).json(selling);
  } catch (err) {
    res.status(500).json({ message: "Failed to create selling batch" });
  }
});

router.get("/my", auth, async (req, res) => {
  try {
    const history = await Selling.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch selling history" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const stats = await Selling.aggregate([
      {
        $group: {
          _id: null,
          totalBatches: { $sum: 1 },
          totalSold: {
            $sum: {
              $cond: [{ $eq: ["$status", "sold"] }, "$quantity", 0],
            },
          },
          totalBreeds: { $addToSet: "$breedType" },
        },
      },
      {
        $project: {
          _id: 0,
          totalBatches: 1,
          totalSold: 1,
          totalBreeds: { $size: "$totalBreeds" },
        },
      },
    ]);

    res.json(stats[0] || { totalBatches: 0, totalSold: 0, totalBreeds: 0 });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

module.exports = router;