export async function getMarketData(){
    const response=await fetch(
        "https://cryptoscope-po25.onrender.com/api/market-data")

    const data= await response.json();
    return data;
}

export async function getGainersLosers() {
    const response=await fetch(
        "https://cryptoscope-po25.onrender.com/api/gainers-losers"
    )
    const data=await response.json();
    return data;    
}