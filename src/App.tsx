import { Header } from "@components/ui/Header";
import { MediaProvider } from "@context/MediaContext";
import Home from "@pages/Home";
import Meet from "@pages/Meet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PreMeet from "@pages/PreMeet";
import { UserProvider } from "@context/UserContext";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <MediaProvider>
        <UserProvider>
          <main className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 mt-[60px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pre-meet" element={<PreMeet />} />
                <Route path="/meet" element={<Meet />} />
              </Routes>
            </div>
          </main>
        </UserProvider>
      </MediaProvider>
    </Router>
  )
}

export default App
