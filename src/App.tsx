import { Header } from "@components/ui/Header";
import { MediaProvider } from "@context/MediaContext";
import Home from "@pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@context/UserContext";
import { ThemeProvider } from "@context/ThemeContext";
import MeetRoom from "@pages/meet/[id]";
import Meet from "@pages/meet";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <MediaProvider>
        <UserProvider>
          <ThemeProvider>
            <main className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-1 mt-[60px]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/meet" element={<Meet />} />
                  <Route path="/meet/:id" element={<MeetRoom />} />
                </Routes>
              </div>
            </main>
          </ThemeProvider>
        </UserProvider>
      </MediaProvider>
    </Router>
  )
}

export default App
