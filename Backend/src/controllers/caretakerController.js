const User=require("../models/User");
const Outpass=require("../models/Outpass");
const Issue = require("../models/Issue");
const QRCode = require('qrcode');
const generateQRCode = require("../utils/qrGenerator");
const  transporter  = require("../utils/transporter");
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
const updateOutpass=async(req,res)=>{
  try{
    const {id}=req.params;
    console.log(id);
    const {status}=req.body;
    let mailOptions={
      from:process.env.MAIL,
      to:'shaik16sohail@gmail.com',
      subject:'',
      html:'',
    };
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
    const response=await Outpass.findByIdAndUpdate(id,{$set:{status:status}},{new:true});
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
    const iss=await Issue.find({hostelName})
      .populate('studentId','name email')
      .exec();
    // console.log(iss);

    const transformData=iss.map(doc=>({
      name:doc.studentId.name,
      id:doc.studentId.email.substring(0,1).toUpperCase()+doc.studentId.email.substring(2,8),
      type:doc.category,
      summary:doc.description,
      image:doc.photo,
      date:doc.createdAt,
    }));
    console.log(transformData);
    // const issuesData = Array.from({ length: 20 }, (_, i) => ({
    //   id: i + 1,
    //   name: `R20008${i + 1}`,
    //   type: ["Maintenance", "Electricity", "Sanitation"][i % 3],
    //   summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //   image: "/one.png",
    //   date: new Date(2024, 1, i + 1).toISOString().split("T")[0], // Random dates in Feb 2024
    // }));
    res.status(200).json({issuesData:transformData});
};
module.exports={getHomeData,getAllOutpasses,getAllIssues,getOneOutpass,updateOutpass};