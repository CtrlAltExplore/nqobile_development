import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/api"; // import function from api.js
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ for redirect

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    // TODO: Send login request to backend
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    try {
      const userData = await loginUser(email, password); // call API
      alert("Login successful!");
      console.log("User data:", userData);
    } catch (err) {
      setError(err);
    }

    navigate('/dashboard')
  }

  return (
    <div className="container">
      <div className="form-box">
        <h2>Login</h2>
        <form >
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
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
        <Link to="/register" className="link">Don't have an account? Register</Link>
      </div>
    </div>
  );
}
