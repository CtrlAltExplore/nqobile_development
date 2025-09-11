export default function Notification({ message }) {
  return (
    <div style={{
      padding: "10px",
      margin: "5px 0",
      borderRadius: "5px",
      backgroundColor: "#e0f7fa",
      color: "#006064"
    }}>
      {message}
    </div>
  );
}
