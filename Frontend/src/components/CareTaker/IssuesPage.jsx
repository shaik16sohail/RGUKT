import React, { useState } from "react";
import "../../style/caretaker.css";
import {useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const IssuesPage = ({issuesData,fetchData}) => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issueType, setIssueType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filteredIssues, setFilteredIssues] = useState(issuesData);
  const [comment, setComment] = useState("");
   useEffect(() => {
    setFilteredIssues(issuesData);
  }, [issuesData]);
  const applyFilters = () => {
    let filtered = [...issuesData];
  
    if (issueType) {
      filtered = filtered.filter((issue) => issue.type === issueType);
    }
  
    if (selectedDate) {
      const formattedSelectedDate = new Date(selectedDate).toLocaleDateString('en-CA'); // Ensures YYYY-MM-DD format
  
      filtered = filtered.filter((issue) => {
        const issueDateFormatted = new Date(issue.date).toLocaleDateString('en-CA'); // Ensures consistent format
        return issueDateFormatted === formattedSelectedDate;
      });
    }
  
    filtered.sort((a, b) => (sortOrder === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  
    setFilteredIssues(filtered);
  };
  const handleSubmit=async(status)=>{
    if(!selectedIssue)
      return;
    try{
      const response=await axios.patch(`http://localhost:8080/caretaker/issues/${selectedIssue._id}`,{
        status,comment
      },{
        withCredentials:true,
      });
      toast.success("Updated Successfully");
      setSelectedIssue(null);
      setComment("");
      if(fetchData)
          fetchData();
    }catch(err){
      console.log(err);
      toast.error("Failed to upload the issue")

    }
  }
  
  const getIssueTypeIcon = (type) => {
    switch(type) {
      case 'Maintenance': return 'fa-tools';
      case 'Electricity': return 'fa-bolt';
      case 'Sanitation': return 'fa-broom';
      default: return 'fa-exclamation-circle';
    }
  };

  const getIssueTypeColor = (type) => {
    switch(type) {
      case 'Maintenance': return 'text-blue-400';
      case 'Electricity': return 'text-yellow-400';
      case 'Sanitation': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="issue-main flex flex-col p-4 min-h-screen" style={{
      background: 'linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)'
    }}>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          <i className="fa-solid fa-clipboard-list mr-3"></i>
          Issue Management
        </h1>
        <p className="text-gray-400 text-center">
          Track and resolve community issues efficiently
        </p>
      </div>

      {/* Enhanced Filters Section */}
      <div className="filters-container mb-8">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <i className="fa-solid fa-filter mr-2 text-blue-400"></i>
            Filter Issues
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="filter-group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Issue Type</label>
              <div className="relative">
                <select
                  className="p-3 pr-10 border border-gray-600 bg-black text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer hover:border-gray-500"
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Maintenance">🔧 Maintenance</option>
                  <option value="Electricity">⚡ Electricity</option>
                  <option value="Sanitation">🧹 Sanitation</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>

            <div className="filter-group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <div className="relative">
                <input
                  type="date"
                  className="p-3 border border-gray-600 bg-black text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-500"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <i className="fa-solid fa-calendar absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>

            <div className="filter-group">
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort Order</label>
              <div className="relative">
                <select
                  className="p-3 pr-10 border border-gray-600 bg-black text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer hover:border-gray-500"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">📅 Newest First</option>
                  <option value="oldest">🕐 Oldest First</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>

            <div className="filter-group flex items-end">
              <button
                className="filters-btn p-3 px-6 text-white rounded-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                onClick={applyFilters}
              >
                <i className="fa-solid fa-search mr-2"></i>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="issues-grid flex-1">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-16">
            <i className="fa-solid fa-inbox text-6xl text-gray-600 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Issues Found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredIssues.map((issue, index) => (
              <div
                key={issue.id}
                className="issue-card group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
                onClick={() => setSelectedIssue(issue)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={issue.image} 
                    alt={issue.name} 
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <div className={`w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center ${getIssueTypeColor(issue.type)}`}>
                      <i className={`fa-solid ${getIssueTypeIcon(issue.type)} text-sm`}></i>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-200">
                      {issue.type}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIssueTypeColor(issue.type)} bg-gray-800/50`}>
                      {issue.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2 leading-relaxed">
                    {issue.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user mr-1"></i>
                      <span className="truncate max-w-20">{issue.name}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fa-solid fa-calendar mr-1"></i>
                      <span>{new Date(issue.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Sidebar for Issue Details */}
      {selectedIssue && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300"
            onClick={() => setSelectedIssue(null)}
          ></div>
          
          {/* Sidebar */}
          <div className="issues-leftbar bg-black/95 backdrop-blur-md text-white p-6 shadow-2xl fixed left-0 top-0 h-full w-full max-w-lg overflow-y-auto transition-all duration-300 transform translate-x-0 z-[9999] border-r border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <i className={`fa-solid ${getIssueTypeIcon(selectedIssue.type)} mr-3 ${getIssueTypeColor(selectedIssue.type)}`}></i>
                Issue Details
              </h2>
              <button
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200 group"
                onClick={() => setSelectedIssue(null)}
              >
                <i className="fa-solid fa-times text-gray-400 group-hover:text-white"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* Image Section */}
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={selectedIssue.image} 
                  alt={selectedIssue.name} 
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Issue Info */}
              <div className="bg-gray-900/50 rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{selectedIssue.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <i className="fa-solid fa-hashtag mr-1"></i>
                      {selectedIssue._id}
                    </span>
                    <span className={`flex items-center ${getIssueTypeColor(selectedIssue.type)}`}>
                      <i className={`fa-solid ${getIssueTypeIcon(selectedIssue.type)} mr-1`}></i>
                      {selectedIssue.type}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h4 className="font-semibold text-gray-300 mb-2">Description</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedIssue.summary}</p>
                </div>
              </div>

              {/* Comment Section */}
              <div className="bg-gray-900/50 rounded-2xl p-6">
                <h4 className="font-semibold text-white mb-4 flex items-center">
                  <i className="fa-solid fa-comment mr-2 text-red-400"></i>
                  Add Comment
                </h4>
                <div className="relative">
                  <textarea 
                    value={comment} 
                    className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200" 
                    placeholder="Enter your comment about this issue..." 
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {comment.length}/500
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => handleSubmit("rejected")} 
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  <i className="fa-solid fa-times mr-2"></i>
                  Reject Issue
                </button>
                
                <button 
                  type="button" 
                  onClick={() => handleSubmit("resolved")} 
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  <i className="fa-solid fa-check mr-2"></i>
                  Mark Resolved
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IssuesPage;