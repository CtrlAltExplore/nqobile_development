import axios from "axios";

const API = axios.create({
  baseURL: "./backend/http://localhost:5000/api", // 🔥 Replace with your friend's API URL
});

// Optional: Automatically add token if user is logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

export async function loginUser(email, password) {
  try {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token); // Save token
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
}
export async function registerUser(name, email, password) {
  try {
    const res = await API.post("/auth/login", { name, email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Register failed";
  }
}

export const makePayment = (name, phoneNumber, date, cvv, amount) =>
  API.post("/momo/pay", { name, phoneNumber, date, cvv, amount });
