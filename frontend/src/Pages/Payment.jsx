import { useState } from "react";
import { Link } from "react-router-dom";

export default function Payment() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    console.log({ name, cardNumber, expiry, cvv, amount });
    alert("Payment submitted!");
    // TODO: Send payment data to backend or payment API
    if (!amount || !phoneNumber) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Payment</h2>
        <form >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit" onClick={handlePayment}>Pay Now</button>
        </form>
        <Link to="/login" className="link">Back to Login</Link>
      </div>
    </div>
  );
}
