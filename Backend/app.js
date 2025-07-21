require("dotenv").config();
const express=require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app=express();
const Stripe = require('stripe');
const authRoutes = require("./src/routes/authRoutes");
const studentRoutes=require('./src/routes/studentRoutes');
const caretakerRoutes=require('./src/routes/caretakerRoutes');
const paymentRoutes=require('./src/routes/payment');
const port=process.env.PORT|| 8080;
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const mongoose=require('mongoose');
const QRCode = require('qrcode');
const axios=require('axios');
const jwt = require('jsonwebtoken');
const Outpass = require("./src/models/Outpass");
const transporter = require("./src/utils/transporter");
const tempFormData = require("./src/utils/tempFormData");
const User = require("./src/models/User");
const Student = require("./src/models/Student");
const generateQRCode = require("./src/utils/qrGenerator");
const Message = require("./src/models/Message");
app.use('/webhook', express.raw({ type: 'application/json' }));
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
app.use("/api/payment",paymentRoutes);
// Add to your main Express server file (e.g., app.js or index.js)
app.get('/track', (req, res) => {
  const { studentId, outpassId } = req.query;

  if (!studentId || !outpassId) {
    return res.status(400).send('Missing studentId or outpassId');
  }
  const appLink = `myapp://track?studentId=${studentId}&outpassId=${outpassId}`;
  res.redirect(appLink);
});

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = Stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  let mailOptions={
      from:process.env.MAIL,
      to:'shaik16sohail@gmail.com',
      subject:'',
      html:'',
    };
  if (event.type === 'checkout.session.completed'){
    const session = event.data.object;
    const formData = tempFormData[session.id];
    const userId = session.metadata.userId;
    console.log("formData in app.js",formData);
    console.log(session.metadata);
    try {
      const userData = await User.findOne({ _id: userId });
      // console.log(userId);
      if (!userData) {
        console.error("❌ User not found");
        return;
      }

      const studentData = await Student.findOne({ email: userData.email });
      if (!studentData) {
        console.error("❌ Student not found");
        return;
      }

      const { reason, destination, studentMobile, parentMobile} = formData;

      const newOutpass = new Outpass({
        studentId: studentData._id,
        reason,
        destination,
        mobileNo: studentMobile,
        parentMobileNo: parentMobile,
        type: "emergency",
        status: "approved",
        hostelName: studentData.hostelName
      });

      const generatedOne= await newOutpass.save();
      console.log('✅ Outpass saved:', newOutpass);
      const qrCodeUrl=await generateQRCode(generatedOne._id.toString());
            console.log(qrCodeUrl);
            const qrBuffer=await QRCode.toBuffer(generatedOne._id.toString());
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
      delete tempFormData[session.id];

    } catch (error) {
      console.error("❌ Error saving Outpass:", error.message);
    }
  }
  res.status(200).end();
});

app.get('/api/messages/:hostelName', async (req, res) => {
    const messages = await Message.find({ hostelName: req.params.hostelName }).sort({ timestamp: 1 });
    res.json(messages);
});

app.get('/api/reverse-geocode',async(req,res)=>{
  const {lat,lon}=req.query;
  if(!lat || !lon) return res.status(400).json({message:"lat and lon required"});
  try{
    const response=await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        lat,
        lon,
        format: 'json'
      },
      headers: {
        'User-Agent': 'YourAppName/1.0' // Nominatim requires this
      }
    });
    res.json({address:response.data.display_name});
  }catch(err){
    console.error(err.message);
    res.status(500).json({message:"Reverse geocoding failed"});
  }
});

app.post("/api/scan/",async(req,res)=>{
  let mailOptions={
      from:process.env.MAIL,
      to:'shaik16sohail@gmail.com',
      subject:'',
      html:'',
    };
  try{
    const {outpassId}=req.body;
    const objectId = new mongoose.Types.ObjectId(outpassId);
    const outpassData=await Outpass.findOne({_id:objectId});
    console.log(outpassData);
    if(outpassData && outpassData.status=='approved'){
      outpassData.status = "completed";
      outpassData.completedAt = new Date(); // Add this field in your schema
      await outpassData.save();

      const tokenPayload={studentId:outpassData.studentId,outpassId:outpassData._id};
      const token=jwt.sign(tokenPayload,process.env.JWT_SECRET,{expiresIn:'24h'});
      const qrCodeDataURL=await QRCode.toDataURL(token);
      const redirectLink = `https://9b6493760c9e.ngrok-free.app/track?studentId=${outpassData.studentId}&outpassId=${outpassId}`;
      mailOptions.subject = 'Start Location Sharing';
      mailOptions.html = `
        <p>studentId-${outpassData.studentId}</p>
        <p>ObjectId-${outpassId}</p>
      `;
      await transporter.sendMail(mailOptions);
      res.status(200).json({message:"success",qrcode:qrCodeDataURL,token,});
    }else if(outpassData && outpassData.status=='completed'){
      // console.log(2);
      res.status(201).json({message:"outpass is already used bro"});
    }else {
      res.status(404).json({ message: "outpass not found" });
    }
    
  }catch(err){
    console.log(err);
    res.status(500).json({message:"error"});
  }
  
});
app.post("/api/location",async(req,res)=>{
  try{
    const {outpassId,latitude,longitude}=req.body;
    if(!outpassId || !longitude ||!latitude)
      return res.status(400).json({error:"Missing required fields"});
    const outpass=await Outpass.findById(outpassId);
    if(!outpass)
      return res.status(404).json({error:"Outpass not found"});
    const newLocation={
      latitude,longitude,
      timestamp:new Date(),
    };
    outpass.locations.push(newLocation);
    await outpass.save();
    console.log("Location saved for outpass",outpassId);
    res.json({message:"Location stored in DB"});

  }catch(err){
    console.log("error",err);
    res.status(500).json({error:"Internal server error"});
  }
});


// app.listen(port,()=>{
//     console.log("server is running lowde");
// })

module.exports=app;