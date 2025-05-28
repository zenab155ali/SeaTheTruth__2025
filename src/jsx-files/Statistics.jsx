import React, { useState } from 'react';
import EnhancedDataVisualization from "../components/EnhancedDataVisualization";
import { 
  Download, Share2, BarChart2, 
  AlertTriangle, Terminal, HelpCircle
} from 'lucide-react';

export default function Statistics() {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState('methodology');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 overflow-x-hidden">
      <div className="w-full px-4 py-8">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
            <h1 className="text-2xl font-bold mb-2">Advanced Statistics & Analytics</h1>
            <p className="opacity-90">Comprehensive analysis of global marine pollution data</p>
          </div>
          
          <div className="p-6 bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-gray-700">
                This section presents detailed analysis of marine plastic pollution trends across various regions and timeframes. 
                The visualizations below provide insights into microplastic density, global plastic waste emissions, and future 
                projections based on current data.
              </p>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowInfoModal(true)}
                  className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition text-sm flex items-center"
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Data Methodology
                </button>
                <button className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition text-sm flex items-center">
                  <Terminal className="h-4 w-4 mr-1" />
                  API Access
                </button>
              </div>
            </div>
            
            <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Data sources:</span> World Ocean Database, Marine Pollution Bulletin, Ocean Conservancy, 
                    and community-reported pollution incidents. Data is updated monthly and verified against multiple sources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Statistics Dashboards */}
        <div className="mb-8">
          <EnhancedDataVisualization />
        </div>
        
        {/* Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Current Status Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart2 className="h-5 w-5 text-indigo-600 mr-2" />
              Current Pollution Status
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Global average microplastic density</h3>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold text-gray-800">0.67</span>
                    <span className="text-gray-600 ml-1">particles/m³</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Mediterranean average</h3>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold text-indigo-600">0.83</span>
                    <span className="text-gray-600 ml-1">particles/m³</span>
                    <span className="text-xs text-red-600 ml-2">+24%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Annual plastic waste to oceans</h3>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold text-gray-800">12.7</span>
                    <span className="text-gray-600 ml-1">million tons</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500">YoY change (global)</h3>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold text-red-600">+6.4%</span>
                    <span className="text-gray-600 ml-1">from 2024</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-3 rounded-md text-sm">
              <p className="text-gray-600">
                Current levels exceed recommended thresholds by 235%. Without intervention, marine ecosystem collapse risk increases to critical levels by 2035.
              </p>
            </div>
          </div>
          
          {/* Regional Comparison Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-indigo-600 mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              Regional Comparison
            </h2>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Mediterranean Sea</span>
                  <span className="text-sm text-gray-600">0.83 particles/m³</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Pacific Ocean</span>
                  <span className="text-sm text-gray-600">0.65 particles/m³</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Atlantic Ocean</span>
                  <span className="text-sm text-gray-600">0.52 particles/m³</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Indian Ocean</span>
                  <span className="text-sm text-gray-600">0.49 particles/m³</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: '49%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Arctic Ocean</span>
                  <span className="text-sm text-gray-600">0.26 particles/m³</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '26%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-3 rounded-md text-sm">
              <p className="text-gray-600">
                The Mediterranean shows 186% higher concentration than the global ocean average, while the Arctic shows the lowest levels but fastest growth rate at 13.6% annually.
              </p>
            </div>
          </div>
        </div>
        
        {/* Plastic Waste Footprint Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-indigo-600 mr-2"
            >
              <path d="M3 3v18h18" />
              <path d="M3 9h18" />
              <path d="M3 15h18" />
              <path d="M9 3v18" />
              <path d="M15 3v18" />
            </svg>
            Plastic Waste Impact Estimator
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">Plastic Bottles</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-1">27 billion</div>
              <p className="text-sm text-gray-600">Enter oceans annually</p>
              <div className="mt-3 text-xs text-gray-500">
                That's 51,000 bottles per minute
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">Plastic Bags</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-1">5 trillion+</div>
              <p className="text-sm text-gray-600">Used globally each year</p>
              <div className="mt-3 text-xs text-gray-500">
                Average use time: 12 minutes
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">Microplastics</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-1">14 million</div>
              <p className="text-sm text-gray-600">Tons on ocean floor</p>
              <div className="mt-3 text-xs text-gray-500">
                Found in 88% of tested marine species
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition flex items-center">
              Calculate Your Plastic Footprint
            </button>
          </div>
        </div>
        
        {/* Conservation Impact Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Conservation Success Indicators</h2>
            
            <div className="flex space-x-2">
              <button className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Export Report
              </button>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-1">Beach Cleanups</h3>
              <div className="text-2xl font-bold text-green-600">7,842</div>
              <p className="text-sm text-gray-600">Organized globally in 2024</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-1">Waste Collected</h3>
              <div className="text-2xl font-bold text-blue-600">12,349 tons</div>
              <p className="text-sm text-gray-600">Removed from oceans and beaches</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-1">Policies Enacted</h3>
              <div className="text-2xl font-bold text-purple-600">37</div>
              <p className="text-sm text-gray-600">New plastic reduction policies</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-1">Awareness Impact</h3>
              <div className="text-2xl font-bold text-amber-600">68%</div>
              <p className="text-sm text-gray-600">Increased public awareness</p>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-2">Conservation Priority Areas</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Southeast Asian coastal communities: waste management infrastructure development</li>
              <li>Mediterranean fishing industry: sustainable gear transition and lost equipment recovery</li>
              <li>Tourism-heavy beaches: single-use plastic reduction and intensified cleanup efforts</li>
              <li>River mouths and estuaries: installation of waste capture systems</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Data Methodology Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-800">Data Collection & Methodology</h3>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Modal Tabs */}
              <div className="border-b border-gray-200 mb-4">
                <div className="flex -mb-px">
                  <button
                    onClick={() => setActiveInfoTab('methodology')}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeInfoTab === 'methodology'
                        ? 'border-b-2 border-indigo-600 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Methodology
                  </button>
                  <button
                    onClick={() => setActiveInfoTab('sources')}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeInfoTab === 'sources'
                        ? 'border-b-2 border-indigo-600 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Data Sources
                  </button>
                  <button
                    onClick={() => setActiveInfoTab('limitations')}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeInfoTab === 'limitations'
                        ? 'border-b-2 border-indigo-600 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Limitations
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              {activeInfoTab === 'methodology' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Data Collection Methodology</h3>
                  <p className="text-gray-600">
                    Our marine pollution data is collected through a combination of satellite imagery analysis, direct sampling from research vessels, coastal monitoring stations, and citizen science reports. All data undergoes rigorous validation before inclusion in our database.
                  </p>
                  
                  <h4 className="font-medium text-gray-800 mt-4">Collection Methods:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li><strong>Satellite Imagery:</strong> Analysis using machine learning algorithms to detect large-scale pollution events</li>
                    <li><strong>Research Vessels:</strong> Direct water sampling at depths from 0-100m using standardized trawling techniques</li>
                    <li><strong>Coastal Stations:</strong> Fixed monitoring stations at key coastal locations collecting daily water quality data</li>
                    <li><strong>Community Reports:</strong> Verified reports from trained citizen scientists using our standardized reporting protocol</li>
                  </ul>
                  
                  <h4 className="font-medium text-gray-800 mt-4">Analysis Techniques:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Microplastic quantification using spectroscopic analysis and visual identification</li>
                    <li>Statistical modeling to account for sampling biases and environmental factors</li>
                    <li>Temporal trend analysis using regression techniques and time-series forecasting</li>
                    <li>Spatial distribution mapping with interpolation to estimate conditions between sampling points</li>
                  </ul>
                </div>
              )}
              
              {activeInfoTab === 'sources' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Primary Data Sources</h3>
                  <p className="text-gray-600">
                    Our visualizations combine data from multiple trusted sources to provide the most comprehensive view of marine pollution:
                  </p>
                  
                  <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Source</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Data Type</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Update Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 text-sm border border-gray-200">World Ocean Database</td>
                        <td className="px-4 py-2 text-sm border border-gray-200">Microplastic measurements, oceanographic data</td>
                        <td className="px-4 py-2 text-sm border border-gray-200">Quarterly</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm border border-gray-200">Marine Pollution Bulletin</td>
                        <td className="px-4 py-2 text-sm border border-gray-200">Scientific research findings, pollution reports</td>
                        <td className="px-4 py-2 text-sm border border-gray-200">Monthly</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm border border-gray-200">Ocean Conservancy</td>
                        <td className="px-4 py-2 text-sm border border-gray-200">Cleanup data, waste characterization</td>
                        <td className="px-4 py-2 text-sm border border-gray-200">Annually</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm border border-gray-200">Our World in Data</td>
                        <td className="px-4 py-2 text-sm border border-gray-200">Global waste emissions by country</td>
                        <td className="px-4 py-2 text-sm border border-gray-200">Annually</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm border border-gray-200">Sea The Truth Platform</td>
                        <td className="px-4 py-2 text-sm border border-gray-200">Community reports, cleanup events</td>
                        <td className="px-4 py-2 text-sm border border-gray-200">Real-time</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <h4 className="font-medium text-gray-800 mt-4">Citation Policy:</h4>
                  <p className="text-gray-600">
                    All data presented on the Sea The Truth platform includes appropriate attribution to original sources. For scientific or academic use, please refer to our complete citation guidelines available through the API documentation.
                  </p>
                </div>
              )}
              
              {activeInfoTab === 'limitations' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Data Limitations & Considerations</h3>
                  <p className="text-gray-600">
                    While we strive for accuracy and comprehensiveness, it's important to acknowledge the following limitations when interpreting our data:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>
                      <strong>Sampling Variability:</strong> Marine pollution is highly variable in space and time. Our visualizations represent the best estimates based on available data, but may not capture all local variations.
                    </li>
                    <li>
                      <strong>Measurement Challenges:</strong> Microplastic quantification methods continue to evolve, and historical data may use different methodologies than current measurements, potentially affecting trend analyses.
                    </li>
                    <li>
                      <strong>Coverage Gaps:</strong> Data collection is more comprehensive in some regions (North Atlantic, Mediterranean) than others (Southern Ocean, deep sea environments).
                    </li>
                    <li>
                      <strong>Prediction Uncertainty:</strong> Future projections are based on statistical models with inherent uncertainty that increases over longer time horizons. These should be interpreted as potential scenarios rather than definitive forecasts.
                    </li>
                    <li>
                      <strong>Reporting Bias:</strong> Community-sourced data may reflect reporting biases toward more accessible or populated coastal areas.
                    </li>
                  </ul>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                    <h4 className="font-medium text-yellow-800">Important Note on Interpretation:</h4>
                    <p className="text-yellow-700 text-sm">
                      The absence of reported pollution in a region should not be interpreted as an absence of pollution. Always consider data coverage when drawing conclusions from our visualizations.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 p-4 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}