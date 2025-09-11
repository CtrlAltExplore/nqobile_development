import { Routes, Route } from "react-router-dom";
import Login from "./LoginPage";
import Register from "./Register";
import Home from "./index";
import Payment from "../Pages/Payment";
import Dashboard from "../Pages/Dashboard";

export default function Router() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Payment" element={<Payment />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );
}
