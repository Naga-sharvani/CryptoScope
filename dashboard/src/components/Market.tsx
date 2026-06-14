import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  price: string;
  change: string;
  isPositive?: boolean;
};

function Market({ name, price, change, isPositive }: Props) {
  const navigate = useNavigate();

  const coinMap: Record<string, string> = {
    BTC: "bitcoin",
    ETH: "ethereum",
    "Pax-Gold": "pax-gold",
    River: "river",
  };

  return (
    <div
      className="card"
      onClick={() => navigate(`/asset/${coinMap[name]}`)}
      style={{ cursor: "pointer" }}
    >
      <h3>{name}</h3>
      <h2>Price: {price}</h2>

      <p style={{ color: isPositive ? "limegreen" : "red" }}>
        {change}
      </p>
    </div>
  );
}

export default Market;