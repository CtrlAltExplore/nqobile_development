import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import { authenticateToken } from "../middleware/authMiddleware.js";

dotenv.config();
const { Pool } = pg;

const router = express.Router();

// PostgreSQL pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Get all transactions for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id = $1 ORDER BY timestamp DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get summary (total income, total expense) for logged-in user
router.get("/summary", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
         SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
       FROM transactions
       WHERE user_id = $1`,
      [req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new transaction for the logged-in user
router.post("/", authenticateToken, async (req, res) => {
  const { type, category, amount } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO transactions (user_id, type, category, amount) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user.id, type, category, amount]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a transaction (only if it belongs to the logged-in user)
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { type, category, amount } = req.body;
  try {
    const result = await pool.query(
      "UPDATE transactions SET type=$1, category=$2, amount=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
      [type, category, amount, id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found or unauthorized" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a transaction (only if it belongs to the logged-in user)
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM transactions WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found or unauthorized" });
    }
    res.json({ message: "Transaction deleted successfully", transaction: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
