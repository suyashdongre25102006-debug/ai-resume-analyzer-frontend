import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  
  const isLoggedIn = !!localStorage.getItem("token");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="logo">Resume Analyzer</div>
        {isLoggedIn && location.pathname !== "/" && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;