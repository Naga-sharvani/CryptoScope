import { User } from "lucide-react";

const traders = [
  {
    name: "AlphaQuant",
    profit: "+42.8%",
    duration: "30 days",
    followers: 1240,
  },
  {
    name: "CryptoPulse",
    profit: "+28.3%",
    duration: "14 days",
    followers: 860,
  },
  {
    name: "BTCWizard",
    profit: "+63.1%",
    duration: "60 days",
    followers: 2210,
  },
  {
    name: "TrendHunter",
    profit: "+19.4%",
    duration: "7 days",
    followers: 540,
  },
];

export default function CopyTrading() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h2 style={{ marginBottom: "25px" }}>Top Traders to Copy 📈</h2>

      <div
        style={{
          display: "flex",
          flexDirection:"column",
          gap: "20px",
        }}
      >
        {traders.map((trader, index) => (
          <div
            key={index}
            style={{              
              background: "#2a2929",
              border: "1px solid #222",
              borderRadius: "12px",
              padding: "18px",
              transition: "0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Avatar */}
            <div
              style={{
                background: "#242222",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <User size={26} color="#22c55e" />
               
            </div>
            {/* Trader Name */}
            <h3 style={{ color: "#fff", marginBottom: "6px" }}>{trader.name}</h3> </div>

            {/* Profit */}
            <p style={{ color: "#22c55e", fontWeight: "bold" }}>
              {trader.profit} return
            </p>

            {/* Duration */}
            <p style={{ color: "#e7dbdb",opacity: 0.7 }}>
              Last {trader.duration}
            </p>

            {/* Followers */}
            <p style={{ fontSize: "14px", opacity: 0.6, color: "#e7dbdb" }}>
              👥 {trader.followers} copiers
            </p>

            {/* Copy button */}
            <button
              style={{
                marginTop: "12px",
                width: "50%",
                padding: "8px",
                borderRadius: "6px",
                border: "none",
                background: "#22c55e",
                color: "black",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Copy Trader
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}