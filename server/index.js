const express = require("express");
const cors = require("cors");
let cache = null;
let lastFetchTime = 0;

const app = express();
app.use(cors({
  origin:"https://crypto-scope-iota.vercel.app"
}));

const PORT = process.env.PORT || 5000;

app.get("/api/market-data", async (req, res) => {
  const now = Date.now();
  try {
    if (cache && now - lastFetchTime < 60000) {
    return res.json(cache);
  }

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,pax-gold,river&vs_currencies=usd&include_24hr_change=true"
    );
    
    const data = await response.json();
    cache = data;
    lastFetchTime = now;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch market data" });
  }
});

app.get("/api/gainers-losers", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gainers/losers data" });
  }
});

app.get("/api/asset/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${symbol}`
    );

    const data = await response.json();

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch asset data" });
  }
});

app.get("/api/history/:symbol/:days", async (req, res) => {
  try {
    const { symbol, days } = req.params;

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=${days}`
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch historical data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});