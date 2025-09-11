import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

// Fetch access token
export async function getMomoToken() {
  try {
    const basicAuth = Buffer.from(
      `${process.env.MOMO_USER_ID}:${process.env.MOMO_API_KEY}`
    ).toString("base64");

    const response = await axios.post(
      `${process.env.MOMO_BASE_URL}/collection/token/`,
      {},
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Ocp-Apim-Subscription-Key": process.env.MOMO_SUBSCRIPTION_KEY,
          "X-Target-Environment": process.env.MOMO_ENV,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error fetching Momo token:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Send a RequestToPay (customer payment request)
export async function requestToPay({
  amount,
  currency = "ZAR",
  externalId,
  payerMsisdn,
  payerMessage,
  payeeNote,
}) {
  try {
    const token = await getMomoToken();
    const referenceId = uuidv4();

    await axios.post(
      `${process.env.MOMO_BASE_URL}/collection/v1_0/requesttopay`,
      {
        amount,
        currency,
        externalId,
        payer: {
          partyIdType: "MSISDN",
          partyId: payerMsisdn || "27605011274",
        },
        payerMessage,
        payeeNote,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Ocp-Apim-Subscription-Key": process.env.MOMO_SUBSCRIPTION_KEY,
          "X-Reference-Id": referenceId,
          "X-Target-Environment": process.env.MOMO_ENV,
          "Content-Type": "application/json",
        },
      }
    );

    return { referenceId, status: "pending" };
  } catch (error) {
    console.error(
      "Error requesting payment:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Get payment status
export async function getPaymentStatus(referenceId) {
  try {
    const token = await getMomoToken();
    const response = await axios.get(
      `${process.env.MOMO_BASE_URL}/collection/v1_0/requesttopay/${referenceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Ocp-Apim-Subscription-Key": process.env.MOMO_SUBSCRIPTION_KEY,
          "X-Target-Environment": process.env.MOMO_ENV,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching payment status:", error.response?.data || error.message);
    throw error;
  }
}
