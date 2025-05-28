import { useState, useEffect } from "react";
import { 
  Book, School, Download, ExternalLink, ChevronDown, 
  Search, Play, FileText, CheckSquare, Globe, Award, X, Upload
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Education() {
  const [activeTab, setActiveTab] = useState('students');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [showSubscriptionSuccess, setShowSubscriptionSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showContributionSuccess, setShowContributionSuccess] = useState(false);
  
  // Simulated educational resources
  const resources = {
    students: [
      {
        id: 1,
        title: "Marine Pollution 101",
        type: "lesson",
        level: "Elementary",
        duration: "45 min",
        thumbnail: "/images/Marine Pollution.jpg",
        description: "An introduction to marine pollution for young learners. Includes activities and worksheets."
      },
      {
        id: 2,
        title: "Plastic in Our Oceans",
        type: "video",
        level: "Middle School",
        duration: "15 min",
        thumbnail: "/images/Plastic in Our Oceans.jpg",
        description: "Educational video exploring the journey of plastic from our homes to the ocean."
      },
      {
        id: 3,
        title: "Marine Ecosystems Interactive",
        type: "activity",
        level: "High School",
        duration: "60 min",
        thumbnail: "/images/Marine Ecosystems Interactive.jpg",
        description: "Interactive simulation showing how pollution affects different marine ecosystems."
      },
      {
        id: 4,
        title: "Ocean Pollution Quiz Pack",
        type: "quiz",
        level: "All Levels",
        duration: "30 min",
        thumbnail: "/images/Ocean Pollution Quiz Pack.jpg",
        description: "Set of quizzes to test knowledge about various types of marine pollution."
      },
      {
        id: 5,
        title: "Beach Cleanup Guide",
        type: "guide",
        level: "All Ages",
        duration: "N/A",
        thumbnail: "/images/Beach Cleanup Guide.jpg",
        description: "Step-by-step guide for organizing and conducting a beach cleanup activity."
      }
    ],
    educators: [
      {
        id: 6,
        title: "Marine Pollution Curriculum",
        type: "curriculum",
        level: "Grades 3-5",
        duration: "4 weeks",
        thumbnail: "/images/Marine Pollution Curriculum.jpg",
        description: "Complete curriculum with lesson plans, activities, and assessment tools."
      },
      {
        id: 7,
        title: "Digital Lab: Water Quality Testing",
        type: "lab",
        level: "Grades 6-8",
        duration: "90 min",
        thumbnail: "/images/Digital Lab Water Quality Testing.jpg",
        description: "Virtual lab simulation for testing and analyzing water quality samples."
      },
      {
        id: 8,
        title: "Educator Workshop Materials",
        type: "workshop",
        level: "Teachers",
        duration: "3 hours",
        thumbnail: "/images/Educator Workshop Materials.jpg",
        description: "Materials for conducting educator workshops on marine conservation."
      },
      {
        id: 9,
        title: "Classroom Debate Kit: Ocean Conservation",
        type: "activity",
        level: "Grades 9-12",
        duration: "2 hours",
        thumbnail: "/images/Classroom Debate Kit.jpg",
        description: "Materials to facilitate classroom debates on marine conservation policies."
      },
      {
        id: 10,
        title: "Marine Science Project Guidelines",
        type: "guide",
        level: "All Grades",
        duration: "Varies",
        thumbnail: "/images/Marine Science Project Guidelines.jpg",
        description: "Guidelines and rubrics for student science projects focused on marine pollution."
      }
    ],
    researchers: [
      {
        id: 11,
        title: "Pollution Data API Access Guide",
        type: "technical",
        level: "Advanced",
        duration: "N/A",
        thumbnail: "/images/Pollution Data API.jpg",
        description: "Technical documentation for accessing our marine pollution datasets via API."
      },
      {
        id: 12,
        title: "Research Methodology Whitepaper",
        type: "paper",
        level: "Advanced",
        duration: "N/A",
        thumbnail: "/images/Research Methodology Whitepaper.jpg",
        description: "Detailed explanation of our data collection and analysis methodologies."
      },
      {
        id: 13,
        title: "Marine Pollution Case Studies",
        type: "case study",
        level: "Professional",
        duration: "N/A",
        thumbnail: "/images/Marine Pollution Case Studies.jpg",
        description: "Collection of case studies examining major marine pollution incidents and responses."
      },
      {
        id: 14,
        title: "Citizen Science Integration Guide",
        type: "guide",
        level: "Intermediate",
        duration: "N/A",
        thumbnail: "/images/Citizen Science Integration Guide.jpg",
        description: "Best practices for integrating citizen science data into research projects."
      },
      {
        id: 15,
        title: "Academic Research Partnership Program",
        type: "program",
        level: "Professional",
        duration: "Ongoing",
        thumbnail: "/images/Academic Research.jpg",
        description: "Information about our academic partnership program for collaborative research."
      }
    ]
  };
  
  // Handle fallback for missing images
  useEffect(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.onerror = () => {
        img.src = 'https://via.placeholder.com/300x200';
      };
    });
  }, [activeTab, searchQuery]);
  
  // Filter resources based on search query
  const filterResources = (categoryResources) => {
    if (!searchQuery) return categoryResources;
    
    return categoryResources.filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.level.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Resource type icons
  const getResourceIcon = (type) => {
    switch(type) {
      case 'lesson': return <Book className="h-5 w-5 text-blue-500" />;
      case 'video': return <Play className="h-5 w-5 text-red-500" />;
      case 'activity': return <CheckSquare className="h-5 w-5 text-green-500" />;
      case 'quiz': return <Award className="h-5 w-5 text-yellow-500" />;
      case 'guide': return <FileText className="h-5 w-5 text-purple-500" />;
      case 'curriculum': return <School className="h-5 w-5 text-indigo-500" />;
      case 'lab': return <Globe className="h-5 w-5 text-cyan-500" />;
      case 'workshop': return <Users className="h-5 w-5 text-orange-500" />;
      case 'technical': return <Code className="h-5 w-5 text-gray-500" />;
      case 'paper': return <FileText className="h-5 w-5 text-gray-600" />;
      case 'case study': return <FileText className="h-5 w-5 text-teal-500" />;
      case 'program': return <Award className="h-5 w-5 text-pink-500" />;
      default: return <Book className="h-5 w-5 text-blue-500" />;
    }
  };
  
  // FAQ items
  const faqItems = [
    {
      id: 1,
      question: "How can I download educational materials for offline use?",
      answer: "Most of our educational resources can be downloaded for offline use. Look for the download button (↓) on each resource card. For larger curriculum packages, you may need to download individual components separately. If you're having trouble accessing materials, please contact our support team at education@seathetruth.org."
    },
    {
      id: 2,
      question: "Can I use these materials in my classroom?",
      answer: "Yes! All of our educational materials are free to use for educational purposes. We simply ask that you credit 'Sea The Truth' as the source. For public presentations or publications that use our materials, please contact us for proper citation guidelines. We love hearing how our resources are being used, so feel free to share your experiences with us."
    },
    {
      id: 3,
      question: "Are the educational materials available in languages other than English?",
      answer: "Many of our core materials are available in multiple languages, including Hebrew and Arabic. Look for the language selector on resource pages. We're continuously working to translate more of our content. If you're interested in helping with translations, please reach out to our volunteer coordinator."
    },
    {
      id: 4,
      question: "How can I contribute my own educational resources?",
      answer: "We welcome contributions from educators, scientists, and conservation enthusiasts. To submit your materials for consideration, please use the 'Contribute' button in the Educators section. Our review team evaluates submissions based on accuracy, educational value, and alignment with our mission. We typically respond to submissions within 2-3 weeks."
    },
    {
      id: 5,
      question: "Do you offer virtual presentations or workshops for schools?",
      answer: "Yes, we offer virtual presentations and workshops for schools throughout the academic year. These sessions are led by our team of marine educators and scientists. To request a session for your class or school, please fill out the request form in the Educators section at least 3 weeks before your desired date. We offer these sessions free of charge, but donations to support our work are always appreciated."
    }
  ];
  
  const handleFaqClick = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  const openResourceModal = (resource) => {
    setModalContent(resource);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };
  
  const handleDownload = (resource) => {
    // In a real app, this would initiate a download
    alert(`Downloading: ${resource.title}`);
    // Simulate download completed
    setTimeout(() => {
      alert("Download complete!");
    }, 1500);
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    
    // Simulate subscription process
    setTimeout(() => {
      setShowSubscriptionSuccess(true);
      setSubscribeEmail('');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSubscriptionSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };
  
  const handleContribute = (e) => {
    e.preventDefault();
    
    // Simulate contribution submission
    setTimeout(() => {
      setShowContributionSuccess(true);
      setSelectedFiles([]);
      
      // Hide the contribution form after success
      setTimeout(() => {
        setShowContributionSuccess(false);
        closeModal();
      }, 3000);
    }, 1500);
  };
  
  const openContributeForm = () => {
    setModalContent({
      title: "Contribute Educational Resources",
      type: "form"
    });
    setIsModalOpen(true);
  };
  
  return (
<div style={{width: "100vw", maxWidth: "100%", margin: 0}} className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 overflow-x-hidden">

      <div className="w-full px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative p-6 bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h1 className="text-2xl font-bold mb-2">Education Center</h1>
              <p className="opacity-90 max-w-2xl">
                Explore our collection of educational resources designed to inspire learning and action for marine conservation
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search educational resources..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'students'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <School className="h-5 w-5 mr-2" />
                  <span>For Students</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('educators')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'educators'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Book className="h-5 w-5 mr-2" />
                  <span>For Educators</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('researchers')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'researchers'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>For Researchers</span>
                </div>
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Tab header with contribute button for educators */}
            {activeTab === 'educators' && (
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Educational Resources for Teachers</h2>
                <button 
                  onClick={openContributeForm}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Contribute Resources
                </button>
              </div>
            )}
            
            {/* Resource Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterResources(resources[activeTab]).map(resource => (
                <div key={resource.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="h-40 bg-gray-200 relative">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-white bg-opacity-90 m-2 px-2 py-1 rounded text-xs font-medium text-gray-700">
                      {resource.level}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {getResourceIcon(resource.type)}
                      <span className="text-xs font-medium text-gray-500 ml-2 capitalize">
                        {resource.type} • {resource.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex justify-between">
                      <button 
                        onClick={() => openResourceModal(resource)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        View Resource
                      </button>
                      <button 
                        onClick={() => handleDownload(resource)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {filterResources(resources[activeTab]).length === 0 && (
              <div className="text-center py-12">
                <div className="inline-block p-3 rounded-full bg-gray-100 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No resources found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We couldn't find any educational resources matching your search. Try using different keywords or browse all resources.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqItems.map(item => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => handleFaqClick(item.id)}
                  className="w-full flex justify-between items-center p-4 text-left focus:outline-none bg-white hover:bg-gray-50"
                >
                  <span className="font-medium text-blue-400">{item.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      expandedFaq === item.id ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                {expandedFaq === item.id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Educational Programs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Educational Programs</h2>
          <p className="text-gray-600 mb-6">
            Beyond our online resources, we offer several in-person and virtual educational programs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-indigo-100 rounded-md">
                  <School className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-800 ml-3">School Visits</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our team visits schools across Israel to deliver engaging presentations and hands-on activities.
              </p>
              <button 
                onClick={() => {
                  setModalContent({
                    title: "Request a School Visit",
                    type: "program",
                    program: "school-visit"
                  });
                  setIsModalOpen(true);
                }}
                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm"
              >
                Request a visit
                <ExternalLink className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 rounded-md">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 ml-3">Field Trips</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Guided educational trips to beaches and marine research centers for students of all ages.
              </p>
              <button
                onClick={() => {
                  setModalContent({
                    title: "Plan a Field Trip",
                    type: "program",
                    program: "field-trip"
                  });
                  setIsModalOpen(true);
                }}
                className="text-green-600 hover:text-green-800 font-medium flex items-center text-sm"
              >
                Plan a field trip
                <ExternalLink className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-purple-100 rounded-md">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-purple-800 ml-3">Research Program</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Mentorship program pairing high school students with marine researchers for projects.
              </p>
              <button
                onClick={() => {
                  setModalContent({
                    title: "Apply for Research Program",
                    type: "program",
                    program: "research"
                  });
                  setIsModalOpen(true);
                }}
                className="text-purple-600 hover:text-purple-800 font-medium flex items-center text-sm"
              >
                Apply for program
                <ExternalLink className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-white-600 to-indigo-700 rounded-lg shadow-md p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Educational Community</h2>
            <p className="text-blue-100 mb-6">
              Subscribe to our education newsletter to receive the latest resources, event announcements, and teaching ideas directly to your inbox.
            </p>
            
            {showSubscriptionSuccess ? (
              <div className="bg-white bg-opacity-20 rounded-md p-4 max-w-lg mx-auto">
                <div className="flex items-center justify-center text-white">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <p>Thank you for subscribing! You'll receive our next newsletter soon.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3">
                <input
                  type="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  required
                />
                <button 
                  type="submit"
                  className="bg-white text-indigo-700 px-6 py-2 rounded-md font-medium hover:bg-indigo-50"
                >
                  Subscribe
                </button>
              </form>
            )}
            
            <p className="text-xs text-blue-200 mt-3">
              We respect your privacy and will never share your information. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-800">{modalContent?.title}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {modalContent?.type === 'form' ? (
                <div>
                  {showContributionSuccess ? (
                    <div className="text-center py-8">
                      <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                        <p className="font-medium">Thank you for your contribution!</p>
                        <p className="text-sm mt-1">Our team will review your submission and get back to you soon.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContribute}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name*
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address*
                          </label>
                          <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Resource Title*
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Resource Type*
                          </label>
                          <select className="w-full p-2 border border-gray-300 rounded-md" required>
                            <option value="">-- Select Type --</option>
                            <option value="lesson">Lesson Plan</option>
                            <option value="activity">Activity</option>
                            <option value="video">Video</option>
                            <option value="guide">Guide</option>
                            <option value="curriculum">Curriculum</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target Age/Grade Level*
                          </label>
                          <select className="w-full p-2 border border-gray-300 rounded-md" required>
                            <option value="">-- Select Level --</option>
                            <option value="elementary">Elementary School (K-5)</option>
                            <option value="middle">Middle School (6-8)</option>
                            <option value="high">High School (9-12)</option>
                            <option value="college">College/University</option>
                            <option value="adult">Adult Education</option>
                            <option value="all">All Levels</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description*
                          </label>
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows="4"
                            required
                          ></textarea>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Files*
                          </label>
                          <div className="border-2 border-gray-300 border-dashed rounded-md p-4">
                            <div className="flex justify-center">
                              <label className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                                <span>Choose files</span>
                                <input 
                                  type="file" 
                                  className="sr-only" 
                                  multiple 
                                  onChange={handleFileSelect}
                                  required={selectedFiles.length === 0}
                                />
                              </label>
                            </div>
                            
                            {selectedFiles.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700">Selected files:</h4>
                                <ul className="mt-2 text-sm text-gray-500">
                                  {selectedFiles.map((file, index) => (
                                    <li key={index} className="flex items-center">
                                      <FileText className="h-4 w-4 mr-1 text-gray-400" />
                                      {file.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <p className="mt-2 text-xs text-gray-500">
                              PDF, DOCX, PPT, JPG, MP4 or ZIP files up to 50MB each
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="mr-3 px-4 py-2 text-sm text-gray-700 hover:text-gray-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium"
                        >
                          Submit Contribution
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : modalContent?.type === 'program' ? (
                <div>
                  {modalContent.program === 'school-visit' && (
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Our team of marine educators can visit your school to deliver engaging 
                        presentations and hands-on activities about marine pollution and conservation.
                      </p>
                      
                      <form className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            School Name*
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Person*
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email*
                          </label>
                          <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number*
                          </label>
                          <input
                            type="tel"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Dates
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Grade Level(s)*
                          </label>
                          <select className="w-full p-2 border border-gray-300 rounded-md" required>
                            <option value="">-- Select Grade Level --</option>
                            <option value="k-2">K-2</option>
                            <option value="3-5">3-5</option>
                            <option value="6-8">6-8</option>
                            <option value="9-12">9-12</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Students*
                          </label>
                          <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            min="1"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Information
                          </label>
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows="3"
                          ></textarea>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="mr-3 px-4 py-2 text-sm text-gray-700 hover:text-gray-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              alert("Request submitted successfully! Our team will contact you shortly.");
                              closeModal();
                            }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium"
                          >
                            Submit Request
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  
                  {modalContent.program === 'field-trip' && (
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Join us for guided educational trips to beaches and marine research centers. 
                        Our field trips offer hands-on learning experiences about marine ecosystems and conservation.
                      </p>
                      
                      <div className="bg-blue-50 p-4 rounded-md mb-4">
                        <h4 className="text-blue-700 font-medium">Available Field Trip Locations:</h4>
                        <ul className="mt-2 space-y-1 text-blue-600">
                          <li>• Tel Aviv Marine Education Center</li>
                          <li>• Haifa Bay Pollution Monitoring Station</li>
                          <li>• Eilat Coral Reef Nature Reserve</li>
                          <li>• Herzliya Marine Research Institute</li>
                        </ul>
                      </div>
                      
                      <form className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Organization/School Name*
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Person*
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email*
                          </label>
                          <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Location*
                          </label>
                          <select className="w-full p-2 border border-gray-300 rounded-md" required>
                            <option value="">-- Select Location --</option>
                            <option value="telaviv">Tel Aviv Marine Education Center</option>
                            <option value="haifa">Haifa Bay Pollution Monitoring Station</option>
                            <option value="eilat">Eilat Coral Reef Nature Reserve</option>
                            <option value="herzliya">Herzliya Marine Research Institute</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Date*
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Group Size*
                          </label>
                          <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            min="5"
                            max="50"
                            required
                          />
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="mr-3 px-4 py-2 text-sm text-gray-700 hover:text-gray-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              alert("Field trip request submitted successfully! We'll contact you to confirm details.");
                              closeModal();
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-medium"
                          >
                            Request Field Trip
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  
                  {modalContent.program === 'research' && (
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Our research mentorship program pairs high school students with marine researchers for 
                        real-world scientific projects. This program runs during summer and select weekends 
                        throughout the academic year.
                      </p>
                      
                      <div className="bg-purple-50 p-4 rounded-md">
                        <h4 className="text-purple-700 font-medium">Program Requirements:</h4>
                        <ul className="mt-2 space-y-1 text-gray-600">
                          <li>• Currently enrolled in grades 10-12</li>
                          <li>• Completed at least one high school science course</li>
                          <li>• Able to commit at least 40 hours to the project</li>
                          <li>• Passionate about marine science and conservation</li>
                        </ul>
                      </div>
                      
                      <form className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Student Name*
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email*
                          </label>
                          <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number*
                          </label>
                          <input
                            type="tel"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            School Name*
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Grade*
                          </label>
                          <select className="w-full p-2 border border-gray-300 rounded-md" required>
                            <option value="">-- Select Grade --</option>
                            <option value="10">10th Grade</option>
                            <option value="11">11th Grade</option>
                            <option value="12">12th Grade</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Area of Interest*
                          </label>
                          <select className="w-full p-2 border border-gray-300 rounded-md" required>
                            <option value="">-- Select Area --</option>
                            <option value="marine-biology">Marine Biology</option>
                            <option value="ocean-chemistry">Ocean Chemistry</option>
                            <option value="pollution-monitoring">Pollution Monitoring</option>
                            <option value="conservation">Conservation Strategies</option>
                            <option value="technology">Marine Technology</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Why are you interested in this program?*
                          </label>
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows="4"
                            required
                          ></textarea>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="mr-3 px-4 py-2 text-sm text-gray-700 hover:text-gray-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              alert("Application submitted successfully! We'll review your application and contact you within two weeks.");
                              closeModal();
                            }}
                            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm font-medium"
                          >
                            Submit Application
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              ) : (
                // Resource view
                <div>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <img 
                        src={modalContent?.thumbnail} 
                        alt={modalContent?.title}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="flex items-center mb-3">
                        {modalContent && getResourceIcon(modalContent.type)}
                        <span className="text-sm font-medium text-gray-500 ml-2 capitalize">
                          {modalContent?.type} • {modalContent?.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{modalContent?.title}</h3>
                      <p className="text-gray-600 mb-4">{modalContent?.description}</p>
                      
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="font-medium text-gray-700 mb-2">Resource Details</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li><span className="font-medium">Level:</span> {modalContent?.level}</li>
                          <li><span className="font-medium">Format:</span> PDF, Slides, Activity Sheets</li>
                          <li><span className="font-medium">Languages:</span> English, Hebrew, Arabic</li>
                          <li><span className="font-medium">Last Updated:</span> April 2025</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 mt-6 pt-6">
                    <h4 className="font-medium text-gray-700 mb-3">Available Files</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-gray-700">{modalContent?.title} - Lesson Plan.pdf</span>
                        </div>
                        <button 
                          onClick={() => handleDownload(modalContent)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-green-500 mr-2" />
                          <span className="text-gray-700">{modalContent?.title} - Presentation.pptx</span>
                        </div>
                        <button 
                          onClick={() => handleDownload(modalContent)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-yellow-500 mr-2" />
                          <span className="text-gray-700">{modalContent?.title} - Activity Sheets.pdf</span>
                        </div>
                        <button 
                          onClick={() => handleDownload(modalContent)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 p-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-sm font-medium"
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

// Helper components
const CheckCircle = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
};

const Users = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};

const Code = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
};

const Info = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
};