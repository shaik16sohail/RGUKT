import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
const OutpassDetails = () => {
  const navigate = useNavigate();
  const [outpassData, setOutpassData] = useState({});
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/caretaker/outpasses/${id}`, {
          withCredentials: true
        });
        setOutpassData(response.data.outpassData);
        console.log(outpassData);
        
      } catch (err) {
        console.log(err);
        
      }
    };
    fetchData();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.patch(`${backendUrl}/caretaker/outpasses/${id}`, { status: newStatus }, {
        withCredentials: true,
      });
      toast.success("Updated Successfully");
      navigate('/caretaker/outpasses');
    } catch (err) {
      console.log(err);
      toast.error("Chud gaye guru");
      alert("Failed to update");
    }
  }

  if (!outpassData) return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)'
    }}>
      <p className="text-white text-xl">No data found</p>
    </div>
  );

  if (!outpassData.studentId) return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)'
    }}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
    </div>
  );

  return (
    <div 
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Outpass Details
          </h1>
          <div className="w-24 h-1 bg-white mx-auto rounded-full opacity-80"></div>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Student Info Section */}
          <div className="bg-gradient-to-r from-white/20 to-white/10 p-6 md:p-8 border-b border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
              Student Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-id-card text-white text-lg"></i>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Student ID</p>
                    <p className="text-white text-lg font-semibold">
                      {outpassData.studentId.email.substring(1,2).toUpperCase() + outpassData.studentId.email.substring(2,8)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-user text-white text-lg"></i>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Name</p>
                    <p className="text-white text-lg font-semibold">{outpassData.studentId.name}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-calendar text-white text-lg"></i>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Date</p>
                    <p className="text-white text-lg font-semibold"><span style={{fontWeight:"500"}}>
                      {new Date(outpassData.date).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                      </span></p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-mobile-alt text-white text-lg"></i>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Mobile No</p>
                    <p className="text-white text-lg font-semibold">{outpassData.mobileNo}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center p-4 bg-white/10 rounded-xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-clock text-white text-lg"></i>
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium">Expected Return</p>
                  <p className="text-white text-lg font-semibold"><span style={{fontWeight:"500"}}>
                      {new Date(outpassData.expectedReturn).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                      </span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Reason Section */}
          <div className="p-6 md:p-8 border-b border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              Reason for Outpass
            </h3>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <p className="text-white text-base leading-relaxed">{outpassData.reason}</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="p-6 md:p-8 border-b border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              Contact Options
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                <i className="fa-solid fa-phone mr-3"></i>
                Call to Student
              </button>
              <button className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-2 px-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                Call to Parent
                <i className="fa-solid fa-phone ml-3"></i>
              </button>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-white/5 to-white/10">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              Final Decision
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="button" 
                onClick={() => handleStatusUpdate("rejected")} 
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 text-white font-bold py-2 px-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <i className="fa-regular fa-circle-xmark mr-3 text-xl"></i>
                Reject
              </button>
              <button 
                type="button" 
                onClick={() => handleStatusUpdate("approved")} 
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 text-white font-bold py-2 px-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                // style={{width:"1rem"}}
              >
                Approve
                <i className="fa-solid fa-check ml-3 text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutpassDetails;