import React, { useState } from 'react';
import { AlertTriangle, FileText, Camera, Zap, Droplets, Home, MoreHorizontal, Upload, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RaiseIssue = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('category', formData.category);
      data.append('description', formData.description);
      if (formData.photo) {
        data.append('image', formData.photo);
      }

      const response = await axios.post(`${backendUrl}/student/issue`, data,{
        withCredentials: true,
      });

      if (response.data) {
        toast.success("Issue submitted successfully");
        // Reset form
        setFormData({ category: '', description: '', photo: null });
        navigate('/student/home');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      // alert('Failed to submit issue. Please try again');
      toast.error("Something went wrong");
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Electricity':
        return <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />;
      case 'Sanitation':
        return <Home className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />;
      case 'Drinking_Water':
        return <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />;
      case 'Others':
        return <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
    }
  };

  return (
    <>
      <style jsx>{`
        .student-issue{
          padding: 1rem;
          min-height: 100vh;
          background: hsla(351, 100%, 25%, 1);
          background: linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%);
          background: -moz-linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%);
          background: -webkit-linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%);
          filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#7F0012", endColorstr="#1B0A07", GradientType=1 );
        }
        .student-issueIn{
          background-color: #1b1b1b93;
          color: white;
        }
        
        @media (max-width: 750px) {
          .student-issue {
            padding: 0;
          }
          .student-issueIn {
            border-radius: 0;
            box-shadow: none;
            max-width: none;
            margin: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 2rem;
          }
        }
        
        @media (max-width: 450px) {
          .submit-button {
            width: 100% !important;
          }
          .student-issueIn {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
      <div className="flex justify-center items-center min-h-screen student-issue">
        <div className="shadow-2xl rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-lg space-y-4 sm:space-y-6 student-issueIn">
          {/* Enhanced Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full mb-3 sm:mb-4">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Raise a Complaint
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm">
              Help us resolve your issue quickly by providing detailed information
            </p>
          </div>

          {/* Enhanced Category Field */}
          <div className="space-y-2">
            <label className="flex items-center text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-orange-400" />
              Issue Category
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 z-10">
                {getCategoryIcon(formData.category)}
              </div>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full pl-8 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-gray-800 text-white rounded-xl border-2 border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-all duration-200 appearance-none cursor-pointer text-sm sm:text-base"
              >
                <option value="" disabled className="text-gray-400">
                  Select Issue Category
                </option>
                <option value="Electricity" className="bg-gray-800 text-white">
                  ⚡ Electricity Issues
                </option>
                <option value="Sanitation" className="bg-gray-800 text-white">
                  🏠 Sanitation & Cleanliness
                </option>
                <option value="Drinking_Water" className="bg-gray-800 text-white">
                  💧 Drinking Water
                </option>
                <option value="Others" className="bg-gray-800 text-white">
                  📋 Other Issues
                </option>
              </select>
              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {formData.category && (
              <div className="mt-2 p-2 bg-gray-700 rounded-lg">
                <div className="flex items-center text-xs sm:text-sm text-gray-300">
                  {getCategoryIcon(formData.category)}
                  <span className="ml-2">
                    Selected: <span className="text-white font-medium">{formData.category.replace('_', ' ')}</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Description Field */}
          <div className="space-y-2">
            <label className="flex items-center text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-400" />
              Issue Description
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe the issue in detail. Include location, time of occurrence, and any other relevant information..."
                rows={4}
                required
                className="w-full p-3 sm:p-4 bg-gray-800 text-white rounded-xl border-2 border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200 resize-none placeholder-gray-400 text-sm sm:text-base"
              />
              <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs text-gray-400">
                {formData.description.length}/500
              </div>
            </div>
            {formData.description.length > 0 && (
              <div className="flex items-center text-xs sm:text-sm text-green-400">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Description added
              </div>
            )}
          </div>

          {/* Enhanced Photo Upload Field */}
          <div className="space-y-2">
            <label className="flex items-center text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
              <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-purple-400" />
              Upload Photo
              <span className="text-gray-400 text-xs sm:text-sm ml-2">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-800 hover:bg-gray-700 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center justify-center pt-3 sm:pt-5 pb-4 sm:pb-6">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors text-center px-2">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                </div>
              </label>
            </div>
            {formData.photo && (
              <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white truncate">
                      {formData.photo.name}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 ml-2 flex-shrink-0">
                    {(formData.photo.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Submit Button */}
          <div className="pt-4 sm:pt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button w-2/5 p-2 py-2 sm:py-3 bg-black-600 text-white font-bold rounded-lg hover:bg-black-700 transition duration-200 block mx-auto outpass-button transform hover:scale-105 text-sm sm:text-base"
            >
              Submit Issue
            </button>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-xl p-3 sm:p-4 mt-4 sm:mt-6">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div className="text-xs sm:text-sm text-blue-200">
                <p className="font-semibold mb-1">Important Notes:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Include specific location details for faster resolution</li>
                  <li>• Photos help our team understand the issue better</li>
                  <li>• You'll receive updates on your complaint status</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaiseIssue;