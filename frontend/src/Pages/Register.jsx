import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // ✅ for redirect


  const handleRegister = async (e) => {
    e.preventDefault();
    console.log({ name, email, password });
    // TODO: Send register request to backend
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await registerUser(name.value, email.value, password.value); // call API
      setSuccess("Registration successful! You can now log in.");
      setError("");
      console.log("Registered user:", res);
    } catch (err) {
      setError(err);
      setSuccess("");
    }

    navigate('/Login')
  }

  return (
    <div className="container">
      <div className="form-box">
        <h2>Register</h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" onClick={handleRegister}>Register</button>
        </form>
        <Link to="/login" className="link">Already have an account? Login</Link>
      </div>
    </div>
  );
}
