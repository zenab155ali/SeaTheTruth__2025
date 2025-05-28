import React, { useState } from 'react';
import { Home, Settings, User, Mail, Bell, Book, Users, BarChart2, Globe, Map } from 'lucide-react';

// Data Statistics Component
const DataVisualization = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data statistics (replace with your actual data)
  const dataStats = {
    totalSamples: 9100,
    regions: 12,
    timeSpan: '2013-2025',
    avgConcentration: 0.0156,
    maxConcentration: 0.175,
    hotspots: 15,
    countries: 23
  };

  const regionData = [
    { name: 'Gulf of Mexico', samples: 2341, avgConcentration: 0.0289, status: 'High' },
    { name: 'Caribbean Sea', samples: 1876, avgConcentration: 0.0198, status: 'Medium' },
    { name: 'Mediterranean Sea', samples: 1543, avgConcentration: 0.0234, status: 'High' },
    { name: 'North Sea', samples: 1234, avgConcentration: 0.0145, status: 'Medium' },
    { name: 'Baltic Sea', samples: 987, avgConcentration: 0.0123, status: 'Low' },
    { name: 'Atlantic Open Ocean', samples: 561, avgConcentration: 0.0089, status: 'Low' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Atlantic Ocean Microplastic Data Analysis</h2>
        <div className="flex items-center space-x-2">
          <DatabaseIcon className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">Dataset: Marine_Microplastics_WGS84</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'overview' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Data Overview
        </button>
        <button
          onClick={() => setActiveTab('regions')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'regions' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Regional Analysis
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'results' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Model Results
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">{dataStats.totalSamples.toLocaleString()}</div>
              <div className="text-sm text-blue-600">Total Samples</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">{dataStats.regions}</div>
              <div className="text-sm text-green-600">Ocean Regions</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">{dataStats.timeSpan}</div>
              <div className="text-sm text-purple-600">Time Period</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-700">{dataStats.hotspots}</div>
              <div className="text-sm text-orange-600">Pollution Hotspots</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Concentration Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Average:</span>
                  <span className="font-medium">{dataStats.avgConcentration} pieces/m³</span>
                </div>
                <div className="flex justify-between">
                  <span>Maximum:</span>
                  <span className="font-medium">{dataStats.maxConcentration} pieces/m³</span>
                </div>
                <div className="flex justify-between">
                  <span>Unit:</span>
                  <span className="font-medium">pieces/m³</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Geographic Coverage</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Latitude Range:</span>
                  <span className="font-medium">-54° to 65°</span>
                </div>
                <div className="flex justify-between">
                  <span>Longitude Range:</span>
                  <span className="font-medium">-100° to 30°</span>
                </div>
                <div className="flex justify-between">
                  <span>Countries:</span>
                  <span className="font-medium">{dataStats.countries}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Sampling Methods</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Grab Sample:</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="flex justify-between">
                  <span>Manta Net:</span>
                  <span className="font-medium">32%</span>
                </div>
                <div className="flex justify-between">
                  <span>Hand Picking:</span>
                  <span className="font-medium">23%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'regions' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Region</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Samples</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Avg Concentration</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Status</th>
              </tr>
            </thead>
            <tbody>
              {regionData.map((region, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800 font-medium">{region.name}</td>
                  <td className="py-3 px-4 text-gray-600">{region.samples.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{region.avgConcentration} pieces/m³</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(region.status)}`}>
                      {region.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'results' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">PCA Analysis Results</h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="font-medium text-blue-800 mb-2">PC1 - Geographic Gradient (40%)</div>
              <p className="text-sm text-blue-700">Explains spatial distribution patterns based on latitude and longitude</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="font-medium text-green-800 mb-2">PC2 - Temporal Variation (25%)</div>
              <p className="text-sm text-green-700">Captures pollution trends over time and seasonal patterns</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="font-medium text-purple-800 mb-2">PC3 - Sampling Methods (20%)</div>
              <p className="text-sm text-purple-700">Accounts for methodological differences in data collection</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Scenario Analysis</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">Baseline Scenario</span>
                <span className="text-sm text-blue-600">+15% change</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-gray-800">Stress Scenario</span>
                <span className="text-sm text-red-600">+250% change</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-800">Recovery Scenario</span>
                <span className="text-sm text-green-600">-35% change</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Model Results Gallery Component
const ModelResultsGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 'pic1', title: 'Spatial Distribution Map', description: 'Geographic distribution of microplastic samples across the Atlantic Ocean' },
    { id: 'pic2', title: 'Spatial Correlogram', description: 'Correlation analysis showing spatial relationships in pollution levels' },
    { id: 'pic333', title: 'PCA Biplot Analysis', description: 'Principal Component Analysis revealing main data patterns' },
    { id: 'pic33', title: 'Kriging Prediction Map', description: 'Interpolated pollution surface across the Atlantic Ocean' },
    { id: 'pic5', title: 'Uncertainty Assessment', description: 'Prediction confidence levels and data quality assessment' },
    { id: 'pic6', title: 'Baseline Scenario', description: 'Current state projection under normal conditions' },
    { id: 'pic7', title: 'Stress Scenario', description: 'System response under increased pollution pressure' },
    { id: 'pic8', title: 'Recovery Scenario', description: 'Pollution reduction with active cleanup efforts' },
    { id: 'pic9', title: 'Scenario Comparison', description: 'Comparative analysis of all three scenarios' },
    { id: 'pic10', title: 'Quantitative Analysis', description: 'Statistical comparison and key metrics summary' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Model Results & Visualizations</h2>
        <Map className="h-6 w-6 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div 
            key={image.id}
            className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <img 
                src={`/images/${image.id}.png`} 
                alt={image.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full items-center justify-center text-blue-600">
                <div className="text-center">
                  <BarChart2 className="h-12 w-12 mx-auto mb-2" />
                  <div className="text-sm font-medium">{image.title}</div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{image.title}</h3>
              <p className="text-sm text-gray-600">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedImage.title}</h3>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <img 
                src={`/images/${selectedImage.id}.png`} 
                alt={selectedImage.title}
                className="w-full h-auto max-h-[60vh] object-contain mb-4"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden text-center text-gray-500 py-8">
                <BarChart2 className="h-16 w-16 mx-auto mb-4" />
                <p>Image not found: {selectedImage.id}.png</p>
                <p className="text-sm mt-2">Please save this image from your Colab notebook</p>
              </div>
              <p className="text-gray-600">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function DesktopPage() {
  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/home" },
    { icon: <Globe size={20} />, label: "Live Data", path: "/live-data" },
    { icon: <PieChartIcon size={20} />, label: "Statistics", path: "/statistics" },
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
            <a
              key={i}
              href={item.path}
              className="px-6 py-3 flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
            >
              <div className="mr-3 text-gray-500">{item.icon}</div>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex justify-center mt-8 mb-16">
          <img 
            src="/images/logo2.gif" 
            alt="Sea The Truth Logo" 
            className="h-400 w-60 rounded-lg object-cover" 
          />
        </div>


      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Atlantic Ocean Microplastic Analysis</h2>
              <p className="text-sm text-gray-500">Comprehensive spatial-statistical modeling dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Settings size={20} />
              </button>
              <a href="/profile" className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                ZA
              </a>
              <img 
                src="/images/logo.png" 
                alt="Sea The Truth Logo" 
                className="h-8 w-8 rounded-lg object-cover ml-2" 
              />
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-8 overflow-auto bg-gray-50">
          <div className="mb-8 flex items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                Microplastic <br/>
                Research <br/>
                Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Advanced spatial-statistical analysis of Atlantic Ocean pollution patterns
              </p>
            </div>
            <div className="ml-2 flex-shrink-0">
              <img 
                src="/images/logo1.gif" 
                alt="Sea The Truth Logo" 
                className="h-58 w-auto object-contain" 
              />
            </div>
          </div>

          {/* Data Visualization Section */}
          <DataVisualization />

          {/* Model Results Gallery */}
          <ModelResultsGallery />
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DatabaseIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-700">Total Samples</h2>
                  <p className="text-2xl font-bold text-blue-600">8,542</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUpIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-700">PCA Variance</h2>
                  <p className="text-2xl font-bold text-green-600">85%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <ActivityIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-700">Hotspots Found</h2>
                  <p className="text-2xl font-bold text-purple-600">15</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Map className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-700">Ocean Regions</h2>
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Colab Integration Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Live Analysis Environment</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Connected to Colab</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 mb-4">
                Access the complete interactive analysis environment including all code, 
                data processing, and advanced visualizations.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://colab.research.google.com/drive/1VTsIfpI96MaM3oNQCS8QNPSCI2AqDY1a#scrollTo=o0uIgP1Mx1iU" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Open in Colab
                </a>
 
              </div>
            </div>
            

          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 border-t text-center text-sm text-gray-500">
          © 2025 Sea The Truth - Marine Microplastic Research Project. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

// Custom Icons (to avoid conflicts with lucide-react)
const DatabaseIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 3 4 6 9 6s9-3 9-6V5" />
    <path d="M3 12c0 3 4 6 9 6s9-3 9-6" />
  </svg>
);

const TrendingUpIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const ActivityIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const PieChartIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

const Trash2 = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);