import { useState, useEffect } from "react";
import { 
  Users, Calendar, MapPin, Filter, Search, ChevronDown, 
  Heart, MessageCircle, ExternalLink, Trash2, AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Community() {
  const [activeTab, setActiveTab] = useState('events');
  const [filterRegion, setFilterRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [bgLoaded, setBgLoaded] = useState(false);
  
  // Handle background loaded state
  const handleBgLoaded = () => {
    setBgLoaded(true);
  };
  
  // Mock data
  const events = [
    {
      id: 1,
      title: "Mediterranean Coast Cleanup",
      description: "Join us for a comprehensive cleanup of the Mediterranean coastline. We'll be removing plastic waste, fishing nets, and other debris that threatens marine life.",
      date: "April 22, 2025",
      time: "09:00 - 13:00",
      location: "Tel Aviv Beach, near Gordon Swimming Pool",
      region: "tel-aviv",
      organizer: "Sea The Truth Foundation",
      participants: 43,
      spots: 100,
      image: "/images/Mediterranean Coast Cleanup.jpg"
    },
    {
      id: 2,
      title: "Coral Reef Monitoring Workshop",
      description: "Learn how to monitor and document the health of coral reefs. This hands-on workshop will teach you identification techniques, data collection methods, and reporting protocols.",
      date: "May 5, 2025",
      time: "10:00 - 16:00",
      location: "Eilat Marine Research Center",
      region: "eilat",
      organizer: "Marine Conservation Society",
      participants: 12,
      spots: 25,
      image: "/images/Coral Reef Monitoring Workshop.jpg"
    },
    {
      id: 3,
      title: "World Oceans Day Celebration",
      description: "Celebrate World Oceans Day with educational activities, beach cleanup, art exhibitions, and talks from marine experts about conservation efforts.",
      date: "June 8, 2025",
      time: "All day event",
      location: "Haifa Maritime Museum",
      region: "haifa",
      organizer: "Ocean Alliance",
      participants: 27,
      spots: 200,
      image: "/images/World Oceans Day Celebration.jpg"
    },
    {
      id: 4,
      title: "Microplastics Research Expedition",
      description: "Volunteer expedition to collect water samples and analyze microplastic concentrations in the eastern Mediterranean. Training provided on sampling techniques.",
      date: "May 20, 2025",
      time: "08:00 - 17:00",
      location: "Herzliya Marina",
      region: "herzliya",
      organizer: "University Marine Research Team",
      participants: 8,
      spots: 15,
      image: "/images/Microplastics Research Expedition.jpg"
    }
  ];
  
  const reports = [
    {
      id: 1,
      title: "Large oil spill spotted",
      description: "Observed what appears to be an oil spill approximately 500m offshore. The affected area is about 100m² with a visible sheen on the water surface.",
      date: "April 10, 2025",
      location: "Ashkelon, 1km south of the marina",
      region: "ashkelon",
      reporter: "David Cohen",
      status: "Verified",
      severity: "high",
      images: ["/images/r1.jpg"],
      likes: 12,
      comments: 5
    },
    {
      id: 2,
      title: "Fishing nets abandoned on reef",
      description: "Found abandoned fishing nets entangled on coral formations. Multiple fish and a sea turtle trapped in the netting.",
      date: "April 8, 2025",
      location: "Eilat, Moses Rock dive site",
      region: "eilat",
      reporter: "Maya Levi",
      status: "Under review",
      severity: "medium",
      images: ["/images/r2.gif"],
      likes: 8,
      comments: 2
    },
    {
      id: 3,
      title: "Industrial discharge into bay",
      description: "Noticed unusual discoloration in the water near the industrial zone. Water appears cloudy with chemical smell.",
      date: "April 5, 2025",
      location: "Haifa Bay, near industrial port",
      region: "haifa",
      reporter: "Omar Yousef",
      status: "Confirmed",
      severity: "high",
      images: ["/images/r3.gif"],
      likes: 23,
      comments: 15
    },
    {
      id: 4,
      title: "Plastic debris after storm",
      description: "Heavy concentration of plastic waste washed up on shore following yesterday's storm. Mostly single-use plastics and fishing equipment.",
      date: "April 3, 2025",
      location: "Tel Aviv, Frishman Beach",
      region: "tel-aviv",
      reporter: "Noa Berkovich",
      status: "Cleanup scheduled",
      severity: "medium",
      images: ["/images/r4.jpg"],
      likes: 17,
      comments: 9
    }
  ];
  
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'tel-aviv', name: 'Tel Aviv & Central' },
    { id: 'haifa', name: 'Haifa & North' },
    { id: 'eilat', name: 'Eilat & Red Sea' },
    { id: 'ashkelon', name: 'Ashkelon & South' },
    { id: 'herzliya', name: 'Herzliya & Sharon' }
  ];
  
  // Filter events based on region and search query
  const filteredEvents = events.filter(event => {
    const matchesRegion = filterRegion === 'all' || event.region === filterRegion;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });
  
  // Filter reports based on region and search query
  const filteredReports = reports.filter(report => {
    const matchesRegion = filterRegion === 'all' || report.region === filterRegion;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });
  
  // Toggle event details expansion
  const toggleEventDetails = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };
  
  // Get severity color
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };
  
  return (
<div style={{width: "100vw", maxWidth: "100%", margin: 0}} className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 overflow-x-hidden">
{/* GIF Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-blue-900">
        <img 
          src="/images/logo2.gif" 
          alt="Ocean background" 
          className="absolute min-w-full min-h-full object-cover w-auto h-auto"
          style={{ filter: 'brightness(0.4)' }}
          onLoad={handleBgLoaded}
        />
        {!bgLoaded && (
          <div className="absolute inset-0 bg-blue-900 flex items-center justify-center">
            <div className="animate-pulse text-white text-xl">Loading background...</div>
          </div>
        )}
      </div>

      {/* Content with proper z-index to appear above video */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section - now with transparent background */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 bg-opacity-70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="relative p-8 text-white">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-white opacity-10 rounded-full -ml-20 -mb-20"></div>
              
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 mr-3" />
                  <h1 className="text-3xl font-bold">Our Community</h1>
                </div>
                <p className="text-blue-100 text-lg mb-6">
                  Connect with fellow marine conservation enthusiasts, join cleanup events, 
                  and stay updated on pollution reports in your area.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/report" 
                    className="bg-white text-blue-700 px-5 py-2 rounded-md font-medium hover:bg-blue-50 transition shadow-md"
                  >
                    Report Pollution
                  </Link>
                  <button 
                    className="bg-blue-500 bg-opacity-30 text-white px-5 py-2 rounded-md font-medium hover:bg-opacity-40 transition border border-blue-400"
                  >
                    Organize an Event
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filter and Search Bar */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events and reports..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="flex-shrink-0">
                <label htmlFor="region" className="sr-only">Filter by Region</label>
                <div className="relative">
                  <select
                    id="region"
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
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
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('events')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'events'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Upcoming Events</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'reports'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <span>Pollution Reports</span>
                  </div>
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {/* Events Tab */}
              {activeTab === 'events' && (
                <div>
                  {/* Events List */}
                  {filteredEvents.length > 0 ? (
                    <div className="space-y-6">
                      {filteredEvents.map(event => (
                        <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                          <div 
                            className="cursor-pointer"
                            onClick={() => toggleEventDetails(event.id)}
                          >
                            <div className="md:flex">
                              <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48 bg-gray-200">
                                <img 
                                  src={event.image}
                                  alt={event.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="p-4 md:p-6">
                                <div className="flex justify-between items-start">
                                  <h3 className="text-xl font-bold text-gray-800 mb-1">{event.title}</h3>
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    {event.participants}/{event.spots} participants
                                  </span>
                                </div>
                                
                                <div className="flex items-center text-gray-500 text-sm mt-2">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{event.date} • {event.time}</span>
                                </div>
                                
                                <div className="flex items-center text-gray-500 text-sm mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{event.location}</span>
                                </div>
                                
                                <p className="text-gray-600 mt-3 line-clamp-2">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Expanded Details */}
                          {expandedEvent === event.id && (
                            <div className="px-6 pb-6 border-t border-gray-200 mt-2 pt-4">
                              <p className="text-gray-600 mb-4">
                                {event.description}
                              </p>
                              
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <div className="mb-4 sm:mb-0">
                                  <h4 className="text-sm font-medium text-gray-700 mb-1">Event Details</h4>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    <li>
                                      <span className="font-medium">Organizer:</span> {event.organizer}
                                    </li>
                                    <li>
                                      <span className="font-medium">Equipment:</span> Gloves, trash bags, and water provided
                                    </li>
                                    <li>
                                      <span className="font-medium">What to bring:</span> Sunscreen, hat, reusable water bottle
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="flex flex-col items-center">
                                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 mb-2 w-full sm:w-auto">
                                    Join Event
                                  </button>
                                  <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center">
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Share Event
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-block p-3 rounded-full bg-gray-100 mb-4">
                        <Calendar className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No events found</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {searchQuery ? 
                          "We couldn't find any events matching your search criteria." :
                          "There are no upcoming events in this region yet."
                        }
                      </p>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Reports Tab */}
              {activeTab === 'reports' && (
                <div>
                  {/* Reports List */}
                  {filteredReports.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredReports.map(report => (
                        <div key={report.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                          <div className="relative h-48 bg-gray-200">
                            <img 
                              src={report.images[0]}
                              alt={report.title}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute top-0 right-0 m-2">
                              <span className={`${getSeverityColor(report.severity)} text-xs px-2 py-1 rounded-full`}>
                                {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)} Severity
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">{report.title}</h3>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center text-gray-500 text-sm">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{report.location}</span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {report.date}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                              {report.description}
                            </p>
                            
                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                              <div>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  report.status === 'Verified' || report.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                  report.status === 'Under review' ? 'bg-yellow-100 text-yellow-800' :
                                  report.status === 'Cleanup scheduled' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {report.status}
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <button className="text-gray-500 hover:text-red-600 flex items-center text-sm">
                                  <Heart className="h-4 w-4 mr-1" />
                                  <span>{report.likes}</span>
                                </button>
                                <button className="text-gray-500 hover:text-blue-600 flex items-center text-sm">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  <span>{report.comments}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-block p-3 rounded-full bg-gray-100 mb-4">
                        <Trash2 className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No reports found</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {searchQuery ? 
                          "We couldn't find any pollution reports matching your search criteria." :
                          "There are no pollution reports in this region yet."
                        }
                      </p>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-8 text-center">
                    <Link 
                      to="/report" 
                      className="bg-blue-600 text-white px-6 py-2 rounded-md inline-flex items-center font-medium hover:bg-blue-700"
                    >
                      Submit a New Report
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Join Community Call to Action */}
          <div className="bg-gradient-to-r from-teal-500 to-green-600 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-md p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Join Our Community of Ocean Advocates</h2>
              <p className="text-green-100 mb-6">
                Connect with like-minded individuals, receive updates on local conservation efforts, and make a real difference in protecting our marine environment.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-green-700 px-6 py-2 rounded-md font-medium hover:bg-green-50 shadow-md">
                  Create Free Account
                </button>
                <Link 
                  to="/education" 
                  className="bg-green-700 bg-opacity-40 text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-50 border border-green-400"
                >
                  Explore Educational Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}