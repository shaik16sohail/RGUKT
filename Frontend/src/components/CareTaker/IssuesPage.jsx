// import React, { useState } from "react";

// const issuesData = [
//   { id: 1, name: "Amit Kumar", type: "Electrical", summary: "Light not working in room 101", image: "https://via.placeholder.com/100", kind: "Personal" },
//   { id: 2, name: "Priya Sharma", type: "Plumbing", summary: "Leakage in bathroom 203", image: "https://via.placeholder.com/100", kind: "Overall" },
//   { id: 3, name: "Rohan Singh", type: "Hygiene", summary: "Garbage not cleaned in hostel corridor", image: "https://via.placeholder.com/100", kind: "Overall" },
//   { id: 4, name: "Sneha Patel", type: "WiFi", summary: "No internet connectivity in 3rd floor", image: "https://via.placeholder.com/100", kind: "Personal" },
// ];

// const IssuesPage = () => {
//   const [filterType, setFilterType] = useState("All");
//   const [filterKind, setFilterKind] = useState("All");
//   const [sortOrder, setSortOrder] = useState("A-Z");

//   const filteredIssues = issuesData
//     .filter(issue => (filterType === "All" || issue.type === filterType))
//     .filter(issue => (filterKind === "All" || issue.kind === filterKind))
//     .sort((a, b) => sortOrder === "A-Z" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Hostel Issues</h1>
//       {/* Filters */}
//       <div className="flex space-x-4 mb-4">
//         <select onChange={(e) => setFilterType(e.target.value)} className="p-2 border rounded">
//           <option value="All">All Types</option>
//           <option value="Electrical">Electrical</option>
//           <option value="Plumbing">Plumbing</option>
//           <option value="Hygiene">Hygiene</option>
//           <option value="WiFi">WiFi</option>
//         </select>
//         <select onChange={(e) => setFilterKind(e.target.value)} className="p-2 border rounded">
//           <option value="All">All Kinds</option>
//           <option value="Personal">Personal</option>
//           <option value="Overall">Overall</option>
//         </select>
//         <select onChange={(e) => setSortOrder(e.target.value)} className="p-2 border rounded">
//           <option value="A-Z">Sort by Name (A-Z)</option>
//           <option value="Z-A">Sort by Name (Z-A)</option>
//         </select>
//       </div>
//       {/* Issue Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredIssues.map((issue) => (
//           <div key={issue.id} className="p-4 border rounded-lg shadow-lg flex flex-col items-center">
//             <img src={issue.image} alt={issue.name} className="w-24 h-24 rounded-full mb-3" />
//             <h2 className="text-lg font-semibold">{issue.name}</h2>
//             <p className="text-sm text-gray-500">Type: {issue.type}</p>
//             <p className="text-sm text-gray-500">{issue.summary}</p>
//             <span className={`mt-2 px-3 py-1 text-sm rounded ${issue.kind === "Personal" ? "bg-blue-500 text-white" : "bg-green-500 text-white"}`}>
//               {issue.kind}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default IssuesPage;
import { useState } from "react";

const issues = [
  { id: 1, name: "John Doe", type: "Maintenance", summary: "Broken window", kind: "Personal", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Jane Smith", type: "Cleaning", summary: "Unclean washroom", kind: "Overall", image: "https://via.placeholder.com/150" },
];

export default function IssuesPage() {
  const [selectedIssue, setSelectedIssue] = useState(null);

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 flex-1">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="border p-4 rounded-lg cursor-pointer hover:shadow-lg"
            onClick={() => setSelectedIssue(issue)}
          >
            <h3 className="font-bold">{issue.name}</h3>
            <p>{issue.type} - {issue.kind}</p>
            <img src={issue.image} alt="Issue" className="w-full h-32 object-cover mt-2 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 transform ${selectedIssue ? "translate-x-0" : "-translate-x-full"} transition-transform`}>
        {selectedIssue && (
          <>
            <button className="absolute top-2 right-2 text-xl" onClick={() => setSelectedIssue(null)}>✖</button>
            <h2 className="text-lg font-bold">{selectedIssue.name}</h2>
            <p><strong>Type:</strong> {selectedIssue.type}</p>
            <p><strong>Summary:</strong> {selectedIssue.summary}</p>
            <p><strong>Kind:</strong> {selectedIssue.kind}</p>
            <img src={selectedIssue.image} alt="Issue" className="w-full h-32 object-cover mt-2 rounded-lg" />
          </>
        )}
      </div>
    </div>
  );
}
