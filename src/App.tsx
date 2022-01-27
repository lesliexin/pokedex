import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Pokedex } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":pokemon" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
