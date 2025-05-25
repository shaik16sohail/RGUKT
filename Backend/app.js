require("dotenv").config();
const express=require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app=express();
const authRoutes = require("./src/routes/authRoutes");
const studentRoutes=require('./src/routes/studentRoutes');
const caretakerRoutes=require('./src/routes/caretakerRoutes');
const port=process.env.PORT|| 8080;
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const mongoose=require('mongoose');
const Outpass = require("./src/models/Outpass");
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://security-v5vz.vercel.app"
    ];

    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

connectDB();

app.use("/api/auth",authRoutes);
app.use("/student",studentRoutes);
app.use("/caretaker",caretakerRoutes);
app.post("/api/scan/",async(req,res)=>{
  try{
    const {outpassId}=req.body;
    const objectId = new mongoose.Types.ObjectId(outpassId);
    // console.log(objectId);
    const outpassData=await Outpass.findOne({_id:objectId});
    // console.log(outpassData);
    if(outpassData && outpassData.status=='approved'){
      // const some=await Outpass.findOneAndDelete({_id:objectId});
      // console.log(some);
       outpassData.status = "completed";
      outpassData.completedAt = new Date(); // Add this field in your schema
      await outpassData.save();
      res.status(200).json({message:"success"});
    }else{
      res.status(201).json({message:"outpass is not approved"});
    }
    
  }catch(err){
    console.log(err);
    res.status(500).json({message:"error"});
  }
  
});
app.post("/api/location",(req,res)=>{
   const { latitude, longitude } = req.body;
  console.log(`📍 Received location - Latitude: ${latitude}, Longitude: ${longitude}`);
  res.json({ message: 'Location received successfully' });
})


app.listen(port,()=>{
    console.log("server is running");
})