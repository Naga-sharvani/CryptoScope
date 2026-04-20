import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";

import Home from "./components/pages/Home";
import AssetPage from "./components/pages/assetsPage";

import CopyTrading from "./components/pages/copyTrading";
import News from "./components/pages/news";
import Simulator from "./components/pages/Simulate";
import PnL from "./components/pages/PnL";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "90px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asset/:symbol" element={<AssetPage />} />

        <Route path="/copytrading" element={<CopyTrading />} />
        <Route path="/news" element={<News />} />
        <Route path="/PnL" element={<PnL />} />
        <Route path="/simulate" element={<Simulator />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;