import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckIn from "./checkin/CheckIn";


const NotFound = () => (
  <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem" }}>
    <div style={{ textAlign: "center" }}>
      <h1>404</h1>
      <p>Page not found.</p>
    </div>
  </main>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CheckIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
