import { useState, useEffect, useRef } from "react";
import { 
  User, Settings, Calendar, Map, Award, ChevronRight, 
  Edit, Camera, LogOut, Bell, Shield, Save, 
  CheckCircle, Trash2, Activity, BarChart2, 
  Heart, Droplet, Thermometer, Sun, Check, X
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [impactScore, setImpactScore] = useState(0);
  const statsRef = useRef(null);
  
  const [profileData, setProfileData] = useState({
    name: "Zaynab Ali",
    email: "Zaynab@gmail.com",
    location: "Sulam, Israel",
    bio: "Environmental activist and engineering student passionate about marine conservation. I've been volunteering with Ocean Conservancy for 6 years, organizing beach cleanups and community education initiatives.",
    profileImage: "/images/photo.jpg",
    joinDate: "April 27 2023",
    notificationSettings: {
      emailUpdates: true,
      reportUpdates: true,
      eventReminders: true,
      newsletterSubscription: false
    }
  });
  
  // Simulated user activity and impact data
  const userData = {
    reports: [
      { id: 1, date: "Apr 10, 2025", location: "Haifa Bay", type: "Plastic debris", status: "Verified", impact: "Cleanup scheduled" },
      { id: 2, date: "Mar 28, 2025", location: "Tel Aviv Beach", type: "Oil spill (small)", status: "Under review", impact: "Pending" },
      { id: 3, date: "Feb 15, 2025", location: "Caesarea Coast", type: "Fishing nets", status: "Resolved", impact: "Removed by volunteers" },
      { id: 4, date: "Jan 05, 2025", location: "Herzliya Marina", type: "Plastic bottles", status: "Resolved", impact: "5kg waste collected" },
    ],
    events: [
      { id: 1, date: "Apr 22, 2025", title: "Earth Day Beach Cleanup", location: "Bat Yam Beach", role: "Organizer", participants: 34 },
      { id: 2, date: "Mar 15, 2025", title: "Marine Conservation Workshop", location: "Ben Gurion University", role: "Speaker", participants: 45 },
      { id: 3, date: "Feb 03, 2025", title: "Coastal Ecosystem Survey", location: "Rosh Hanikra", role: "Volunteer", participants: 8 },
    ],
    badges: [
      { id: 1, name: "Cleanup Champion", description: "Participated in 10+ beach cleanup events", date: "Mar 2025", icon: "award" },
      { id: 2, name: "Data Collector", description: "Submitted 5+ verified pollution reports", date: "Feb 2025", icon: "clipboard" },
      { id: 3, name: "Community Educator", description: "Conducted environmental education sessions", date: "Jan 2025", icon: "users" },
      { id: 4, name: "Conservation Advocate", description: "1 year of active participation", date: "Jan 2025", icon: "heart" },
    ],
    impact: {
      wasteReported: 235, // in kg
      cleanupEvents: 14,
      peopleEducated: 175,
      totalContribution: 124, // hours
    },
    carbonOffset: {
      total: 1.52, // tons
      monthly: [0.17, 0.21, 0.26, 0.18, 0.29, 0.41],
      labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
      details: [
        "3 beach cleanups, 4 waste reports",
        "2 conservation events, 1 educational workshop",
        "Coastal ecosystem survey, 3 waste reports",
        "2 beach cleanups, 1 community outreach",
        "Marine workshop organization, 5 waste reports",
        "Earth Day cleanup (organizer), 6 waste reports"
      ]
    },
    recentActions: [
      { id: 1, action: "Reported plastic pollution", location: "Tel Aviv Beach", date: "2 days ago", impact: 12 },
      { id: 2, action: "Organized cleanup event", location: "Haifa Bay", date: "1 week ago", impact: 45 },
      { id: 3, action: "Shared educational content", location: "Online", date: "2 weeks ago", impact: 78 }
    ]
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateStats(true);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Animated impact score counter
  useEffect(() => {
    if (animateStats) {
      const totalImpact = 
        (userData.impact.wasteReported / 10) + 
        (userData.impact.cleanupEvents * 5) + 
        (userData.impact.peopleEducated / 5) + 
        userData.impact.totalContribution;
      
      const timer = setTimeout(() => {
        const increment = Math.ceil(totalImpact / 60);
        setImpactScore(prev => {
          if (prev + increment >= totalImpact) {
            return Math.round(totalImpact);
          }
          return prev + increment;
        });
      }, 30);
      
      if (impactScore >= totalImpact) {
        clearTimeout(timer);
      }
      
      return () => clearTimeout(timer);
    }
  }, [animateStats, impactScore]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handleNotificationChange = (setting) => {
    setProfileData({
      ...profileData,
      notificationSettings: {
        ...profileData.notificationSettings,
        [setting]: !profileData.notificationSettings[setting]
      }
    });
  };
  
  const saveProfile = () => {
    setEditMode(false);
    
    // Show success toast
    setModalContent({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated.'
    });
    setShowModal(true);
    
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const getBadgeIcon = (iconName) => {
    switch(iconName) {
      case 'award': return <Award className="h-8 w-8 text-yellow-600" />;
      case 'clipboard': return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'users': return <Users className="h-8 w-8 text-blue-600" />;
      case 'heart': return <Heart className="h-8 w-8 text-pink-600" />;
      default: return <Award className="h-8 w-8 text-yellow-600" />;
    }
  };
  
  return (
    <div style={{width: "100vw", maxWidth: "100%", margin: 0}} className="min-h-screen bg-gray-50">
      <div className="w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              {/* Profile Header */}
              <div className="relative">
                <div className="h-24 bg-gradient-to-r from-green-500 to-blue-700">
                  {/* Dynamic wave pattern */}
                  <svg className="absolute bottom-0 left-0 w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path 
                      d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                      className="fill-white opacity-10 animate-wave"
                    />
                    <path 
                      d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                      className="fill-white opacity-5 animate-wave"
                      style={{animationDelay: '0.2s'}}
                    />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex justify-center">
                  <div className="relative">
                    <img 
                      src={profileData.profileImage} 
                      alt="Profile" 
                      className="w-40 h-40 rounded-full border-4 border-white object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=N';
                      }}
                    />
                    {editMode && (
                      <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1.5 hover:bg-blue-700 transition shadow-md">
                        <Camera className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Profile Info */}
              <div className="pt-16 p-6 text-center">
                <h2 className="text-5xl font-bold text-gray-800">{profileData.name}</h2>
                <p className="text-gray-500 text-4xl flex items-center justify-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {profileData.location}
                </p>
                
                <div className="mt-6 flex justify-center">
                  {!editMode ? (
                    <button 
                      onClick={() => setEditMode(true)}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-7xl flex items-center hover:bg-blue-700 transition shadow-sm"
                    >
                      <Edit className="h-10 w-10 mr-1" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={saveProfile}
                        className="bg-green-600 text-white px-4 py-1.5 rounded-md text-sm flex items-center hover:bg-green-700 transition shadow-sm"
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </button>
                      <button 
                        onClick={() => setEditMode(false)}
                        className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-md text-sm flex items-center hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Navigation Menu */}
              <div className="border-t border-gray-200 mt-6">
                <nav className="p-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center px-4 py-3 text-9xl rounded-md transition-colors duration-200 ${
                      activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User className="h-8 w-8 mr-4" />
                    <span className="text-3xl font-semibold">Overview</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('activities')}
                    className={`w-full flex items-center px-4 py-3 text-sm rounded-md transition-colors duration-200 ${
                      activeTab === 'activities' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Activity className="h-5 w-5 mr-3" />
                    <span className="text-3xl font-semibold">   Activities </span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('reports')}
                    className={`w-full flex items-center px-4 py-3 text-sm rounded-md transition-colors duration-200 ${
                      activeTab === 'reports' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Map className="h-5 w-5 mr-3" />
                    <span className="text-3xl font-semibold">  My Reports</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('badges')}
                    className={`w-full flex items-center px-4 py-3 text-sm rounded-md transition-colors duration-200 ${
                      activeTab === 'badges' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Award className="h-5 w-5 mr-3" />
                    <span className="text-3xl font-semibold"> Achievements</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center px-4 py-3 text-sm rounded-md transition-colors duration-200 ${
                      activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    <span className="text-3xl font-semibold"> Settings</span>
                  </button>
                </nav>
              </div>
              
              {/* Account Info */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center text-9xs text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-3xl font-semibold"> Joined {profileData.joinDate} </span>
                </div>
                <button className="mt-4 text-sm text-red-600 flex items-center hover:text-red-800 transition-colors">
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="text-3xl font-semibold"> Sign Out</span>
                </button>
               
                <div className="mt-6 flex justify-center">
                   <img 
                src="/images/pic1.gif" 
                 alt="Decorative Graphic" 
                className="w-full h-auto rounded-xl shadow-md"
                 />
                  </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Bio Section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-5xl font-bold text-gray-800">About Me</h2>
                    {!editMode && (
                      <button 
                        onClick={() => setEditMode(true)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  {!editMode ? (
                    <p className="text-gray-600">{profileData.bio}</p>
                  ) : (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                      rows="4"
                      placeholder="Tell us about yourself and your environmental interests..."
                    />
                  )}
                </div>
                
                {/* Conservation Impact Score */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Conservation Impact Score</h2>
                  
                  <div className="bg-blue-50 rounded-2xl p-6 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-blue-200 rounded-full opacity-30"></div>
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-300 rounded-full opacity-20"></div>
                    
                    <div className="relative z-10 flex items-center">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {/* Background circle */}
                          <circle 
                            cx="50" cy="50" r="45" 
                            fill="none" 
                            stroke="#e2e8f0" 
                            strokeWidth="10" 
                          />
                          
                          {/* Progress circle */}
                          <circle 
                            cx="50" cy="50" r="45"
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="10"
                            strokeDasharray={`${(impactScore / 500) * 283} 283`}
                            strokeDashoffset="0"
                            transform="rotate(-90 50 50)"
                            className="transition-all duration-1000"
                          />
                          
                          {/* Text in center */}
                          <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold" fill="#3b82f6">
                            {impactScore}
                          </text>
                          <text x="50" y="65" textAnchor="middle" dominantBaseline="middle" className="text-xs" fill="#64748b">
                            / 500
                          </text>
                        </svg>
                      </div>
                      
                      <div className="ml-6">
                        <h3 className="text-2xl font-semibold text-gray-800">Your Impact Score</h3>
                        <p className="text-gray-600 mt-1">
                          Based on your activities, reports, and community engagement, you're making a significant impact on marine conservation.
                        </p>
                        <div className="flex items-center mt-3">
                          <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000" 
                              style={{ width: `${(impactScore / 500) * 100}%` }}
                            ></div>
                          </div>
                          <span className="ml-3 text-sm text-blue-600 font-medium">{Math.round((impactScore / 500) * 100)}%</span>
                        </div>
                        <p className="text-2xs text-gray-500 mt-2">
                          Next milestone: 325 points - "Environmental Change Maker"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Impact Stats */}
                <div ref={statsRef} className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">My Environmental Impact</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-3xl font-bold text-blue-700">
                          {animateStats ? (
                            <AnimatedCounter value={userData.impact.wasteReported} suffix="kg" />
                          ) : (
                            "0kg"
                          )}
                        </div>
                        <p className="text-3xl text-blue-600">Waste Reported</p>
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-blue-200 rounded-full opacity-60"></div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4 text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-3xl font-bold text-green-700">
                          {animateStats ? (
                            <AnimatedCounter value={userData.impact.cleanupEvents} />
                          ) : (
                            "0"
                          )}
                        </div>
                        <p className="text-3xl text-green-600">Cleanup Events</p>
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-green-200 rounded-full opacity-60"></div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-4 text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-3xl font-bold text-purple-700">
                          {animateStats ? (
                            <AnimatedCounter value={userData.impact.peopleEducated} />
                          ) : (
                            "0"
                          )}
                        </div>
                        <p className="text-3xl text-purple-600">People Educated</p>
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-purple-200 rounded-full opacity-60"></div>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-4 text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-3xl font-bold text-yellow-700">
                          {animateStats ? (
                            <AnimatedCounter value={userData.impact.totalContribution} suffix="h" />
                          ) : (
                            "0h"
                          )}
                        </div>
                        <p className="text-3xl text-yellow-600">Volunteer Hours</p>
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-yellow-200 rounded-full opacity-60"></div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Carbon Footprint Offset</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-xl font-semibold text-gray-800">{userData.carbonOffset.total}</span>
                          <span className="text-gray-600 ml-1">tons CO2</span>
                        </div>
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          +{userData.carbonOffset.monthly[5].toFixed(2)} this month
                        </span>
                      </div>
                      
                      {/* Enhanced carbon offset chart */}
                      <div className="h-24 flex items-end space-x-2">
                        {userData.carbonOffset.monthly.map((value, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center group relative">
                            <div 
                              className="w-full bg-teal-500 rounded-t hover:bg-teal-600 transition-colors"
                              style={{ 
                                height: `${(value / Math.max(...userData.carbonOffset.monthly)) * 80}%`,
                                transition: "height 1s ease-out",
                                transitionDelay: `${index * 0.1}s`,
                                opacity: animateStats ? 1 : 0
                              }}
                            ></div>
                            <span className="text-xs text-gray-500 mt-1">{userData.carbonOffset.labels[index]}</span>
                            
                            {/* Tooltip with detailed information */}
                            <div className="absolute bottom-full mb-2 bg-white p-2 rounded shadow-md text-xs w-32 
                                          opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                              <p className="font-semibold text-gray-800">{value.toFixed(2)} tons CO2</p>
                              <p className="text-gray-500 text-xs mt-1">{userData.carbonOffset.details[index]}</p>
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
                                            rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Added statistics summary */}
                      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                        <div>
                          <p className="text-xs text-gray-500">HIGHEST MONTH</p>
                          <p className="font-semibold">0.41 tons</p>
                          <p className="text-xs text-gray-500">April</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">MONTHLY AVG</p>
                          <p className="font-semibold">
                            {(userData.carbonOffset.monthly.reduce((a, b) => a + b, 0) / 
                              userData.carbonOffset.monthly.length).toFixed(2)} tons
                          </p>
                          <p className="text-xs text-gray-500">Last 6 months</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">GROWTH</p>
                          <p className="font-semibold text-green-600">
                            +{Math.round((userData.carbonOffset.monthly[5] / userData.carbonOffset.monthly[0] - 1) * 100)}%
                          </p>
                          <p className="text-xs text-gray-500">Nov to Apr</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto transition-colors">
                      <span>View detailed impact dashboard</span>
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </button>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-gray-800">Recent Activity</h2>
                    <button 
                      onClick={() => setActiveTab('activities')}
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                    >
                      View all
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {userData.events.slice(0, 2).map(event => (
                      <div key={event.id} className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{event.title}</h3>
                          <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
                          <p className="text-sm text-blue-600 mt-1">
                            Role: {event.role} • {event.participants} participants
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {userData.reports.slice(0, 2).map(report => (
                      <div key={report.id} className="flex items-start">
                        <div className="bg-green-100 rounded-full p-2 mr-4">
                          <Map className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Reported {report.type}</h3>
                          <p className="text-sm text-gray-500">{report.date} • {report.location}</p>
                          <div className="flex items-center mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              report.status === 'Verified' ? 'bg-blue-100 text-blue-800' :
                              report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {report.status}
                            </span>
                            {report.impact !== 'Pending' && (
                              <span className="text-sm text-gray-600 ml-2">• {report.impact}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recent Badges */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-gray-800">Recent Achievements</h2>
                    <button 
                      onClick={() => setActiveTab('badges')}
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                    >
                      View all
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userData.badges.slice(0, 2).map(badge => (
                      <div key={badge.id} className="border border-gray-200 rounded-lg p-4 flex items-center hover:shadow-md transition-shadow group">
                        <div className="bg-yellow-100 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform duration-300">
                          {getBadgeIcon(badge.icon)}
                        </div>
                        <div>
                        <h3 className="font-medium text-gray-800">{badge.name}</h3>
                          <p className="text-sm text-gray-500">{badge.description}</p>
                          <p className="text-xs text-blue-600 mt-1">Earned in {badge.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">My Activities</h2>
                
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h3 className="font-medium text-gray-800 mb-4">Upcoming Events</h3>
                  
                  <div className="space-y-4">
                    {userData.events.map(event => (
                      <div key={event.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-800">{event.title}</h3>
                            <span className="text-sm text-blue-600">{event.date}</span>
                          </div>
                          <p className="text-sm text-gray-500">{event.location}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-sm text-blue-600">
                              Role: {event.role} • {event.participants} participants
                            </p>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800 transition-colors">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-4">Recent Actions</h3>
                  
                  <div className="space-y-4">
                    {userData.recentActions.map(action => (
                      <div key={action.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
                        <div className="bg-green-100 rounded-full p-2 mr-4">
                          <Activity className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-800">{action.action}</h3>
                            <span className="text-sm text-gray-500">{action.date}</span>
                          </div>
                          <p className="text-sm text-gray-500">{action.location}</p>
                          <div className="mt-2 flex items-center">
                            <span className="text-sm">Impact score: </span>
                            <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                              +{action.impact} points
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">My Pollution Reports</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {userData.reports.map(report => (
                        <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4 text-sm text-gray-600">{report.date}</td>
                          <td className="py-4 px-4 text-sm text-gray-900 font-medium">{report.location}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{report.type}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              report.status === 'Verified' ? 'bg-blue-100 text-blue-800' :
                              report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">{report.impact}</td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800 transition-colors">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm">
                    Submit New Report
                  </button>
                </div>
              </div>
            )}
            
            {/* Badges Tab */}
            {activeTab === 'badges' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">My Achievements</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.badges.map(badge => (
                    <div key={badge.id} className="border border-gray-200 rounded-lg p-5 flex items-center hover:shadow-md transition-shadow group">
                      <div className="bg-yellow-100 rounded-full p-4 mr-5 group-hover:scale-110 transition-transform duration-300">
                        {getBadgeIcon(badge.icon)}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-gray-800">{badge.name}</h3>
                        <p className="text-gray-500">{badge.description}</p>
                        <p className="text-sm text-blue-600 mt-2">Earned in {badge.date}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Upcoming badges */}
                  <div className="border border-dashed border-gray-300 rounded-lg p-5 flex items-center bg-gray-50">
                    <div className="bg-gray-200 rounded-full p-4 mr-5">
                      <Award className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-gray-600">Conservation Leader</h3>
                      <p className="text-gray-500">Lead 5 community cleanup events</p>
                      <p className="text-sm text-blue-600 mt-2">Progress: 2/5 complete</p>
                      <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-dashed border-gray-300 rounded-lg p-5 flex items-center bg-gray-50">
                    <div className="bg-gray-200 rounded-full p-4 mr-5">
                      <Activity className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-gray-600">Environmental Analyst</h3>
                      <p className="text-gray-500">Submit 10 verified pollution reports</p>
                      <p className="text-sm text-blue-600 mt-2">Progress: 4/10 complete</p>
                      <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h2>
                
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h3 className="font-medium text-gray-800 mb-4">Personal Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h3 className="font-medium text-gray-800 mb-4">Notification Settings</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">Email Updates</h4>
                        <p className="text-xs text-gray-500">Receive updates about your reports and activities</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={profileData.notificationSettings.emailUpdates}
                          onChange={() => handleNotificationChange('emailUpdates')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">Report Updates</h4>
                        <p className="text-xs text-gray-500">Get notifications when your reports are verified or resolved</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={profileData.notificationSettings.reportUpdates}
                          onChange={() => handleNotificationChange('reportUpdates')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">Event Reminders</h4>
                        <p className="text-xs text-gray-500">Get notified about upcoming events and activities</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={profileData.notificationSettings.eventReminders}
                          onChange={() => handleNotificationChange('eventReminders')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">Newsletter Subscription</h4>
                        <p className="text-xs text-gray-500">Receive our monthly conservation newsletter</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={profileData.notificationSettings.newsletterSubscription}
                          onChange={() => handleNotificationChange('newsletterSubscription')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h3 className="font-medium text-gray-800 mb-4">Security</h3>
                  
                  <div className="space-y-4">
                    <button className="w-full flex justify-between items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-gray-500 mr-3" />
                        <span className="text-green-600">Change Password</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                    
                    <button className="w-full flex justify-between items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-gray-500 mr-3" />
                        <span className="text-green-600">Privacy Settings</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-4">Danger Zone</h3>
                  
                  <div className="bg-red-50 p-4 rounded-md border border-red-200">
                    <h4 className="text-red-600 font-medium">Delete Account</h4>
                    <p className="text-sm text-gray-600 mt-1 mb-3">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="bg-white text-red-600 border border-red-300 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition-colors">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 transform transition-all duration-300 scale-100">
            <div className="flex items-center">
              {modalContent.type === 'success' ? (
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-yellow-500 mr-3" />
              )}
              <div>
                <h3 className="text-lg font-bold text-gray-900">{modalContent.title}</h3>
                <p className="text-gray-600">{modalContent.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

// AnimatedCounter component - simple counter animation
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const step = Math.ceil(value / 30);
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev + step >= value) {
          clearInterval(timer);
          return value;
        }
        return prev + step;
      });
    }, 30);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <>{count}{suffix}</>;
};

// Add missing imports
const MapPin = Map;
const AlertTriangle = Bell;
const Users = User;