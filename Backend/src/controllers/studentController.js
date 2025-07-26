const Student = require("../models/Student");
const User = require("../models/User");
const Issue=require("../models/Issue");
const Outpass = require("../models/Outpass");
const getHomePage=async(req,res)=>{
    try{
        const userData=await User.findOne({_id:req.userId});
        const studentData=await Student.findOne({email:userData.email});
        const studentId=studentData._id;
        const outpasses=await Outpass.find({studentId});
        // console.log(outpasses);
        const Outpasses=outpasses.map(outpass=>({
            type:outpass.type,
            status:outpass.status,
            date:outpass.date,
            id:outpass._id,
            feedbackGiven:outpass.feedbackGiven,
        }));
        const issues=await Issue.find({studentId});
        // console.log(issues);
        const Issues=issues.map(issue=>({
            type:issue.category,
            status:issue.status,
            date:issue.createdAt,
            id:issue._id,
            feedbackGiven:issue.feedbackGiven,
        }));
    res.status(200).json({Outpasses,Issues});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"server failed"});
    }
    
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

const addOutpass=async(req,res)=>{
    try{
        const userData=await User.findOne({_id:req.userId});
        if (!userData) return res.status(404).json({ message: "User not found" });

        const email=userData.email;
        const studentData=await Student.findOne({email});

        const studentUserId=studentData._id;
        if (!studentData) return res.status(404).json({ message: "Student not found" });

        const {reason,destination,mobileNo,parentMobileNo,returnDate,date,type}=req.body;
        const hostelName=studentData.hostelName;

        const newOutpass=new Outpass({
            studentId:studentUserId,
            expectedReturn:returnDate,
            reason,
            destination,
            mobileNo,
            parentMobileNo,
            date,
            type,
            hostelName
        });
        await newOutpass.save();
        console.log(newOutpass);
        res.status(201).json({ message: "Outpass added successfully", outpass: newOutpass });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error while adding outpass" });
    }
};
const deleteOutpass=async(req,res)=>{
    const {id}=req.params;
    try{
        const some=await Outpass.findOneAndDelete(id);
        console.log(some);
        res.status(201).json({ message: "Outpass deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error while deleting outpass" });
    }
};
const deleteIssue=async(req,res)=>{
    const {id}=req.params;
    try{
        const some=await Issue.findOneAndDelete({_id:id});
        console.log(some);
        console.log("successful");
        res.status(201).json({ message: "Issue deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error while deleting issue" });
    }
};

module.exports={getHomePage,addIssue,addOutpass,deleteOutpass,deleteIssue};