import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function calculateRSI(prices: number[], period = 14) {
  if (prices.length < period + 1) return null;

  let gains = 0;
  let losses = 0;

  for (let i = prices.length - period; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];

    if (diff > 0) gains += diff;
    else losses -= diff;
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;

  if (avgLoss === 0) return 100;

  const rs = avgGain / avgLoss;

  return 100 - 100 / (1 + rs);
}

export default function AssetPage() {
  const { symbol } = useParams();

  const [data, setData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [days, setDays] = useState("7");
  const [rsi, setRsi] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAsset() {
      const response = await fetch(
        `http://localhost:5000/api/asset/${symbol}`
      );
      const result = await response.json();
      setData(result);
    }

    fetchAsset();
  }, [symbol]);

  useEffect(() => {
    async function fetchHistory() {
      const response = await fetch(
        `http://localhost:5000/api/history/${symbol}/${days}`
      );
      const result = await response.json();

      const formatted = result.prices.map((p: any) => ({
                  time: new Date(p[0]).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                price: p[1],
              }));

      setHistory(formatted);
      const priceArray = result.prices.map((p: any) => p[1]);

      const rsiValue = calculateRSI(priceArray);

      setRsi(rsiValue);
    }

    fetchHistory();
  }, [symbol, days]);
  

  if (!data) return 
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Title */}
        <Skeleton height={35} width={220} />

        {/* Price row */}
        <div style={{ display: "flex", gap: "40px" }}>
          <Skeleton height={25} width={140} />
          <Skeleton height={25} width={140} />
          <Skeleton height={25} width={140} />
        </div>

        {/* Timeframe buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={35} width={60} />
            ))}
        </div>

        {/* Chart area */}
        <Skeleton height={300} />

        {/* RSI section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Skeleton height={20} width={120} />
          <Skeleton height={10} />
        </div>
      </div>
    </SkeletonTheme>


  return (
    <div style={{maxWidth: "1200px", margin:"0 auto", padding: "20px", color: "#22c55e" }}>
      <h1>{data.name} Dashboard</h1>

      <h2>Price: ${data.current_price}</h2>

      <h3>
        24h Change: {data.price_change_percentage_24h?.toFixed(2)}%
      </h3>

      <h3>Volume: ${data.total_volume?.toLocaleString()}</h3>

      <div style={{ marginTop: "20px" }}>
        {["1", "7", "30", "365"].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            style={{ marginRight: "10px" }}
          >
            {d === "1"
              ? "24H"
              : d === "7"
              ? "7D"
              : d === "30"
              ? "30D"
              : "1Y"}
          </button>
        ))}
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={history}>
            <XAxis dataKey="time" hide />
            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Price",
              ]}
              labelFormatter={(label) => label}
            />
           <Line
              type="monotone"
              dataKey="price"
              stroke="#22c55e"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
         
           {rsi !== null && (
            <div
              style={{
                border: "1px solid #444",
                padding: "20px",
                borderRadius: "12px",
                background: "#111",
                marginTop: "25px",
                // maxWidth: "400px",
                width:"80%"
              }}
            >
              <div style={{ fontSize: "18px", marginBottom: "6px"}}>
                <strong>RSI (14): </strong>
                <span
                  style={{
                    color: rsi > 70 ? "#ef4444" : rsi < 30 ? "#22c55e" : "#eab308",
                    fontWeight: "bold",
                  }}
                >
                  {rsi.toFixed(2)}
                </span>
              </div>

              <div
                style={{
                  height: "8px",
                  width: "100%",
                  background: "#222",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
              <div
                style={{
                  width: `${rsi}%`,
                  height: "100%",
                  background: rsi > 70 ? "#ef4444" : rsi < 30 ? "#22c55e" : "#eab308",
                }}
              />
            </div>

            <div style={{ marginTop: "6px", fontSize: "14px", opacity: 0.8 }}>
              {rsi > 70 ? "Overbought" : rsi < 30 ? "Oversold" : "Neutral"}
            </div>
          </div>
        )}
    </div>
  );
}