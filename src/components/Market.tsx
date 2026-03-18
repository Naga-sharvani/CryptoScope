type Props={
    name :string,
    price :string,
    change:string,
    isPositive?:boolean
}


function Market({name,price,change,isPositive}:Props){
    return(
        <div className="card">
            <h3>{name}</h3>
            <h2>Price: {price}</h2>
            <p>Change: {change}</p>
             <p style={{color:isPositive? "limegreen" : "red" }}>
        {change}
      </p>
        </div>
    )
}

export default Market;