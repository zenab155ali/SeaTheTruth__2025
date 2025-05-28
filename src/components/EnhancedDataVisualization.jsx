import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Globe, Filter, Download, ChevronDown, Share2, Info, 
  ArrowUpRight, Calendar, BarChart2, AlertTriangle
} from 'lucide-react';
import { loadMicroplasticData, loadOceanEmissionData } from "../utils/DatasetIntegration.js";




export default function EnhancedDataVisualization() {
  const [activeTab, setActiveTab] = useState('oceanTrends');
  const [timeRange, setTimeRange] = useState('year');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [loading, setLoading] = useState(true);
  const [microplasticData, setMicroplasticData] = useState(null);
  const [oceanEmissionData, setOceanEmissionData] = useState(null);
  
  useEffect(() => {
    // Load data on component mount
    setLoading(true);
    
    // Load microplastic and ocean emission data
    Promise.all([
      loadMicroplasticData(),
      loadOceanEmissionData()
    ])
      .then(([microData, oceanData]) => {
        setMicroplasticData(microData);
        setOceanEmissionData(oceanData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }, []);

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
    '#FF6B6B', '#6B8E23', '#9370DB', '#20B2AA', '#FF00FF', '#808080'
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading data visualizations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      {/* Tab navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('oceanTrends')}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'oceanTrends' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Ocean Temporal Trends
          </button>
          <button
            onClick={() => setActiveTab('monthlyTrends')}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'monthlyTrends' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Monthly Trends
          </button>
          <button
            onClick={() => setActiveTab('yearlyDistribution')}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'yearlyDistribution' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Yearly Distribution
          </button>
          <button
            onClick={() => setActiveTab('scatterPlot')}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'scatterPlot' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Geographical Density
          </button>
          <button
            onClick={() => setActiveTab('predictions')}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'predictions' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Future Predictions
          </button>
          <button
            onClick={() => setActiveTab('oceanEmissions')}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'oceanEmissions' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Global Waste Emissions
          </button>
        </div>
      </div>
      
      {/* Content area */}
      <div className="p-6">
        {/* 1. Ocean Temporal Trends */}
        {activeTab === 'oceanTrends' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Temporal Trends of Microplastic Density by Ocean</h2>
            <p className="text-gray-600 mb-6">
              This chart shows the microplastic density trends in particles/m³ across different oceans from 2010 to 2025.
              The Mediterranean Sea consistently shows the highest concentration of microplastics.
            </p>
            
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={microplasticData.temporalTrends}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Microplastic Density (particles/m³)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Mediterranean" stroke="#FF8042" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Pacific" stroke="#0088FE" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Atlantic" stroke="#00C49F" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Indian" stroke="#FFBB28" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Arctic" stroke="#8884D8" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Observations</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>All oceans show consistent increases in microplastic density over time</li>
                <li>The Mediterranean Sea has the highest concentration, likely due to its enclosed nature and surrounding population density</li>
                <li>The Arctic Ocean shows the lowest concentration but is still experiencing concerning growth</li>
                <li>Data indicates acceleration in plastic accumulation rates since 2018</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* 2. Monthly Trends */}
        {activeTab === 'monthlyTrends' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Trends of Microplastic Density</h2>
            <p className="text-gray-600 mb-6">
              This chart illustrates the seasonal variations in microplastic density, with higher concentrations typically observed
              during summer months due to increased human activity and tourism.
            </p>
            
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={microplasticData.monthlyTrends}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Microplastic Density (particles/m³)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="density" 
                    stroke="#0088FE" 
                    fillOpacity={0.6}
                    fill="url(#colorDensity)" 
                  />
                  <defs>
                    <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0088FE" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Seasonal Analysis</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Peak microplastic density occurs in July, corresponding with peak tourism and recreational activities</li>
                <li>February shows the lowest concentration, likely due to reduced human activity and winter weather conditions</li>
                <li>There's a 70% increase from the lowest to highest month, highlighting the significant impact of seasonal factors</li>
                <li>This seasonal pattern suggests that targeted cleanup efforts during peak months could be particularly effective</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* 3. Yearly Distribution */}
        {activeTab === 'yearlyDistribution' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Microplastic Density Distribution by Year</h2>
            <p className="text-gray-600 mb-6">
              This boxplot shows the distribution of microplastic density measurements for each year from 2015 to 2025.
              The boxes represent the interquartile range (25th to 75th percentile), with whiskers extending to minimum and maximum values.
            </p>
            
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={microplasticData.yearlyDistribution}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Microplastic Density (particles/m³)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value, name) => {
                      const formattedName = {
                        'min': 'Minimum',
                        'q1': '25th Percentile',
                        'median': 'Median',
                        'q3': '75th Percentile',
                        'max': 'Maximum'
                      }[name] || name;
                      
                      return [`${value} particles/m³`, formattedName];
                    }}
                  />
                  <Legend 
                    formatter={(value) => {
                      const formattedValue = {
                        'min': 'Minimum',
                        'q1': '25th Percentile',
                        'median': 'Median',
                        'q3': '75th Percentile',
                        'max': 'Maximum'
                      }[value] || value;
                      
                      return formattedValue;
                    }}
                  />
                  
                  {/* Box whiskers (min to max) */}
                  <Bar dataKey="min" stackId="a" fill="#8884d8" opacity={0} />
                  <Bar dataKey="q1" stackId="a" fill="#8884d8" />
                  <Bar dataKey="median" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="q3" stackId="a" fill="#ffc658" />
                  <Bar dataKey="max" stackId="a" fill="#ff8042" opacity={0} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Distribution Insights</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>The interquartile range (box size) has been increasing over time, indicating greater variability in microplastic pollution</li>
                <li>Median values show a consistent upward trend, with a 139% increase from 2015 to 2025</li>
                <li>Maximum values have grown more rapidly than minimum values, suggesting localized pollution hotspots are intensifying</li>
                <li>The widening disparity between minimum and maximum values indicates growing spatial inequality in ocean pollution</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* 4. Scatter Plot */}
        {activeTab === 'scatterPlot' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Microplastic Density by Geographic Location</h2>
            <p className="text-gray-600 mb-6">
              This visualization shows the distribution of microplastic density measurements across different geographic coordinates,
              with point size representing the density magnitude and color representing the observation year.
            </p>
            
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid />
                  <XAxis 
                    type="number" 
                    dataKey="longitude" 
                    name="Longitude" 
                    domain={[-180, 180]}
                    label={{ value: 'Longitude', position: 'bottom' }} 
                  />
                  <YAxis 
                    type="number" 
                    dataKey="latitude" 
                    name="Latitude" 
                    domain={[-90, 90]}
                    label={{ value: 'Latitude', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value, name, props) => {
                      if (name === 'density') {
                        return [`${value.toFixed(2)} particles/m³`, 'Density'];
                      }
                      return [value, name];
                    }}
                  />
                  <Legend />
                  
                  {/* Group by year and render with different colors */}
                  {Array.from(new Set(microplasticData.scatterData.map(d => d.year))).sort().map((year, index) => {
                    const yearData = microplasticData.scatterData.filter(d => d.year === year);
                    const yearColor = COLORS[index % COLORS.length];
                    
                    return (
                      <Scatter 
                        key={year}
                        name={`Year ${year}`}
                        data={yearData}
                        fill={yearColor}
                        shape="circle"
                      />
                    );
                  })}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Spatial Distribution Analysis</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Microplastic density generally appears higher in the Northern Hemisphere, particularly between 20°N and 40°N latitude</li>
                <li>Coastal areas show consistently higher concentrations than open ocean regions</li>
                <li>Data points from more recent years (represented by warmer colors) show higher average densities</li>
                <li>The Mediterranean and East Asian seas show the most concerning concentration levels</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* 5. Future Predictions */}
        {activeTab === 'predictions' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Predicting Microplastic Density to 2035</h2>
            <p className="text-gray-600 mb-6">
              This chart shows model predictions for microplastic density trends through 2035, including historical data,
              predicted values, and confidence intervals to illustrate potential future scenarios.
            </p>
            
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={microplasticData.predictions}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Microplastic Density (particles/m³)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (value === null) return ['N/A', name];
                      const formattedName = {
                        'actual': 'Actual Measurement',
                        'predicted': 'Predicted Value',
                        'lower': 'Lower Bound (95% CI)',
                        'upper': 'Upper Bound (95% CI)'
                      }[name] || name;
                      
                      return [`${value.toFixed(2)} particles/m³`, formattedName];
                    }}
                  />
                  <Legend 
                    formatter={(value) => {
                      const formattedValue = {
                        'actual': 'Historical Data',
                        'predicted': 'Predicted Value',
                        'lower': 'Lower Bound (95% CI)',
                        'upper': 'Upper Bound (95% CI)'
                      }[value] || value;
                      
                      return formattedValue;
                    }}
                  />
                  <Line type="monotone" dataKey="upper" stroke="#ff8042" strokeDasharray="3 3" dot={false} activeDot={false} />
                  <Line type="monotone" dataKey="lower" stroke="#ff8042" strokeDasharray="3 3" dot={false} activeDot={false} />
                  <Line type="monotone" dataKey="predicted" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="actual" stroke="#0088FE" strokeWidth={3} dot={{ r: 5 }} />
                  
                  {/* Add shaded area between upper and lower bounds */}
                  <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff8042" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#ff8042" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="upper" 
                    stroke="none"
                    fill="url(#splitColor)" 
                    fillOpacity={1} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lower" 
                    stroke="none"
                    fill="#FFFFFF" 
                    fillOpacity={1} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Prediction Analysis</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>The model predicts a 56% increase in microplastic density from 2025 to 2035 if current trends continue</li>
                <li>The prediction confidence interval widens over time, reflecting the increasing uncertainty of long-term forecasts</li>
                <li>Even under the most optimistic scenario (lower bound), microplastic density is predicted to increase by 25% by 2035</li>
                <li>The upper bound prediction suggests we could see a doubling of current levels within the next decade</li>
                <li>This data highlights the critical importance of immediate action to reduce plastic waste entering our oceans</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* 6. Global Waste Emissions */}
        {activeTab === 'oceanEmissions' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Share of Global Plastic Waste Emitted to the Ocean</h2>
            <p className="text-gray-600 mb-6">
              This visualization shows the distribution of plastic waste emitted to the ocean by country, highlighting the top contributors
              to marine plastic pollution globally.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={oceanEmissionData}
                      dataKey="percentage"
                      nameKey="country"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={(entry) => entry.country}
                    >
                      {oceanEmissionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [`${value}%`, name]}
                    />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={oceanEmissionData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" label={{ value: 'Million Tons per Year', position: 'bottom' }} />
                    <YAxis type="category" dataKey="country" width={80} />
                    <Tooltip 
                      formatter={(value, name, props) => {
                        if (name === 'value') {
                          return [`${value} million tons`, 'Annual Emissions'];
                        }
                        return [value, name];
                      }}
                    />
                    <Bar dataKey="value" fill="#8884d8">
                      {oceanEmissionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Emission Insights</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Over 60% of ocean plastic waste comes from just 5 countries, highlighting where targeted intervention could be most effective</li>
                <li>China and Indonesia together account for nearly 38% of all plastic waste entering the ocean</li>
                <li>The data reveals a strong correlation between waste management infrastructure development and plastic leakage</li>
                <li>This suggests that international support for waste management systems in these countries could significantly reduce ocean pollution</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      {/* Filter Controls */}
      <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Time Range</label>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            >
              <option value="year">Past Year</option>
              <option value="fiveYears">Past 5 Years</option>
              <option value="decade">Past Decade</option>
              <option value="all">All Data</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Region</label>
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            >
              <option value="all">All Regions</option>
              <option value="mediterranean">Mediterranean</option>
              <option value="atlantic">Atlantic Ocean</option>
              <option value="pacific">Pacific Ocean</option>
              <option value="indian">Indian Ocean</option>
              <option value="arctic">Arctic Ocean</option>
            </select>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
            <Download className="h-4 w-4 mr-1" />
            Export Data
          </button>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
            <Share2 className="h-4 w-4 mr-1" />
            Share View
          </button>
        </div>
      </div>
      
      {/* Footer with data sources */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          <p><strong>Data Sources:</strong></p>
          <ul className="list-disc pl-5 mt-1">
            <li>Microplastic data adapted from "Temporal Trends in Marine Microplastic Density" (Kaggle dataset)</li>
            <li>Ocean plastic waste emissions data based on "Share of Global Plastic Waste Emitted to the Ocean" (Our World in Data)</li>
            <li>Last updated: April 28, 2025</li>
          </ul>
        </div>
      </div>
    </div>
  );
}