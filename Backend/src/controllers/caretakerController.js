const getHomeData=()=>{

};
const getAllOutpasses=(req,res)=>{
    //here we need to take the hostelName from user(req) and 
    //search from database of outpasses table to get retrieve the only outpasses related to
    //that hostel
    const outpassesData = [
  { id: "R200089", name: "John Doe", type: "Regular", status: "Pending", date: "2024-02-12" },
  { id: "R200069", name: "Jane Smith", type: "Emergency", status: "Approved", date: "2024-02-11" },
  { id: "R200088", name: "Alex Johnson", type: "Regular", status: "Rejected", date: "2024-02-10" },
  { id: "R200088", name: "Emily Brown", type: "Emergency", status: "Pending", date: "2024-02-09" },
  { id: "R200088", name: "Michael Lee", type: "Regular", status: "Approved", date: "2024-02-08" },
  { id: "R200088", name: "Sarah Wilson", type: "Regular", status: "Pending", date: "2024-02-07" },
  { id: "R200088", name: "Daniel Martinez", type: "Emergency", status: "Approved", date: "2024-02-06" },
  { id: "R200088", name: "Sophia Garcia", type: "Regular", status: "Rejected", date: "2024-02-05" },
  { id: "R200088", name: "James Anderson", type: "Emergency", status: "Pending", date: "2024-02-04" },
  { id: "R200088", name: "Olivia Thomas", type: "Regular", status: "Approved", date: "2024-02-03" },
  { id: "R200088", name: "William Taylor", type: "Regular", status: "Pending", date: "2024-02-02" },
  { id: "R200088", name: "Mia Moore", type: "Emergency", status: "Approved", date: "2024-02-01" },
  { id: "R200088", name: "Sophia Garcia", type: "Regular", status: "Rejected", date: "2024-02-05" },
  { id: "R200088", name: "James Anderson", type: "Emergency", status: "Pending", date: "2024-02-04" },
  { id: "R200088", name: "Olivia Thomas", type: "Regular", status: "Approved", date: "2024-02-03" },
  { id: "R200088", name: "William Taylor", type: "Regular", status: "Pending", date: "2024-02-02" },
  { id: "R200088", name: "Sophia Garcia", type: "Regular", status: "Rejected", date: "2024-02-05" },
  { id: "R200088", name: "James Anderson", type: "Emergency", status: "Pending", date: "2024-02-04" },
  { id: "R200088", name: "Olivia Thomas", type: "Regular", status: "Approved", date: "2024-02-03" },
  { id: "R200088", name: "William Taylor", type: "Regular", status: "Pending", date: "2024-02-02" },
  { id: "R200088", name: "Sophia Garcia", type: "Regular", status: "Rejected", date: "2024-02-05" },
  { id: "R200088", name: "James Anderson", type: "Emergency", status: "Pending", date: "2024-02-04" },
  { id: "R200088", name: "Olivia Thomas", type: "Regular", status: "Approved", date: "2024-02-03" },
  { id: "R200088", name: "William Taylor", type: "Regular", status: "Pending", date: "2024-02-02" },
  { id: "R200088", name: "Sophia Garcia", type: "Regular", status: "Rejected", date: "2024-02-05" },
  { id: "R200088", name: "James Anderson", type: "Emergency", status: "Pending", date: "2024-02-04" },
  { id: "R200088", name: "Olivia Thomas", type: "Regular", status: "Approved", date: "2024-02-03" },
  { id: "R200088", name: "William Taylor", type: "Regular", status: "Pending", date: "2024-02-02" },
  { id: "R200088", name: "Sophia Garcia", type: "Regular", status: "Rejected", date: "2024-02-05" },
  { id: "R200088", name: "James Anderson", type: "Emergency", status: "Pending", date: "2024-02-04" },
  { id: "R200088", name: "Olivia Thomas", type: "Regular", status: "Approved", date: "2024-02-03" },
  { id: "R200088", name: "William Taylor", type: "Regular", status: "Pending", date: "2024-02-02" },
  { id: "R200088", name: "Sophia Garcia", type: "Regular", status: "Rejected", date: "2024-02-05" },
  { id: "R200088", name: "James Anderson", type: "Emergency", status: "Pending", date: "2024-02-04" },
  { id: "R200088", name: "Olivia Thomas", type: "Regular", status: "Approved", date: "2024-02-03" },
  { id: "R200088", name: "William Taylor", type: "Regular", status: "Pending", date: "2024-02-02" },
  { id: "R200088", name: "Sophia Garcia", type: "Regular", status: "Rejected", date: "2024-02-05" },
  { id: "R200088", name: "James Anderson", type: "Emergency", status: "Pending", date: "2024-02-04" },
  { id: "R200088", name: "Olivia Thomas", type: "Regular", status: "Approved", date: "2024-02-03" },
  { id: "R200088", name: "William Taylor", type: "Regular", status: "Pending", date: "2024-02-02" },
];
res.status(200).json({outpassesData});
};
const getAllIssues=(req,res)=>{
    //here we need to take the hostelName from user(req) and 
    //search from database of outpasses table to get retrieve the only issues related to
    //that hostel
    const issuesData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `R20008${i + 1}`,
      type: ["Maintenance", "Electricity", "Sanitation"][i % 3],
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/one.png",
      date: new Date(2024, 1, i + 1).toISOString().split("T")[0], // Random dates in Feb 2024
    }));
    res.status(200).json({issuesData});
};
module.exports={getHomeData,getAllOutpasses,getAllIssues};