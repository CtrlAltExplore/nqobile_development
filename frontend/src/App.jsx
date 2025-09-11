import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Payment from "./Pages/Payment";
import Dashboard from "./Pages/Dashboard";


function App() {
  return (
    <Router>
      {/* Simple Nav */}

      <nav>
        <a href="/Dashboard">Dashboard</a>
        <a href="/Login">Login</a>
        <a href="/Register">Register</a>
        <a href="/Payment">Payment</a>

      </nav>


      {/* Page Routes */}
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;

