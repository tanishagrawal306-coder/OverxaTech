import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CustomCursor from "@/components/site/CustomCursor";
import SmoothScroll from "@/components/site/SmoothScroll";
import PageLoader from "@/components/site/PageLoader";
import ScrollProgress from "@/components/site/ScrollProgress";
import BookCallModal from "@/components/site/BookCallModal";
import { BookCallProvider } from "@/components/site/BookCallProvider";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="App min-h-screen bg-[#050816] text-white">
      <BrowserRouter>
        <BookCallProvider>
          <PageLoader active={loading} />
          <CustomCursor />
          <SmoothScroll />
          <ScrollProgress />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <BookCallModal />
          <Toaster theme="dark" position="bottom-right" />
        </BookCallProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
