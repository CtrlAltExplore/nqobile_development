// services/momoService.js

// access token generator
export async function getAccessToken() {
  console.log("getAccessToken called");
  // Return a token
  return "ACCESS_TOKEN";
}

// requestToPay function
export async function requestToPay({ amount, currency, externalId, payerMsisdn, payerMessage, payeeNote }) {
  const idReferenceId = "FAKE-" + externalId;
  console.log("MoMo request received:", { amount, currency, externalId, payerMsisdn });

  // Simulate a short delay like a real API call
  await new Promise(resolve => setTimeout(resolve, 300));

  return { referenceId: idReferenceId, status: "SUCCESS" };
}

// getPaymentStatus function
export async function getPaymentStatus(referenceId) {
  console.log("MoMo status request for:", referenceId);

  return { status: "SUCCESS", reason: null };
}
