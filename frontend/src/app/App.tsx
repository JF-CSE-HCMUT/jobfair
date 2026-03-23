import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import BrandAssetsPage from "../pages/brand/BrandAssetsPage";

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.slice(1);

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const scrollToTarget = () => {
      const target = document.getElementById(decodeURIComponent(hash));
      if (target) {
        target.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    };

    const rafId = window.requestAnimationFrame(scrollToTarget);
    const timeoutId = window.setTimeout(scrollToTarget, 180);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [location.hash, location.pathname]);

  return null;
};


const NotFound = () => (
  <main className="app-not-found">
    <div className="app-not-found__content">
      <h1>404</h1>
      <p>Page not found.</p>
    </div>
  </main>
);

const App = () => (
  <BrowserRouter>
    <ScrollToHash />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/brand-assets" element={<BrandAssetsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
