import { Header } from "@components/ui/Header";
import { MediaProvider } from "@context/MediaContext";
import Home from "@pages/Home";
import Meet from "@pages/Meet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <MediaProvider>
        <main className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 py-5 mt-[60px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meet" element={<Meet />} />
            </Routes>
          </div>
        </main>
      </MediaProvider>
    </Router>
  )
}

export default App
