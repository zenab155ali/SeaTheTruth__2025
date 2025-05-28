import React from 'react';
import { Home, Settings, User, Mail, Bell, Book, Users, BarChart2, Globe, PieChart } from 'lucide-react';
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/home" },
    { icon: <Globe size={20} />, label: "Live Data", path: "/live-data" },
    { icon: <PieChart size={20} />, label: "Statistics", path: "/statistics" },
    { icon: <Mail size={20} />, label: "Report Pollution", path: "/report" },
    { icon: <Users size={20} />, label: "Community", path: "/community" },
    { icon: <Book size={20} />, label: "Education", path: "/education" },
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-2">
              <span className="font-bold">ST</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Sea The Truth</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">Marine pollution awareness platform</p>
        </div>
        <nav className="mt-2">
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="px-6 py-3 flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
            >
              <div className="mr-3 text-gray-500">{item.icon}</div>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <div className="flex justify-center mt-8 mb-16">
          <img 
            src="/images/logo2.gif" 
            alt="Sea The Truth Logo" 
            className="h-100 w-60 rounded-lg object-cover" 
          />
        </div>

        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <img 
              src="/images/photo.jpg" 
              alt="Profile" 
              className="w-10 h-10 rounded-full mr-3" 
            />
            <div>
              <p className="text-sm font-medium text-gray-800">Zaynab Ali</p>
              <p className="text-xs text-gray-500">Environmental Activist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Dashboard Overview</h2>
              <p className="text-sm text-gray-500">Welcome to Sea The Truth platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Settings size={20} />
              </button>
              <Link to="/profile" className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                ZA
              </Link>
              <img 
                src="/images/logo.png" 
                alt="Sea The Truth Logo" 
                className="h-8 w-8 rounded-lg object-cover ml-2" 
              />
            </div>
          </div>
        </header>

        {/* Page content - this is where child routes will be rendered */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 border-t text-center text-sm text-gray-500">
          © 2025 Sea The Truth. All rights reserved. | <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a> | <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a>
        </footer>
      </div>
    </div>
  );
}

// Add this missing component if you need it elsewhere
export const Trash2 = ({ className, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
};