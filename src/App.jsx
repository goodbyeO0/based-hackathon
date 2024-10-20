import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import CreateProject from "./Pages/CreateProject";
import Contribute from "./Pages/Contribute";
import Fund from "./Pages/Fund";
import AllProject from "./Pages/AllProject";
import FundMatchingPool from "./Pages/FundMatchingPool";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/fund" element={<Fund />} />
          <Route path="/all-project" element={<AllProject />} />
          <Route path="/matching-pool" element={<FundMatchingPool />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
