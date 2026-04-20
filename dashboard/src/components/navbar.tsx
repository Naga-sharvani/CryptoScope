import { NavLink } from "react-router-dom";

export default function Navbar() {
  
  return (
    <nav
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "80px",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    background: "#111",
    boxShadow: "0 3px 7px rgba(47, 42, 42, 0.5)",
    boxSizing: "border-box"
  }}
>
      {/* Logo / Title */}
      <h2 style={{ color: "#22c55e" }}>CryptoScope</h2>

      {/* Links */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          fontSize: "20px",
          whiteSpace: "nowrap",
        }}
      >
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink to="/news" className="nav-link">
          News
        </NavLink>

        <NavLink to="/copytrading" className="nav-link">
          CopyTrading
        </NavLink>

        <NavLink to="/Simulate" className="nav-link">
          Simulate
        </NavLink>

        <NavLink to="/PnL" className="nav-link">
          PnL
        </NavLink>
      </div>
    </nav>
  );
}