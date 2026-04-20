import MarketCard from "../Market";
import { useEffect,useState } from "react";
import {getMarketData,getGainersLosers} from "../../services/api";
import {LineChart,Line,ResponsiveContainer} from "recharts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


function Home() {
  const [prices,setPrices] =useState<any>(null);
  const [gainersLosers,setGainersLosers]=useState<any[]>([]);

  useEffect(()=>{
    async function fetchData(){
      const Marketdata=await getMarketData();
      const gainersLosersData=await getGainersLosers();

      setGainersLosers(gainersLosersData);
      setPrices(Marketdata);
      
    }
    fetchData();
    //after 2 mins
    const interval = setInterval(fetchData, 120000);
    // Cleanup (VERY IMP!!!!)
    return () => clearInterval(interval);
    
  },[]);

  if(!prices){
    return <h1 style={{color:"#22c55e"}}>Loading Market Data...</h1>;
  }

  if (!gainersLosers.length) return <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
  <Skeleton width={150} height={25} />
  <Skeleton width={100} height={20} />
  <Skeleton  height={300} />
  <Skeleton  height={300} />
  <Skeleton  height={300} />

</div>;

  const marketData=[
    {name:"BTC",price:prices.bitcoin.usd,change:prices.bitcoin.usd_24h_change},
    {name:"ETH",price:prices.ethereum.usd,change:prices.ethereum.usd_24h_change},
    {name:"Pax-Gold",price:prices["pax-gold"].usd,change:prices["pax-gold"].usd_24h_change},
    {name:"River",price:prices.river.usd,change:prices.river.usd_24h_change},

  ]

  const gainers= [...gainersLosers]
    .sort((a,b)=>b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0,5);

  const losers= [...gainersLosers]
    .sort((a,b)=> a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0,5);
  
  return(
    
    <div style={{ padding: "20px"}}>
      <div className="section">
      <h1>Market Overview</h1>

      <div className="market-cards">
        {marketData.map((coin)=>(
         <MarketCard 
          key={coin.name} 
          name={coin.name}
          price={
            coin?.price != null? `$${coin.price.toLocaleString()}`: "Loading..."
          }         
          change={
                coin?.change != null? `${coin.change.toFixed(2)}%`: "N/A"
          }
          isPositive={coin?.change > 0}
          />
        ))
      }
      </div>
      </div>
    

      <div className="section">
        <h2 className="section-title">Top Gainers / Losers</h2>

        <div className="gainers-losers-container">

        {/* Gainers Card */}
        <div className="card gainers-card">
          <h3 className="card-title gainers">Top Gainers</h3>

          {gainers.map((coin) => (
            <div className="coin" key={coin.id}>
              <div className="coin-info">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="coin-logo"
                />
                <div>
                  <span className="coin-name">{coin.name}</span>
                  <span className="coin-symbol">
                    {coin.symbol.toUpperCase()}
                  </span>
                </div>
                <div className="sparkline">
    <ResponsiveContainer width={80} height={30}>
      <LineChart
        data={coin.sparkline_in_7d.price.map((p:number) => ({
          value: p
        })) || [] }
      >
        <Line
          type="monotone"
          dataKey="value"
          stroke="#22c55e"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
              </div>

          <span className="positive">
          {coin.price_change_percentage_24h != null
            ? `+${coin.price_change_percentage_24h.toFixed(2)}%`
            : "N/A"}
          </span>
        </div>
      ))}
            </div>


    {/* Losers Card */}
    <div className="card losers-card">
      <h3 className="card-title losers">Top Losers </h3>

      {losers.map((coin) => (
        <div className="coin" key={coin.id}>
          <div className="coin-info">
            <img
              src={coin.image}
              alt={coin.name}
              className="coin-logo"
            />
            <div>
              <span className="coin-name">{coin.name}</span>
              <span className="coin-symbol">
                {coin.symbol.toUpperCase()}
              </span>
            </div>
            {/* Sparkline Chart */}
  <div className="sparkline">
    <ResponsiveContainer width={80} height={30}>
      <LineChart
        data={coin.sparkline_in_7d.price.map((p:number) => ({
          value: p
        })) || [] }
      >
        <Line
          type="monotone"
          dataKey="value"
          stroke= "#ef4444"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
          </div>

          <span className="negative">
          {coin.price_change_percentage_24h != null
            ? `${coin.price_change_percentage_24h.toFixed(2)}%`
            : "N/A"}
        </span>
        </div>
      ))}
    </div>

  </div>
</div>

      <div className="section">
        <h2>Market Heatmap</h2>
      </div>
    </div>
  );
}

export default Home;