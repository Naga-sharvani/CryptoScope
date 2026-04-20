import { useState } from "react";

export default function Simulator() {
  const [invested, setInvested] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  return (
    <div
      style={{
        height: "calc(100vh - 80px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      {/* The Main Box */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          background: "#111",
          borderRadius: "16px",
          border: "1px solid #222",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ color: "#22c55e", marginBottom: "20px", marginTop: 0 }}>
          Trade Simulator
        </h2>

        {/* Input: Invested */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", color: "#888", fontSize: "13px", marginBottom: "5px" }}>
            Invested Amount ($)
          </label>
          <input
            type="number"
            placeholder="e.g. 1000"
            value={invested}
            onChange={(e) => setInvested(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        {/* Input: Buy Price */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", color: "#888", fontSize: "13px", marginBottom: "5px" }}>
            Buy Price ($)
          </label>
          <input
            type="number"
            placeholder="0.00"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        {/* Input: Current Price */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{ display: "block", color: "#888", fontSize: "13px", marginBottom: "5px" }}>
            Current Market Price ($)
          </label>
          <input
            type="number"
            placeholder="0.00"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{
              flex: 1,
              padding: "12px",
              background: "#22c55e",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Simulate Buy
          </button>
          <button
            style={{
              flex: 1,
              padding: "12px",
              background: "#ef4444",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Simulate Sell
          </button>
        </div>

        {/* Status Placeholder */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#0a0a0a",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "14px",
            color: "#555",
            border: "1px dashed #333",
          }}
        >
          Result will appear here
        </div>
      </div>
    </div>
  );
}