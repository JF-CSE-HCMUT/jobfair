import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import BrandAssetsPage from "../pages/brand/BrandAssetsPage";


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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/brand-assets" element={<BrandAssetsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
