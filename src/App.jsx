import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import CreateProject from "./Pages/CreateProject";
import Contribute from "./Pages/Contribute";
import Fund from "./Pages/Fund";
import TestCode from "./Pages/TestCode";
import AllProject from "./Pages/AllProject";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/fund" element={<Fund />} />
          <Route path="/test" element={<TestCode />} />
          <Route path="/all-project" element={<AllProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
