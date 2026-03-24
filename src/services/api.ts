export async function getMarketData(){
    const response=await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,pax-gold,river&vs_currencies=usd&include_24hr_change=true")

    const data= await response.json();
    return data;
}

export async function getGainersLosers() {
    const response=await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
    )
    const data=await response.json();
    return data;    
}