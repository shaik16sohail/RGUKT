import React, { useEffect, useState } from 'react';
import '../../style/warden.css';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Home = () => {
  const { user } = useAuth();
  const [registeredStudents, setRegisteredStudents] = useState(0);
  const [caretakers, setCaretakers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/warden/home', {
        withCredentials: true,
      });

      const { registeredStudents, data } = response.data;
      setRegisteredStudents(registeredStudents);
      setCaretakers(data);
    } catch (err) {
      console.error("Error fetching warden home data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hostelInfo = {
    hostelName: user.hostelName,
    wardenName: user.name,
    registeredStudents: registeredStudents,
  };

  const barChartData = caretakers.map((c) => ({
    name: c.name,
    Outpasses: c.outpassesApproved,
    Issues: c.issuesResolved,
  }));

  const pieChartData = caretakers.map((c) => ({
    name: c.name,
    value: c.feedbackRating,
  }));

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

  return (
    <div 
      className="min-h-screen p-3 md:p-4"
      style={{
        background: 'linear-gradient(135deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)',
        backgroundAttachment: 'fixed'
      }}
    >


      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Dashboard Overview
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-red-400 mx-auto rounded-full"></div>
        </div>

        {/* Hostel & Warden Info Card */}
        <div className="backdrop-blur-md bg-black bg-opacity-30 border border-gray-600 border-opacity-40 shadow-lg rounded-xl p-4 md:p-5 mb-6 hover:bg-opacity-40 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-3 md:mb-0">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                {hostelInfo.hostelName}
              </h2>
              <p className="text-base text-gray-200">
                <span className="text-pink-300 font-medium">Warden:</span> {hostelInfo.wardenName}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-full p-4 shadow-md">
                <p className="text-xl md:text-2xl font-bold text-white">{hostelInfo.registeredStudents}</p>
                <p className="text-xs text-pink-100 font-medium">Students Registered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Caretaker Info Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-center text-white mb-5">
            Caretaker Performance Hub
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caretakers.map((caretaker, index) => (
              <div 
                key={index} 
                className="group backdrop-blur-md bg-black bg-opacity-30 border border-gray-600 border-opacity-40 shadow-lg rounded-xl p-4 hover:bg-opacity-40 hover:scale-102 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-lg font-bold text-white">
                      {caretaker.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {caretaker.name}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-black bg-opacity-20 rounded-lg p-2">
                    <span className="text-gray-200 text-sm font-medium">Issues Resolved</span>
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {caretaker.issuesResolved}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-black bg-opacity-20 rounded-lg p-2">
                    <span className="text-gray-200 text-sm font-medium">Outpasses Approved</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {caretaker.outpassesApproved}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-black bg-opacity-20 rounded-lg p-2">
                    <span className="text-gray-200 text-sm font-medium">Rating</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-sm mr-1">⭐</span>
                      <span className="text-white font-bold text-sm">{caretaker.feedbackRating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        {caretakers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center text-white mb-5">
              Analytics Dashboard
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="backdrop-blur-md bg-black bg-opacity-30 border border-gray-600 border-opacity-40 shadow-lg rounded-xl p-4 hover:bg-opacity-40 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-3 text-center">
                  Performance Metrics
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      barCategoryGap={20}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: 'white', fontSize: 11 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                        tickLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                      />
                      <YAxis 
                        tick={{ fill: 'white', fontSize: 11 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                        tickLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ color: 'white' }}
                      />
                      <Bar dataKey="Outpasses" fill="#4ECDC4" barSize={20} radius={[3, 3, 0, 0]} />
                      <Bar dataKey="Issues" fill="#FF6B6B" barSize={20} radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="backdrop-blur-md bg-black bg-opacity-30 border border-gray-600 border-opacity-40 shadow-lg rounded-xl p-4 hover:bg-opacity-40 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-3 text-center">
                  Feedback Ratings Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ color: 'white' }}
                      />
                      <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ value }) => `${value}⭐`}
                        labelStyle={{ fill: 'white', fontSize: '11px', fontWeight: 'bold' }}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;