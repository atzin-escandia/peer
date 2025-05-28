import { Header } from "@components/ui/Header";
import Home from "@pages/Home";
import Meet from "@pages/Meet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 py-5 mt-[60px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meet" element={<Meet />} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App
