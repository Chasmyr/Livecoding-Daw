import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LiveCoding } from "./pages/LiveCoding";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LiveCoding />} />
      </Routes>
    </Router>
  );
}
