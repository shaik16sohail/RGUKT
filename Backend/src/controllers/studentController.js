const Student = require("../models/Student");
const User = require("../models/User");
const Issue=require("../models/Issue");
const getHomePage=(req,res)=>{
    const Outpasses=[
        { type: "Regular", status: "Pending", date: "2024-02-12" },
        { type: "Emergency", status: "Approved", date: "2024-02-12" },
        { type: "Regular", status: "Pending", date: "2024-02-12" },
        { type: "Emergency", status: "Approved", date: "2024-02-12" },
        { type: "Regular", status: "Pending", date: "2024-02-12" },
        { type: "Emergency", status: "Approved", date: "2024-02-12" },
        { type: "sohail", status: "Pending", date: "2024-02-12" },
    ];
    const Issues=[
        {type:"Maintainance",status:"Solved",date:"2024-02-12"},
        {type:"Electricity",status:"Pending",date:"2024-02-12"},
        {type:"Sanitation",status:"solved",date:"2024-02-12"},
        {type:"Mess",status:"solved",date:"2024-02-12"},
        
    ];
    res.status(200).json({Outpasses,Issues});
}
const addIssue=async(req,res)=>{
    try{
        const userData=await User.findOne({_id:req.userId});
        if (!userData) return res.status(404).json({ message: "User not found" });

        const email=userData.email;
        const studentData=await Student.findOne({email});

        const studentUserId=studentData._id;
        if (!studentData) return res.status(404).json({ message: "Student not found" });

        const {category,description}=req.body;
        const hostelName=studentData.hostelName;

        let photoUrl='';
        if (req.file && req.file.path) {
            photoUrl = req.file.path; // Cloudinary gives URL in `path`
        }

        const newIssue = new Issue({
            studentId:studentUserId,
            category,
            description,
            hostelName,
            photo: photoUrl,
        });

        await newIssue.save();
        console.log(newIssue);
        res.status(201).json({ message: "Issue added successfully", issue: newIssue });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error while adding issue" });
    }
};
module.exports={getHomePage,addIssue};