export default function Alert({ message }) {
  return (
    <div style={{
      padding: "10px",
      margin: "5px 0",
      borderRadius: "5px",
      backgroundColor: "#ffebee",
      color: "#c62828"
    }}>
      {message}
    </div>
  );
}
