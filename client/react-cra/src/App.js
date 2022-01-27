import "./App.css";
import { Producer } from "./page/Producer";
import { Consumer } from "./page/Consumer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/consumer" element={<Consumer />} />
        <Route path="/" element={<Producer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
