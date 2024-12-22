import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./views/Homepage";
import Detailpage from "./views/Detailpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:id" element={<Detailpage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
