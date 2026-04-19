export async function getMarketData(){
    const response=await fetch(
        "http://localhost:5000/api/market-data")

    const data= await response.json();
    return data;
}

export async function getGainersLosers() {
    const response=await fetch(
        "http://localhost:5000/api/gainers-losers"
    )
    const data=await response.json();
    return data;    
}