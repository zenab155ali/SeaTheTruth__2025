import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

import { 
  BarChart, Map, Users, Droplet, AlertTriangle, Book, 
  Camera, Globe, Trash2, Share2, Filter, ChevronRight, PieChart
} from "lucide-react";

export default function Home() {
  const [pollutionCounter, setPollutionCounter] = useState(0);
  const [activeTab, setActiveTab] = useState('global');
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const oceanRef = useRef(null);
  
  // Simulating pollution counter that increases over time
  useEffect(() => {
    const interval = setInterval(() => {
      setPollutionCounter(prev => prev + 17); // ~1000kg per minute of plastic entering oceans
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Track scroll progress for animation effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      const progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated ocean waves effect
  useEffect(() => {
    if (oceanRef.current) {
      const waveElements = oceanRef.current.querySelectorAll('.wave');
      waveElements.forEach((wave, index) => {
        wave.style.animationDelay = `${index * 0.2}s`;
      });
    }
  }, []);
  
  // Simulated pollution data
  const pollutionData = [
    { type: 'Plastic', percentage: 40, color: 'bg-blue-500' },
    { type: 'Chemical', percentage: 25, color: 'bg-purple-500' },
    { type: 'Oil', percentage: 15, color: 'bg-yellow-500' },
    { type: 'Sewage', percentage: 12, color: 'bg-green-500' },
    { type: 'Other', percentage: 8, color: 'bg-gray-500' },
  ];

  // Recent community reports
  const communityReports = [
    { 
      id: 1, 
      location: 'Haifa Bay', 
      type: 'Plastic debris', 
      severity: 'High',
      reporter: 'Zaynab Ali.',
      time: '2 hours ago',
      impact: '43 volunteers responded'
    },
    { 
      id: 2, 
      location: 'Tel Aviv Beach', 
      type: 'Oil spill (small)', 
      severity: 'Medium',
      reporter: 'Shadi Hijaze.',
      time: '1 day ago',
      impact: 'Local authorities notified'
    },
    { 
      id: 3, 
      location: 'Eilat Coral Reserve', 
      type: 'Fishing nets', 
      severity: 'Medium',
      reporter: 'Hamza Abu Nemer',
      time: '3 days ago',
      impact: 'Cleanup scheduled'
    }
  ];

  return (
<div style={{width: "100vw", maxWidth: "100%", margin: 0}} className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 overflow-x-hidden">

{/* Animated Ocean Background */}
      <div 
        ref={oceanRef}
        className="fixed bottom-0 left-0 w-full h-24 z-0 overflow-hidden opacity-30 pointer-events-none"
      >
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`wave absolute bottom-0 left-0 w-[200%] h-20 bg-blue-${i*100} opacity-${i*20} rounded-t-full animate-wave`}
            style={{
              animationDuration: `${i*3}s`,
              height: `${i*8}px`,
              zIndex: i,
              transform: 'translateX(0)',
              animation: 'waveAnimation 7s infinite linear'
            }}
          />
        ))}
      </div>

      {/* Alert Banner */}
      <div 
        className="sticky top-0 z-20 bg-red-50 border-b border-red-200 p-3 text-center shadow-sm transition-all duration-500"
        style={{ 
          transform: scrollProgress > 10 ? 'translateY(-100%)' : 'translateY(0)',
          opacity: 1 - (scrollProgress / 20)
        }}
      >
        <p className="text-red-800 font-medium flex items-center justify-center">
          <AlertTriangle className="inline-block mr-2 h-4 w-4" />
          Since you opened this page, approximately <span className="font-bold mx-1">{pollutionCounter.toLocaleString()} kg</span> of plastic waste has entered our oceans
          <button 
            onClick={() => setShowInfoBox(!showInfoBox)}
            className="ml-2 text-xs bg-red-200 hover:bg-red-300 text-red-800 rounded-full h-5 w-5 flex items-center justify-center"
          >
            ?
          </button>
        </p>
        
        {showInfoBox && (
          <div className="bg-white border border-red-200 rounded-lg p-4 shadow-lg max-w-md mx-auto mt-2 text-left text-sm animate-fadeIn">
            <h3 className="font-semibold text-gray-800 mb-1">About this counter</h3>
            <p className="text-gray-600 mb-2">
              This counter is based on research estimating that approximately 8 million metric tons of plastic enters our oceans every year.
            </p>
            <p className="text-gray-600">
              Source: Data compiled from multiple research papers including studies by Science, Nature, and the Ellen MacArthur Foundation.
            </p>
          </div>
        )}
      </div>

      <div style={{width: "100%", maxWidth: "none"}} className="px-4 py-6 relative z-10">
      {/* Hero Section */}
        <div className="bg-white bg-opacity-95 rounded-xl shadow-xl p-8 mb-8 mx-auto text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-500 opacity-10 rounded-full -ml-16 -mb-16"></div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            Sea The Truth
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-700 mb-6">
              Exposing marine pollution through interactive data visualization
            </p>
            
            <p className="text-gray-600 mb-8">
              Our platform provides real-time insights into various forms of ocean pollution: 
              plastic waste, industrial discharge, oil spills, and more — helping to drive 
              awareness and ecological action.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <Link 
                to="/live-data" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg flex items-center"
              >
                Explore Live Data
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
              <Link 
                to="/report" 
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg flex items-center"
              >
                Report Pollution
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Key Pollution Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Globe className="mr-2 h-6 w-6 text-blue-600" />
            Global Marine Pollution Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pollution Type Chart */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Types of Marine Pollution</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {pollutionData.map((item, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700">{item.type}</span>
                      <span className="text-gray-500 font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`${item.color} h-2.5 rounded-full`} 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Map Preview */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Affected Areas</h3>
              <div className="bg-gray-50 rounded-lg p-4 h-64 flex flex-col">
                <div className="mb-3 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button 
                      className={`px-3 py-1 rounded-full text-sm ${activeTab === 'global' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      onClick={() => setActiveTab('global')}
                    >
                      Global
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-full text-sm ${activeTab === 'local' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      onClick={() => setActiveTab('local')}
                    >
                      Israel Coast
                    </button>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <Filter className="h-3 w-3 mr-1" />
                    Filter
                  </button>
                </div>
                
                <div className="flex-1 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://via.placeholder.com/800x400')] bg-cover bg-center"></div>
                  <div className="text-center">
                    <Globe className="h-10 w-10 text-blue-500 mx-auto mb-2 opacity-80" />
                    <p className="text-blue-800 font-medium">
                      Interactive map available
                    </p>
                    <Link to="/live-data" className="text-sm text-blue-600 hover:text-blue-800">
                      Click to explore full map data
                    </Link>
                  </div>
                  
                  {/* Hotspots (would be properly positioned on a real map) */}
                  <div className="absolute top-1/4 left-1/3">
                    <span className="animate-ping absolute h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative rounded-full h-2 w-2 bg-red-500"></span>
                  </div>
                  <div className="absolute bottom-1/3 right-1/4">
                    <span className="animate-ping absolute h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative rounded-full h-2 w-2 bg-red-500"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What You Can Do */}
        <div className="bg-white bg-opacity-95 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How You Can Help</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 hover:shadow-md transition">
              <Map className="h-10 w-10 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Track & Report</h3>
              <p className="text-gray-600 mb-4">Become a citizen scientist by tracking and reporting marine pollution in your area.</p>
              <Link 
                to="/report" 
                className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
              >
                Start reporting
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:shadow-md transition">
              <Trash2 className="h-10 w-10 text-green-600 mb-3" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Join Cleanups</h3>
              <p className="text-gray-600 mb-4">Participate in beach and underwater cleanup events organized by our community.</p>
              <Link 
                to="/events" 
                className="text-green-600 hover:text-green-800 flex items-center font-medium"
              >
                Find events
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 hover:shadow-md transition">
              <Share2 className="h-10 w-10 text-purple-600 mb-3" />
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Spread Awareness</h3>
              <p className="text-gray-600 mb-4">Share our visualizations and reports to help educate others about ocean pollution.</p>
              <button
                className="text-purple-600 hover:text-purple-800 flex items-center font-medium"
              >
                Share now
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Community Activity Feed */}
        <div className="bg-white bg-opacity-95 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Users className="mr-2 h-6 w-6 text-blue-600" />
            Recent Community Reports
          </h2>
          
          <div className="space-y-4">
            {communityReports.map(report => (
              <div key={report.id} className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-gray-800">{report.location}</h3>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      report.severity === 'High' ? 'bg-red-100 text-red-800' :
                      report.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {report.severity}
                    </span>
                  </div>
                  <p className="text-gray-600">{report.type}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span>Reported by {report.reporter} • {report.time}</span>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {report.impact}
                  </span>
                </div>
              </div>
            ))}
            
            <Link to="/community" className="block text-center text-blue-600 hover:text-blue-800 font-medium pt-2">
              View all community reports →
            </Link>
          </div>
        </div>
        
        {/* Multilingual Support & Footer */}
        <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Join the Movement</h2>
              <p className="text-gray-600">
                Help us protect our oceans and make a real difference. Every action counts.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/profile" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow">
                  Create Account
                </Link>
                <Link to="/education" className="text-blue-600 hover:text-blue-800">
                  Educational Resources →
                </Link>
              </div>
            </div>
          </div>
          
          <hr className="my-6 border-gray-200" />
          
          <div className="flex flex-col md:flex-row items-center justify-between text-sm">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500">
                Built by students, driven by purpose. Let's protect our marine world — one action at a time.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-gray-500">Language:</span>
              <button className="font-medium text-blue-600 hover:text-blue-800 transition">English</button>
              <span className="text-gray-300">|</span>
              <button className="hover:text-blue-600 transition">עברית</button>
              <span className="text-gray-300">|</span>
              <button className="hover:text-blue-600 transition">العربية</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS Animation Classes (add to your CSS file) */}
      <style jsx>{`
        @keyframes waveAnimation {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-wave {
          animation: waveAnimation 10s infinite linear;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}