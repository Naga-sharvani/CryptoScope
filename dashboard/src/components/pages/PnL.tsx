

export default function PnL() {
  return(
    <div
      style={{
        height: "calc(100vh - 80px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <div
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: "12px",
        padding: "30px",
        marginBottom: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
      }}
    >
      
        <div style={{ color: "#e7dbdb", fontSize: "50px", opacity: 0.7,display: "flex", alignItems: "center", gap: "12px" }}>
          Your Current PnL: 
          <div
          style={{
            fontSize: "50px",
            fontWeight: "bold",
            color:"#22c55e"
          }}
        >
          ${2000.56}
        </div>
        </div>
     
       <div
          style={{
            fontSize: "24px",
            color: "#22c55e",
            opacity: 0.85,
          }}
        >
          {20.56}% this month
        </div>

      <div style={{ color: "#e7dbdb", opacity: 0.7 }}>
        Invested Capital: $5200 💰
      </div>
    </div>
    </div>
  );

  
}