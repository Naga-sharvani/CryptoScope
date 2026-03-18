import MarketCard from "../Market";
import { useEffect,useState } from "react";
import {getMarketData} from "../../services/api";


function Home() {
  const [prices,setPrices] =useState<any>(null);
  useEffect(()=>{
    async function fetchData(){
      const data=await getMarketData();
      setPrices(data);
      
    }
    fetchData();
    //after 2 mins
    const interval = setInterval(fetchData, 120000);
    // Cleanup (VERY IMPORTANT)
    return () => clearInterval(interval);
    
  },[]);
  if(!prices){
    return <div>Please Wait.....</div>
  }

  const marketData=[
    {name:"BTC",price:prices.bitcoin.usd,change:prices.bitcoin.usd_24h_change},
    {name:"ETH",price:prices.ethereum.usd,change:prices.ethereum.usd_24h_change},
    {name:"Pax-Gold",price:prices["pax-gold"].usd,change:prices["pax-gold"].usd_24h_change},
    {name:"River",price:prices.river.usd,change:prices.river.usd_24h_change},

  ]
  return(
    <div style={{ padding: "20px" }}>
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

      <div className="section">
        <h2>Top Gainers / Losers</h2>
      </div>

      <div className="section">
        <h2>Market Heatmap</h2>
      </div>
    </div>
  );
}

export default Home;