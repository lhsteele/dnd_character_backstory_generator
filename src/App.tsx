import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AttributesSelection from "./AttributesSelection/AttributesSelection";
import Header from "./Header/Header";
import MonstersSelection from "./MonstersSelection/MonstersSelection";

function App() {
  return (
    <BrowserRouter>
      <div className="app germania-one-regular">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/character" replace />} />
          <Route path="/character" element={<AttributesSelection />} />
          <Route path="/monster" element={<MonstersSelection />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
