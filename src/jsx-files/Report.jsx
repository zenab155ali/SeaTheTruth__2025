import { useState, useRef } from "react";
import { 
  Camera, MapPin, AlertTriangle, CheckCircle, Upload, 
  Image as ImageIcon, Map, Send, X
} from "lucide-react";

export default function Report() {
  const [formState, setFormState] = useState({
    pollutionType: '',
    description: '',
    location: '',
    severity: 'medium',
    name: '',
    email: '',
    anonymous: false
  });
  
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [locationDetectionInProgress, setLocationDetectionInProgress] = useState(false);
  
  const fileInputRef = useRef(null);
  
  const pollutionTypes = [
    { id: 'plastic', name: 'Plastic Waste' },
    { id: 'oil', name: 'Oil Spill' },
    { id: 'chemical', name: 'Chemical Discharge' },
    { id: 'sewage', name: 'Sewage' },
    { id: 'fishing', name: 'Fishing Gear/Nets' },
    { id: 'trash', name: 'General Trash' },
    { id: 'other', name: 'Other' }
  ];
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear errors when user modifies a field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    const newImages = [...images];
    
    files.forEach(file => {
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          newImages.push({
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            file: file,
            preview: e.target.result
          });
          setImages(newImages);
          setImagePreview(e.target.result);
        };
        
        reader.readAsDataURL(file);
      }
    });
  };
  
  const removeImage = (id) => {
    const newImages = images.filter(image => image.id !== id);
    setImages(newImages);
    if (newImages.length > 0) {
      setImagePreview(newImages[newImages.length - 1].preview);
    } else {
      setImagePreview(null);
    }
  };
  
  const detectLocation = () => {
    setLocationDetectionInProgress(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
          
          // Simulate reverse geocoding (in a real app, you'd use a geocoding service)
          setTimeout(() => {
            setFormState({
              ...formState,
              location: 'Detected Location (Haifa Bay Area)'
            });
            setLocationDetectionInProgress(false);
          }, 1500);
        },
        (error) => {
          console.error("Error detecting location:", error);
          setLocationDetectionInProgress(false);
          setFormErrors({
            ...formErrors,
            location: "Unable to detect location. Please enter manually."
          });
        }
      );
    } else {
      setLocationDetectionInProgress(false);
      setFormErrors({
        ...formErrors,
        location: "Geolocation is not supported by your browser. Please enter location manually."
      });
    }
  };
  
  const validateStep = (step) => {
    const errors = {};
    
    if (step === 1) {
      if (!formState.pollutionType) {
        errors.pollutionType = "Please select a pollution type";
      }
      if (!formState.description || formState.description.length < 10) {
        errors.description = "Please provide a more detailed description (at least 10 characters)";
      }
      if (!formState.location) {
        errors.location = "Please enter or detect a location";
      }
      if (images.length === 0) {
        errors.images = "Please upload at least one image";
      }
    }
    
    if (step === 2) {
      if (!formState.name && !formState.anonymous) {
        errors.name = "Please enter your name or report anonymously";
      }
      if (!formState.email && !formState.anonymous) {
        errors.email = "Please enter your email or report anonymously";
      } else if (formState.email && !formState.anonymous && !/^\S+@\S+\.\S+$/.test(formState.email)) {
        errors.email = "Please enter a valid email address";
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFormState({
          pollutionType: '',
          description: '',
          location: '',
          severity: 'medium',
          name: '',
          email: '',
          anonymous: false
        });
        setImages([]);
        setImagePreview(null);
        setCoordinates(null);
        setCurrentStep(1);
        setShowSuccess(false);
      }, 3000);
    }, 2000);
  };
  
  return (
<div style={{width: "100vw", maxWidth: "100%", margin: 0}} className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 overflow-x-hidden">



<div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-blue-900">
  <img 
    src="/images/logo8.gif" 
    alt="Ocean background" 
    className="absolute min-w-full min-h-full object-cover w-auto h-auto"
    style={{ filter: 'brightness(0.4)' }}
  />
</div>




<div className="container mx-auto px-4 py-8 relative z-10">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 bg-gradient-to-r from-green-600 to-green-800 text-white">
            <h1 className="text-2xl font-bold mb-2">Report Pollution</h1>
            <p className="opacity-90">
              Help us track and address marine pollution by submitting your observations
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="bg-white p-4 border-b">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  currentStep >= 1 ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                } font-semibold text-sm`}>
                  1
                </div>
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep >= 2 ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  currentStep >= 2 ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                } font-semibold text-sm`}>
                  2
                </div>
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep >= 3 ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  currentStep >= 3 ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                } font-semibold text-sm`}>
                  3
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
                <div className={currentStep >= 1 ? 'text-green-700 font-medium' : ''}>Pollution Details</div>
                <div className={currentStep >= 2 ? 'text-green-700 font-medium' : ''}>Reporter Info</div>
                <div className={currentStep >= 3 ? 'text-green-700 font-medium' : ''}>Review & Submit</div>
              </div>
            </div>
          </div>
          
          {/* Form */}
          {!showSuccess ? (
            <div className="p-6">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Pollution Details */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pollution Type*
                        </label>
                        <select
                          name="pollutionType"
                          value={formState.pollutionType}
                          onChange={handleInputChange}
                          className={`w-full p-2 border rounded-md ${
                            formErrors.pollutionType ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">-- Select Type --</option>
                          {pollutionTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                          ))}
                        </select>
                        {formErrors.pollutionType && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.pollutionType}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description*
                        </label>
                        <textarea
                          name="description"
                          value={formState.description}
                          onChange={handleInputChange}
                          rows="4"
                          placeholder="Describe what you observed (size, amount, appearance, etc.)"
                          className={`w-full p-2 border rounded-md ${
                            formErrors.description ? 'border-red-500' : 'border-gray-300'
                          }`}
                        ></textarea>
                        {formErrors.description && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {formState.description.length}/500 characters
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location*
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            name="location"
                            value={formState.location}
                            onChange={handleInputChange}
                            placeholder="Enter beach, city, or coordinates"
                            className={`flex-1 p-2 border rounded-l-md ${
                              formErrors.location ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={detectLocation}
                            disabled={locationDetectionInProgress}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-r-md border border-blue-200 flex items-center"
                          >
                            {locationDetectionInProgress ? (
                              <span className="flex items-center">
                                <span className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-1"></span>
                                Detecting...
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                Detect
                              </span>
                            )}
                          </button>
                        </div>
                        {formErrors.location && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.location}</p>
                        )}
                        {coordinates && (
                          <p className="text-xs text-gray-500 mt-1">
                            Coordinates: {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Severity Level
                        </label>
                        <div className="flex space-x-4">
                          {['low', 'medium', 'high'].map((level) => (
                            <label key={level} className="flex items-center">
                              <input
                                type="radio"
                                name="severity"
                                value={level}
                                checked={formState.severity === level}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                              />
                              <span className="ml-2 text-gray-700 capitalize">{level}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Upload Images*
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div 
                              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 ${
                                formErrors.images ? 'border-red-400 bg-red-50' : 'border-gray-300'
                              }`}
                              onClick={() => fileInputRef.current.click()}
                            >
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                                accept="image/*"
                                multiple
                              />
                              <div className="flex flex-col items-center justify-center py-3">
                                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 font-medium">Click to upload images</p>
                                <p className="text-xs text-gray-500">JPG, PNG, or GIF (max 5MB)</p>
                              </div>
                            </div>
                            {formErrors.images && (
                              <p className="mt-1 text-sm text-red-600">{formErrors.images}</p>
                            )}
                          </div>
                          
                          {imagePreview && (
                            <div className="relative rounded-lg overflow-hidden h-48 bg-gray-100">
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                                {images.length} image{images.length !== 1 ? 's' : ''} uploaded
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {images.length > 0 && (
                          <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images</h4>
                            <div className="flex flex-wrap gap-2">
                              {images.map(image => (
                                <div key={image.id} className="relative w-16 h-16 rounded overflow-hidden">
                                  <img 
                                    src={image.preview} 
                                    alt="Thumbnail" 
                                    className="w-full h-full object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(image.id)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 transform translate-x-1 -translate-y-1"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Reporter Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Your privacy matters</h3>
                            <div className="mt-1 text-sm text-blue-600">
                              <p>Your personal information is used only to:</p>
                              <ul className="list-disc pl-5 mt-1 space-y-1">
                                <li>Verify report authenticity</li>
                                <li>Contact you for additional details if needed</li>
                                <li>Send you updates on actions taken</li>
                              </ul>
                              <p className="mt-2">
                                You can choose to report anonymously if you prefer.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="anonymous"
                            checked={formState.anonymous}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-gray-700">Submit report anonymously</span>
                        </label>
                      </div>
                      
                      {!formState.anonymous && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Your Name*
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formState.name}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              className={`w-full p-2 border rounded-md ${
                                formErrors.name ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {formErrors.name && (
                              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address*
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formState.email}
                              onChange={handleInputChange}
                              placeholder="Your email for report updates"
                              className={`w-full p-2 border rounded-md ${
                                formErrors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {formErrors.email && (
                              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              We'll only use this to send you updates on your report.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  
                  {/* Step 3: Review & Submit */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">Almost done!</h3>
                            <div className="mt-1 text-sm text-green-700">
                              Please review your report details before submitting.
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 bg-gray-50">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Report Summary</h3>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Pollution Type</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize">
                                {pollutionTypes.find(t => t.id === formState.pollutionType)?.name || 'N/A'}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Location</dt>
                              <dd className="mt-1 text-sm text-gray-900">{formState.location}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Severity</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize">{formState.severity}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Images</dt>
                              <dd className="mt-1 text-sm text-gray-900">{images.length} attached</dd>
                            </div>
                            <div className="sm:col-span-2">
                              <dt className="text-sm font-medium text-gray-500">Description</dt>
                              <dd className="mt-1 text-sm text-gray-900">{formState.description}</dd>
                            </div>
                            <div className="sm:col-span-2">
                              <dt className="text-sm font-medium text-gray-500">Reporting</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {formState.anonymous 
                                  ? 'Anonymous report' 
                                  : `${formState.name} (${formState.email})`
                                }
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                      
                      {imagePreview && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Image Preview</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {images.map(image => (
                              <div key={image.id} className="rounded-lg overflow-hidden h-20 bg-gray-100">
                                <img 
                                  src={image.preview} 
                                  alt="Preview" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                            <div className="mt-1 text-sm text-yellow-700">
                              By submitting this report, you confirm that the information provided is accurate to the best of your knowledge and that the images attached are your own or you have permission to share them.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Navigation Buttons */}
                  <div className="mt-8 flex justify-between">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
                      >
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Report
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Report!</h2>
                <p className="text-gray-600 mb-6">
                  Your contribution helps us track and address marine pollution. Our team will review your report and take appropriate action.
                </p>
                <p className="text-sm text-gray-500">
                  {formState.anonymous 
                    ? "Since you submitted anonymously, we won't be able to update you on the status."
                    : `We've sent a confirmation email to ${formState.email} with a report ID for tracking.`
                  }
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                <Camera className="h-5 w-5 mr-2 text-green-600" />
                Tips for Good Photos
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Include wide shots to show the extent of pollution</li>
                <li>Take close-ups to show details of the pollution</li>
                <li>Include recognizable landmarks when possible</li>
                <li>Avoid including identifiable people in your photos</li>
                <li>If possible, include something for scale (like a coin)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                <Map className="h-5 w-5 mr-2 text-green-600" />
                Location Information
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Be as specific as possible about the location</li>
                <li>Use the "Detect" button to automatically capture your coordinates</li>
                <li>For beaches, include the name and nearest access point</li>
                <li>For offshore pollution, estimate distance from shore</li>
                <li>Include nearby landmarks to help identify the location</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">What Happens Next?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold text-blue-800 mb-1">1. Report Review</div>
                <p className="text-gray-600">Our team will review your report and verify the information</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold text-blue-800 mb-1">2. Data Entry</div>
                <p className="text-gray-600">Your report will be added to our pollution tracking database</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold text-blue-800 mb-1">3. Action Planning</div>
                <p className="text-gray-600">We'll coordinate with local authorities and cleanup teams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}