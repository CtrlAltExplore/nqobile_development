import express from "express";
import pool from "../db.js";
import { v4 as uuidv4 } from "uuid"; // generate valid UUIDs

const router = express.Router();

// ======================
// Fake MoMo Service
// ======================
async function requestToPay({ amount, currency, externalId, payerMsisdn, payerMessage, payeeNote }) {
  // Generate a valid UUID for referenceId
  const referenceId = uuidv4();

  // Simulate a "pending" payment
  return { referenceId, status: "pending" };
}

async function getPaymentStatus(referenceId) {
  // Simulate a completed payment
  return { status: "SUCCESSFUL", reason: null };
}

// ======================
// Routes
// ======================

// Route to initiate payment
router.post("/pay", async (req, res) => {
  try {
    const {
      amount,
      currency = "ZAR",
      externalId,
      payerMsisdn,
      payerMessage,
      payeeNote,
      userId,
      type = "income",
      category = "Payment"
    } = req.body;

    const momoResult = await requestToPay({ amount, currency, externalId, payerMsisdn, payerMessage, payeeNote });
    console.log("Fake MoMo API result:", momoResult);

    const insertQuery = `
      INSERT INTO transactions
      (type, category, amount, timestamp, user_id, reference_id, external_id, currency, payer_msisdn, payer_message, payee_note, status)
      VALUES ($1,$2,$3,NOW(),$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *;
    `;

    const values = [
      type,
      category,
      amount,
      userId,
      momoResult.referenceId,
      externalId,
      currency,
      payerMsisdn,
      payerMessage,
      payeeNote,
      momoResult.status
    ];

    const { rows } = await pool.query(insertQuery, values);

    res.json({ message: "Payment initiated & logged successfully", transaction: rows[0] });
  } catch (err) {
    console.error("Error in /pay:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Route to check payment status
router.get("/status/:referenceId", async (req, res) => {
  const { referenceId } = req.params;

  try {
    const statusData = await getPaymentStatus(referenceId);

    const updateQuery = `
      UPDATE transactions
      SET status = $1, reason = $2
      WHERE reference_id = $3
      RETURNING *;
    `;

    const { rows } = await pool.query(updateQuery, [
      statusData.status,
      statusData.reason || null,
      referenceId
    ]);

    res.json({ referenceId, status: statusData.status, transaction: rows[0] });
  } catch (err) {
    console.error("Error in /status:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
