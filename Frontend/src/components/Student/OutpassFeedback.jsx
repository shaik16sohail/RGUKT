import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OutpassFeedback = () => {
  const { outpassId } = useParams();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/feedback/outpass', {
        outpassId,
        rating
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Outpass Feedback</h2>
      {submitted ? (
        <p className="text-green-600 text-center font-semibold">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-lg font-medium">Rate your outpass experience:</label>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setRating(val)}
                className={`w-10 h-10 rounded-full text-white font-bold ${
                  rating >= val ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={rating === 0}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default OutpassFeedback;
