const User=require("../models/User");
const Outpass=require("../models/Outpass");
const getHomeData=()=>{

};
const getAllOutpasses=async(req,res)=>{
    //here we need to take the hostelName from user(req) and 
    //search from database of outpasses table to get retrieve the only outpasses related to
    //that hostel
    const userData=await User.findOne({_id:req.userId});
    const hostelName=userData.hostelName;
    const outpassesData = await Outpass.find({ hostelName })
    .populate('studentId', 'name email') // only include name and email from Student
    .exec();
  res.status(200).json({outpassesData});
};
const getOneOutpass=async(req,res)=>{
  try{
    const {id}=req.params;
    console.log(id);
    const outpassData = await Outpass.findOne({ _id: id })
  .populate('studentId', 'name email'); // Only fetch name and email from Student

// console.log(outpassData);
    res.status(200).json({message:"success",outpassData});
  }catch(err){
    console.log(err);
    res.json(500).json({message:"server side error"});
  }
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
module.exports={getHomeData,getAllOutpasses,getAllIssues,getOneOutpass};