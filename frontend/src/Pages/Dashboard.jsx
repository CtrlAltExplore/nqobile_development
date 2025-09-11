import { useState } from "react";
import Notification from "../components/Notification";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const addNotification = () => {
    const newNotification = `Notification ${notifications.length + 1}`;
    setNotifications([newNotification, ...notifications]);
  };

  const addAlert = () => {
    const newAlert = `Alert ${alerts.length + 1}`;
    setAlerts([newAlert, ...alerts]);
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Dashboard</h2>

        <div style={{ marginBottom: "20px" }}>
          <button onClick={addNotification} className="btn">Add Notification</button>
          <button onClick={addAlert} className="btn" style={{ marginLeft: "10px" }}>Add Alert</button>
        </div>

        <div>
          <h3>Notifications</h3>
          {notifications.length === 0 && <p>No notifications</p>}
          {notifications.map((n, idx) => (
            <Notification key={idx} message={n} />
          ))}
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3>Alerts</h3>
          {alerts.length === 0 && <p>No alerts</p>}
          {alerts.map((a, idx) => (
            <Alert key={idx} message={a} />
          ))}
        </div>

        <Link to="/login" className="link" style={{ marginTop: "20px", display: "inline-block" }}>Logout</Link>
      </div>
    </div>
  );
}
