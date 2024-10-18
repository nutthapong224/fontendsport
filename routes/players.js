import express from "express";
import db from "../db.js"; // Adjust this according to your file structure

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM players WHERE Player_id = ?"; // Make sure the query matches your database structure
    const [rows] = await db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json(rows[0]); // Return the player data including image URL
  } catch (err) {
    console.error("Error retrieving player by ID:", err);
    res
      .status(500)
      .json({ message: "Error retrieving player", error: err.message });
  }
});

export default router;
