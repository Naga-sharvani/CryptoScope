export async function getMarketData(){
    const response=await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,pax-gold,river&vs_currencies=usd&include_24hr_change=true")

    const data= await response.json();
    return data;
}