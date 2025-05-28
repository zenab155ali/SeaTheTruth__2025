import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { 
  Filter, Info, Download, ChevronDown, ArrowLeft, ArrowRight,
  Clock, Map as MapIcon, BarChart2, PieChart, Share2, AlertTriangle
} from "lucide-react";

export default function LiveData() {
  const [selectedPollutant, setSelectedPollutant] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('mediterranean');
  const [timeRange, setTimeRange] = useState('month');
  const [activeTab, setActiveTab] = useState('map');
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLegend, setShowLegend] = useState(true);

  // Simulated pollutant types
  const pollutantTypes = [
    { id: 'all', name: 'All Types', color: '#3B82F6' },
    { id: 'plastic', name: 'Plastic Waste', color: '#EF4444' },
    { id: 'oil', name: 'Oil Spills', color: '#F59E0B' },
    { id: 'chemical', name: 'Chemical Discharge', color: '#8B5CF6' },
    { id: 'sewage', name: 'Sewage', color: '#10B981' },
    { id: 'fishing', name: 'Fishing Gear', color: '#6366F1' },
  ];

  // Simulated regions
  const regions = [
    { id: 'mediterranean', name: 'Mediterranean Sea' },
    { id: 'redsea', name: 'Red Sea' },
    { id: 'deadsea', name: 'Dead Sea' },
    { id: 'global', name: 'Global View' },
  ];

  // Time range options
  const timeRanges = [
    { id: 'week', name: 'Past Week' },
    { id: 'month', name: 'Past Month' },
    { id: 'year', name: 'Past Year' },
    { id: 'custom', name: 'Custom Range' },
  ];

  const hotspots = [
    // 🟦 Mediterranean Sea – Plastic Pollution
    { id: 101, lat: 32.0833, lng: 34.7667, type: 'plastic', severity: 'high', name: 'Tel Aviv Offshore' },
    { id: 102, lat: 32.4667, lng: 34.8667, type: 'plastic', severity: 'high', name: 'Hadera Offshore' },
    { id: 103, lat: 32.83, lng: 34.97, type: 'plastic', severity: 'medium', name: 'Haifa Offshore (Fixed)' },
    { id: 104, lat: 31.66, lng: 34.55, type: 'plastic', severity: 'medium', name: 'Ashkelon Offshore (Fixed)' },
  
    // 🟧 Mediterranean Sea – Oil Pollution
    { id: 201, lat: 32.1, lng: 34.7667, type: 'oil', severity: 'high', name: 'Tel Aviv Tar Zone 2021' },
    { id: 202, lat: 32.32, lng: 34.83, type: 'oil', severity: 'high', name: 'Netanya Tar Impact (Fixed)' },
    { id: 203, lat: 31.79, lng: 34.63, type: 'oil', severity: 'medium', name: 'Ashdod Marine Leak (Fixed)' },
    { id: 204, lat: 33.0833, lng: 35.1, type: 'oil', severity: 'low', name: 'Rosh Hanikra Spill Zone' },
  
    // 🟥 Red Sea – Plastic Pollution
    { id: 301, lat: 29.515, lng: 34.922, type: 'plastic', severity: 'medium', name: 'Eilat Coral Beach' },
    { id: 302, lat: 29.55, lng: 34.9333, type: 'plastic', severity: 'medium', name: 'Eilat North Shore' },
  
    // 🟥 Red Sea – Oil Pollution
    { id: 401, lat: 29.5, lng: 34.9167, type: 'oil', severity: 'high', name: 'Pipeline Risk – Gulf of Aqaba' },
    { id: 402, lat: 29.47, lng: 34.96, type: 'oil', severity: 'medium', name: 'Coral Reserve Risk Zone' },
  
    // 🟪 Sea of Galilee – Plastic Pollution
    { id: 501, lat: 32.8667, lng: 35.5833, type: 'plastic', severity: 'medium', name: 'Tiberias Shoreline' },
    { id: 502, lat: 32.8333, lng: 35.6, type: 'plastic', severity: 'low', name: 'Kinneret North Bay' }
  ];
  
  

  // Simulate loading map data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Filter hotspots based on selected pollutant and region
      let filteredHotspots = hotspots;
      
      // Filter by pollutant type if not "all"
      if (selectedPollutant !== 'all') {
        filteredHotspots = filteredHotspots.filter(h => h.type === selectedPollutant);
      }
      
      // Filter by region
      if (selectedRegion !== 'global') {
        // Add region-specific filtering logic here
        // This is a simplified example
        if (selectedRegion === 'mediterranean') {
          filteredHotspots = filteredHotspots.filter(h => h.lat > 31.5 && h.lat < 33.0);
        } else if (selectedRegion === 'redsea') {
          filteredHotspots = filteredHotspots.filter(h => h.lat < 30.0);
        }
      }
      
      setMapData({
        region: selectedRegion,
        pollutant: selectedPollutant,
        timeRange: timeRange,
        hotspots: filteredHotspots,
        stats: {
          total: filteredHotspots.length,
          high: filteredHotspots.filter(h => h.severity === 'high').length,
          medium: filteredHotspots.filter(h => h.severity === 'medium').length,
          low: filteredHotspots.filter(h => h.severity === 'low').length,
        }
      });
      
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [selectedPollutant, selectedRegion, timeRange]);

  // Get severity color
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  // Simulate chart data
  const chartData = {
    pollutantDistribution: [
      { name: 'Plastic', value: 42 },
      { name: 'Oil', value: 18 },
      { name: 'Chemical', value: 25 },
      { name: 'Sewage', value: 10 },
      { name: 'Fishing Gear', value: 5 },
    ],
    timelineData: [
      { month: 'Jan', plastic: 20, oil: 5, chemical: 10, sewage: 3, fishing: 2 },
      { month: 'Feb', plastic: 22, oil: 6, chemical: 12, sewage: 4, fishing: 3 },
      { month: 'Mar', plastic: 25, oil: 8, chemical: 15, sewage: 5, fishing: 2 },
      { month: 'Apr', plastic: 30, oil: 10, chemical: 18, sewage: 6, fishing: 4 },
      { month: 'May', plastic: 35, oil: 12, chemical: 20, sewage: 7, fishing: 3 },
      { month: 'Jun', plastic: 42, oil: 18, chemical: 25, sewage: 10, fishing: 5 },
    ]
  };

  return (
<div style={{width: "100vw", maxWidth: "100%", margin: 0}} className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 overflow-x-hidden">

<div className="w-full px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h1 className="text-2xl font-bold mb-2">Live Pollution Data</h1>
            <p className="opacity-90">
              Interactive visualization of marine pollution across various regions
            </p>
          </div>
          
          {/* Filter Controls */}
          <div className="bg-blue-50 p-4 border-b border-blue-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pollutant Type</label>
                <div className="relative">
                  <select 
                    value={selectedPollutant}
                    onChange={(e) => setSelectedPollutant(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {pollutantTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <div className="relative">
                  <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {regions.map(region => (
                      <option key={region.id} value={region.id}>{region.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                <div className="relative">
                  <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {timeRanges.map(range => (
                      <option key={range.id} value={range.id}>{range.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-end">
              <button 
  onClick={() => {
    // Show loading state
    setLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Custom filtering logic here
      // This would typically be an API call in a real app
      
      // Apply filters and update map data
      let filteredHotspots = hotspots;
      
      if (selectedPollutant !== 'all') {
        filteredHotspots = filteredHotspots.filter(h => h.type === selectedPollutant);
      }
      
      if (selectedRegion !== 'global') {
        // Region-specific filtering
        if (selectedRegion === 'mediterranean') {
          filteredHotspots = filteredHotspots.filter(h => h.lat > 31.5 && h.lat < 33.0);
        } else if (selectedRegion === 'redsea') {
          filteredHotspots = filteredHotspots.filter(h => h.lat < 30.0);
        }
      }
      
      if (timeRange === 'week') {
        // Show only recent data
        filteredHotspots = filteredHotspots.slice(0, Math.ceil(filteredHotspots.length * 0.3));
      } else if (timeRange === 'month') {
        filteredHotspots = filteredHotspots.slice(0, Math.ceil(filteredHotspots.length * 0.7));
      }
      
      setMapData({
        region: selectedRegion,
        pollutant: selectedPollutant,
        timeRange: timeRange,
        hotspots: filteredHotspots,
        stats: {
          total: filteredHotspots.length,
          high: filteredHotspots.filter(h => h.severity === 'high').length,
          medium: filteredHotspots.filter(h => h.severity === 'medium').length,
          low: filteredHotspots.filter(h => h.severity === 'low').length,
        }
      });
      
      setLoading(false);
    }, 800);
  }}
  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
>
  <Filter className="h-4 w-4 mr-1" />
  Apply Filters
</button>
              </div>
            </div>
          </div>
          
          {/* View Selection Tabs */}
          <div className="bg-white border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('map')}
                className={`px-4 py-3 font-medium text-sm flex items-center ${
                  activeTab === 'map' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MapIcon className="h-4 w-4 mr-1" />
                Map View
              </button>
              <button
                onClick={() => setActiveTab('chart')}
                className={`px-4 py-3 font-medium text-sm flex items-center ${
                  activeTab === 'chart' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart2 className="h-4 w-4 mr-1" />
                Chart View
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-3 font-medium text-sm flex items-center ${
                  activeTab === 'timeline' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Clock className="h-4 w-4 mr-1" />
                Timeline
              </button>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-6">
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-gray-600">Loading data...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Map Visualization */}
<div className="h-96 rounded-lg overflow-hidden relative">
  <MapContainer 
    center={[31.5, 34.8]} 
    zoom={7.5} 
    style={{height: "100%", width: "100%"}}
    whenCreated={(map) => {
      map.on('zoomend', () => {
        // Adjust marker sizes on zoom
        const zoom = map.getZoom();
        // You can implement dynamic sizing based on zoom level here
      });
    }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    
    <LayersControl position="topright">
      {/* Base layers */}
      <LayersControl.BaseLayer checked name="Standard">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Satellite">
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      </LayersControl.BaseLayer>
      
      {/* Plastic Pollution Layer */}
      <LayersControl.Overlay checked={selectedPollutant === 'all' || selectedPollutant === 'plastic'} name="Plastic Pollution">
        <LayerGroup>
          {mapData && mapData.hotspots
            .filter(h => h.type === 'plastic')
            .map(hotspot => (
              <CircleMarker 
                key={hotspot.id}
                center={[hotspot.lat, hotspot.lng]}
                radius={hotspot.severity === 'high' ? 15 : hotspot.severity === 'medium' ? 10 : 7}
                pathOptions={{
                  color: '#EF4444',
                  fillOpacity: 0.7,
                  weight: 2
                }}
                eventHandlers={{
                  mouseover: (e) => {
                    e.target.openPopup();
                    e.target.setStyle({ weight: 3, fillOpacity: 0.9 });
                  },
                  mouseout: (e) => {
                    e.target.closePopup();
                    e.target.setStyle({ weight: 2, fillOpacity: 0.7 });
                  }
                }}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-red-600">{hotspot.name}</h3>
                    <p><span className="font-medium">Type:</span> Plastic Waste</p>
                    <p><span className="font-medium">Severity:</span> {hotspot.severity.charAt(0).toUpperCase() + hotspot.severity.slice(1)}</p>
                    <p className="text-xs text-gray-500 mt-1">Last updated: April 14, 2025</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
        </LayerGroup>
      </LayersControl.Overlay>
      
      {/* Add similar code for the other pollution types */}
      {/* Oil Spill Layer */}
      <LayersControl.Overlay checked={selectedPollutant === 'all' || selectedPollutant === 'oil'} name="Oil Spills">
        <LayerGroup>
          {mapData && mapData.hotspots
            .filter(h => h.type === 'oil')
            .map(hotspot => (
              <CircleMarker 
                key={hotspot.id}
                center={[hotspot.lat, hotspot.lng]}
                radius={hotspot.severity === 'high' ? 15 : hotspot.severity === 'medium' ? 10 : 7}
                pathOptions={{
                  color: '#F59E0B',
                  fillOpacity: 0.7,
                  weight: 2
                }}
                eventHandlers={{
                  mouseover: (e) => {
                    e.target.openPopup();
                    e.target.setStyle({ weight: 3, fillOpacity: 0.9 });
                  },
                  mouseout: (e) => {
                    e.target.closePopup();
                    e.target.setStyle({ weight: 2, fillOpacity: 0.7 });
                  }
                }}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-yellow-600">{hotspot.name}</h3>
                    <p><span className="font-medium">Type:</span> Oil Spill</p>
                    <p><span className="font-medium">Severity:</span> {hotspot.severity.charAt(0).toUpperCase() + hotspot.severity.slice(1)}</p>
                    <p className="text-xs text-gray-500 mt-1">Last updated: April 14, 2025</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
        </LayerGroup>
      </LayersControl.Overlay>
      
      {/* Continue with Chemical and Sewage layers */}
    </LayersControl>
  </MapContainer>
  
  {/* Add a map loading overlay for a professional touch */}
  {loading && (
    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-gray-600">Loading map data...</p>
      </div>
    </div>
  )}
</div>
                
                {/* Chart View */}
                {activeTab === 'chart' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Pollution Distribution by Type</h3>
                    
                    {/* Simulated chart - in reality, you would use a charting library like Recharts */}
                    <div className="h-80 bg-white rounded-lg border border-gray-200 p-4 flex">
                      <div className="w-1/2 h-full flex items-end space-x-6 justify-center">
                        {chartData.pollutantDistribution.map((item, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className="w-16 bg-blue-500 rounded-t-md"
                              style={{ 
                                height: `${item.value * 2}px`,
                                backgroundColor: pollutantTypes[index + 1]?.color || '#3B82F6'
                              }}
                            ></div>
                            <p className="text-xs text-gray-500 mt-1">{item.name}</p>
                            <p className="text-sm font-semibold">{item.value}%</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="w-1/2 h-full flex justify-center items-center">
                        {/* Simulated pie chart */}
                        <div className="relative w-48 h-48">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* This is a simplified pie chart simulation */}
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#ddd" strokeWidth="20" />
                            
                            {/* We'll create pie segments */}
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              fill="none" 
                              stroke={pollutantTypes[1].color}
                              strokeWidth="20" 
                              strokeDasharray={`${chartData.pollutantDistribution[0].value * 2.51} 251`}
                              strokeDashoffset="0"
                              transform="rotate(-90 50 50)"
                            />
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              fill="none" 
                              stroke={pollutantTypes[2].color}
                              strokeWidth="20" 
                              strokeDasharray={`${chartData.pollutantDistribution[1].value * 2.51} 251`}
                              strokeDashoffset={`${-(chartData.pollutantDistribution[0].value * 2.51)}`}
                              transform="rotate(-90 50 50)"
                            />
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              fill="none" 
                              stroke={pollutantTypes[3].color}
                              strokeWidth="20" 
                              strokeDasharray={`${chartData.pollutantDistribution[2].value * 2.51} 251`}
                              strokeDashoffset={`${-((chartData.pollutantDistribution[0].value + chartData.pollutantDistribution[1].value) * 2.51)}`}
                              transform="rotate(-90 50 50)"
                            />
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              fill="none" 
                              stroke={pollutantTypes[4].color}
                              strokeWidth="20" 
                              strokeDasharray={`${chartData.pollutantDistribution[3].value * 2.51} 251`}
                              strokeDashoffset={`${-((chartData.pollutantDistribution[0].value + chartData.pollutantDistribution[1].value + chartData.pollutantDistribution[2].value) * 2.51)}`}
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-3xl font-bold text-gray-800">100%</p>
                              <p className="text-sm text-gray-500">Total</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-96 rounded-lg overflow-hidden relative">
 
</div>
                  </div>
                )}
                
                {/* Timeline View */}
                {activeTab === 'timeline' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Pollution Trends Over Time</h3>
                    
                    {/* Timeline navigation */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                          <ArrowLeft className="h-5 w-5" />
                        </button>
                        <div className="text-gray-700 font-medium flex items-center">
                          January - June 2025
                        </div>
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>
                      <div>
                        <select className="text-sm border-gray-300 rounded-md">
                          <option>Monthly</option>
                          <option>Quarterly</option>
                          <option>Yearly</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Simulated timeline chart */}
                    <div className="h-80 bg-white rounded-lg border border-gray-200 p-4">
                      <div className="h-full flex flex-col">
                        <div className="flex-1 flex items-end relative">
                          {/* Y-axis labels */}
                          <div className="absolute inset-y-0 left-0 w-10 flex flex-col justify-between text-xs text-gray-500 py-2">
                            <div>50</div>
                            <div>40</div>
                            <div>30</div>
                            <div>20</div>
                            <div>10</div>
                            <div>0</div>
                          </div>
                          
                          {/* Horizontal grid lines */}
                          <div className="absolute inset-0 left-10 flex flex-col justify-between">
                            {[0, 1, 2, 3, 4, 5].map(i => (
                              <div key={i} className="border-b border-gray-200 w-full"></div>
                            ))}
                          </div>
                          
                          {/* Chart bars */}
                          <div className="flex-1 flex justify-around items-end ml-10">
                            {chartData.timelineData.map((item, index) => (
                              <div key={index} className="flex items-end space-x-1">
                                <div 
                                  className="w-3 bg-red-500 rounded-t-sm" 
                                  style={{ height: `${item.plastic * 4}px` }}
                                  title={`Plastic: ${item.plastic}`}
                                ></div>
                                <div 
                                  className="w-3 bg-yellow-500 rounded-t-sm" 
                                  style={{ height: `${item.oil * 4}px` }}
                                  title={`Oil: ${item.oil}`}
                                ></div>
                                <div 
                                  className="w-3 bg-purple-500 rounded-t-sm" 
                                  style={{ height: `${item.chemical * 4}px` }}
                                  title={`Chemical: ${item.chemical}`}
                                ></div>
                                <div 
                                  className="w-3 bg-green-500 rounded-t-sm" 
                                  style={{ height: `${item.sewage * 4}px` }}
                                  title={`Sewage: ${item.sewage}`}
                                ></div>
                                <div 
                                  className="w-3 bg-blue-500 rounded-t-sm" 
                                  style={{ height: `${item.fishing * 4}px` }}
                                  title={`Fishing: ${item.fishing}`}
                                ></div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* X-axis labels */}
                        <div className="h-6 flex justify-around ml-10">
                          {chartData.timelineData.map((item, index) => (
                            <div key={index} className="text-xs text-gray-500">
                              {item.month}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* CSS Animations */}
<style jsx>{`
  @keyframes pulseMarker {
    0% { r: 10; opacity: 0.7; }
    50% { r: 12; opacity: 0.9; }
    100% { r: 10; opacity: 0.7; }
  }

  .high-severity-marker {
    animation: pulseMarker 1.5s infinite;
  }

  @keyframes dataFlow {
    0% { stroke-dashoffset: 1000; }
    100% { stroke-dashoffset: 0; }
  }

  .data-flow-line {
    stroke-dasharray: 10, 5;
    animation: dataFlow 30s linear infinite;
  }
`}</style>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex mt-4 justify-center flex-wrap gap-4">
                      {pollutantTypes.slice(1).map((type, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="h-3 w-3 rounded-sm mr-1"
                            style={{ backgroundColor: type.color }}
                          ></div>
                          <span className="text-sm text-gray-700">{type.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Trend Analysis</h3>
                      
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <p className="text-gray-800">
                          <span className="font-medium">Key observations:</span>
                        </p>
                        <ul className="mt-2 space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                            Overall pollution levels have increased by 32% since January, with plastic waste showing the steepest rise.
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                            Chemical discharge spiked in April following increased industrial activity.
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                            Oil spill incidents have shown a consistent upward trend, particularly in shipping lanes.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          
          {/* Footer Actions */}
          <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">
                Last updated: April 14, 2025, 10:32 AM
              </span>
            </div>
            <div className="flex space-x-3">
              <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Export Data
              </button>
              <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                <Share2 className="h-4 w-4 mr-1" />
                Share View
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional information */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Data</h2>
          
          <div className="prose max-w-none text-gray-600">
            <p>
              The pollution data presented in Sea The Truth is collected from multiple sources, including:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Satellite imagery analysis for large-scale pollution detection</li>
              <li>IoT sensors deployed along coastlines for real-time monitoring</li>
              <li>Research vessels conducting water quality testing</li>
              <li>Community reports from our global network of volunteers</li>
              <li>Government environmental agencies' public datasets</li>
            </ul>
            
            <p className="mt-4">
              Data is refreshed hourly for real-time monitoring stations and daily for satellite and aggregated reports.
              Our severity classifications are based on international standards for marine pollution assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

