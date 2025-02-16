import React, { useState } from "react";
import "../../style/caretaker.css";

const issuesData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `R20008${i + 1}`,
  type: ["Maintenance", "Electricity", "Sanitation"][i % 3],
  summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  image: "/one.png",
  date: new Date(2024, 1, i + 1).toISOString().split("T")[0], // Random dates in Feb 2024
}));

const IssuesPage = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issueType, setIssueType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filteredIssues, setFilteredIssues] = useState(issuesData);

  const applyFilters = () => {
    let filtered = [...issuesData];

    if (issueType) {
      filtered = filtered.filter((issue) => issue.type === issueType);
    }
    if (selectedDate) {
      filtered = filtered.filter((issue) => issue.date === selectedDate);
    }
    filtered.sort((a, b) => (sortOrder === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));

    setFilteredIssues(filtered);
  };

  return (
    <div className="issue-main flex">
      {/* Filter Section */}
      

      {/* Main Content */}
      <div>
      <div className="p-4 bg-gray-200 rounded mb-4 flex gap-4 items-center">
        <select value={issueType} onChange={(e) => setIssueType(e.target.value)} className="p-2 border rounded">
          <option value="">All Types</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Electricity">Electricity</option>
          <option value="Sanitation">Sanitation</option>
        </select>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="p-2 border rounded" />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-2 border rounded">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <button onClick={applyFilters} className="p-2 bg-blue-500 text-white rounded">Apply</button>
      </div>
      <div className={`flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${selectedIssue ? "md:w-3/4" : "w-full"}`}>
     
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="issue-card p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedIssue(issue)}
          >
            <img src={issue.image} alt={issue.name} className="w-full h-32 object-cover rounded-md mb-3" />
            <h3 className="text-lg text-center font-bold">{issue.type}</h3>
            <p className="text-sm truncate">{issue.summary}</p>
            <br></br>
            <p className="text-xs italic text-right">by {issue.name} - {issue.date}</p>
          </div>
        ))}
      </div>
      </div>
      

      {/* Left Sidebar for Details */}
      {selectedIssue && (
        <div className="issues-leftbar bg-black p-6 shadow-lg fixed left-0 top-0 h-full overflow-y-auto transition-transform transform translate-x-0">
          <button
            className="absolute top-4 right-4 text-gray-500"
            onClick={() => setSelectedIssue(null)}
          >
            <i className="fa-solid fa-x"></i>
          </button>
          <img src={selectedIssue.image} alt={selectedIssue.name} className="w-full h-40 object-cover rounded-md mt-4 mb-5" />
          <h2 className="text-xl font-bold">{selectedIssue.name}</h2>
          <p className="text-gray-600">Type: {selectedIssue.type}</p>
          <p className="text-gray-700 mt-2">{selectedIssue.summary}</p>
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
