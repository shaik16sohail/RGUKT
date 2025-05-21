import React, { useState } from "react";
import '../../style/caretaker.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import navigate hook

const PaginatedTable = ({outpasses:outpassesData}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState(""); // Emergency / Regular
  const [filterStatus, setFilterStatus] = useState(""); // Pending / Approved / Rejected
  const [filterDate, setFilterDate] = useState(""); // Date filter
  const [sortOrder, setSortOrder] = useState("newest"); // Sort by date
  const [itemsPerPage,setItemsPerPage]=useState(10);

  // Temporary filter states (not applied instantly)
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSortOrder, setSelectedSortOrder] = useState("newest");

  // **Filter Logic**
  let filteredData = outpassesData.filter((item) => {
    return (
      (filterType ? item.type === filterType : true) &&
      (filterStatus ? item.status === filterStatus : true) &&
      (filterDate ? item.date === filterDate : true)
    );
  });

  const handleRowClick=(outpass)=>{
    navigate(`${outpass._id}`);
    // window.scrollTo(0, 0);
  };


  // **Sorting Logic**
  filteredData.sort((a, b) => {
    return sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  // **Pagination Logic**
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const buttonClick=()=>{
    setFilterType(selectedType);
    setFilterStatus(selectedStatus);
    setFilterDate(selectedDate);
    setSortOrder(selectedSortOrder);
    setCurrentPage(1); // Reset to first page when applying filters
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Outpasses List</h2>

      {/* 🔍 Filters Section */}
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        {/* Type Filter */}
        <select
          className="p-2 border bg-black  rounded-md"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="regular">regular</option>
          <option value="emergency">emergency</option>
        </select>

        {/* Status Filter */}
        <select
          className="p-2 border bg-black rounded-md"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">pending</option>
          <option value="approved">approved</option>
          <option value="rejected">rejected</option>
        </select>

        {/* Date Filter */}
        <input
          type="date"
          className="p-2 border bg-black rounded-md"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Sorting */}
        <select
          className="p-2 border bg-black rounded-md"
          value={selectedSortOrder}
          onChange={(e) => setSelectedSortOrder(e.target.value)}
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
        </select>
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" style={{backgroundColor:"#8b181b"}}
           onClick={buttonClick}>Search</button>
           <select
          className="p-2 border bg-black rounded-md"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
        >
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      

      {/* 📑 Outpasses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-white-200 shadow-md rounded-lg">
          <thead>
            <tr className=" outpasses-table-head text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">SNO</th>
              <th className="py-3 px-6 text-center">ID</th>
              <th className="py-3 px-6 text-center">Student Name</th>
              <th className="py-3 px-6 text-center">Type</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Date</th>
            </tr>
          </thead>
          
          <tbody className=" outpasses-table-body text-white text-m font-light">
            {currentItems.map((outpass,index) => (
                
              <tr key={outpass.id} className=" outpasses-body-tr border-b border-gray-200 "   onClick={()=>handleRowClick(outpass)} >
                
                <td className="py-3 px-6 text-center">{indexOfFirstItem+index+1}</td>
                <td className="py-3 px-6 text-center">{outpass.studentId.email.substring(1,2).toUpperCase()+outpass.studentId.email.substring(2,8)}</td>
                <td className="py-3 px-6 text-center">{outpass.studentId.name}</td>
                <td className="py-3 px-6 text-center">{outpass.type}</td>
                <td className={`py-3 px-6 text-center ${outpass.status === "Pending" ? "text-yellow-500" : outpass.status === "Approved" ? "text-green-500" : "text-red-500"}`}>
                  {outpass.status}
                </td>
                <td className="py-3 px-6 text-center">{outpass.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mx-2 bg-blue-500 text-white rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2 bg-gray-200 rounded-md">Page {currentPage} of {totalPages}</span>

        <button
          className={`px-4 py-2 mx-2 bg-blue-500 text-white rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
