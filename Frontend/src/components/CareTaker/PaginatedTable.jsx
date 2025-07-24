import React, { useState } from "react";
import '../../style/caretaker.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PaginatedTable = ({outpasses:outpassesData}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [itemsPerPage,setItemsPerPage]=useState(10);

  // Temporary filter states
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSortOrder, setSelectedSortOrder] = useState("newest");

  // Filter Logic
  let filteredData = outpassesData.filter((item) => {
    return (
      (filterType ? item.type === filterType : true) &&
      (filterStatus ? item.status === filterStatus : true) &&
      (filterDate ? item.date === filterDate : true)
    );
  });

  const handleRowClick=(outpass)=>{
    navigate(`${outpass._id}`);
  };

  // Sorting Logic
  filteredData.sort((a, b) => {
    return sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
  const buttonClick=()=>{
    setFilterType(selectedType);
    setFilterStatus(selectedStatus);
    setFilterDate(selectedDate);
    setSortOrder(selectedSortOrder);
    setCurrentPage(1);
  }

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'text-yellow-400';
      case 'approved': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'bg-yellow-900/30 border-yellow-400/50';
      case 'approved': return 'bg-green-900/30 border-green-400/50';
      case 'rejected': return 'bg-red-900/30 border-red-400/50';
      default: return 'bg-gray-900/30 border-gray-400/50';
    }
  };

  return (
    <div 
      className="min-h-screen text-white"
      style={{
        background: 'linear-gradient(135deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 50%, #000000 100%)'
      }}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Outpasses Management
          </h1>
          <p className="text-gray-300 text-lg">Manage and track all outpass requests</p>
        </div>

        {/* Filters Section */}
        <div 
          className="bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(139, 24, 27, 0.3) 100%)'
          }}
        >
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-100">Filters & Search</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Type Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Type</label>
              <select
                className="w-full p-3 bg-gray-900/80 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="regular">Regular</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Status</label>
              <select
                className="w-full p-3 bg-gray-900/80 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Date</label>
              <input
                type="date"
                className="w-full p-3 bg-gray-900/80 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Sort</label>
              <select
                className="w-full p-3 bg-gray-900/80 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                value={selectedSortOrder}
                onChange={(e) => setSelectedSortOrder(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Items Per Page */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Show</label>
              <select
                className="w-full p-3 bg-gray-900/80 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(e.target.value)}
              >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-transparent">Action</label>
              <button 
                className="w-full p-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                onClick={buttonClick}
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
          <div className="text-gray-300 mb-2 sm:mb-0">
            Showing <span className="text-white font-semibold">{indexOfFirstItem + 1}</span> to{' '}
            <span className="text-white font-semibold">{Math.min(indexOfLastItem, filteredData.length)}</span> of{' '}
            <span className="text-white font-semibold">{filteredData.length}</span> outpasses
          </div>
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-b border-gray-700/50">
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">SNO</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Student ID</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-700/50">
                {currentItems.map((outpass, index) => (
                  <tr 
                    key={outpass.id} 
                    className="hover:bg-gray-800/40 cursor-pointer transition-all duration-200 group"
                    onClick={() => handleRowClick(outpass)}
                  >
                    <td className="px-4 py-4 text-sm text-gray-300 group-hover:text-white">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3">
                          {outpass.studentId.email.substring(1,2).toUpperCase()}
                        </div>
                        <span className="text-gray-300 group-hover:text-white font-medium">
                          {outpass.studentId.email.substring(1,2).toUpperCase()+outpass.studentId.email.substring(2,8)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300 group-hover:text-white font-medium">
                      {outpass.studentId.name}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        outpass.type === 'emergency' 
                          ? 'bg-red-900/40 text-red-300 border border-red-500/50' 
                          : 'bg-blue-900/40 text-blue-300 border border-blue-500/50'
                      }`}>
                        {outpass.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${getStatusBg(outpass.status)} ${getStatusColor(outpass.status)}`}>
                        {outpass.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300 group-hover:text-white">
                      {outpass.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 1 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white transform hover:scale-105'
              }`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <div className="px-4 py-2 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300">
              <span className="text-white font-semibold">{currentPage}</span> of {totalPages}
            </div>
            
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === totalPages 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white transform hover:scale-105'
              }`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <svg className="w-5 h-5 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="text-sm text-gray-400">
            Total: <span className="text-white font-semibold">{filteredData.length}</span> outpasses
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginatedTable;