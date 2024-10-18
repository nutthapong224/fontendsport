import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all campuses
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM campus";
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error("Error fetching campuses:", err);
    res.status(500).json({ error: "Failed to retrieve campuses" });
  }
});

export default router;
