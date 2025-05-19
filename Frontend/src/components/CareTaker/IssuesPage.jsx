import React, { useState } from "react";
import "../../style/caretaker.css";
import {useEffect} from 'react';


const IssuesPage = ({issuesData}) => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issueType, setIssueType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filteredIssues, setFilteredIssues] = useState(issuesData);
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
  
  
  

  return (
    <div className="issue-main flex flex-col p-4">
      {/* Filters Section */}
      <div className="filters flex flex-wrap justify-center gap-4 mb-4">
        <select
          className="p-2 border bg-black rounded"
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Electricity">Electricity</option>
          <option value="Sanitation">Sanitation</option>
        </select>

        <input
          type="date"
          className="p-2 border bg-black rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <select
          className="p-2 border bg-black rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <button
          className="filters-btn p-2  text-white rounded"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>

      {/* Issues List */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="issue-card p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedIssue(issue)}
          >
            <img src={issue.image} alt={issue.name} className="w-full h-32 object-cover rounded-md mb-3" />
            <h3 className="text-lg text-center font-bold">{issue.type}</h3>
            <p className="text-sm truncate">{issue.summary}</p>
            <p className="text-xs italic text-right">by {issue.name} - {issue.date}</p>
          </div>
        ))}
      </div>

      {/* Sidebar for Issue Details */}
      {selectedIssue && (
        <div className="issues-leftbar bg-black text-white p-6 shadow-lg fixed left-0 top-0 h-full overflow-y-auto transition-transform transform translate-x-0">
          <button
            className="absolute top-4 right-4 text-gray-500"
            onClick={() => setSelectedIssue(null)}
          >
            <i className="fa-solid fa-x"></i>
          </button>
          <img src={selectedIssue.image} alt={selectedIssue.name} className="w-full h-40 object-cover rounded-md mt-4 mb-3" />
          <h2 className="text-xl font-bold">{selectedIssue.name}</h2>
          <p className="text-gray-300">Type: {selectedIssue.type}</p>
          <p className="mt-2">{selectedIssue.summary}</p>
          <p className="mt-3">Comment:</p>
          <div className="text-area">
          <textarea className="" >Enter your query</textarea>
          </div>
          <br></br>
         <div className="leftbar-btns">
         
         <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><i class="fa-solid fa-left-long"></i> Red</button>
         <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green <i class="fa-solid fa-right-long"></i></button>
         </div>
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
