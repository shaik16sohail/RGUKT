// import React from 'react'
import '../../style/student.css';
import React, { useState } from 'react';
const GeneralOutpass=()=>{
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
          <h2 className="text-3xl text-white font-bold text-center mb-6">General Outpass Request</h2>
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
              <label className="block font-semibold">Reason</label>
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
    
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold">Date & Time of Leaving</label>
                <input
                  type="datetime-local"
                  name="leaveDate"
                  value={formData.leaveDate}
                  onChange={handleChange}
                  className="w-full p-2 r rounded-lg focus:ring-2 focus:ring-blue-400 outpass-box"
                  required
                />
              </div>
    
              <div>
                <label className="block font-semibold">Expected Return Date & Time</label>
                <input
                  type="datetime-local"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full p-2  rounded-lg focus:ring-2 focus:ring-blue-400 outpass-box"
                  required
                />
              </div>
            </div>
    
           
    
            
    
           
    
           
            {/* <button type="button" class="text-white bg-black-800 hover:bg-black-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Dark</button> */}
            <button
              type="submit"
              className="w-1/3  py-2 mt-5 bg-black-600 text-white font-bold rounded-lg hover:bg-black-700 transition outpass-button block mx-auto"
            >
              Submit Request
            </button>
           
          </form>
        </div>
        </div>
      );
}
export default GeneralOutpass;