import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';


const stripePromise = loadStripe('pk_test_51Rc7SJQCTC4QpOeVYRbj31bGolWggB61enyV996vA5mAsCQsseo2C62O6xoVUxLgdhNX3VF4MPQD7uQxGkIwU4Ot00cB4vcFNW'); // your correct key

const EmergencyOutpass = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const [formData, setFormData] = useState({
    destination: '',
    reason: '',
    parentMobile: '',
    studentMobile: '',
    leaveDate: '',
    returnDate: '',
    notes: '',
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleThat = () => setIsChecked(!isChecked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    console.log(userId);
    try {
      const { data } = await axios.post('https://2d9747f5bb55.ngrok-free.app/api/payment/create-checkout-session', {
        formData, // ✅ send full form data
        userId
      });

      await stripe.redirectToCheckout({ sessionId: data.id });

    } catch (error) {
      console.error(error);
      alert("Error initiating payment");
    }
  };

  return (
    <div className='general-outpass'>
      <div className="general-outpassIn max-w-3xl mx-auto p-6 shadow-2xl rounded-2xl mt-10">
        <h2 className="text-3xl text-white font-bold text-center mb-6">Emergency Outpass Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Form Inputs Same as Yours */}
          <div>
            <label className="block font-semibold">Where are you going?</label>
            <input type="text" name="destination" value={formData.destination} onChange={handleChange} required className="w-full p-2 rounded-lg outpass-box"/>
          </div>

          <div>
            <label className="block font-semibold">Reason for Emergency</label>
            <textarea name="reason" value={formData.reason} onChange={handleChange} required className="w-full p-2 rounded-lg outpass-box"/>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Parent's Mobile No</label>
              <input type="tel" name="parentMobile" value={formData.parentMobile} onChange={handleChange} required className="w-full p-2 rounded-lg outpass-box"/>
            </div>
            <div>
              <label className="block font-semibold">Your Mobile No</label>
              <input type="tel" name="studentMobile" value={formData.studentMobile} onChange={handleChange} required className="w-full p-2 rounded-lg outpass-box"/>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-start space-x-2 cursor-pointer">
              <input type="checkbox" checked={isChecked} onChange={handleThat} className="w-5 h-4 mt-1"/>
              <span className="text-sm text-white">Please turn on location after approval.</span>
            </label>
          </div>

          <button type="submit" className="w-1/3 py-2 mt-4 bg-black-600 text-white font-bold rounded-lg hover:bg-black-700 block mx-auto">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmergencyOutpass;
