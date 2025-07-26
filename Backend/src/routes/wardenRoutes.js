const express=require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const Student = require('../models/Student');
const Caretaker = require('../models/Caretaker');
const router=express.Router();

router.get('/home',auth,authorize("warden"),async(req,res)=>{
    try{
        const userData=await User.findOne({_id:req.userId});
        const hostelName=userData.hostelName;
        const registeredStudents = await User.countDocuments({hostelName:hostelName,userType:"student"});
        let data=await Caretaker.find({hostelName:hostelName});
        data=data.map((d)=>{
            const { totalRating = 0, ratingCount = 0 } = d.feedbackRating || {};
            return {
                ...d.toObject(),
                feedbackRating: ratingCount === 0 ? 0 : totalRating / ratingCount
            };
        });
        res.status(200).json({message:"success",registeredStudents,data});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"server failed"});
    }
});


module.exports=router;