const User=require("../models/User");
const Outpass=require("../models/Outpass");
const Issue = require("../models/Issue");
const QRCode = require('qrcode');
const generateQRCode = require("../utils/qrGenerator");
const  transporter  = require("../utils/transporter");
const Caretaker = require("../models/Caretaker");
const Student = require("../models/Student");
const getHomeData=async(req,res)=>{
    try{
      const userData=await User.findOne({_id:req.userId});
      const hostelName=userData.hostelName;
      const outpassesData = await Outpass.find({ hostelName });
      const issuesData=await Issue.find({hostelName,status:"pending"});
      console.log("outpass",outpassesData);
      res.status(200).json({outpass:outpassesData,issue:issuesData});
    }catch(err){
      console.log(err);
      res.status(400).json({message:"something went wrong"});
    }  
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
const getAllCompletedOutpasses=async(req,res)=>{
  const userData=await User.findOne({_id:req.userId});
  const hostelName=userData.hostelName;
  const outpassesData=await Outpass.find({hostelName,status:"completed"})
  .populate('studentId','name email')
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
const getOneCompletedOutpass=async(req,res)=>{
  try{
    const {id}=req.params;
    console.log(id);
    const outpassData = await Outpass.findOne({ _id: id })
    .populate('studentId','name email');
    // console.log(outpassData);
    res.status(200).json({message:"success",outpassData});
  }catch(err){
    console.log(err);
    res.json(500).json({message:"server side error"});
  }
};
const updateOutpass=async(req,res)=>{
  try{
    const {id}=req.params;
    console.log(id);
    const userData=await User.findOne({_id:req.userId});
    const emailOfThat=userData.email;
    const caretakerData=await Caretaker.findOne({email:emailOfThat});
    const caretakerId=caretakerData._id;
    const {status}=req.body;
    let mailOptions={
      from:process.env.MAIL,
      to:'shaik16sohail@gmail.com',
      subject:'',
      html:'',
    };
    // const OutpassData=await Outpass.findOne({_id:id});
    // const studentId=OutpassData.studentId;
    // const studentData=await Student.findOne({_id:studentId});
    // mailOptions.to=studentData.email;
    if(status=='approved'){
      const qrCodeUrl=await generateQRCode(id.toString());
      console.log(qrCodeUrl);
      const qrBuffer=await QRCode.toBuffer(id.toString());
      mailOptions.subject='Your Outpass request is Approved Successfully';
      mailOptions.html=`<p>Your Outpass QR Code:</p><img src="${qrCodeUrl}" alt="QR Code" />`;
      mailOptions.attachments = [
        {
          filename: 'qrcode.png',
          content: qrBuffer,
          cid: 'qrcode'
        }
      ];
      await transporter.sendMail(mailOptions);

    }else{
      mailOptions.subject='Your Outpass request is Rejected';
      mailOptions.html=`<p>Please Contact Warden Office or Raise new Outpass Request</p>`;
      await transporter.sendMail(mailOptions);
    }
    await Caretaker.findByIdAndUpdate(caretakerId,{$set:{outpassesApproved:caretakerData.outpassesApproved+1}},{new:true});
    const response=await Outpass.findByIdAndUpdate(id,{$set:{status:status,caretakerId:caretakerId}},{new:true});
    console.log(response);
    res.status(200).json({message:"success",response});

  }catch(err){
    console.log(err);
    res.status(500).json({message:"server side error"});
  }
};
const getAllIssues=async(req,res)=>{
    //here we need to take the hostelName from user(req) and 
    //search from database of outpasses table to get retrieve the only issues related to
    //that hostel
    const userData=await User.findOne({_id:req.userId});
    const hostelName=userData.hostelName;
    const iss=await Issue.find({hostelName,status:"pending"})
      .populate('studentId','name email')
      .exec();
    const transformData=iss.map(doc=>({
      _id:doc._id,
      name:doc.studentId.name,
      id:doc.studentId.email.substring(0,1).toUpperCase()+doc.studentId.email.substring(2,8),
      type:doc.category,
      summary:doc.description,
      image:doc.photo,
      date:doc.createdAt,
    }));
    // console.log(transformData);
    res.status(200).json({issuesData:transformData});
};
const updateIssue=async(req,res)=>{
  const {status,comment}=req.body;
  const {id}=req.params;
  const userData=await User.findOne({_id:req.userId});
  const emailOfThat=userData.email;
  const caretakerData=await Caretaker.findOne({email:emailOfThat});
  const caretakerId=caretakerData._id;

  try{
    if(status=="resolved")
        await Caretaker.findByIdAndUpdate(caretakerId,{$set:{issuesResolved:caretakerData.issuesResolved+1}},{new:true});
    const updated=await Issue.findByIdAndUpdate(id,{
      status,comment,caretakerId
    },{new:true});
    console.log(updated);
    res.status(200).json({message:"Updated Successfully"});
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "Failed to update issue" });
  }
};
module.exports={getHomeData,getAllOutpasses,getAllIssues,getOneOutpass,updateOutpass,updateIssue,getAllCompletedOutpasses,getOneCompletedOutpass};