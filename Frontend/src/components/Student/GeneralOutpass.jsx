// import React from 'react'
import axios from 'axios';
import '../../style/student.css';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const GeneralOutpass=()=>{
    const navigate=useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const handleThat = () => setIsChecked(!isChecked);
    const [formData, setFormData] = useState({
        destination: '',
        reason: '',
        mobileNo: '',
        parentMobileNo: '',
        date: '',
        type:'normal',
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
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        try{
          const response=await axios.post("http://localhost:8080/student/outpass",formData,{
            //  headers: {
            //   'Content-Type': 'multipart/form-data',
            //  },
            withCredentials:true,
          });
          console.log(response.data);
          toast.success('Outpass request submitted successfully!');
        // alert();
        setFormData({destination: '',
          reason: '',
          mobileNo: '',
          parentMobileNo: '',
          date: '',
          type:'normal',
          returnDate: '',
          notes: '',});
          navigate('/student/home');
        }catch(err){
          console.log(err);
          toast.error("Something went wrong!!");
        }
        
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
                  name="parentMobileNo"
                  value={formData.parentMobileNo}
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
                  name="mobileNo"
                  value={formData.mobileNo}
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
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 r rounded-lg focus:ring-2 focus:ring-blue-400 outpass-box"
                  required
                />
              </div>
    
              <div>
                <label className="block font-semibold">Expected Return Date & Time</label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full p-2  rounded-lg focus:ring-2 focus:ring-blue-400 outpass-box"
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
          
        </span>
      </label>
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