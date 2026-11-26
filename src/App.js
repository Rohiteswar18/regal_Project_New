import Home from "./pages/Home";
import Selling from "./pages/Selling";
import Booking from "./pages/Booking";
import SmartFarm from "./pages/SmartFarm";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PigNutrition from "./pages/PigNutrition";
import PigBreed from "./pages/PigBreed";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selling" element={<Selling />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/smart-farm" element={<SmartFarm />} />
          <Route path="/nutrients" element={<PigNutrition />} />
          <Route path="/breeds" element={<PigBreed />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
