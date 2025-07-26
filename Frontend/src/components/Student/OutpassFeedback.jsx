import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const OutpassFeedback = () => {
  const { outpassId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/feedback/outpass', {
        outpassId,
        rating
      });
      setSubmitted(true);
      // Navigate back after 2 seconds
      toast.success("Feedback submitted successfully");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("Something went wrong");
    }
  };

  const getRatingText = (rating) => {
    const ratingTexts = {
      1: "Poor",
      2: "Fair", 
      3: "Good",
      4: "Very Good",
      5: "Excellent"
    };
    return ratingTexts[rating] || "Select Rating";
  };

  const getRatingColor = (rating) => {
    const colors = {
      1: "from-red-500 to-red-600",
      2: "from-orange-500 to-orange-600",
      3: "from-yellow-500 to-yellow-600",
      4: "from-blue-500 to-blue-600",
      5: "from-green-500 to-green-600"
    };
    return colors[rating] || "from-gray-400 to-gray-500";
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Outpass Feedback
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-3 text-sm">Help us improve your experience</p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-md bg-gray-800 bg-opacity-50 border border-gray-700 shadow-2xl rounded-2xl p-6 md:p-8 hover:bg-opacity-60 transition-all duration-300">
          {submitted ? (
            <div className="text-center py-8">
              {/* Success Animation */}
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Feedback Submitted!</h3>
              <p className="text-gray-300 text-lg">Thank you for your valuable feedback.</p>
              <p className="text-gray-400 text-sm mt-2">Redirecting you back in a moment...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating Question */}
              <div className="text-center">
                <label className="block text-xl font-semibold text-white mb-2">
                  How was your outpass experience?
                </label>
                <p className="text-gray-400 text-sm mb-6">Click on the stars to rate</p>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center items-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRating(val)}
                    onMouseEnter={() => setHoveredRating(val)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transform transition-all duration-200 hover:scale-125 focus:outline-none"
                  >
                    <svg 
                      className={`w-12 h-12 md:w-14 md:h-14 transition-all duration-200 ${
                        val <= (hoveredRating || rating) 
                          ? 'text-yellow-400 drop-shadow-lg' 
                          : 'text-gray-600 hover:text-gray-500'
                      }`} 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </button>
                ))}
              </div>

              {/* Rating Display */}
              {(rating > 0 || hoveredRating > 0) && (
                <div className="text-center mb-6">
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getRatingColor(hoveredRating || rating)} text-white font-semibold shadow-lg`}>
                    {getRatingText(hoveredRating || rating)}
                  </div>
                </div>
              )}

              {/* Rating Scale Guide */}
              <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 mb-6">
                <p className="text-gray-300 text-sm text-center mb-2">Rating Guide:</p>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1★ Poor</span>
                  <span>2★ Fair</span>
                  <span>3★ Good</span>
                  <span>4★ Very Good</span>
                  <span>5★ Excellent</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={rating === 0}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                  rating === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-gray-600'
                }`}
              >
                {rating === 0 ? 'Please select a rating' : 'Submit Feedback'}
              </button>

              {/* Additional Info */}
              <div className="text-center">
                <p className="text-gray-500 text-xs">
                  Outpass ID: <span className="text-gray-400 font-mono">{outpassId}</span>
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Your feedback is anonymous and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default OutpassFeedback;