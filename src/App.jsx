import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import CreateProject from "./Pages/CreateProject";
import Contribute from "./Pages/Contribute";
import Fund from "./Pages/Fund";
import TestCode from "./Pages/TestCode";

function App() {
  return (
    <>
      <div className=" flex flex-col min-h-screen">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/fund" element={<Fund />} />
            <Route path="/test" element={<TestCode />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
