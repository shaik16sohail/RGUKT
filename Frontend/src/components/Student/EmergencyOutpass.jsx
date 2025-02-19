import React from 'react'
import { useState } from 'react';
const EmergencyOutpass=()=>{
    const [isChecked, setIsChecked] = useState(false);
    
        const handleThat = () => setIsChecked(!isChecked);
        const [formData, setFormData] = useState({
            destination: '',
            reason: '',
            parentMobile: '',
            studentMobile: '',
            leaveDate: '',
            returnDate: '',
            notes: '',
          });
        
          const handleChange = (e) => {
            const { name, value, files } = e.target;
            setFormData({
              ...formData,
              [name]: files ? files[0] : value,
            });
          };
        
          const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Form Data:', formData);
            alert('Outpass request submitted successfully!');
          };
        
          return (
            <div className='general-outpass'>
            <div className=" general-outpassIn max-w-3xl mx-auto p-6 shadow-2xl rounded-2xl mt-10">
              <h2 className="text-3xl text-white font-bold text-center mb-6">Emergency Outpass Request</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-semibold">Where are you going?</label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full p-2   rounded-lg  outpass-box"
                    placeholder="Enter destination"
                    required
                  />
                </div>
        
                <div>
                  <label className="block font-semibold">Reason for Emergency</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full p-2  rounded-lg focus:ring-2 focus:ring-blue-400 outpass-box"
                    placeholder="Enter reason"
                    required
                  />
                </div>
        
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold">Parent's Mobile No</label>
                    <input
                      type="tel"
                      name="parentMobile"
                      value={formData.parentMobile}
                      onChange={handleChange}
                      className="w-full p-2  rounded-lg focus:ring-2 focus:ring-blue-400 outpass-box"
                      placeholder="Enter parent's mobile number"
                      required
                    />
                  </div>
        
                  <div>
                    <label className="block font-semibold">Your Mobile No</label>
                    <input
                      type="tel"
                      name="studentMobile"
                      value={formData.studentMobile}
                      onChange={handleChange}
                      className="w-full p-2  rounded-lg focus:ring-2 focus:ring-blue-400 outpass-box"
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>
                </div>
        
             
        
                <div className="mt-4">
          <label className="flex items-start space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleThat}
              className="w-5 h-4 mt-1 bg-black border-gray-300 rounded text-white"
            />
            <span className="text-sm text-white">
              Please On the Location in your mobile after the approval of the outpass
              {/* <a
                href="/terms"
                className="text-blue-500 underline hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a> */}
            </span>
          </label>
        </div>
        
                
        
               
        
               
                {/* <button type="button" class="text-white bg-black-800 hover:bg-black-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Dark</button> */}
                <button
                  type="submit"
                  className="w-1/3  py-2 mt-4 bg-black-600 text-white font-bold rounded-lg hover:bg-black-700 transition outpass-button block mx-auto"
                >
                  Proceed to Payment
                </button>
               
              </form>
            </div>
            </div>
          );
}
export default EmergencyOutpass;