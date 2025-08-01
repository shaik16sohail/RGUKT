import React, { useState } from 'react';
import { Calendar, MapPin, MessageSquare, Phone, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const GeneralOutpass = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate=useNavigate();
  const handleThat = () => setIsChecked(!isChecked);
  
  const [formData, setFormData] = useState({
    destination: '',
    reason: '',
    mobileNo: '',
    parentMobileNo: '',
    date: '',
    type: 'normal',
    returnDate: '',
    notes: '',
  });

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your original axios code would go here
      const response = await axios.post(`${backendUrl}/student/outpass`, formData, {
        withCredentials: true,
      });
      console.log(response.data);
      toast.success('Outpass request submitted successfully!');
      
      console.log('Form submitted:', formData);
      // alert('Outpass request submitted successfully!');
      
      setFormData({
        destination: '',
        reason: '',
        mobileNo: '',
        parentMobileNo: '',
        date: '',
        type: 'normal',
        returnDate: '',
        notes: '',
      });
      navigate('/student/home');
    } catch (err) {
      console.log(err);
      // toast.error("Something went wrong!!");
      alert("Something went wrong!!");
    }
  };

  return (
    <div className='general-outpass'>
      <div className="general-outpassIn max-w-3xl mx-auto p-6 shadow-2xl rounded-2xl mt-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-white font-bold mb-2">General Outpass Request</h2>
          <p className="text-gray-300 text-sm">Fill out the form below to request your outpass</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Destination Field */}
          <div className="relative">
            <label className="flex items-center text-white font-semibold mb-2">
              <MapPin className="w-4 h-4 mr-2 text-blue-400" />
              Where are you going?
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200 outpass-box"
              placeholder="Enter your destination"
              required
            />
          </div>

          {/* Reason Field */}
          <div className="relative">
            <label className="flex items-center text-white font-semibold mb-2">
              <MessageSquare className="w-4 h-4 mr-2 text-green-400" />
              Reason for Outpass
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 rounded-xl border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-all duration-200 resize-none outpass-box"
              placeholder="Please provide a detailed reason for your outpass request"
              required
            />
          </div>

          {/* Mobile Numbers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative">
              <label className="flex items-center text-white font-semibold mb-2">
                <Phone className="w-4 h-4 mr-2 text-purple-400" />
                Parent's Mobile Number
              </label>
              <input
                type="tel"
                name="parentMobileNo"
                value={formData.parentMobileNo}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-200 outpass-box"
                placeholder="Enter parent's mobile number"
                required
              />
            </div>

            <div className="relative">
              <label className="flex items-center text-white font-semibold mb-2">
                <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                Your Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-200 outpass-box"
                placeholder="Enter your mobile number"
                required
              />
            </div>
          </div>

          {/* Date Fields Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative">
              <label className="flex items-center text-white font-semibold mb-2">
                <Calendar className="w-4 h-4 mr-2 text-red-400" />
                Date of Leaving
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                className="w-full p-3 rounded-xl border-2 border-gray-600 bg-gray-800 text-white focus:border-red-400 focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-all duration-200 outpass-box"
                required
              />
            </div>

            <div className="relative">
              <label className="flex items-center text-white font-semibold mb-2">
                <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                Expected Return Date
              </label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                min={formData.date || today}
                className="w-full p-3 rounded-xl border-2 border-gray-600 bg-gray-800 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 transition-all duration-200 outpass-box"
                required
              />
            </div>
          </div>

          {/* Checkbox with enhanced styling */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-600">
            <label className="flex items-start space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleThat}
                  className="w-5 h-5 mt-1 bg-black border-gray-300 rounded text-white"
                />
              </div>
              <div className="flex-1">
                <span className="text-white text-sm leading-relaxed">
                  Please turn on the location services on your mobile device after the approval of the outpass request for safety and tracking purposes.
                </span>
              </div>
            </label>
          </div>

          {/* Enhanced Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-1/3 py-2 mt-5 bg-black-600 text-white font-bold rounded-lg hover:bg-black-700 transition outpass-button block mx-auto"
            >
              Submit Request
            </button>
          </div>

          {/* Info Card */}
          <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-xl p-4 mt-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div className="text-sm text-blue-200">
                <p className="font-semibold mb-1">Processing Information:</p>
                <p>Your outpass request will be reviewed by the authorities. You will receive a notification once it's approved or if any additional information is required.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralOutpass;