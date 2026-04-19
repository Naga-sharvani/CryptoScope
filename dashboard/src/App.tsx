import Home from "./components/pages/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssetPage from "./components/pages/assetsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asset/:symbol" element={<AssetPage />} />
      </Routes>
    </Router>
  );
}

export default App;