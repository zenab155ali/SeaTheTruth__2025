// DatasetIntegration.js
// Utility functions to load microplastic and ocean emission data
import Papa from 'papaparse';

/**
 * Load microplastic data from CSV or generate mock data
 * @returns {Promise<Object>} - Object containing various microplastic datasets
 */
export const loadMicroplasticData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Try to load from actual CSV file if available
      const response = await window.fs.readFile('microplastic_density_data.csv', { encoding: 'utf8' });
      
      // Parse the CSV
      const { data } = Papa.parse(response, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      });
      
      // Process the data to create datasets for different visualizations
      const processedData = processRawMicroplasticData(data);
      resolve(processedData);
    } catch (error) {
      console.warn("Could not load microplastic CSV file, using mock data instead:", error);
      // Fallback to mock data if CSV not available
      const mockData = generateMockMicroplasticData();
      resolve(mockData);
    }
  });
};

/**
 * Load ocean emission data from CSV or generate mock data
 * @returns {Promise<Array>} - Array of ocean emission data by country
 */
export const loadOceanEmissionData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Try to load from actual CSV file if available
      const response = await window.fs.readFile('ocean_plastic_emissions.csv', { encoding: 'utf8' });
      
      // Parse the CSV
      const { data } = Papa.parse(response, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      });
      
      // Transform into expected format
      const transformedData = data.map(row => ({
        country: row.country,
        percentage: row.percentage,
        value: row.tons // Rename 'tons' to 'value' for the charts
      }));
      
      resolve(transformedData);
    } catch (error) {
      console.warn("Could not load emissions CSV file, using mock data instead:", error);
      // Fallback to mock data if CSV not available
      const mockData = generateMockEmissionsData();
      resolve(mockData);
    }
  });
};

/**
 * Process raw microplastic data into visualizations datasets
 * @param {Array} rawData - Raw data from CSV
 * @returns {Object} - Object containing various microplastic datasets
 */
function processRawMicroplasticData(rawData) {
  // Group data by year and ocean for temporal trends
  const yearOceanMap = {};
  
  // Process raw data
  rawData.forEach(row => {
    // Ensure year is a string for consistency
    const yearStr = String(row.year);
    
    // Initialize year entry if it doesn't exist
    if (!yearOceanMap[yearStr]) {
      yearOceanMap[yearStr] = {
        year: yearStr,
        Mediterranean: 0,
        Pacific: 0,
        Atlantic: 0,
        Indian: 0,
        Arctic: 0
      };
    }
    
    // Add density value to corresponding ocean
    if (row.ocean && row.density) {
      yearOceanMap[yearStr][row.ocean] = row.density;
    }
  });
  
  // Convert map to array for temporal trends
  const temporalTrends = Object.values(yearOceanMap).sort((a, b) => a.year - b.year);
  
  // Create monthly trends
  const monthlyTrends = aggregateMonthlyData(rawData);
  
  // Create yearly distribution (box plot data)
  const yearlyDistribution = calculateYearlyDistribution(rawData);
  
  // Create scatter plot data (use raw data directly)
  const scatterData = rawData.map(row => ({
    longitude: row.longitude,
    latitude: row.latitude,
    density: row.density,
    year: row.year
  }));
  
  // Create predictions data
  const predictions = generatePredictions(temporalTrends);
  
  return {
    temporalTrends,
    monthlyTrends,
    yearlyDistribution,
    scatterData,
    predictions
  };
}

/**
 * Aggregate data by month
 * @param {Array} data - Raw data
 * @returns {Array} - Monthly aggregated data
 */
function aggregateMonthlyData(data) {
  const monthOrder = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  // Group by month
  const monthlyData = {};
  data.forEach(row => {
    const month = row.month;
    if (!monthlyData[month]) {
      monthlyData[month] = { count: 0, total: 0 };
    }
    monthlyData[month].count++;
    monthlyData[month].total += row.density;
  });
  
  // Calculate averages and format data
  return monthOrder.map(month => {
    const entry = monthlyData[month] || { count: 0, total: 0 };
    return {
      month: month,
      density: entry.count > 0 ? entry.total / entry.count : 0
    };
  });
}

/**
 * Calculate yearly distribution statistics (min, q1, median, q3, max)
 * @param {Array} data - Raw data
 * @returns {Array} - Yearly distribution data
 */
function calculateYearlyDistribution(data) {
  // Group data by year
  const yearData = {};
  data.forEach(row => {
    const year = String(row.year);
    if (!yearData[year]) {
      yearData[year] = [];
    }
    yearData[year].push(row.density);
  });
  
  // Calculate statistics for each year
  const result = [];
  Object.keys(yearData).sort().forEach(year => {
    const densities = yearData[year].sort((a, b) => a - b);
    const n = densities.length;
    
    result.push({
      year: year,
      min: densities[0],
      q1: densities[Math.floor(n * 0.25)],
      median: densities[Math.floor(n * 0.5)],
      q3: densities[Math.floor(n * 0.75)],
      max: densities[n - 1]
    });
  });
  
  return result;
}

/**
 * Generate prediction data based on historical trends
 * @param {Array} historicalData - Historical data
 * @returns {Array} - Prediction data
 */
function generatePredictions(historicalData) {
  // Simple linear extrapolation based on average across oceans
  const predictions = [];
  
  // Use actual historical data for past years
  historicalData.forEach(yearData => {
    // Calculate average density across all oceans
    const average = Object.keys(yearData)
      .filter(key => key !== 'year')
      .reduce((sum, ocean) => sum + yearData[ocean], 0) / 5;
    
    predictions.push({
      year: parseInt(yearData.year),
      actual: average,
      predicted: null,
      lower: null,
      upper: null
    });
  });
  
  // Generate future predictions
  const lastYear = parseInt(historicalData[historicalData.length - 1].year);
  const growthRate = 0.08; // 8% annual growth
  
  // Get the last actual value
  const lastValue = predictions[predictions.length - 1].actual;
  
  // Add predictions for future years
  for (let year = lastYear + 1; year <= 2035; year++) {
    const yearsAhead = year - lastYear;
    const predictedValue = lastValue * Math.pow(1 + growthRate, yearsAhead);
    
    // Widening confidence interval - further in future, less certain
    const uncertaintyFactor = 0.05 * yearsAhead;
    
    predictions.push({
      year: year,
      actual: null,
      predicted: predictedValue,
      lower: predictedValue * (1 - uncertaintyFactor),
      upper: predictedValue * (1 + uncertaintyFactor)
    });
  }
  
  return predictions;
}

/**
 * Generate mock microplastic data if CSV not available
 * @returns {Object} - Object containing various microplastic datasets
 */
function generateMockMicroplasticData() {
  return {
    // Data for temporal trends chart (Line Chart)
    temporalTrends: [
      { year: "2010", Mediterranean: 3.2, Pacific: 1.8, Atlantic: 2.1, Indian: 1.9, Arctic: 0.7 },
      { year: "2011", Mediterranean: 3.5, Pacific: 1.9, Atlantic: 2.2, Indian: 2.0, Arctic: 0.8 },
      { year: "2012", Mediterranean: 3.7, Pacific: 2.0, Atlantic: 2.3, Indian: 2.1, Arctic: 0.8 },
      { year: "2013", Mediterranean: 4.0, Pacific: 2.1, Atlantic: 2.4, Indian: 2.2, Arctic: 0.9 },
      { year: "2014", Mediterranean: 4.3, Pacific: 2.3, Atlantic: 2.5, Indian: 2.3, Arctic: 0.9 },
      { year: "2015", Mediterranean: 4.7, Pacific: 2.5, Atlantic: 2.7, Indian: 2.5, Arctic: 1.0 },
      { year: "2016", Mediterranean: 5.0, Pacific: 2.7, Atlantic: 2.9, Indian: 2.7, Arctic: 1.1 },
      { year: "2017", Mediterranean: 5.3, Pacific: 2.9, Atlantic: 3.1, Indian: 2.9, Arctic: 1.2 },
      { year: "2018", Mediterranean: 5.7, Pacific: 3.2, Atlantic: 3.4, Indian: 3.1, Arctic: 1.3 },
      { year: "2019", Mediterranean: 6.2, Pacific: 3.5, Atlantic: 3.7, Indian: 3.4, Arctic: 1.4 },
      { year: "2020", Mediterranean: 6.8, Pacific: 3.8, Atlantic: 4.0, Indian: 3.7, Arctic: 1.6 },
      { year: "2021", Mediterranean: 7.3, Pacific: 4.2, Atlantic: 4.3, Indian: 4.0, Arctic: 1.7 },
      { year: "2022", Mediterranean: 7.8, Pacific: 4.5, Atlantic: 4.6, Indian: 4.3, Arctic: 1.9 },
      { year: "2023", Mediterranean: 8.4, Pacific: 4.9, Atlantic: 5.0, Indian: 4.7, Arctic: 2.1 },
      { year: "2024", Mediterranean: 9.0, Pacific: 5.3, Atlantic: 5.4, Indian: 5.1, Arctic: 2.3 },
      { year: "2025", Mediterranean: 9.7, Pacific: 5.8, Atlantic: 5.9, Indian: 5.5, Arctic: 2.5 }
    ],
    
    // Data for monthly trends chart (Area Chart)
    monthlyTrends: [
      { month: "Jan", density: 4.2 },
      { month: "Feb", density: 3.8 },
      { month: "Mar", density: 4.5 },
      { month: "Apr", density: 5.2 },
      { month: "May", density: 6.0 },
      { month: "Jun", density: 6.8 },
      { month: "Jul", density: 7.5 },
      { month: "Aug", density: 7.2 },
      { month: "Sep", density: 6.5 },
      { month: "Oct", density: 5.7 },
      { month: "Nov", density: 4.9 },
      { month: "Dec", density: 4.5 }
    ],
    
    // Data for yearly distribution chart (Box Plot)
    yearlyDistribution: [
      { year: "2015", min: 1.2, q1: 2.3, median: 3.5, q3: 4.7, max: 6.2 },
      { year: "2016", min: 1.4, q1: 2.6, median: 3.8, q3: 5.2, max: 7.0 },
      { year: "2017", min: 1.5, q1: 2.9, median: 4.3, q3: 5.9, max: 7.8 },
      { year: "2018", min: 1.7, q1: 3.2, median: 4.8, q3: 6.5, max: 8.5 },
      { year: "2019", min: 1.9, q1: 3.6, median: 5.4, q3: 7.2, max: 9.5 },
      { year: "2020", min: 2.1, q1: 4.0, median: 6.0, q3: 8.0, max: 10.5 },
      { year: "2021", min: 2.3, q1: 4.5, median: 6.7, q3: 8.9, max: 11.7 },
      { year: "2022", min: 2.5, q1: 5.0, median: 7.4, q3: 9.8, max: 12.9 },
      { year: "2023", min: 2.7, q1: 5.5, median: 8.2, q3: 10.8, max: 14.2 },
      { year: "2024", min: 2.9, q1: 6.1, median: 9.0, q3: 11.9, max: 15.6 },
      { year: "2025", min: 3.2, q1: 6.7, median: 9.9, q3: 13.1, max: 17.1 }
    ],
    
    // Data for scatter plot (Geographical Density)
    scatterData: [
      // Generate some sample data points
      ...Array.from({ length: 50 }, (_, i) => ({
        longitude: Math.random() * 360 - 180,
        latitude: Math.random() * 180 - 90,
        density: Math.random() * 10 + 1,
        year: 2020 + Math.floor(Math.random() * 6)
      }))
    ],
    
    // Data for predictions chart (Future Projections)
    predictions: [
      { year: 2015, actual: 4.2, predicted: 4.1, lower: 3.9, upper: 4.3 },
      { year: 2016, actual: 4.5, predicted: 4.4, lower: 4.1, upper: 4.7 },
      { year: 2017, actual: 4.9, predicted: 4.7, lower: 4.4, upper: 5.0 },
      { year: 2018, actual: 5.3, predicted: 5.1, lower: 4.7, upper: 5.5 },
      { year: 2019, actual: 5.8, predicted: 5.5, lower: 5.0, upper: 6.0 },
      { year: 2020, actual: 6.3, predicted: 6.0, lower: 5.3, upper: 6.7 },
      { year: 2021, actual: 6.9, predicted: 6.5, lower: 5.7, upper: 7.3 },
      { year: 2022, actual: 7.5, predicted: 7.0, lower: 6.0, upper: 8.0 },
      { year: 2023, actual: 8.2, predicted: 7.6, lower: 6.4, upper: 8.8 },
      { year: 2024, actual: 8.9, predicted: 8.3, lower: 6.9, upper: 9.7 },
      { year: 2025, actual: 9.7, predicted: 9.0, lower: 7.4, upper: 10.6 },
      { year: 2026, actual: null, predicted: 9.8, lower: 7.9, upper: 11.7 },
      { year: 2027, actual: null, predicted: 10.6, lower: 8.4, upper: 12.8 },
      { year: 2028, actual: null, predicted: 11.4, lower: 8.9, upper: 13.9 },
      { year: 2029, actual: null, predicted: 12.3, lower: 9.4, upper: 15.2 },
      { year: 2030, actual: null, predicted: 13.3, lower: 10.0, upper: 16.6 },
      { year: 2031, actual: null, predicted: 14.3, lower: 10.5, upper: 18.1 },
      { year: 2032, actual: null, predicted: 15.4, lower: 11.1, upper: 19.7 },
      { year: 2033, actual: null, predicted: 16.6, lower: 11.7, upper: 21.5 },
      { year: 2034, actual: null, predicted: 17.9, lower: 12.3, upper: 23.5 },
      { year: 2035, actual: null, predicted: 19.3, lower: 12.9, upper: 25.7 }
    ]
  };
}

/**
 * Generate mock emissions data if CSV not available
 * @returns {Array} - Array of emission data by country
 */
function generateMockEmissionsData() {
  return [
    { country: "China", value: 3.53, percentage: 28.7 },
    { country: "Indonesia", value: 1.29, percentage: 10.1 },
    { country: "Philippines", value: 0.75, percentage: 5.9 },
    { country: "Vietnam", value: 0.73, percentage: 5.8 },
    { country: "Sri Lanka", value: 0.64, percentage: 5.0 },
    { country: "Thailand", value: 0.41, percentage: 3.2 },
    { country: "Egypt", value: 0.39, percentage: 3.0 },
    { country: "Malaysia", value: 0.37, percentage: 2.9 },
    { country: "Nigeria", value: 0.34, percentage: 2.7 },
    { country: "Bangladesh", value: 0.31, percentage: 2.5 },
    { country: "Other Countries", value: 3.84, percentage: 30.2 }
  ];
}