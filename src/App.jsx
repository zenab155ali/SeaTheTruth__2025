import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./jsx-files/Home";
import Profile from "./jsx-files/Profile";
import Report from "./jsx-files/Report";
import LiveData from "./jsx-files/LiveData";
import Education from "./jsx-files/Education";
import DesktopPage from "./jsx-files/DesktopPage";
import Community from "./jsx-files/Community";
import Statistics from "./jsx-files/Statistics";
import './scroll-fixes.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Desktop/Dashboard route */}
        <Route path="/" element={<DesktopPage />} />
        <Route path="/dashboard" element={<DesktopPage />} />
        
        {/* Direct routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />
        <Route path="/live-data" element={<LiveData />} />
        <Route path="/education" element={<Education />} />
        <Route path="/community" element={<Community />} />
        <Route path="/statistics" element={<Statistics />} />
        
        {/* Catch-all route for 404 - This is the key addition */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
              <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
              <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Go Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;